import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Scissors, Hammer, Layers, Sparkles, ArrowRight } from "lucide-react";

export const metadata = {
  title: "The Craft & Method | Tesacola Empire Nigeria",
  description:
    "At Tesacola, craftsmanship is the meeting point of good materials, considered design, skilled hands and disciplined finishing.",
};

export default function CraftPage() {
  const craftStages = [
    {
      stage: "01",
      title: "Material Selection",
      icon: Layers,
      description:
        "Every piece begins with careful material selection. We consider the character, strength, texture, colour and intended use of the leather before production begins.",
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80",
    },
    {
      stage: "02",
      title: "Pattern & Cutting",
      icon: Scissors,
      description:
        "Patterns are carefully prepared and individual components are cut with attention to proportion, placement and the natural character of the material.",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80",
    },
    {
      stage: "03",
      title: "Construction & Assembly",
      icon: Hammer,
      description:
        "Each piece is progressively shaped, assembled and refined by skilled hands, with construction methods selected according to the design and intended use of the product.",
      image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1000&q=80",
    },
    {
      stage: "04",
      title: "Finishing",
      icon: Sparkles,
      description:
        "The final character is created through careful edge work, finishing, polishing, detailing and inspection. It is this final discipline that gives a Tesacola piece its finished presence.",
      image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=80",
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="max-w-3xl mb-16 pb-10 border-b border-[#1f1f1f]">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#d6be67] font-light block mb-2">
            The Craft &amp; Method
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
            Considered Design. Disciplined Finishing.
          </h1>
          <blockquote className="mt-6 text-base sm:text-lg text-neutral-300 font-serif italic border-l-2 border-[#d6be67] pl-4 leading-relaxed">
            &ldquo;At Tesacola, craftsmanship is the meeting point of good materials, considered design, skilled hands and disciplined finishing.&rdquo;
          </blockquote>
          <p className="mt-4 text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
            We select leather and other materials according to the character, design and intended use of each piece. Construction methods are chosen according to the design, product category and intended use, ensuring each piece achieves its finished presence.
          </p>
        </div>

        {/* Chronological Craft Stages */}
        <div className="space-y-24">
          {craftStages.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.stage}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                  idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={`lg:col-span-6 space-y-4 ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-3xl text-[#d6be67] font-light">
                      {stage.stage}
                    </span>
                    <Icon className="w-5 h-5 text-neutral-500" />
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-white font-light">
                    {stage.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                <div
                  className={`lg:col-span-6 relative aspect-[16/10] bg-[#121212] border border-[#1f1f1f] overflow-hidden ${
                    idx % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <Image
                    src={stage.image}
                    alt={stage.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Construction & Materials Guidance */}
        <div className="mt-28 p-10 sm:p-16 bg-[#0a0a0a] border border-[#d6be67]/30 text-center max-w-4xl mx-auto space-y-4">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#d6be67] font-light">
            Standards &amp; Intended Use
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-light text-white">
            Construction Built for Purpose
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed">
            Construction methods are selected according to the design, product category and intended use. Where a particular product genuinely permits maintenance, repair or resoling, that is stated specifically for that product.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/colours"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#d6be67] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#f4e996] transition-colors"
            >
              <span>Colour &amp; Material Guide</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/fit-guide"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/20 text-white text-xs uppercase tracking-widest hover:border-[#d6be67] hover:text-[#d6be67] transition-colors"
            >
              <span>Find Your Fit</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
