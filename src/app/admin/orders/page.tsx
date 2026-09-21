import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { dbRepository } from "@/db";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Eye } from "lucide-react";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string }>;
}) {
  const session = await getSession();
  if (!session || session.role === "CUSTOMER") {
    redirect("/admin/login");
  }

  const { status, search } = await searchParams;
  const orders = await dbRepository.getOrders({
    status: status as any,
    search,
  });

  return (
    <AdminLayout userEmail={session.email} userRole={session.role}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#30363d]">
          <div>
            <h1 className="text-xl font-semibold text-white">Client Order Pipeline</h1>
            <p className="text-xs text-neutral-400 mt-1">
              Fulfillment processing, logistics tracking assignment, and payment records.
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs scrollbar-hide">
          {[
            { label: `All Orders (${orders.length})`, href: "/admin/orders", active: !status },
            { label: "New Orders", href: "/admin/orders?status=NEW", active: status === "NEW" },
            { label: "In Workshop", href: "/admin/orders?status=PROCESSING", active: status === "PROCESSING" },
            { label: "Dispatched", href: "/admin/orders?status=SHIPPED", active: status === "SHIPPED" },
          ].map((pill) => (
            <Link
              key={pill.href}
              href={pill.href}
              className={`whitespace-nowrap px-3 py-1.5 rounded-md border ${
                pill.active
                  ? "bg-[#21262d] text-white border-[#30363d] font-semibold"
                  : "text-neutral-400 border-transparent hover:bg-[#161b22]"
              }`}
            >
              {pill.label}
            </Link>
          ))}
        </div>

        {/* ── DESKTOP TABLE ── */}
        <div className="hidden sm:block bg-[#161b22] border border-[#30363d] rounded-lg overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-300">
            <thead className="bg-[#21262d] text-neutral-400 uppercase text-[10px] tracking-wider border-b border-[#30363d]">
              <tr>
                <th className="py-3.5 px-4">Order #</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Fulfillment</th>
                <th className="py-3.5 px-4">Total</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#30363d]">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-500">
                    No orders matching criteria found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#1c2128] transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-white">
                      {order.orderNumber}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-white">{order.customerName}</p>
                      <p className="text-[11px] text-neutral-500">{order.customerEmail}</p>
                    </td>
                    <td className="py-3 px-4 text-neutral-400">{formatDate(order.createdAt)}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${
                          order.paymentStatus === "PAID"
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                            : "bg-amber-950 text-amber-400 border border-amber-800"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-[#21262d] text-neutral-200 border border-[#30363d]">
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-white">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-neutral-200 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#d6be67]" />
                        <span>Manage</span>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── MOBILE CARD LIST ── */}
        <div className="sm:hidden space-y-3">
          {orders.length === 0 ? (
            <div className="bg-[#161b22] border border-[#30363d] p-8 text-center text-xs text-neutral-500 rounded-lg">
              No orders matching criteria found.
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-mono font-semibold text-white text-sm">{order.orderNumber}</p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">{formatDate(order.createdAt)}</p>
                  </div>
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-neutral-200 text-xs transition-colors flex-shrink-0"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#d6be67]" />
                    Manage
                  </Link>
                </div>
                <div className="border-t border-[#30363d] pt-3 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Customer</span>
                    <span className="text-white font-medium">{order.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Total</span>
                    <span className="text-white font-semibold">{formatCurrency(order.total)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Payment</span>
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${
                        order.paymentStatus === "PAID"
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                          : "bg-amber-950 text-amber-400 border border-amber-800"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Status</span>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-[#21262d] text-neutral-200 border border-[#30363d]">
                      {order.orderStatus}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
