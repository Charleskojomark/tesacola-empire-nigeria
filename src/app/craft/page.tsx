import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Scissors, Hammer, Layers, Sparkles, ShieldCheck, Check } from "lucide-react";

export const metadata = {
  title: "The Craft & Method | Tesacola Empire Nigeria",
  description:
    "An editorial breakdown of the artisanal and industrial leather shoemaking processes at Tesacola: raw material grading, anatomical lasting, Blake-welting, and edge burnishing.",
};

export default function CraftPage() {
  const craftStages = [
    {
      stage: "01",
      title: "Material Selection & Grain Density",
      description:
        "The life of any leather piece is decided before the knife touches the skin. We select vegetable-tanned bovine and calfskin hides known for dense fiber alignment and natural oils. Imperfect hides with excessive scarring or loose flank fibers are rejected immediately.",
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80",
    },
    {
      stage: "02",
      title: "Hand Clicking & Anatomical Direction",
      description:
        "Clicking is the art of cutting the pattern pieces. Our master clickers position paper patterns relative to the spine line of the hide. The vamp—the part over your toes—must stretch widthwise for comfort, but never lengthwise, preventing shoe deformation over years of wear.",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80",
    },
    {
      stage: "03",
      title: "Ergonomic Lasting & Welting",
      description:
        "The upper leather is dampened with steam and pulled tightly across wooden and composite ergonomic lasts shaped to human foot anatomy. It remains on the last for up to 72 hours to achieve permanent memory before being Blake-stitched or Goodyear-welted to heavy leather insoles.",
      image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1000&q=80",
    },
    {
      stage: "04",
      title: "Beeswax Burnishing & Finishing",
      description:
        "Raw leather edges are beveled with curved scrapers and sealed with layers of heated organic beeswax and vegetable dyes. Hand-buffed with friction irons to generate an impermeable glass-smooth seal that prevents moisture infiltration.",
      image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=80",
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="max-w-3xl mb-16 pb-10 border-b border-[#1f1f1f]">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#d6be67] font-light block mb-2">
            The Architecture of Shoemaking
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
            The Craft &amp; Method
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
            At Tesacola, luxury is not decorative flourish. It is the disciplined outcome of exact measurements, anatomical lasting, dense natural leathers, and hands that understand how materials behave under tension over decades.
          </p>
        </div>

        {/* Chronological Craft Stages */}
        <div className="space-y-24">
          {craftStages.map((stage, idx) => (
            <div
              key={stage.stage}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={`lg:col-span-6 space-y-4 ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                <span className="font-serif text-3xl text-[#d6be67] font-light block">
                  Stage {stage.stage}
                </span>
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
          ))}
        </div>

        {/* The Guarantee Statement */}
        <div className="mt-28 p-10 sm:p-16 bg-[#0a0a0a] border border-[#d6be67]/30 text-center max-w-4xl mx-auto space-y-4">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#d6be67] font-light">
            Enjoying Trust &amp; Quality
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-light text-white">
            Built to Be Re-Soled. Built to Outlast.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed">
            Because our shoes utilize true stitched construction rather than cheap disposable adhesives, your Tesacola footwear can be rebuilt and resoled by any master cobbler worldwide, maturing with a rich personal patina.
          </p>
          <div className="pt-4">
            <Link
              href="/shop"
              className="inline-block px-8 py-3.5 bg-[#d6be67] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#f4e996] transition-colors"
            >
              Explore Ready Creations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
