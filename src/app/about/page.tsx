import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Globe, Compass, ArrowRight, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "About | Building Our Own World | Tesacola Empire Nigeria",
  description:
    "Tesacola Empire Nigeria is building a distinctive world of premium leather craftsmanship, thoughtful design and commercial possibility — rooted in Nigeria and created with a global outlook.",
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
          <p className="mt-6 text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
            Tesacola Empire Nigeria is building a distinctive world of premium leather craftsmanship, thoughtful design and commercial possibility — rooted in Nigeria and created with a global outlook.
          </p>
          <blockquote className="mt-4 text-sm sm:text-base text-neutral-400 font-serif italic border-l-2 border-[#d6be67] pl-4 leading-relaxed">
            &ldquo;We believe Nigerian craftsmanship deserves to be experienced not as a limitation of geography, but as a source of character, creativity and possibility.&rdquo;
          </blockquote>
        </div>

        {/* Brand Philosophy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#d6be67] font-light">
              Philosophy &amp; Character
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-white font-light leading-snug">
              Quiet Confidence &amp; Considered Design
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              We select leather and other materials according to the character, design and intended use of each piece. From disciplined cutting to final edge work and inspection, each article is shaped by skilled hands.
            </p>
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
              We serve individual customers and serious commercial partners alike, developing our production capabilities progressively while remaining dedicated to enduring quality.
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

        {/* Building for Tomorrow Section (Point 10) */}
        <div className="p-8 sm:p-12 bg-[#0c0c0c] border border-[#1f1f1f] mb-24">
          <div className="max-w-3xl">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#d6be67] font-light block mb-2">
              Progressive Development
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-white mb-4">
              Building for Tomorrow
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-4">
              Tesacola is developing progressively — expanding its product world, refining its production capabilities and building the foundations for broader commercial and international opportunities.
            </p>
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
              We are building a brand with a much larger future, serving customers and partners seeking dependable Nigerian leather development and scalable production.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-[#1f1f1f]">
            <div className="p-6 bg-[#080808] border border-[#1a1a1a]">
              <span className="text-xs font-serif text-[#d6be67] block mb-2">01</span>
              <h3 className="font-serif text-base text-white font-medium mb-1">Considered Craft</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Materials selected for character, strength, texture, and intended use.
              </p>
            </div>
            <div className="p-6 bg-[#080808] border border-[#1a1a1a]">
              <span className="text-xs font-serif text-[#d6be67] block mb-2">02</span>
              <h3 className="font-serif text-base text-white font-medium mb-1">Commercial Scalability</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Scalable production for commercial orders developed according to agreed specifications and timelines.
              </p>
            </div>
            <div className="p-6 bg-[#080808] border border-[#1a1a1a]">
              <span className="text-xs font-serif text-[#d6be67] block mb-2">03</span>
              <h3 className="font-serif text-base text-white font-medium mb-1">Bespoke Capability</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Custom footwear, leather goods, and personalized corporate gifts for executive requirements.
              </p>
            </div>
            <div className="p-6 bg-[#080808] border border-[#1a1a1a]">
              <span className="text-xs font-serif text-[#d6be67] block mb-2">04</span>
              <h3 className="font-serif text-base text-white font-medium mb-1">Global Outlook</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Serving domestic and diaspora customers with international delivery and partnerships.
              </p>
            </div>
          </div>
        </div>

        {/* Made in Nigeria Section (Point 11) */}
        <div id="made-in-nigeria" className="p-10 sm:p-16 bg-[#0a0a0a] border border-[#d6be67]/25 text-center max-w-4xl mx-auto space-y-4">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#d6be67] font-light">
            Origin &amp; Standard
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-light text-white">
            Made in Nigeria. Built for the World.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
            Tesacola is proudly made in Nigeria, with a vision that extends beyond borders. We are building a Nigerian leather brand capable of serving customers, retailers and commercial partners wherever the future takes us.
          </p>
          <div className="pt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#d6be67] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#f4e996] transition-colors"
            >
              <span>Explore Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/business"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/20 text-white text-xs uppercase tracking-widest hover:border-[#d6be67] hover:text-[#d6be67] transition-colors"
            >
              <span>Work With Tesacola</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
