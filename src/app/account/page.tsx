import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { dbRepository } from "@/db";
import { formatCurrency, formatDate } from "@/lib/utils";
import { logoutAction } from "@/app/actions/auth";
import { User, Package, MapPin, Clock, LogOut, ArrowRight, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "My Account | Client Dashboard",
  description: "Manage your Tesacola client profile, track order fulfillments, and view bespoke commissions.",
};

export default async function AccountDashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect("/account/login");
  }

  // Fetch client orders (filtered by email / user ID)
  const orders = await dbRepository.getOrders({
    search: session.email,
  });

  return (
    <div className="bg-black min-h-screen text-white pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-8 border-b border-[#1f1f1f] gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#d6be67] font-light block mb-2">
              Private Client Portfolio
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-white">
              Welcome, {session.name}
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Registered ID: <span className="text-neutral-300">{session.email}</span> • Status: Verified Client
            </p>
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-4 py-2 border border-[#262626] text-xs uppercase tracking-wider text-neutral-400 hover:text-white hover:border-neutral-500 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>

        {/* Account Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Orders History List */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="font-serif text-xl text-white font-medium flex items-center gap-2 pb-2 border-b border-[#1f1f1f]">
              <Package className="w-5 h-5 text-[#d6be67]" />
              <span>Order History &amp; Dispatch Tracking</span>
            </h2>

            {orders.length === 0 ? (
              <div className="p-12 bg-[#0a0a0a] border border-[#1f1f1f] text-center space-y-3">
                <p className="text-sm font-serif text-white">No Previous Orders Placed</p>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                  Your acquisitions and completed orders will appear here alongside live courier tracking references.
                </p>
                <Link
                  href="/shop"
                  className="inline-block px-6 py-2.5 bg-[#d6be67] text-black text-xs font-semibold uppercase tracking-widest hover:bg-[#f4e996] mt-2"
                >
                  Explore Store
                </Link>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="p-6 bg-[#0a0a0a] border border-[#1f1f1f] space-y-4 hover:border-[#262626] transition-colors"
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center text-xs pb-3 border-b border-[#141414] gap-2">
                    <div>
                      <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">Order Reference</span>
                      <strong className="text-white font-serif text-sm">{order.orderNumber}</strong>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">Placed Date</span>
                      <span className="text-neutral-300">{formatDate(order.createdAt)}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">Payment Status</span>
                      <span
                        className={`font-semibold uppercase tracking-wider ${
                          order.paymentStatus === "PAID" ? "text-emerald-400" : "text-amber-400"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">Fulfillment</span>
                      <span className="text-[#d6be67] font-semibold uppercase tracking-wider">
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>

                  {/* Items Summary */}
                  <div className="space-y-2 text-xs">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-neutral-300">
                        <span>
                          {item.productName} ({item.quantity}x)
                          {item.variantName && ` • ${item.variantName}`}
                        </span>
                        <span className="font-serif text-white">{formatCurrency(item.lineTotal)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-[#141414] flex justify-between items-center text-xs">
                    <span className="text-neutral-400">Total Charged: <strong className="text-white font-serif">{formatCurrency(order.total)}</strong></span>
                    <Link
                      href={`/order-confirmation/${order.id}`}
                      className="text-xs uppercase tracking-widest text-[#d6be67] hover:underline inline-flex items-center gap-1"
                    >
                      <span>View Receipt Dossier</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Profile & Support Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 bg-[#0a0a0a] border border-[#1f1f1f] space-y-4">
              <h3 className="font-serif text-lg text-white font-medium border-b border-[#1f1f1f] pb-3">
                Client Profile
              </h3>
              <div className="text-xs space-y-2 text-neutral-300">
                <p><strong>Name:</strong> {session.name}</p>
                <p><strong>Email:</strong> {session.email}</p>
                <p><strong>Account Role:</strong> {session.role}</p>
              </div>
            </div>

            <div className="p-6 bg-[#0a0a0a] border border-[#1f1f1f] space-y-4">
              <h3 className="font-serif text-lg text-white font-medium border-b border-[#1f1f1f] pb-3">
                Bespoke Atelier Service
              </h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Need to commission custom lasts, bespoke bag silhouettes, or personalized monograms?
              </p>
              <Link
                href="/custom"
                className="block w-full py-3 bg-[#d6be67] text-black font-semibold text-xs uppercase tracking-widest text-center hover:bg-[#f4e996]"
              >
                Initiate Bespoke Commission
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
