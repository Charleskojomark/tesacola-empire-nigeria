import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description: "Official privacy and data governance framework for Tesacola Empire.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-black min-h-screen text-white pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 pb-8 border-b border-[#1f1f1f]">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#d6be67] font-light block mb-2">
            Governance &amp; Trust
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-neutral-300 font-light leading-relaxed">
            Effective Date: September 2026. Tesacola Empire treats your client records and commercial designs with absolute confidentiality.
          </p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-lg text-white font-medium">1. Information We Collect</h2>
            <p>
              We collect client identification data (name, email address, telephone number, and physical shipping address) exclusively for order fulfillment, custom bespoke lasting consultations, and commercial B2B contract evaluations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-white font-medium">2. Payment Data Security</h2>
            <p>
              Tesacola does not store or process payment card numbers on its servers. All payment transactions are encrypted and processed through accredited, PCI-DSS certified payment processors (such as Paystack).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-white font-medium">3. Commercial Confidentiality</h2>
            <p>
              Technical packs, proprietary lasts, custom hardware molds, and private-label branding assets submitted to our commercial manufacturing division remain the exclusive intellectual property of the commissioning client.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-white font-medium">4. Contact &amp; Corrections</h2>
            <p>
              To review, modify, or request deletion of your client profile records, contact our Data Governance Officer at <strong className="text-[#d6be67]">privacy@tesacola.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
