import crypto from "crypto";

export interface InitiatePaymentParams {
  orderId: string;
  orderNumber: string;
  amount: number; // in minor units or whole units
  currency: string;
  customerEmail: string;
  customerName: string;
  callbackUrl: string;
}

export interface PaymentSessionResponse {
  reference: string;
  checkoutUrl: string;
  provider: string;
}

export interface PaymentVerificationResponse {
  isVerified: boolean;
  reference: string;
  amount: number;
  currency: string;
  status: "PAID" | "FAILED" | "PENDING";
  raw?: any;
}

export interface PaymentProvider {
  name: string;
  initiatePayment(params: InitiatePaymentParams): Promise<PaymentSessionResponse>;
  verifyPayment(reference: string): Promise<PaymentVerificationResponse>;
  verifyWebhook(payload: any, signature: string): boolean;
}

/**
 * Sandbox Provider for Local / Staging automated tests and simulation
 */
class SandboxPaymentProvider implements PaymentProvider {
  name = "SANDBOX";

  async initiatePayment(params: InitiatePaymentParams): Promise<PaymentSessionResponse> {
    const reference = `SANDBOX_${params.orderNumber}_${Date.now()}`;
    const checkoutUrl = `${params.callbackUrl}?reference=${reference}&orderId=${params.orderId}`;
    return {
      reference,
      checkoutUrl,
      provider: "SANDBOX",
    };
  }

  async verifyPayment(reference: string): Promise<PaymentVerificationResponse> {
    // In sandbox, references starting with 'FAIL_' simulate failure, others simulate success
    const isFailed = reference.includes("FAIL");
    return {
      isVerified: !isFailed,
      reference,
      amount: 0,
      currency: "NGN",
      status: isFailed ? "FAILED" : "PAID",
      raw: { sandbox: true, timestamp: new Date().toISOString() },
    };
  }

  verifyWebhook(payload: any, signature: string): boolean {
    return true;
  }
}

/**
 * Paystack Provider (Standard Nigerian & International Gateway)
 */
class PaystackPaymentProvider implements PaymentProvider {
  name = "PAYSTACK";
  private secretKey = process.env.PAYMENT_SECRET_KEY || "";
  private webhookSecret = process.env.PAYMENT_WEBHOOK_SECRET || "";

  async initiatePayment(params: InitiatePaymentParams): Promise<PaymentSessionResponse> {
    const reference = `TSA_${params.orderNumber}_${Date.now()}`;

    // Paystack takes amount in kobo (NGN minor unit: amount * 100)
    const amountInKobo = Math.round(params.amount * 100);

    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: params.customerEmail,
        amount: amountInKobo,
        reference: reference,
        callback_url: params.callbackUrl,
        metadata: {
          orderId: params.orderId,
          orderNumber: params.orderNumber,
          customerName: params.customerName,
        },
      }),
    });

    const data = await response.json();
    if (!data.status) {
      throw new Error(`Paystack initialization failed: ${data.message}`);
    }

    return {
      reference,
      checkoutUrl: data.data.authorization_url,
      provider: "PAYSTACK",
    };
  }

  async verifyPayment(reference: string): Promise<PaymentVerificationResponse> {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
      },
    });

    const data = await response.json();
    if (!data.status || data.data.status !== "success") {
      return {
        isVerified: false,
        reference,
        amount: data?.data?.amount ? data.data.amount / 100 : 0,
        currency: data?.data?.currency || "NGN",
        status: "FAILED",
        raw: data,
      };
    }

    return {
      isVerified: true,
      reference,
      amount: data.data.amount / 100,
      currency: data.data.currency,
      status: "PAID",
      raw: data,
    };
  }

  verifyWebhook(payload: any, signature: string): boolean {
    if (!this.webhookSecret) return false;
    const hash = crypto
      .createHmac("sha512", this.webhookSecret)
      .update(JSON.stringify(payload))
      .digest("hex");
    return hash === signature;
  }
}

export function getPaymentProvider(): PaymentProvider {
  const provider = (process.env.PAYMENT_PROVIDER || "SANDBOX").toUpperCase();
  if (provider === "PAYSTACK" && process.env.PAYMENT_SECRET_KEY) {
    return new PaystackPaymentProvider();
  }
  return new SandboxPaymentProvider();
}
