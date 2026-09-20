"use server";

import { dbRepository } from "@/db";
import { requireAuth } from "@/lib/auth";
import { OrderStatus, CustomEnquiryStatus, BusinessEnquiryStatus, Product } from "@/types";
import { revalidatePath } from "next/cache";

export async function adminUpdateOrderStatus(
  orderId: string,
  status: OrderStatus,
  trackingNumber?: string
) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "ADMIN", "ORDER_MANAGER"]);
    const updated = await dbRepository.updateOrderStatus(orderId, status, trackingNumber);

    await dbRepository.logAdminAction({
      userId: session.userId,
      userEmail: session.email,
      action: "UPDATE_ORDER_STATUS",
      entityType: "ORDER",
      entityId: orderId,
      details: `Status changed to ${status}${trackingNumber ? ` (Tracking: ${trackingNumber})` : ""}`,
    });

    revalidatePath("/admin/orders");
    revalidatePath(`/admin/orders/${orderId}`);
    return { success: true, order: updated };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function adminUpdateCustomEnquiry(
  id: string,
  status: CustomEnquiryStatus,
  internalNotes?: string
) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "ADMIN"]);
    const updated = await dbRepository.updateCustomEnquiryStatus(id, status, internalNotes);

    await dbRepository.logAdminAction({
      userId: session.userId,
      userEmail: session.email,
      action: "UPDATE_CUSTOM_ENQUIRY",
      entityType: "CUSTOM_ENQUIRY",
      entityId: id,
      details: `Status set to ${status}`,
    });

    revalidatePath("/admin/custom-enquiries");
    return { success: true, enquiry: updated };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function adminUpdateBusinessEnquiry(
  id: string,
  status: BusinessEnquiryStatus,
  internalNotes?: string
) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "ADMIN"]);
    const updated = await dbRepository.updateBusinessEnquiryStatus(id, status, internalNotes);

    await dbRepository.logAdminAction({
      userId: session.userId,
      userEmail: session.email,
      action: "UPDATE_BUSINESS_ENQUIRY",
      entityType: "BUSINESS_ENQUIRY",
      entityId: id,
      details: `Status set to ${status}`,
    });

    revalidatePath("/admin/business-enquiries");
    return { success: true, enquiry: updated };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function adminSaveProduct(productData: Partial<Product> & { name: string; price: number; categoryId: string }) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "ADMIN"]);
    let product: Product;

    if (productData.id) {
      const updated = await dbRepository.updateProduct(productData.id, productData);
      if (!updated) throw new Error("Product not found");
      product = updated;
      await dbRepository.logAdminAction({
        userId: session.userId,
        userEmail: session.email,
        action: "UPDATE_PRODUCT",
        entityType: "PRODUCT",
        entityId: product.id,
        details: `Updated product ${product.name}`,
      });
    } else {
      product = await dbRepository.createProduct({
        name: productData.name,
        slug: productData.slug || productData.name.toLowerCase().replace(/\s+/g, "-"),
        sku: productData.sku || `TSA-GEN-${Date.now()}`,
        shortDescription: productData.shortDescription || "",
        fullDescription: productData.fullDescription || "",
        price: productData.price,
        currency: "NGN",
        status: productData.status || "IN_STOCK",
        isFeatured: productData.isFeatured || false,
        isPublished: productData.isPublished ?? true,
        categoryId: productData.categoryId,
        images: productData.images || [],
        variants: productData.variants || [],
      });
      await dbRepository.logAdminAction({
        userId: session.userId,
        userEmail: session.email,
        action: "CREATE_PRODUCT",
        entityType: "PRODUCT",
        entityId: product.id,
        details: `Created product ${product.name}`,
      });
    }

    revalidatePath("/shop");
    revalidatePath("/admin/products");
    return { success: true, product };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function adminDeleteProduct(id: string) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "ADMIN"]);
    await dbRepository.deleteProduct(id);
    await dbRepository.logAdminAction({
      userId: session.userId,
      userEmail: session.email,
      action: "DELETE_PRODUCT",
      entityType: "PRODUCT",
      entityId: id,
      details: `Deleted product ID ${id}`,
    });

    revalidatePath("/shop");
    revalidatePath("/admin/products");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
