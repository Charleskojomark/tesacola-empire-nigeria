"use server";

import { dbRepository } from "@/db";
import { checkoutSchema, customEnquirySchema, businessEnquirySchema } from "@/lib/validation";
import { getPaymentProvider } from "@/lib/payments";
import { generateOrderNumber, generateEnquiryReference } from "@/lib/utils";
import { OrderItem } from "@/types";

export interface CheckoutInput {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode?: string;
  country: string;
  deliveryNotes?: string;
  cartItems: {
    productId: string;
    variantId?: string;
    quantity: number;
  }[];
}

export async function processCheckout(input: CheckoutInput) {
  try {
    // 1. Validate customer & address inputs
    const validatedData = checkoutSchema.parse({
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      customerPhone: input.customerPhone,
      addressLine1: input.addressLine1,
      addressLine2: input.addressLine2,
      city: input.city,
      state: input.state,
      postalCode: input.postalCode,
      country: input.country,
      deliveryNotes: input.deliveryNotes,
    });

    if (!input.cartItems || input.cartItems.length === 0) {
      return { success: false, error: "Your shopping cart is empty." };
    }

    // 2. Security Check: Retrieve trusted product prices strictly from database
    let serverCalculatedSubtotal = 0;
    const verifiedOrderItems: OrderItem[] = [];

    for (const item of input.cartItems) {
      const dbProduct = await dbRepository.getProductById(item.productId);
      if (!dbProduct || !dbProduct.isPublished) {
        return {
          success: false,
          error: `Product with ID ${item.productId} is unavailable or discontinued.`,
        };
      }

      let unitPrice = dbProduct.price;
      let variantName: string | undefined = undefined;

      if (item.variantId) {
        const variant = dbProduct.variants?.find((v) => v.id === item.variantId);
        if (!variant || !variant.isAvailable) {
          return {
            success: false,
            error: `Selected variant for ${dbProduct.name} is currently out of stock.`,
          };
        }
        unitPrice += variant.priceAdjustment || 0;
        variantName = `${variant.size || ""} ${variant.colour || ""}`.trim();
      }

      const lineTotal = unitPrice * item.quantity;
      serverCalculatedSubtotal += lineTotal;

      verifiedOrderItems.push({
        id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        orderId: "", // assigned upon order creation
        productId: dbProduct.id,
        variantId: item.variantId,
        productName: dbProduct.name,
        variantName: variantName,
        unitPrice,
        quantity: item.quantity,
        lineTotal,
        productImage: dbProduct.images?.[0]?.url,
      });
    }

    // Flat standard shipping fee for Nigeria nationwide, free for orders above 300k
    const shippingFee = serverCalculatedSubtotal > 300000 ? 0 : 5000;
    const finalTotal = serverCalculatedSubtotal + shippingFee;
    const orderNumber = generateOrderNumber();

    // 3. Create Order Record with PENDING payment status
    const createdOrder = await dbRepository.createOrder({
      orderNumber,
      customerName: validatedData.customerName,
      customerEmail: validatedData.customerEmail,
      customerPhone: validatedData.customerPhone,
      shippingAddress: {
        addressLine1: validatedData.addressLine1,
        addressLine2: validatedData.addressLine2,
        city: validatedData.city,
        state: validatedData.state,
        postalCode: validatedData.postalCode,
        country: validatedData.country,
      },
      subtotal: serverCalculatedSubtotal,
      shippingFee,
      tax: 0,
      total: finalTotal,
      currency: "NGN",
      paymentStatus: "PENDING",
      orderStatus: "NEW",
      notes: validatedData.deliveryNotes,
      items: verifiedOrderItems,
    });

    // 4. Return Direct Bank Transfer Confirmation URL
    return {
      success: true,
      orderId: createdOrder.id,
      orderNumber: createdOrder.orderNumber,
      checkoutUrl: `/order-confirmation/${createdOrder.id}`,
      provider: "BANK_TRANSFER",
    };
  } catch (error: any) {
    console.error("Checkout processing error:", error);
    return {
      success: false,
      error: error.message || "Failed to process checkout. Please try again.",
    };
  }
}

