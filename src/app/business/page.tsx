import React from "react";
import Link from "next/link";
import { BusinessEnquiryForm } from "@/components/forms/BusinessEnquiryForm";
import { Factory, Sparkles, Building2, Globe2, Briefcase, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Commercial Partnerships, Manufacturing & Wholesale",
  description:
    "Partner with Tesacola Empire Nigeria for commercial leather manufacturing, private-label brand production, wholesale distribution, and corporate bespoke orders.",
};

export default async function BusinessPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;

  const pathways = [
    {
      title: "Commercial Manufacturing",
      type: "MANUFACTURING",
      desc: "Industrial volume capacity for institutional footwear, fashion brand contract runs, and corporate leather lines.",
    },
    {
      title: "Private-Label Lines",
      type: "PRIVATE_LABEL",
      desc: "Bespoke branding, customized stamping, and proprietary lasts designed specifically for independent labels.",
    },
    {
      title: "Wholesale & Stockists",
      type: "WHOLESALER",
      desc: "Tiered wholesale discounts and seasonal catalog releases for premium retail boutiques and department stores.",
    },
    {
      title: "International & Diaspora",
      type: "INTERNATIONAL",
      desc: "Export-compliant logistics, consolidated freight, and currency invoicing for global African diaspora retailers.",
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="max-w-3xl mb-16 pb-10 border-b border-[#1f1f1f]">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#d6be67] font-light block mb-2">
            Commercial Infrastructure
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
            Work With Tesacola
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
            Tesacola provides dependable industrial manufacturing and bespoke commercial supply chains from Nigeria to the world. We partner with retailers, corporate enterprises, and fashion houses seeking craftsmanship that honors contract deadlines.
          </p>
        </div>

        {/* Commercial Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pathways.map((p) => (
            <div
              key={p.type}
              className={`p-6 bg-[#0a0a0a] border transition-all ${
                type === p.type ? "border-[#d6be67]" : "border-[#1f1f1f]"
              }`}
            >
              <span className="text-[10px] text-[#d6be67] uppercase tracking-widest block mb-2 font-light">
                Commercial Division
              </span>
              <h3 className="font-serif text-lg font-medium text-white mb-2">{p.title}</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Commercial Standards Statement */}
        <div className="mb-16 p-8 bg-[#0d0d0d] border border-[#1f1f1f] grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-light">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#d6be67] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-medium mb-1">Contract Rigor</strong>
              <span className="text-neutral-400">Strict adherence to lead times, milestone reporting, and quality control batch sign-offs.</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#d6be67] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-medium mb-1">Authentic Nigerian Raw Materials</strong>
              <span className="text-neutral-400">Selected northern Nigerian hides tanned to international tensile and flexibility standards.</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#d6be67] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-medium mb-1">Scalable Capacities</strong>
              <span className="text-neutral-400">Engineered tooling and industrialized finishing machines to fulfill multi-hundred unit orders.</span>
            </div>
          </div>
        </div>

        {/* Commercial Inquiry Form */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-white">
              Submit Commercial Enquiry
            </h2>
            <p className="text-xs text-neutral-400 font-light mt-2">
              Provide your entity details and estimated volume. Our B2B Commercial Director will review your brief within 24 hours.
            </p>
          </div>

          <BusinessEnquiryForm initialType={type} />
        </div>
      </div>
    </div>
  );
}
