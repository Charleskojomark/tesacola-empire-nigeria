import { processCheckout, verifyOrderPayment, submitCustomEnquiry, submitBusinessEnquiry } from "../src/app/actions/commerce";
import { dbRepository } from "../src/db";

async function runTests() {
  console.log("=== 1. Testing Storefront Products Retrieval ===");
  const products = await dbRepository.getProducts();
  console.log(`Found ${products.length} products in database.`);
  if (products.length === 0) throw new Error("No products found");
  const testProduct = products[0];
  console.log(`Test Product: ${testProduct.name} - SKU: ${testProduct.sku} - Price: ${testProduct.price}`);

  console.log("\n=== 2. Testing Server-Side Secure Checkout Action ===");
  const checkoutResult = await processCheckout({
    customerName: "Babatunde Adeyemi",
    customerEmail: "babatunde@example.com",
    customerPhone: "+234 801 234 5678",
    addressLine1: "14 Victoria Island Boulevard",
    city: "Lagos",
    state: "Lagos State",
    country: "Nigeria",
    deliveryNotes: "Leave with security at main gate",
    cartItems: [
      {
        productId: testProduct.id,
        variantId: testProduct.variants?.[0]?.id,
        quantity: 1,
      },
    ],
  });

  console.log("Checkout Result:", checkoutResult);
  if (!checkoutResult.success || !checkoutResult.orderId) {
    throw new Error("Checkout failed");
  }

  console.log("\n=== 3. Testing Server-Side Payment Verification ===");
  const verifyResult = await verifyOrderPayment(
    checkoutResult.orderId,
    `SANDBOX_${checkoutResult.orderNumber}_12345`
  );
  console.log("Payment Verification Result:", {
    success: verifyResult.success,
    paymentStatus: verifyResult.order?.paymentStatus,
    orderStatus: verifyResult.order?.orderStatus,
    orderNumber: verifyResult.order?.orderNumber,
    total: verifyResult.order?.total,
  });

  if (verifyResult.order?.paymentStatus !== "PAID" || verifyResult.order?.orderStatus !== "CONFIRMED") {
    throw new Error("Payment verification or status transition failed");
  }

  console.log("\n=== 4. Testing Custom Bespoke Commission Submission ===");
  const customFormData = new FormData();
  customFormData.set("customerName", "Chief Oladipo Mensah");
  customFormData.set("email", "oladipo@example.com");
  customFormData.set("phone", "+234 802 345 6789");
  customFormData.set("location", "Lagos, Nigeria");
  customFormData.set("category", "FOOTWEAR");
  customFormData.set("quantity", "2");
  customFormData.set("specifications", "Bespoke last with high instep arch support, obsidian black box calfskin.");
  
  const customResult = await submitCustomEnquiry(customFormData);
  console.log("Custom Commission Result:", customResult);
  if (!customResult.success) throw new Error("Custom commission failed");

  console.log("\n=== 5. Testing Commercial B2B Enquiry Submission ===");
  const b2bFormData = new FormData();
  b2bFormData.set("contactName", "Folake Bankole");
  b2bFormData.set("businessName", "Sovereign Retail Holdings Ltd");
  b2bFormData.set("country", "Nigeria");
  b2bFormData.set("city", "Lagos");
  b2bFormData.set("email", "procurement@sovereignretail.com");
  b2bFormData.set("phone", "+234 803 123 4567");
  b2bFormData.set("businessType", "RETAILER");
  b2bFormData.set("productCategory", "Executive Men's Footwear");
  b2bFormData.set("estimatedQuantity", "100 pairs quarterly");
  b2bFormData.set("customRequirements", "Looking to stock Tesacola Sovereign wholecuts and Belgian loafers in boutique stores.");

  const b2bResult = await submitBusinessEnquiry(b2bFormData);
  console.log("Business Enquiry Result:", b2bResult);
  if (!b2bResult.success) throw new Error("Business enquiry failed");

  console.log("\n=== 6. Testing Admin Dashboard Metrics Synchronization ===");
  const metrics = await dbRepository.getDashboardMetrics();
  console.log("Live Admin Dashboard Metrics:", {
    totalRevenue: metrics.totalRevenue,
    paidOrders: metrics.paidOrders,
    totalOrders: metrics.totalOrders,
    newCustomEnquiries: metrics.newCustomEnquiries,
    newBusinessEnquiries: metrics.newBusinessEnquiries,
  });

  if (metrics.paidOrders !== 1 || metrics.totalRevenue <= 0) {
    throw new Error("Dashboard metrics mismatch");
  }

  console.log("\n>>> ALL CRITICAL E-COMMERCE, PAYMENT, ENQUIRY, AND ADMIN FLOWS VERIFIED 100% SUCCESSFULLY! <<<");
}

runTests().catch((err) => {
  console.error("Test execution error:", err);
  process.exit(1);
});