export async function submitBankTransferProof(input: {
  orderId: string;
  senderName: string;
  bankReference?: string;
  customerNotes?: string;
}) {
  try {
    const order = await dbRepository.getOrderById(input.orderId);
    if (!order) {
      return { success: false, error: "Order not found." };
    }

    const updated = await dbRepository.updateOrderTransferDetails(input.orderId, {
      senderName: input.senderName,
      bankReference: input.bankReference,
      notes: input.customerNotes,
    });

    return { success: true, order: updated };
  } catch (err: any) {
    console.error("Error submitting transfer proof:", err);
    return { success: false, error: err.message || "Failed to submit transfer confirmation." };
  }
}

export async function verifyOrderPayment(orderId: string, reference: string) {
  try {
    const order = await dbRepository.getOrderById(orderId);
    if (!order) {
      return { success: false, error: "Order not found" };
    }

    if (order.paymentStatus === "PAID") {
      return { success: true, order, alreadyPaid: true };
    }

    // Call server-side payment verification
    const paymentProvider = getPaymentProvider();
    const verification = await paymentProvider.verifyPayment(reference);

    if (verification.isVerified && verification.status === "PAID") {
      const updatedOrder = await dbRepository.updatePaymentStatus(orderId, "PAID");
      return { success: true, order: updatedOrder };
    } else {
      await dbRepository.updatePaymentStatus(orderId, "FAILED");
      return {
        success: false,
        error: "Payment verification failed or was declined by the provider.",
      };
    }
  } catch (error: any) {
    console.error("Payment verification error:", error);
    return { success: false, error: error.message || "Verification failed." };
  }
}

export async function submitCustomEnquiry(formData: FormData) {
  try {
    const rawData = {
      customerName: formData.get("customerName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      location: formData.get("location"),
      category: formData.get("category"),
      quantity: formData.get("quantity"),
      specifications: formData.get("specifications"),
      colourMaterial: formData.get("colourMaterial") || undefined,
      intendedUse: formData.get("intendedUse") || undefined,
      requiredDate: formData.get("requiredDate") || undefined,
      additionalNotes: formData.get("additionalNotes") || undefined,
      fileAttachmentUrl: (formData.get("fileAttachmentUrl") as string) || undefined,
    };

    const validated = customEnquirySchema.parse(rawData);
    const referenceNumber = generateEnquiryReference("CUSTOM");

    const enquiry = await dbRepository.createCustomEnquiry({
      referenceNumber,
      ...validated,
      status: "NEW",
    });

    return { success: true, referenceNumber: enquiry.referenceNumber };
  } catch (error: any) {
    console.error("Custom enquiry error:", error);
    return { success: false, error: error.message || "Failed to submit enquiry" };
  }
}

export async function submitBusinessEnquiry(formData: FormData) {
  try {
    const rawData = {
      contactName: formData.get("contactName"),
      businessName: formData.get("businessName"),
      country: formData.get("country"),
      city: formData.get("city"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      businessType: formData.get("businessType"),
      website: formData.get("website") || undefined,
      productCategory: formData.get("productCategory"),
      estimatedQuantity: formData.get("estimatedQuantity"),
      targetMarket: formData.get("targetMarket") || undefined,
      customRequirements: formData.get("customRequirements"),
      timeline: formData.get("timeline") || undefined,
      fileAttachmentUrl: (formData.get("fileAttachmentUrl") as string) || undefined,
    };

    const validated = businessEnquirySchema.parse(rawData);
    const referenceNumber = generateEnquiryReference("B2B");

    const enquiry = await dbRepository.createBusinessEnquiry({
      referenceNumber,
      ...validated,
      status: "NEW",
    });

    return { success: true, referenceNumber: enquiry.referenceNumber };
  } catch (error: any) {
    console.error("Business enquiry error:", error);
    return { success: false, error: error.message || "Failed to submit B2B enquiry" };
  }
}
