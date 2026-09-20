import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Hammer, Layers, Scissors, Sparkles } from "lucide-react";

export function CraftSection() {
  const steps = [
    {
      icon: Layers,
      number: "01",
      title: "Raw Skin Selection",
      description: "Each hide is hand-inspected for grain density, tensile balance, and organic surface uniformity.",
    },
    {
      icon: Scissors,
      number: "02",
      title: "Precision Pattern Clicking",
      description: "Trained clickers hand-cut individual pieces along the natural stretch lines of the leather.",
    },
    {
      icon: Hammer,
      number: "03",
      title: "Ergonomic Lasting & Welting",
      description: "Pulled over anatomical wooden lasts to lock in foot support and enduring structural form.",
    },
    {
      icon: Sparkles,
      number: "04",
      title: "Hand-Burnishing & Dressing",
      description: "Natural beeswax and heated irons seal edges with mirror-buffed champagne luster.",
    },
  ];

  return (
    <section className="bg-[#f7f4ea] text-black py-24 border-y border-[#e5e0d3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Heading Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-black/10 gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#ac8d3e] font-semibold block mb-2">
              The Architecture of Making
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-neutral-900 max-w-xl leading-tight">
              Quiet Confidence Born From Precision
            </h2>
          </div>
          <Link
            href="/craft"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-black hover:text-[#ac8d3e] transition-colors group"
          >
            <span>Explore The Craftsmanship</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4-Column Craft Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white/80 p-8 border border-[#e5e0d3] hover:border-[#ac8d3e]/50 transition-all duration-300 shadow-sm"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif text-2xl text-[#ac8d3e] font-light">
                    {step.number}
                  </span>
                  <Icon className="w-5 h-5 text-neutral-700" />
                </div>
                <h3 className="font-serif text-lg font-medium text-black mb-3">
                  {step.title}
                </h3>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Editorial Showcase Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-[16/10] bg-neutral-200 overflow-hidden border border-[#e5e0d3]">
            <Image
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80"
              alt="Leather workshop tools and edge burnishing"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6 md:pl-6">
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-neutral-900 leading-snug">
              Every curve honors the material. Every stitch guarantees the promise.
            </h3>
            <p className="text-sm text-neutral-700 leading-relaxed font-light">
              Tesacola rejects the shortcuts of mass disposable manufacturing. We believe luxury in Nigeria should mean heavy-gauge hardware, dense grain hides, and construction methods that allow shoes and leather goods to be resoled, reconditioned, and handed down.
            </p>
            <div>
              <Link
                href="/craft/materials"
                className="inline-block px-6 py-3 bg-black text-white hover:bg-neutral-800 text-xs uppercase tracking-widest transition-colors font-medium"
              >
                Discover Our Materials
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
