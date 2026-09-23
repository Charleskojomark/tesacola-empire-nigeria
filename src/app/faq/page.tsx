import React from "react";
import Link from "next/link";
import { dbRepository } from "@/db";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Frequently Asked Questions | Customer Support | Tesacola Empire Nigeria",
  description:
    "Essential inquiries regarding Tesacola leather craftsmanship, sizing guides, bespoke commissions, payment instructions, nationwide delivery, and commercial orders.",
};

export default async function FAQPage() {
  const faqs = await dbRepository.getFAQs();

  return (
    <div className="bg-black min-h-screen text-white pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 pb-8 border-b border-[#1f1f1f]">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#d6be67] font-light block mb-2">
            Customer Support &amp; Enquiries
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-sm text-neutral-300 font-light leading-relaxed">
            Essential information regarding our Nigerian craftsmanship standards, sizing adjustments, bespoke commissions, direct bank transfer payments, and delivery timelines.
          </p>
        </div>

        {/* Quick Resource Pathways */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <Link
            href="/fit-guide"
            className="p-4 bg-[#0a0a0a] border border-[#1f1f1f] hover:border-[#d6be67]/50 transition-colors block text-xs space-y-1 group"
          >
            <span className="font-serif text-white font-medium block group-hover:text-[#d6be67]">
              Find Your Fit &rarr;
            </span>
            <p className="text-neutral-400 font-light">
              Measurement technique, arch profiles, and foot width guide.
            </p>
          </Link>
          <Link
            href="/care"
            className="p-4 bg-[#0a0a0a] border border-[#1f1f1f] hover:border-[#d6be67]/50 transition-colors block text-xs space-y-1 group"
          >
            <span className="font-serif text-white font-medium block group-hover:text-[#d6be67]">
              Shoe &amp; Leather Care &rarr;
            </span>
            <p className="text-neutral-400 font-light">
              Preservation and maintenance for 8 leather and textile categories.
            </p>
          </Link>
          <Link
            href="/colours"
            className="p-4 bg-[#0a0a0a] border border-[#1f1f1f] hover:border-[#d6be67]/50 transition-colors block text-xs space-y-1 group"
          >
            <span className="font-serif text-white font-medium block group-hover:text-[#d6be67]">
              Colour &amp; Materials &rarr;
            </span>
            <p className="text-neutral-400 font-light">
              Palettes, leather families, and custom commission reference.
            </p>
          </Link>
        </div>

        <div className="space-y-6">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="p-8 bg-[#0a0a0a] border border-[#1f1f1f] hover:border-[#d6be67]/30 transition-colors"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] uppercase tracking-widest text-[#d6be67] font-medium px-2 py-0.5 border border-[#d6be67]/20">
                  {faq.category}
                </span>
              </div>
              <h2 className="font-serif text-lg sm:text-xl text-white font-medium mb-3">
                {faq.question}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Concierge banner */}
        <div className="mt-16 p-8 bg-[#0f0f0f] border border-[#1f1f1f] text-center space-y-3">
          <h3 className="font-serif text-xl text-white font-light">Have an Unanswered Question?</h3>
          <p className="text-xs text-neutral-400 max-w-md mx-auto">
            Our workshop customer support team is on hand to provide personalized sizing guidance and material recommendations.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-block px-6 py-2.5 bg-[#d6be67] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#f4e996] transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
