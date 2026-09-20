import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { dbRepository } from "@/db";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Eye, Clock, CheckCircle2, AlertCircle } from "lucide-react";

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
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
          <Link
            href="/admin/orders"
            className={`px-3 py-1.5 rounded-md border ${
              !status
                ? "bg-[#21262d] text-white border-[#30363d] font-semibold"
                : "text-neutral-400 border-transparent hover:bg-[#161b22]"
            }`}
          >
            All Orders ({orders.length})
          </Link>
          <Link
            href="/admin/orders?status=NEW"
            className={`px-3 py-1.5 rounded-md border ${
              status === "NEW"
                ? "bg-[#21262d] text-white border-[#30363d] font-semibold"
                : "text-neutral-400 border-transparent hover:bg-[#161b22]"
            }`}
          >
            New Orders
          </Link>
          <Link
            href="/admin/orders?status=PROCESSING"
            className={`px-3 py-1.5 rounded-md border ${
              status === "PROCESSING"
                ? "bg-[#21262d] text-white border-[#30363d] font-semibold"
                : "text-neutral-400 border-transparent hover:bg-[#161b22]"
            }`}
          >
            In Workshop
          </Link>
          <Link
            href="/admin/orders?status=SHIPPED"
            className={`px-3 py-1.5 rounded-md border ${
              status === "SHIPPED"
                ? "bg-[#21262d] text-white border-[#30363d] font-semibold"
                : "text-neutral-400 border-transparent hover:bg-[#161b22]"
            }`}
          >
            Dispatched / In Transit
          </Link>
        </div>

        {/* Orders Table */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg overflow-x-auto">
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
      </div>
    </AdminLayout>
  );
}
