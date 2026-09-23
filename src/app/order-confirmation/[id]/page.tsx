import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dbRepository } from "@/db";
import { formatCurrency, formatDate } from "@/lib/utils";
import { getBankTransferConfig } from "@/lib/bank-transfer";
import { TransferConfirmationForm } from "@/components/forms/TransferConfirmationForm";
import { CheckCircle2, Clock, Building2, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";

interface OrderConfirmationProps {
  params: Promise<{ id: string }>;
}

export default async function OrderConfirmationPage({
  params,
}: OrderConfirmationProps) {
  const { id } = await params;

  const order = await dbRepository.getOrderById(id);
  if (!order) {
    notFound();
  }

  const bankConfig = getBankTransferConfig();
  const isPaid = order.paymentStatus === "PAID";

  return (
    <div className="bg-black min-h-screen text-white pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Status Hero Card */}
        <div className="p-8 sm:p-12 bg-[#0a0a0a] border border-[#1f1f1f] text-center space-y-4">
          <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center border">
            {isPaid ? (
              <div className="w-16 h-16 rounded-full bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-amber-950/40 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Clock className="w-8 h-8" />
              </div>
            )}
          </div>

          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#d6be67] font-light">
              Tesacola Customer Order
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-light text-white">
              {isPaid
                ? "Payment Verified & Order Confirmed"
                : "Order Placed — Awaiting Bank Transfer"}
            </h1>
            <p className="text-xs text-neutral-400 font-light">
              Order Reference: <strong className="text-white font-mono">{order.orderNumber}</strong>
            </p>
          </div>

          <p className="text-xs text-neutral-300 max-w-lg mx-auto leading-relaxed pt-2">
            {isPaid
              ? `Thank you, ${order.customerName}. Your payment has been verified. Your order is now entered into the workshop dispatch queue.`
              : `Thank you, ${order.customerName}. Your order has been placed. Please complete your bank transfer using the account details and order reference below.`}
          </p>
        </div>

        {/* Bank Transfer Instructions Card (Only shown if pending) */}
        {!isPaid && (
          <div className="mt-8 p-8 bg-[#0d0d0d] border border-[#d6be67]/30 space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-[#1f1f1f]">
              <Building2 className="w-5 h-5 text-[#d6be67]" />
              <h2 className="font-serif text-lg text-white font-medium">
                Bank Transfer Instructions
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-[#141414] border border-[#222] space-y-1">
                <span className="text-neutral-500 uppercase tracking-wider text-[10px] block">
                  Bank Name
                </span>
                <span className="text-white font-medium text-sm block">{bankConfig.bankName}</span>
              </div>

              <div className="p-4 bg-[#141414] border border-[#222] space-y-1">
                <span className="text-neutral-500 uppercase tracking-wider text-[10px] block">
                  Account Name
                </span>
                <span className="text-white font-medium text-sm block">{bankConfig.accountName}</span>
              </div>

              <div className="p-4 bg-[#141414] border border-[#222] space-y-1">
                <span className="text-neutral-500 uppercase tracking-wider text-[10px] block">
                  Account Number
                </span>
                <span className="text-[#d6be67] font-mono font-bold text-base block tracking-wider">
                  {bankConfig.accountNumber}
                </span>
              </div>

              <div className="p-4 bg-[#141414] border border-[#222] space-y-1">
                <span className="text-neutral-500 uppercase tracking-wider text-[10px] block">
                  Exact Amount to Transfer
                </span>
                <span className="text-white font-serif font-bold text-base block text-emerald-400">
                  {formatCurrency(order.total)}
                </span>
              </div>
            </div>

            <div className="p-4 bg-amber-950/20 border border-amber-900/40 rounded text-xs space-y-1">
              <strong className="text-amber-300 block font-medium">Important Narration:</strong>
              <p className="text-neutral-300 leading-relaxed font-light">
                Please include your Order Number <strong className="text-white font-mono">{order.orderNumber}</strong> in the transfer remarks/narration so our workshop can rapidly match your payment.
              </p>
            </div>

            {/* Client Interactive Transfer Confirmation Form */}
            <TransferConfirmationForm
              orderId={order.id}
              orderNumber={order.orderNumber}
              accountNumber={bankConfig.accountNumber}
              amount={order.total}
            />
          </div>
        )}

        {/* Order Details Breakdown */}
        <div className="mt-8 p-8 bg-[#0a0a0a] border border-[#1f1f1f] space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-[#1f1f1f] text-xs">
            <div>
              <span className="text-neutral-500 block">Date Placed</span>
              <span className="text-white font-medium">{formatDate(order.createdAt)}</span>
            </div>
            <div>
              <span className="text-neutral-500 block">Payment Status</span>
              <span
                className={`font-semibold uppercase tracking-wider ${
                  isPaid ? "text-emerald-400" : "text-amber-400"
                }`}
              >
                {isPaid ? "PAID" : "Awaiting Transfer"}
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block">Order Status</span>
              <span className="text-[#d6be67] font-semibold uppercase tracking-wider">
                {order.orderStatus}
              </span>
            </div>
          </div>

          {/* Ordered Items */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-wider text-neutral-400">
              Purchased Creations
            </h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-2 border-b border-[#141414] text-xs"
                >
                  <div>
                    <p className="font-medium text-white">{item.productName}</p>
                    <p className="text-[11px] text-neutral-400">
                      {item.variantName ? `${item.variantName} • ` : ""}Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-serif text-white font-medium">
                    {formatCurrency(item.lineTotal)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Totals */}
          <div className="pt-4 border-t border-[#1f1f1f] space-y-2 text-xs">
            <div className="flex justify-between text-neutral-400">
              <span>Subtotal</span>
              <span className="text-white">{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Insured Delivery</span>
              <span className="text-white">
                {order.shippingFee === 0 ? "Free" : formatCurrency(order.shippingFee)}
              </span>
            </div>
            <div className="pt-2 border-t border-[#1f1f1f] flex justify-between text-sm">
              <span className="font-medium text-white">Total Amount</span>
              <span className="font-serif text-lg font-bold text-[#d6be67]">
                {formatCurrency(order.total)}
              </span>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="pt-4 border-t border-[#1f1f1f] text-xs space-y-1">
            <span className="text-neutral-500 uppercase tracking-wider text-[10px] block">
              Delivery Address
            </span>
            <p className="text-white font-medium">{order.customerName}</p>
            <p className="text-neutral-300">{order.shippingAddress.addressLine1}</p>
            {order.shippingAddress.addressLine2 && (
              <p className="text-neutral-400">{order.shippingAddress.addressLine2}</p>
            )}
            <p className="text-neutral-300">
              {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.country}
            </p>
            <p className="text-neutral-400">{order.customerPhone}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/shop"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#d6be67] text-black font-semibold text-xs uppercase tracking-widest text-center hover:bg-[#f4e996] transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-3.5 border border-white/20 text-white text-xs uppercase tracking-widest text-center hover:border-white transition-colors"
          >
            Need Assistance? Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
