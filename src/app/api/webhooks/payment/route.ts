import { NextRequest, NextResponse } from "next/server";
import { getPaymentProvider } from "@/lib/payments";
import { dbRepository } from "@/db";

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get("x-paystack-signature") || "";
    const body = await req.json();

    const provider = getPaymentProvider();
    const isValid = provider.verifyWebhook(body, signature);

    if (!isValid) {
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
    }

    const event = body.event;
    if (event === "charge.success") {
      const metadata = body.data?.metadata;
      const orderId = metadata?.orderId;
      const reference = body.data?.reference;

      if (orderId) {
        // Idempotent update: verify server-side
        const order = await dbRepository.getOrderById(orderId);
        if (order && order.paymentStatus !== "PAID") {
          await dbRepository.updatePaymentStatus(orderId, "PAID");
          await dbRepository.updateOrderStatus(orderId, "CONFIRMED");
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
