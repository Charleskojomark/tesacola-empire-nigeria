import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-black overflow-hidden pt-24 pb-16">
      {/* Background Ambience / Subtle Vignette */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-radial from-[#d6be67]/10 via-transparent to-black/90 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=2000&q=85"
          alt="Tesacola Artisanal Shoemaking Workshop"
          fill
          priority
          className="object-cover object-center filter brightness-40 contrast-125 scale-105 animate-in fade-in duration-1000"
        />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Subtle Sign-off Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d6be67]/30 bg-black/60 backdrop-blur-md mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
          <ShieldCheck className="w-3.5 h-3.5 text-[#d6be67]" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#d6be67] font-light">
            Enjoying Trust &amp; Quality
          </span>
        </div>

        {/* Master Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.08] max-w-4xl">
          PREMIUM NIGERIAN LEATHER CRAFTSMANSHIP
        </h1>

        {/* Subtitle / Core Supporting Statement (Point 2) */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-neutral-300 font-light max-w-2xl leading-relaxed">
          Premium Nigerian leather craftsmanship, bespoke design and commercial production built with a global outlook.
        </p>

        <p className="mt-3 text-xs sm:text-sm text-[#d6be67] uppercase tracking-[0.25em] font-serif">
          &ldquo;Tesacola is building its own world.&rdquo;
        </p>

        {/* Dual Customer Journey CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* Retail Journey */}
          <Link
            href="/shop"
            className="w-full sm:w-auto px-8 py-4 bg-[#d6be67] hover:bg-[#f4e996] text-black font-semibold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group"
          >
            <span>Shop Tesacola</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Business Journey */}
          <Link
            href="/business"
            className="w-full sm:w-auto px-8 py-4 border border-white/20 hover:border-[#d6be67] hover:text-[#d6be67] text-white font-medium text-xs uppercase tracking-[0.2em] transition-all duration-300 bg-black/40 backdrop-blur-md flex items-center justify-center"
          >
            <span>Work With Tesacola</span>
          </Link>
        </div>

        {/* Brand Markers (Point 3) */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 border-t border-white/10 pt-8 w-full max-w-4xl text-center">
          <div className="space-y-1">
            <span className="block font-serif text-base sm:text-lg text-white font-normal">Premium Leather</span>
            <span className="text-[11px] tracking-wider text-neutral-400 uppercase">Selection</span>
          </div>
          <div className="space-y-1">
            <span className="block font-serif text-base sm:text-lg text-white font-normal">Handcrafted</span>
            <span className="text-[11px] tracking-wider text-neutral-400 uppercase">Finishing</span>
          </div>
          <div className="space-y-1">
            <span className="block font-serif text-base sm:text-lg text-white font-normal">Made in Nigeria</span>
            <span className="text-[11px] tracking-wider text-neutral-400 uppercase">Built for the World</span>
          </div>
          <div className="space-y-1">
            <span className="block font-serif text-base sm:text-lg text-white font-normal">Bespoke &amp; Commercial</span>
            <span className="text-[11px] tracking-wider text-neutral-400 uppercase">Orders</span>
          </div>
        </div>
      </div>
    </section>
  );
}
