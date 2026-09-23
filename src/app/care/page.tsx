import React from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, Sun, Wind, AlertCircle, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Shoe & Leather Care Guide | Care for Your Tesacola",
  description:
    "Good care helps preserve the appearance, comfort and character of your footwear and leather pieces. Comprehensive care guidance for smooth leather, suede, patent, velvet, and decorative textiles.",
};

export default function CareGuidePage() {
  const materialCare = [
    {
      title: "Smooth Leather",
      intro:
        "Remove surface dust with a soft, dry or slightly damp cloth. Allow the leather to dry naturally away from direct heat. Use a suitable leather conditioner or cream sparingly when needed, and test any care product on a small, less visible area first.",
      caution: "Avoid soaking the leather or exposing it to prolonged direct heat.",
    },
    {
      title: "Patent / High-Shine Leather",
      intro:
        "Wipe gently with a soft, clean cloth to remove dust and marks. Avoid abrasive brushes, harsh solvents and unsuitable leather creams, as these may affect the high-shine finish.",
      caution: "Store away from excessive heat and direct sunlight.",
    },
    {
      title: "Suede",
      intro:
        "Use a clean suede brush to gently lift surface dirt and restore the nap. Do not saturate suede with water. For stains or difficult marks, use a care product specifically designed for suede and test it on a discreet area first.",
      caution: "Allow wet suede to dry naturally. Do not place it directly against a heater or other strong heat source.",
    },
    {
      title: "Nubuck",
      intro:
        "Use a nubuck-specific brush or cleaning product to remove surface dirt and maintain the texture. Avoid ordinary leather polishes and heavy creams unless the product specifically states that they are suitable for nubuck.",
      caution: "Avoid heavy waxes and greases that can flatten the delicate velvety texture.",
    },
    {
      title: "Velvet",
      intro:
        "Keep velvet away from unnecessary moisture. Remove dust gently with a soft brush or appropriate fabric-care method, following the care instructions for the specific velvet used.",
      caution: "Do not aggressively rub the surface, as this can affect the pile and appearance.",
    },
    {
      title: "Brocade & Damask / Decorative Textiles",
      intro:
        "Handle decorative textiles gently and keep them away from unnecessary moisture, abrasive surfaces and harsh cleaning agents. For marks or stains, use a fabric-care method appropriate to the specific textile rather than applying leather products.",
      caution:
        "Because decorative textiles can differ significantly in composition and finish, contact Tesacola for guidance before using a cleaning product on a special or customised piece.",
    },
    {
      title: "Hair-On / Hair-Coated Leather or Skins",
      intro:
        "Hair-on and textured animal-derived materials require material-specific care. Gently remove surface dust in the direction of the hair using a soft brush. Avoid excessive moisture, heat, aggressive brushing and unsuitable cleaning products.",
      caution: "For specialised, delicate or unfamiliar materials, please contact Tesacola before applying any treatment.",
    },
  ];

  const generalCare = [
    {
      phase: "Before Wearing",
      instruction:
        "Ensure the footwear is properly opened before putting it on. Use a shoehorn where appropriate rather than forcing the heel down.",
    },
    {
      phase: "After Wearing",
      instruction:
        "Allow footwear to air naturally after use. Remove surface dust and store it in a clean, dry and ventilated environment.",
    },
    {
      phase: "Storage",
      instruction:
        "Store footwear away from prolonged direct sunlight, excessive humidity and strong heat. Avoid storing leather pieces in damp or poorly ventilated spaces.",
    },
    {
      phase: "Socks",
      instruction:
        "Where appropriate, wear clean socks that allow the footwear to remain comfortable and help reduce direct contact between the foot and the interior of the shoe.",
    },
    {
      phase: "Laces",
      instruction:
        "Loosen the laces before removing lace-up footwear. Avoid forcing the foot in or pulling the shoe off while the laces remain tightly secured.",
    },
    {
      phase: "Lacing Your Tesacola",
      instruction:
        "Centre the tongue beneath the eyelets and adjust the laces evenly from the lower eyelets upward. Secure the laces so the shoe feels comfortably held without excessive pressure across the foot.",
    },
  ];

  return (
    <div className="bg-white text-black min-h-screen pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="max-w-3xl mb-16 pb-10 border-b border-neutral-200">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#ac8d3e] font-semibold block mb-2">
            Preservation &amp; Maintenance
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-neutral-900 leading-tight">
            Care for Your Tesacola
          </h1>
          <p className="mt-6 text-base sm:text-lg text-neutral-700 font-light leading-relaxed">
            Good care helps preserve the appearance, comfort and character of your footwear and leather pieces. Different materials require different care, so always identify the material before applying any cleaning or conditioning product.
          </p>
        </div>

        {/* Material-Specific Care Protocol */}
        <section className="mb-20">
          <div className="mb-8">
            <span className="text-[10px] uppercase tracking-widest text-[#ac8d3e] font-semibold block mb-1">
              Part 01
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900 font-light">
              Material-Specific Care Protocols
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {materialCare.map((item) => (
              <div
                key={item.title}
                className="p-8 bg-[#faf8f5] border border-neutral-200 space-y-4 rounded-sm hover:border-[#ac8d3e]/50 transition-colors"
              >
                <h3 className="font-serif text-lg font-medium text-neutral-900 pb-2 border-b border-neutral-200">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-700 font-light leading-relaxed">
                  {item.intro}
                </p>
                {item.caution && (
                  <p className="text-xs text-neutral-500 italic border-l-2 border-[#ac8d3e] pl-3 leading-relaxed">
                    {item.caution}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* General Care Protocol */}
        <section className="mb-20">
          <div className="mb-8">
            <span className="text-[10px] uppercase tracking-widest text-[#ac8d3e] font-semibold block mb-1">
              Part 02
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900 font-light">
              General Care &amp; Daily Handling
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {generalCare.map((g) => (
              <div
                key={g.phase}
                className="p-6 bg-[#faf8f5] border border-neutral-200 space-y-2 rounded-sm"
              >
                <span className="text-[10px] uppercase tracking-widest text-[#ac8d3e] font-semibold block">
                  {g.phase}
                </span>
                <p className="text-xs text-neutral-700 font-light leading-relaxed">
                  {g.instruction}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Care Disclaimer & Contact Support */}
        <section className="p-8 sm:p-12 bg-black text-white border border-[#ac8d3e]/40 rounded-sm space-y-4">
          <div className="flex items-center gap-2 text-[#d6be67]">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-[11px] uppercase tracking-widest font-medium">Care Disclaimer</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-light text-white">
            When in Doubt, Seek Atelier Guidance
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed max-w-2xl">
            Care recommendations may vary according to the exact material, finish and construction of a product. Always check the material information supplied with your Tesacola piece before applying a cleaning or conditioning product. When in doubt, please contact Tesacola before treating the item.
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#d6be67] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#f4e996] transition-colors"
            >
              <span>Contact Atelier Support</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/colours"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/20 text-white text-xs uppercase tracking-widest hover:border-[#d6be67] hover:text-[#d6be67] transition-colors"
            >
              <span>Colour &amp; Material Guide</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
