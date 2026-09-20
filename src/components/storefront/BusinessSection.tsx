import React from "react";
import Link from "next/link";
import { Building2, Factory, Globe2, Briefcase, Sparkles, ArrowRight } from "lucide-react";

export function BusinessSection() {
  const pathways = [
    {
      icon: Factory,
      title: "Commercial Manufacturing",
      desc: "High-capacity production lines for boutique brands, institutional footwear, and corporate leather collections.",
      href: "/business/manufacturing",
    },
    {
      icon: Sparkles,
      title: "Private-Label Lines",
      desc: "White-label design, custom embossing, and specialized hardware for African and diaspora fashion labels.",
      href: "/business/private-label",
    },
    {
      icon: Briefcase,
      title: "Corporate Bespoke",
      desc: "Executive gifting, customized portfolios, brass-accented desk accessories, and corporate awards.",
      href: "/business/corporate",
    },
    {
      icon: Globe2,
      title: "Wholesale & Export",
      desc: "Dedicated tiered pricing, consolidated logistics, and export documentation for international retailers.",
      href: "/business/wholesale",
    },
  ];

  return (
    <section className="bg-black text-white py-24 border-t border-[#1f1f1f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#d6be67] font-light block mb-2">
            Commercial Partnerships
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white leading-tight">
            Work With Tesacola
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
            We partner with discerning retail stores, multinational enterprises, and international fashion houses seeking dependable Nigerian manufacturing that meets global specifications.
          </p>
        </div>

        {/* 4 Commercial Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pathways.map((path) => {
            const Icon = path.icon;
            return (
              <div
                key={path.title}
                className="p-8 bg-[#0d0d0d] border border-[#1f1f1f] hover:border-[#d6be67]/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-black border border-[#262626] flex items-center justify-center text-[#d6be67] mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-white mb-2">
                    {path.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">
                    {path.desc}
                  </p>
                </div>
                <Link
                  href={path.href}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#d6be67] hover:underline font-light"
                >
                  <span>Inquire Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Action Banner */}
        <div className="mt-12 p-8 sm:p-12 bg-gradient-to-r from-[#121212] via-[#0d0d0d] to-black border border-[#d6be67]/25 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-serif text-xl sm:text-2xl text-white font-light">
              Ready to discuss a production run or private label partnership?
            </h3>
            <p className="text-xs text-neutral-400 max-w-xl">
              Our commercial division provides technical evaluations, sample prototyping, and scalable schedules.
            </p>
          </div>
          <Link
            href="/business"
            className="px-8 py-3.5 bg-[#d6be67] hover:bg-[#f4e996] text-black font-semibold text-xs uppercase tracking-widest transition-all duration-200 shadow-lg whitespace-nowrap"
          >
            Start Commercial Dialogue
          </Link>
        </div>
      </div>
    </section>
  );
}
