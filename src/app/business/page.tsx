import React from "react";
import Link from "next/link";
import { BusinessEnquiryForm } from "@/components/forms/BusinessEnquiryForm";
import { Layers, Sparkles, Globe2, Briefcase, Building2, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Work With Tesacola | Commercial Partnerships & Production",
  description:
    "Tesacola works with retailers, organisations, corporate buyers and commercial partners seeking premium Nigerian leather products, bespoke development and scalable production.",
};

export default async function BusinessPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;

  const pathways = [
    {
      title: "Commercial Production",
      type: "MANUFACTURING",
      icon: Layers,
      desc: "From defined product briefs to larger production runs, we work with commercial partners to develop and produce leather footwear and goods according to agreed specifications, quantities, timelines and quality requirements.",
    },
    {
      title: "Private Label",
      type: "PRIVATE_LABEL",
      icon: Sparkles,
      desc: "For selected commercial partners, Tesacola can develop products according to an approved brief, including product design, materials, colour direction, branding and finishing requirements.",
    },
    {
      title: "Wholesale & Stockists",
      type: "WHOLESALER",
      icon: Globe2,
      desc: "Our wholesale pathway is designed for retailers and resellers seeking premium Nigerian-made leather products for their markets.",
    },
    {
      title: "Corporate & Bespoke",
      type: "CORPORATE",
      icon: Briefcase,
      desc: "Custom footwear, leather goods, corporate gifts and branded pieces can be developed for organisations, events and executive requirements.",
    },
    {
      title: "International & Diaspora",
      type: "INTERNATIONAL",
      icon: Building2,
      desc: "We welcome enquiries from international and diaspora customers and commercial partners seeking Nigerian-made leather products for retail, gifting or broader commercial opportunities.",
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="max-w-3xl mb-16 pb-10 border-b border-[#1f1f1f]">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#d6be67] font-light block mb-2">
            Commercial Partnerships
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
            Work With Tesacola
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
            Tesacola works with retailers, organisations, corporate buyers and commercial partners seeking premium Nigerian leather products, bespoke development and scalable production.
          </p>
        </div>

        {/* 5 Commercial Pillars Grid (Point 8) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {pathways.map((p) => {
            const Icon = p.icon;
            const isSelected = type === p.type;
            return (
              <div
                key={p.type}
                className={`p-8 bg-[#0a0a0a] border transition-all flex flex-col justify-between ${
                  isSelected ? "border-[#d6be67] ring-1 ring-[#d6be67]" : "border-[#1f1f1f] hover:border-[#d6be67]/40"
                }`}
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-black border border-[#262626] flex items-center justify-center text-[#d6be67] mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] text-[#d6be67] uppercase tracking-widest block mb-2 font-light">
                    Partnership Pathway
                  </span>
                  <h3 className="font-serif text-lg font-medium text-white mb-3">{p.title}</h3>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">{p.desc}</p>
                </div>
                <Link
                  href={`/business?type=${p.type}#enquiry`}
                  className="text-xs uppercase tracking-widest text-[#d6be67] hover:underline font-light inline-block"
                >
                  Select Pathway &darr;
                </Link>
              </div>
            );
          })}
        </div>

        {/* Commercial Standards & Scalable Capacity (Point 9) */}
        <div className="mb-16 p-8 bg-[#0d0d0d] border border-[#1f1f1f] grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-light">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#d6be67] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-medium mb-1">Defined Specifications</strong>
              <span className="text-neutral-400">Strict adherence to approved product briefs, lead times, and quality standards.</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#d6be67] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-medium mb-1">Curated Nigerian Materials</strong>
              <span className="text-neutral-400">Carefully selected hides and components chosen for character, durability, and intended use.</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#d6be67] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-medium mb-1">Scalable Commercial Capacity</strong>
              <span className="text-neutral-400">Scalable production for commercial orders, developed according to product requirements, quantities and agreed timelines.</span>
            </div>
          </div>
        </div>

        {/* Commercial Inquiry Form */}
        <div id="enquiry" className="max-w-4xl mx-auto scroll-mt-28">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-white">
              Submit Commercial Enquiry
            </h2>
            <p className="text-xs text-neutral-400 font-light mt-2">
              Provide your entity details and estimated requirements. Our commercial team will review your brief within 24 hours.
            </p>
          </div>

          <BusinessEnquiryForm initialType={type} />
        </div>
      </div>
    </div>
  );
}
