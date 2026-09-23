import React from "react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { dbRepository } from "@/db";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { formatCurrency, formatDate } from "@/lib/utils";
import { adminUpdateOrderStatus, adminVerifyPayment } from "@/app/actions/admin";
import { ArrowLeft, Truck, CheckCircle2, Clock, ShieldCheck, Building2, Check } from "lucide-react";

interface AdminOrderDetailProps {
  params: Promise<{ id: string }>;
}

export default async function AdminOrderDetailPage({ params }: AdminOrderDetailProps) {
  const session = await getSession();
  if (!session || session.role === "CUSTOMER") {
    redirect("/admin/login");
  }

  const { id } = await params;
  const order = await dbRepository.getOrderById(id);

  if (!order) {
    notFound();
  }

  async function updateStatusAction(formData: FormData) {
    "use server";
    const status = formData.get("orderStatus") as any;
    const trackingNumber = formData.get("trackingNumber") as string;
    await adminUpdateOrderStatus(id, status, trackingNumber);
  }

  async function markPaidAction() {
    "use server";
    await adminVerifyPayment(id, "PAID");
  }

  async function markUnpaidAction() {
    "use server";
    await adminVerifyPayment(id, "PENDING");
  }

  return (
    <AdminLayout userEmail={session.email} userRole={session.role}>
      <div className="max-w-4xl space-y-6">
        {/* Back Link */}
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Orders</span>
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#30363d]">
          <div>
            <span className="text-[11px] text-[#d6be67] uppercase tracking-wider block">
              Order Dossier
            </span>
            <h1 className="text-xl font-semibold text-white">{order.orderNumber}</h1>
            <p className="text-xs text-neutral-400 mt-0.5">
              Placed {formatDate(order.createdAt)} • Customer: {order.customerName}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wider ${
                order.paymentStatus === "PAID"
                  ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                  : "bg-amber-950 text-amber-400 border border-amber-800"
              }`}
            >
              Payment: {order.paymentStatus}
            </span>
          </div>
        </div>

        {/* Bank Transfer Payment Verification Card */}
        <div className="bg-[#161b22] border border-[#30363d] p-6 rounded-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#30363d]">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#d6be67]" />
              <h2 className="text-xs font-semibold text-white uppercase tracking-wider">
                Bank Transfer Verification
              </h2>
            </div>
            <span className="text-xs font-mono text-[#d6be67] font-semibold">
              Expected: {formatCurrency(order.total)}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1 text-xs">
              <p className="text-neutral-300">
                Current Status:{" "}
                <strong
                  className={order.paymentStatus === "PAID" ? "text-emerald-400" : "text-amber-400"}
                >
                  {order.paymentStatus === "PAID" ? "Verified & Paid" : "Awaiting Bank Transfer"}
                </strong>
              </p>
              <p className="text-neutral-500 text-[11px]">
                Narration Reference required: <span className="font-mono text-white">{order.orderNumber}</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              {order.paymentStatus !== "PAID" ? (
                <form action={markPaidAction}>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-semibold rounded flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Confirm Transfer &amp; Mark as Paid</span>
                  </button>
                </form>
              ) : (
                <form action={markUnpaidAction}>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#21262d] hover:bg-neutral-800 border border-[#30363d] text-neutral-400 hover:text-white text-xs rounded transition-colors"
                  >
                    Revert to Pending
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Status Update Form */}
        <div className="bg-[#161b22] border border-[#30363d] p-6 rounded-lg">
          <h2 className="text-xs font-semibold text-white uppercase tracking-wider mb-4 pb-2 border-b border-[#30363d]">
            Fulfillment Lifecycle Action
          </h2>
          <form action={updateStatusAction} className="grid grid-cols-1 sm:grid-cols-12 gap-4 text-xs">
            <div className="sm:col-span-5">
              <label className="block text-neutral-400 mb-1">Update Status</label>
              <select
                name="orderStatus"
                defaultValue={order.orderStatus}
                className="w-full bg-[#0d1117] border border-[#30363d] p-2.5 text-white rounded focus:border-[#d6be67] focus:outline-none"
              >
                <option value="NEW">NEW - Order Received</option>
                <option value="CONFIRMED">CONFIRMED - Verified</option>
                <option value="PROCESSING">PROCESSING - In Workshop</option>
                <option value="MADE_TO_ORDER">MADE_TO_ORDER - On Lasts</option>
                <option value="READY">READY - Packaging Complete</option>
                <option value="SHIPPED">SHIPPED - Handed to Courier</option>
                <option value="DELIVERED">DELIVERED - Client Received</option>
                <option value="CANCELLED">CANCELLED - Refunded/Closed</option>
              </select>
            </div>

            <div className="sm:col-span-4">
              <label className="block text-neutral-400 mb-1">Waybill / Courier Tracking Reference</label>
              <input
                type="text"
                name="trackingNumber"
                defaultValue={order.trackingNumber || ""}
                placeholder="e.g. DHL-9832746102"
                className="w-full bg-[#0d1117] border border-[#30363d] p-2.5 text-white rounded focus:border-[#d6be67] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-3 flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 bg-[#238636] hover:bg-[#2ea043] text-white font-medium rounded transition-colors"
              >
                Update Fulfillment
              </button>
            </div>
          </form>
        </div>

        {/* Order Details & Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          {/* Purchased Items */}
          <div className="bg-[#161b22] border border-[#30363d] p-6 rounded-lg space-y-4">
            <h3 className="font-semibold text-white uppercase tracking-wider text-[11px] pb-2 border-b border-[#30363d]">
              Ordered Creations ({order.items.length})
            </h3>
            <div className="divide-y divide-[#30363d]">
              {order.items.map((item) => (
                <div key={item.id} className="py-2.5 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-white">{item.productName}</p>
                    <p className="text-[11px] text-neutral-400">
                      {item.variantName ? `${item.variantName} • ` : ""}Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-medium text-white">{formatCurrency(item.lineTotal)}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#30363d] space-y-1.5">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Courier Logistics</span>
                <span>{formatCurrency(order.shippingFee)}</span>
              </div>
              <div className="flex justify-between text-white font-semibold pt-1 border-t border-[#30363d]">
                <span>Total</span>
                <span className="text-[#d6be67]">{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Delivery & Contact Information */}
          <div className="bg-[#161b22] border border-[#30363d] p-6 rounded-lg space-y-4">
            <h3 className="font-semibold text-white uppercase tracking-wider text-[11px] pb-2 border-b border-[#30363d]">
              Customer &amp; Handover Details
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-[10px] text-neutral-500 uppercase block">Recipient</span>
                <p className="text-white font-medium">{order.customerName}</p>
                <p className="text-neutral-400">{order.customerEmail}</p>
                <p className="text-neutral-400">{order.customerPhone}</p>
              </div>

              <div className="pt-2 border-t border-[#30363d]">
                <span className="text-[10px] text-neutral-500 uppercase block">Delivery Address</span>
                <p className="text-neutral-300">{order.shippingAddress.addressLine1}</p>
                {order.shippingAddress.addressLine2 && (
                  <p className="text-neutral-400">{order.shippingAddress.addressLine2}</p>
                )}
                <p className="text-neutral-300">
                  {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.country}
                </p>
              </div>

              {order.notes && (
                <div className="pt-2 border-t border-[#30363d]">
                  <span className="text-[10px] text-neutral-500 uppercase block">Customer Delivery Notes</span>
                  <p className="text-neutral-400 italic">&ldquo;{order.notes}&rdquo;</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
