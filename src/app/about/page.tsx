import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Compass, Sparkles, Building2 } from "lucide-react";

export const metadata = {
  title: "About | Philosophy & Origins",
  description:
    "Discover the vision of Tesacola Empire. Building an uncompromising standard of Nigerian leather craftsmanship and commercial manufacturing for the world.",
};

export default function AboutPage() {
  return (
    <div className="bg-black min-h-screen text-white pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="max-w-3xl mb-16 pb-10 border-b border-[#1f1f1f]">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#d6be67] font-light block mb-2">
            The World of Tesacola
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
            Building Our Own World
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
            Tesacola Empire was born to prove that African industrial craftsmanship and bespoke luxury do not need foreign validation. We build footwear, executive leather portfolios, and commercial goods that set their own benchmark.
          </p>
        </div>

        {/* Brand Creed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#d6be67] font-light">
              Who We Are &amp; What We Stand For
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-white font-light leading-snug">
              Enjoying Trust &amp; Quality
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              In an era dominated by synthetic imitations and disposable fast fashion, Tesacola champions slow, deliberate material mastery. We work with full-grain, vegetable-tanned bovine hides, solid brass cast hardware, and stitched welted construction.
            </p>
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
              When an executive walks into a boardroom wearing Tesacola, they wear the confidence of African hands that refuse to compromise.
            </p>
          </div>

          <div className="relative aspect-[4/3] bg-[#121212] border border-[#1f1f1f] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80"
              alt="Tesacola leather craftsmanship"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* 4 Pillars of the Brand */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          <div className="p-8 bg-[#0a0a0a] border border-[#1f1f1f]">
            <span className="text-xs font-serif text-[#d6be67] block mb-2">01</span>
            <h3 className="font-serif text-lg text-white font-medium mb-2">Authentic Provenance</h3>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Harnessing indigenous Nigerian leather tanning traditions while implementing modern mechanical lasting precision.
            </p>
          </div>
          <div className="p-8 bg-[#0a0a0a] border border-[#1f1f1f]">
            <span className="text-xs font-serif text-[#d6be67] block mb-2">02</span>
            <h3 className="font-serif text-lg text-white font-medium mb-2">Commercial Reliability</h3>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              A company built not only for retail clients, but with the industrial backbone to produce volume runs for institutions and corporate brands.
            </p>
          </div>
          <div className="p-8 bg-[#0a0a0a] border border-[#1f1f1f]">
            <span className="text-xs font-serif text-[#d6be67] block mb-2">03</span>
            <h3 className="font-serif text-lg text-white font-medium mb-2">Honest Pricing</h3>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Direct-from-maker manufacturing without speculative luxury markups, investing value directly into hide thickness and stitch count.
            </p>
          </div>
          <div className="p-8 bg-[#0a0a0a] border border-[#1f1f1f]">
            <span className="text-xs font-serif text-[#d6be67] block mb-2">04</span>
            <h3 className="font-serif text-lg text-white font-medium mb-2">Long-Term Scalability</h3>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Laying the industrial foundation for African youth technical apprenticeship, future craft academy training, and export leadership.
            </p>
          </div>
        </div>

        {/* Made in Nigeria Statement */}
        <div id="made-in-nigeria" className="p-10 sm:p-16 bg-[#0f0f0f] border border-[#d6be67]/25 text-center max-w-4xl mx-auto space-y-4">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#d6be67] font-light">
            Industrial Sovereignty
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-light text-white">
            Made in Nigeria. Proudly. Permanently.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed">
            We do not manufacture abroad and re-label in Lagos. From our cutting tables and stitching bays to the final edge irons, Tesacola is engineered within the Federal Republic of Nigeria.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Link
              href="/shop"
              className="px-8 py-3.5 bg-[#d6be67] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#f4e996] transition-colors"
            >
              Shop The Catalog
            </Link>
            <Link
              href="/business"
              className="px-8 py-3.5 border border-white/20 text-white text-xs uppercase tracking-widest hover:border-[#d6be67] hover:text-[#d6be67] transition-colors"
            >
              Commercial Partnerships
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
