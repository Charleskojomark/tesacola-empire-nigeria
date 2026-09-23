import React from "react";
import Link from "next/link";
import { ShieldCheck, RefreshCw, AlertCircle, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Returns & Adjustments Policy | Tesacola Empire Nigeria",
  description:
    "Adjustment guidelines, condition requirements, and size modification protocols for Tesacola handcrafted footwear and leather products.",
};

export default function ReturnsPage() {
  return (
    <div className="bg-black min-h-screen text-white pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 pb-8 border-b border-[#1f1f1f]">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#d6be67] font-light block mb-2">
            Customer Support &amp; Policy
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
            Returns &amp; Adjustments
          </h1>
          <p className="mt-4 text-sm text-neutral-300 font-light leading-relaxed">
            We are dedicated to ensuring your footwear fits comfortably and reflects the quality of our craftsmanship. If your unworn piece requires a size or width adjustment, our workshop will assist.
          </p>
        </div>

        <div className="space-y-10 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
          <section className="p-8 bg-[#0a0a0a] border border-[#1f1f1f] space-y-3">
            <h2 className="font-serif text-xl text-white font-medium flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-[#d6be67]" />
              <span>7-Day Sizing Adjustment Window</span>
            </h2>
            <p>
              Standard ready-to-wear footwear, belts, and accessories in brand-new, unworn condition may be submitted for size exchange or adjustment within <strong>7 days</strong> of verified delivery handover.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-lg text-white font-medium">Condition &amp; Fitting Protocols</h3>
            <p>
              Because natural leather outsoles and soft linings mark easily, we request that you try on your footwear solely on a <strong>carpeted, clean surface</strong>. Footwear exhibiting creased vamps, scuffed outsoles, or damaged heel counters cannot be accepted for exchange.
            </p>
            <p>
              Items must be returned with all original presentation packaging intact, including signature cotton dust bags, spare laces, and rigid boxes.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-lg text-white font-medium">Custom &amp; Bespoke Commissions</h3>
            <p>
              Articles commissioned through our Custom &amp; Bespoke service (such as personalized monograms and custom leather dyes) are constructed specifically to individual dimensions and cannot be returned for cash refunds. Our workshop cobblers will, however, perform minor fit adjustments if required.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-lg text-white font-medium">How to Request an Adjustment</h3>
            <p>
              Contact our Customer Support team via email at <strong className="text-[#d6be67]">support@tesacola.com</strong> or WhatsApp with your Order Reference Number and replacement size requirement. Our team will schedule an insured courier retrieval.
            </p>
          </section>

          {/* Sizing Pre-check Callout */}
          <div className="p-6 bg-[#0a0a0a] border border-[#d6be67]/30 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <strong className="font-serif text-sm text-white block">Uncertain About Your Sizing Before Ordering?</strong>
              <p className="text-xs text-neutral-400">
                Measure your foot dimensions using our comprehensive sizing matrix and foot width guide.
              </p>
            </div>
            <Link
              href="/fit-guide"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-[#d6be67] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#f4e996] transition-colors whitespace-nowrap"
            >
              <span>Find Your Fit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
