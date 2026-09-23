import React from "react";
import Link from "next/link";
import { Info, ArrowRight, Sparkles } from "lucide-react";

export const metadata = {
  title: "Colour & Material Guide | Tesacola Empire Nigeria",
  description:
    "Explore Tesacola's curated colour families and material categories. Reference palettes for bespoke, commercial, and collection leathercraft.",
};

export default function ColourAndMaterialGuidePage() {
  const colourFamilies = [
    {
      family: "Classic Neutrals",
      description: "Timeless base tones offering architectural versatility and enduring composure.",
      colours: [
        { name: "Black", hex: "#111111", border: true },
        { name: "White", hex: "#fafafa", border: true },
        { name: "Ivory", hex: "#f8f5ea", border: true },
        { name: "Cream", hex: "#f3eedc", border: true },
        { name: "Beige", hex: "#dfd5c2", border: false },
        { name: "Tan", hex: "#c99a68", border: false },
        { name: "Camel", hex: "#b8874f", border: false },
        { name: "Nude", hex: "#d8b79f", border: false },
      ],
    },
    {
      family: "Earth & Leather Tones",
      description: "Warm, rich organic leather tones that develop depth and character through wear.",
      colours: [
        { name: "Cognac", hex: "#9a4b28", border: false },
        { name: "Caramel", hex: "#b46e34", border: false },
        { name: "Chestnut", hex: "#733922", border: false },
        { name: "Saddle Brown", hex: "#5a2d1a", border: false },
        { name: "Chocolate", hex: "#3b1e13", border: false },
        { name: "Dark Brown", hex: "#2b1a13", border: false },
        { name: "Mocha", hex: "#43302b", border: false },
      ],
    },
    {
      family: "Deep Tones",
      description: "Commanding, dignified saturated shades for formal authority and evening elegance.",
      colours: [
        { name: "Burgundy", hex: "#5b1424", border: false },
        { name: "Wine", hex: "#481220", border: false },
        { name: "Oxblood", hex: "#421017", border: false },
        { name: "Navy", hex: "#121e33", border: false },
        { name: "Forest Green", hex: "#1b3322", border: false },
        { name: "Olive", hex: "#43482d", border: false },
      ],
    },
    {
      family: "Refined Accents",
      description: "Subtle metallic lusters and balanced minerals designed for discerning distinction.",
      colours: [
        { name: "Grey", hex: "#7c7c7c", border: false },
        { name: "Charcoal", hex: "#333333", border: false },
        { name: "Silver", hex: "#c0c0c0", border: false },
        { name: "Champagne", hex: "#d6be67", border: false },
        { name: "Gold", hex: "#c49a45", border: false },
      ],
    },
  ];

  const materialCategories = [
    {
      title: "Smooth Leather",
      description: "Selected hides with natural grain definition, supple temper, and refined surface finish.",
    },
    {
      title: "Textured Leather",
      description: "Carefully embossed or natural pebble patterns offering structural durability and tactile depth.",
    },
    {
      title: "Suede",
      description: "Velvety buffed underside with a rich nap, offering softness and relaxed elegance.",
    },
    {
      title: "Nubuck",
      description: "Finely buffed outer grain creating a dense, velvety surface with enduring body.",
    },
    {
      title: "Patent / High-Shine Leather",
      description: "Lustrous high-gloss treatment tailored for formal presence, evening footwear, and occasions.",
    },
    {
      title: "Velvet",
      description: "Plush, light-catching textile woven for celebration footwear, slippers, and special creations.",
    },
    {
      title: "Brocade & Damask / Decorative Textiles",
      description: "Intricately patterned woven fabrics selected for ceremonial statements and bespoke commissions.",
    },
    {
      title: "Other Approved Textiles",
      description: "Carefully tested linens, canvases, and specialty materials used for defined footwear and travel pieces.",
    },
  ];

  return (
    <div className="bg-white text-black min-h-screen pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="max-w-3xl mb-16 pb-10 border-b border-neutral-200">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#ac8d3e] font-semibold block mb-2">
            Material Sourcing &amp; Palettes
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-neutral-900 leading-tight">
            Colour &amp; Material Guide
          </h1>
          <p className="mt-6 text-base sm:text-lg text-neutral-700 font-light leading-relaxed">
            Colour and material are an important part of the Tesacola experience. Our available colours and materials may vary according to the product, current sourcing and the requirements of a custom order.
          </p>
        </div>

        {/* Part 1: Colour Families */}
        <section className="mb-20 space-y-12">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#ac8d3e] font-semibold block mb-1">
              Part 01
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900 font-light">
              Colour Families &amp; Reference Names
            </h2>
            <p className="text-xs text-neutral-500 font-light mt-1">
              Presented as colour families and reference names for design inspiration, subject to sourcing availability.
            </p>
          </div>

          <div className="space-y-10">
            {colourFamilies.map((fam) => (
              <div key={fam.family} className="p-8 bg-[#faf8f5] border border-neutral-200 rounded-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-neutral-200 pb-3">
                  <h3 className="font-serif text-lg font-medium text-neutral-900">{fam.family}</h3>
                  <span className="text-xs text-neutral-500 font-light">{fam.description}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 pt-2">
                  {fam.colours.map((c) => (
                    <div key={c.name} className="flex flex-col items-center text-center space-y-2">
                      <div
                        className={`w-12 h-12 rounded-full shadow-sm ${
                          c.border ? "border border-neutral-300" : ""
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                      <span className="text-xs font-medium text-neutral-800">{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Colour Note (Point 22) */}
          <div className="p-6 bg-amber-50/70 border border-amber-200 text-xs text-neutral-700 leading-relaxed rounded-sm flex items-start gap-3">
            <Info className="w-5 h-5 text-[#ac8d3e] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block font-medium text-neutral-900 mb-1">Colour Note:</strong>
              <p>
                Colours displayed on screen may vary slightly from the actual leather or fabric due to lighting, photography and individual screen settings. Material availability and exact shades may also vary. For custom and commercial orders, final colour and material selection will be confirmed before production.
              </p>
            </div>
          </div>
        </section>

        {/* Part 2: Material Categories */}
        <section className="mb-20 space-y-8">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#ac8d3e] font-semibold block mb-1">
              Part 02
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900 font-light">
              Material Categories
            </h2>
            <p className="text-xs text-neutral-500 font-light mt-1">
              Material availability may vary according to product design, sourcing and custom requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {materialCategories.map((m) => (
              <div key={m.title} className="p-6 bg-[#faf8f5] border border-neutral-200 space-y-2 rounded-sm">
                <h3 className="font-serif text-base font-medium text-neutral-900">{m.title}</h3>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">{m.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Custom / Commercial Enquiry CTA */}
        <section className="p-8 sm:p-12 bg-black text-white border border-[#ac8d3e]/40 rounded-sm space-y-4">
          <div className="flex items-center gap-2 text-[#d6be67]">
            <Sparkles className="w-5 h-5 flex-shrink-0" />
            <span className="text-[11px] uppercase tracking-widest font-medium">Bespoke &amp; Commercial Orders</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-light text-white">
            Need a Specific Leather or Custom Dye?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed max-w-2xl">
            For bespoke pieces, corporate orders, and commercial private-label production, we assist with leather selection, swatches, and physical sample approvals prior to production.
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              href="/custom"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#d6be67] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#f4e996] transition-colors"
            >
              <span>Custom Order Enquiry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/business"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/20 text-white text-xs uppercase tracking-widest hover:border-[#d6be67] hover:text-[#d6be67] transition-colors"
            >
              <span>Commercial Production</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
