import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { dbRepository } from "@/db";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Package,
  ShoppingBag,
  Sparkles,
  Briefcase,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session || session.role === "CUSTOMER") {
    redirect("/admin/login");
  }

  const metrics = await dbRepository.getDashboardMetrics();

  return (
    <AdminLayout userEmail={session.email} userRole={session.role}>
      <div className="space-y-8">
        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#30363d]">
          <div>
            <h1 className="text-xl font-semibold text-white">Commercial Operations Overview</h1>
            <p className="text-xs text-neutral-400 mt-1">
              Live telemetry on retail order fulfillments, bespoke dossiers, and commercial contract leads.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/products/new"
              className="px-3.5 py-2 bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-medium rounded transition-colors"
            >
              + Create New Product
            </Link>
          </div>
        </div>

        {/* 4 Core Metric KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#161b22] border border-[#30363d] p-5 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400 font-medium">Verified Revenue</span>
              <TrendingUp className="w-4 h-4 text-[#3fb950]" />
            </div>
            <div className="mt-3">
              <span className="text-2xl font-semibold text-white">
                {formatCurrency(metrics.totalRevenue)}
              </span>
              <span className="text-[11px] text-neutral-500 block mt-1">
                From {metrics.paidOrders} confirmed customer transactions
              </span>
            </div>
          </div>

          <div className="bg-[#161b22] border border-[#30363d] p-5 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400 font-medium">Orders in Pipeline</span>
              <ShoppingBag className="w-4 h-4 text-[#d6be67]" />
            </div>
            <div className="mt-3">
              <span className="text-2xl font-semibold text-white">{metrics.totalOrders}</span>
              <span className="text-[11px] text-amber-400 block mt-1">
                {metrics.pendingOrders} awaiting workshop fulfillment
              </span>
            </div>
          </div>

          <div className="bg-[#161b22] border border-[#30363d] p-5 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400 font-medium">Custom Bespoke Leads</span>
              <Sparkles className="w-4 h-4 text-[#58a6ff]" />
            </div>
            <div className="mt-3">
              <span className="text-2xl font-semibold text-white">{metrics.newCustomEnquiries}</span>
              <span className="text-[11px] text-neutral-500 block mt-1">
                New bespoke commissions submitted
              </span>
            </div>
          </div>

          <div className="bg-[#161b22] border border-[#30363d] p-5 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400 font-medium">Commercial B2B Enquiries</span>
              <Briefcase className="w-4 h-4 text-[#bc8cff]" />
            </div>
            <div className="mt-3">
              <span className="text-2xl font-semibold text-white">{metrics.newBusinessEnquiries}</span>
              <span className="text-[11px] text-neutral-500 block mt-1">
                Active institutional/wholesale leads
              </span>
            </div>
          </div>
        </div>

        {/* 2-Column Tables: Recent Orders & Recent B2B Leads */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg overflow-hidden">
            <div className="p-4 border-b border-[#30363d] flex items-center justify-between">
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                Recent Orders &amp; Transactions
              </h3>
              <Link
                href="/admin/orders"
                className="text-xs text-[#d6be67] hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="divide-y divide-[#30363d]">
              {metrics.recentOrders.length === 0 ? (
                <div className="p-8 text-center text-xs text-neutral-500">
                  No orders recorded in development database yet.
                </div>
              ) : (
                metrics.recentOrders.map((order) => (
                  <div key={order.id} className="p-4 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-white">{order.orderNumber}</p>
                      <p className="text-[11px] text-neutral-400">
                        {order.customerName} • {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-medium text-white block">
                        {formatCurrency(order.total)}
                      </span>
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium ${
                          order.paymentStatus === "PAID"
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                            : "bg-amber-950 text-amber-400 border border-amber-800"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Custom & Business Enquiries */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg overflow-hidden">
            <div className="p-4 border-b border-[#30363d] flex items-center justify-between">
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                Recent Commercial Inquiries
              </h3>
              <Link
                href="/admin/business-enquiries"
                className="text-xs text-[#d6be67] hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="divide-y divide-[#30363d]">
              {metrics.recentBusinessEnquiries.length === 0 ? (
                <div className="p-8 text-center text-xs text-neutral-500">
                  No commercial B2B enquiries logged yet.
                </div>
              ) : (
                metrics.recentBusinessEnquiries.map((enq) => (
                  <div key={enq.id} className="p-4 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-white">{enq.businessName}</p>
                      <p className="text-[11px] text-neutral-400">
                        {enq.contactName} ({enq.country}) • Type: {enq.businessType}
                      </p>
                    </div>
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-blue-950 text-blue-300 border border-blue-800">
                        {enq.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
