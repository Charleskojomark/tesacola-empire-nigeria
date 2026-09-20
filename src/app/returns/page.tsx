import React from "react";
import Link from "next/link";
import { ShieldCheck, RefreshCw, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Returns & Exchanges Policy | Tesacola Empire Nigeria",
  description:
    "Exchange guidelines, condition requirements, and size adjustment protocols for Tesacola handcrafted footwear and leather products.",
};

export default function ReturnsPage() {
  return (
    <div className="bg-black min-h-screen text-white pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 pb-8 border-b border-[#1f1f1f]">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#d6be67] font-light block mb-2">
            Client Assurance
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
            Returns &amp; Exchange Policy
          </h1>
          <p className="mt-4 text-sm text-neutral-300 font-light leading-relaxed">
            We are dedicated to ensuring your footwear fits with anatomical precision. If your unworn piece requires a size or width modification, our atelier will assist.
          </p>
        </div>

        <div className="space-y-10 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
          <section className="p-8 bg-[#0a0a0a] border border-[#1f1f1f] space-y-3">
            <h2 className="font-serif text-xl text-white font-medium flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-[#d6be67]" />
              <span>7-Day Sizing Exchange Window</span>
            </h2>
            <p>
              Standard ready-to-wear footwear, belts, and accessories in brand-new, unworn condition may be exchanged for an alternative size within <strong>7 days</strong> of verified delivery handover.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-lg text-white font-medium">Condition &amp; Fitting Protocols</h3>
            <p>
              Because natural leather outsoles and soft lambskin linings mark easily, we request that you try on your footwear solely on a <strong>carpeted, clean surface</strong>. Footwear exhibiting creased vamps, scuffed outsoles, or damaged heel counters cannot be accepted for exchange.
            </p>
            <p>
              Items must be returned with all original presentation packaging intact, including signature cotton dust bags, spare laces, and rigid boxes.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-lg text-white font-medium">Custom &amp; Bespoke Commissions</h3>
            <p>
              Articles commissioned through our Custom &amp; Bespoke Atelier (such as bespoke lasts, personalized monograms, and custom leather dyes) are constructed specifically to individual anatomical dimensions and cannot be returned for cash refunds. Our master cobblers will, however, perform minor last adjustments if required.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-lg text-white font-medium">How to Initiate an Exchange</h3>
            <p>
              Contact our Client Concierge via email at <strong className="text-[#d6be67]">concierge@tesacola.com</strong> or WhatsApp with your Order Reference Number and replacement size requirement. Our team will schedule an insured courier retrieval.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
