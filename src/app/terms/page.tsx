import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Tesacola Empire Nigeria",
  description: "Official terms of service governing retail commerce, custom commissions, and commercial manufacturing.",
};

export default function TermsPage() {
  return (
    <div className="bg-black min-h-screen text-white pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 pb-8 border-b border-[#1f1f1f]">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#d6be67] font-light block mb-2">
            Legal Framework
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-neutral-300 font-light leading-relaxed">
            Please review the contractual terms governing purchases, bespoke commissions, and manufacturing runs conducted with Tesacola Empire Nigeria.
          </p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-lg text-white font-medium">1. Brand Ownership &amp; Intellectual Property</h2>
            <p>
              The name &ldquo;Tesacola Empire Nigeria&rdquo;, the official circular globe and pillar crest, typography, photography, shoe last designs, and editorial texts are protected by intellectual property laws. Unauthorized reproduction or commercial impersonation is prohibited.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-white font-medium">2. Retail Orders &amp; Price Integrity</h2>
            <p>
              All prices displayed in Nigerian Naira (NGN) or international currencies are subject to validation upon checkout. In the event of a technical indexing error, Tesacola reserves the right to cancel the order and provide a full refund prior to workshop dispatch.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-white font-medium">3. Bespoke Production &amp; Material Variance</h2>
            <p>
              Because full-grain leather is a natural material, slight variations in natural grain pores, growth marks, and burnishing depth are inherent marks of authenticity. These characteristics distinguish genuine leather from synthetic plastics.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-white font-medium">4. Governing Law &amp; Jurisdiction</h2>
            <p>
              These terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
