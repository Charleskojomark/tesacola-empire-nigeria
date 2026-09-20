import React from "react";
import Link from "next/link";
import { Clock, Truck, ShieldCheck, Globe2 } from "lucide-react";

export const metadata = {
  title: "Shipping & Fulfillment Logistics",
  description:
    "Fulfillment schedules, production timelines, insured courier transit, and international delivery policies for Tesacola leather products.",
};

export default function ShippingPage() {
  return (
    <div className="bg-black min-h-screen text-white pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 pb-8 border-b border-[#1f1f1f]">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#d6be67] font-light block mb-2">
            Logistics &amp; Dispatch
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
            Shipping &amp; Delivery Framework
          </h1>
          <p className="mt-4 text-sm text-neutral-300 font-light leading-relaxed">
            Every piece departing the Tesacola atelier is inspected, packed in bespoke presentation cases, and conveyed through insured courier networks.
          </p>
        </div>

        {/* Critical Distinction: Production Time vs Courier Transit Time (Section 26 & 41) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 bg-[#0a0a0a] border border-[#1f1f1f] space-y-3">
            <div className="w-10 h-10 rounded-full bg-black border border-[#262626] flex items-center justify-center text-[#d6be67] mb-2">
              <Clock className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-xl text-white font-medium">1. Workshop Production Time</h2>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              <strong>In-Stock Articles:</strong> 24 to 48 hours for final hand-polishing, quality audit, and dispatch packaging.
            </p>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              <strong>Bespoke / Made-to-Order Articles:</strong> 7 to 14 working days for hand-clicking, lasting, welting, and burnishing.
            </p>
          </div>

          <div className="p-8 bg-[#0a0a0a] border border-[#1f1f1f] space-y-3">
            <div className="w-10 h-10 rounded-full bg-black border border-[#262626] flex items-center justify-center text-[#d6be67] mb-2">
              <Truck className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-xl text-white font-medium">2. Courier Transit Time</h2>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              <strong>Lagos Metropolis:</strong> 24–48 hours post-dispatch via insured logistics courier.
            </p>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              <strong>Other Nigerian States:</strong> 2–4 working days nationwide via air/express road logistics.
            </p>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              <strong>International Deliveries:</strong> 5–8 working days via DHL Express / FedEx Worldwide.
            </p>
          </div>
        </div>

        {/* Detailed Guidelines */}
        <div className="space-y-8 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed border-t border-[#1f1f1f] pt-12">
          <section className="space-y-2">
            <h3 className="font-serif text-lg text-white font-medium">Delivery Fees &amp; Complimentary Threshold</h3>
            <p>
              Nationwide delivery within Nigeria is billed at a flat rate of ₦5,000 for standard packages. Orders exceeding ₦300,000 qualify automatically for <strong>Complimentary Insured Delivery</strong>.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-lg text-white font-medium">Tracking &amp; Signature Release</h3>
            <p>
              Once your package leaves our dispatch hub, an email containing your logistics tracking number and waybill reference is transmitted to your registered email address. All shipments require an adult physical signature upon handover.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-lg text-white font-medium">Commercial &amp; Bulk Logistics</h3>
            <p>
              For wholesale stockists and institutional orders, freight forwarding, consolidated cargo pallets, and customs clearance manifests are coordinated directly by our Commercial Logistics desk.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
