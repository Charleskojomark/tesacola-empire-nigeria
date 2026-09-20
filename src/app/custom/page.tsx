import React from "react";
import Link from "next/link";
import { CustomEnquiryForm } from "@/components/forms/CustomEnquiryForm";
import { Sparkles, Compass, ShieldCheck, Ruler } from "lucide-react";

export const metadata = {
  title: "Custom & Bespoke Leather Craftsmanship",
  description:
    "Commission one-of-a-kind handcrafted leather footwear, bespoke briefcases, and customized leather creations with Tesacola Master Craftsmen.",
};

export default async function CustomPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; product?: string }>;
}) {
  const { category, product } = await searchParams;

  const pathways = [
    { title: "Custom Footwear", code: "FOOTWEAR", desc: "Anatomical lasting, bespoke widths, and selected patinas." },
    { title: "Custom Bags & Portfolios", code: "BAGS", desc: "Monogrammed briefcases, custom interior compartments, and heavy brass." },
    { title: "Custom Belts", code: "BELTS", desc: "Bespoke sizing, curated bridle leathers, and sculpted cast hardware." },
    { title: "Corporate Bespoke", code: "CORPORATE", desc: "Custom-embossed executive leather suites for boardrooms and VIP gifting." },
  ];

  return (
    <div className="bg-black min-h-screen text-white pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="max-w-3xl mb-16 pb-10 border-b border-[#1f1f1f]">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#d6be67] font-light block mb-2">
            The Bespoke Atelier
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
            Custom &amp; Bespoke Commissions
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
            For discerning clients requiring tailored lasts, specialized leather textures, or unique architectural silhouettes. Our master makers collaborate with you from raw hide selection to final hand-buffed delivery.
          </p>
        </div>

        {/* 4 Pillars of Bespoke */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pathways.map((p) => (
            <div
              key={p.code}
              className={`p-6 bg-[#0a0a0a] border transition-all ${
                category === p.code ? "border-[#d6be67]" : "border-[#1f1f1f]"
              }`}
            >
              <span className="text-[10px] text-[#d6be67] uppercase tracking-widest block mb-2 font-light">
                Atelier Service
              </span>
              <h3 className="font-serif text-lg font-medium text-white mb-2">{p.title}</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Main Form Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-white">
              Initiate Your Commission Dossier
            </h2>
            <p className="text-xs text-neutral-400 font-light mt-2">
              Complete the technical requirements below. Our workshop director will follow up with lasting consultations.
            </p>
          </div>

          <CustomEnquiryForm initialCategory={category} initialProduct={product} />
        </div>
      </div>
    </div>
  );
}
