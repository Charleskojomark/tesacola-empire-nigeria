"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, HelpCircle, Ruler, Info } from "lucide-react";

export default function FitGuidePage() {
  const [unit, setUnit] = useState<"cm" | "mm">("cm");

  const sizeChart = [
    { eu: "39", uk: "5.5", usM: "6.5", usW: "8.0", cm: "24.5", mm: "245" },
    { eu: "40", uk: "6.5", usM: "7.5", usW: "9.0", cm: "25.0", mm: "250" },
    { eu: "41", uk: "7.0", usM: "8.0", usW: "9.5", cm: "25.5", mm: "255" },
    { eu: "42", uk: "8.0", usM: "9.0", usW: "10.5", cm: "26.5", mm: "265" },
    { eu: "43", uk: "9.0", usM: "10.0", usW: "11.5", cm: "27.5", mm: "275" },
    { eu: "44", uk: "9.5", usM: "10.5", usW: "12.0", cm: "28.0", mm: "280" },
    { eu: "45", uk: "10.5", usM: "11.5", usW: "13.0", cm: "29.0", mm: "290" },
    { eu: "46", uk: "11.5", usM: "12.5", usW: "14.0", cm: "30.0", mm: "300" },
    { eu: "47", uk: "12.5", usM: "13.5", usW: "15.0", cm: "30.5", mm: "305" },
  ];

  return (
    <div className="bg-white text-black min-h-screen pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="max-w-3xl mb-16 pb-10 border-b border-neutral-200">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#ac8d3e] font-semibold block mb-2">
            Fitting &amp; Sizing Architecture
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-neutral-900 leading-tight">
            Find Your Fit
          </h1>
          <p className="mt-6 text-base sm:text-lg text-neutral-700 font-light leading-relaxed">
            The right fit begins with more than your shoe size. Foot length, width, shape and volume can all influence how a shoe feels. Use this guide to understand your measurements before ordering.
          </p>
        </div>

        <div className="space-y-20">
          {/* 01 — KNOW YOUR SIZE */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-serif text-2xl text-[#ac8d3e] font-light">01</span>
              <h2 className="font-serif text-2xl text-neutral-900 font-medium">
                Know Your Size
              </h2>
            </div>
            <p className="text-sm text-neutral-600 font-light leading-relaxed max-w-2xl">
              Your usual shoe size is a useful starting point, but sizing can vary between footwear styles and constructions. Always refer to the size information provided for the specific Tesacola product.
            </p>

            {/* Size Table Controls & Table */}
            <div className="border border-neutral-200 bg-[#faf8f5] p-6 rounded-sm space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-neutral-200">
                <span className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
                  Standard Conversion Reference
                </span>
                <div className="flex items-center gap-1 text-xs">
                  <span className="text-neutral-500 mr-1">Unit:</span>
                  <button
                    onClick={() => setUnit("cm")}
                    className={`px-2.5 py-1 text-xs transition-colors ${
                      unit === "cm" ? "bg-black text-white" : "bg-neutral-200 text-neutral-700"
                    }`}
                  >
                    CM
                  </button>
                  <button
                    onClick={() => setUnit("mm")}
                    className={`px-2.5 py-1 text-xs transition-colors ${
                      unit === "mm" ? "bg-black text-white" : "bg-neutral-200 text-neutral-700"
                    }`}
                  >
                    MM
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-neutral-300 text-neutral-500 uppercase tracking-wider text-[11px]">
                      <th className="py-2.5 px-3">EU</th>
                      <th className="py-2.5 px-3">UK</th>
                      <th className="py-2.5 px-3">US Men</th>
                      <th className="py-2.5 px-3">US Women</th>
                      <th className="py-2.5 px-3 font-semibold text-black">
                        Foot Length ({unit.toUpperCase()})
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {sizeChart.map((row) => (
                      <tr key={row.eu} className="hover:bg-neutral-100/80 transition-colors">
                        <td className="py-2.5 px-3 font-medium text-black">{row.eu}</td>
                        <td className="py-2.5 px-3 text-neutral-600">{row.uk}</td>
                        <td className="py-2.5 px-3 text-neutral-600">{row.usM}</td>
                        <td className="py-2.5 px-3 text-neutral-600">{row.usW}</td>
                        <td className="py-2.5 px-3 font-medium text-[#ac8d3e]">
                          {unit === "cm" ? row.cm : row.mm} {unit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 02 — MEASURE YOUR FOOT */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-serif text-2xl text-[#ac8d3e] font-light">02</span>
              <h2 className="font-serif text-2xl text-neutral-900 font-medium">
                Measure Your Foot
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="space-y-4 text-sm text-neutral-700 font-light leading-relaxed">
                <div className="p-4 bg-neutral-50 border-l-2 border-[#ac8d3e] space-y-2">
                  <p>
                    <strong>Length:</strong> Place your foot on a sheet of paper with your heel lightly against a wall. Mark the point at the end of your longest toe and measure from the wall/heel point to the longest-toe mark.
                  </p>
                </div>
                <div className="p-4 bg-neutral-50 border-l-2 border-[#ac8d3e] space-y-2">
                  <p>
                    <strong>Width:</strong> Measure across the widest part of your forefoot to determine your foot width.
                  </p>
                </div>
                <div className="p-4 bg-neutral-50 border-l-2 border-[#ac8d3e] space-y-2">
                  <p>
                    <strong>Two Feet Comparison:</strong> Measure both feet and use the measurements of the larger foot when selecting your size.
                  </p>
                </div>
                <div className="p-4 bg-neutral-50 border-l-2 border-[#ac8d3e] space-y-2">
                  <p>
                    <strong>Socks:</strong> For the most useful measurement, measure while wearing the type of socks you would normally wear with the footwear.
                  </p>
                </div>
              </div>

              {/* Minimal Vector Diagram: Measurement Step */}
              <div className="p-8 bg-[#faf8f5] border border-neutral-200 text-center flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-widest text-[#ac8d3e] font-medium mb-4 block">
                  Measurement Technique
                </span>
                <svg
                  viewBox="0 0 240 160"
                  className="w-full max-w-[260px] h-auto my-2"
                  fill="none"
                  stroke="currentColor"
                >
                  {/* Wall */}
                  <line x1="30" y1="20" x2="30" y2="140" stroke="#1f1f1f" strokeWidth="2.5" />
                  <line x1="20" y1="20" x2="30" y2="20" stroke="#999" strokeWidth="1" />
                  <line x1="20" y1="50" x2="30" y2="50" stroke="#999" strokeWidth="1" />
                  <line x1="20" y1="80" x2="30" y2="80" stroke="#999" strokeWidth="1" />
                  <line x1="20" y1="110" x2="30" y2="110" stroke="#999" strokeWidth="1" />
                  <line x1="20" y1="140" x2="30" y2="140" stroke="#999" strokeWidth="1" />
                  {/* Paper sheet */}
                  <rect x="30" y="30" width="180" height="100" fill="#fff" stroke="#e5e0d3" strokeWidth="1" />
                  {/* Foot Outline */}
                  <path
                    d="M32 80 C32 65, 45 55, 60 55 C80 55, 95 62, 120 62 C150 62, 175 66, 190 75 C198 80, 198 85, 190 90 C175 99, 150 102, 120 102 C95 102, 80 108, 60 108 C45 108, 32 98, 32 80 Z"
                    stroke="#222"
                    strokeWidth="1.75"
                    fill="none"
                  />
                  {/* Dimension line: Heel to Longest Toe */}
                  <line x1="30" y1="145" x2="194" y2="145" stroke="#ac8d3e" strokeWidth="1.5" />
                  <line x1="30" y1="140" x2="30" y2="150" stroke="#ac8d3e" strokeWidth="1.5" />
                  <line x1="194" y1="140" x2="194" y2="150" stroke="#ac8d3e" strokeWidth="1.5" />
                  <text x="112" y="156" fill="#ac8d3e" fontSize="9" textAnchor="middle" fontFamily="sans-serif">
                    Foot Length
                  </text>
                  {/* Width measurement marker */}
                  <line x1="150" y1="62" x2="150" y2="102" stroke="#ac8d3e" strokeWidth="1.25" strokeDasharray="2 2" />
                  <text x="156" y="84" fill="#ac8d3e" fontSize="8" textAnchor="start" fontFamily="sans-serif">
                    Width
                  </text>
                </svg>
                <span className="text-[11px] text-neutral-500 font-light mt-3">
                  Heel lightly against wall • Measure to end of longest toe
                </span>
              </div>
            </div>
          </section>

          {/* 03 — UNDERSTAND YOUR FOOT WIDTH */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-serif text-2xl text-[#ac8d3e] font-light">03</span>
              <h2 className="font-serif text-2xl text-neutral-900 font-medium">
                Understand Your Foot Width
              </h2>
            </div>
            <p className="text-sm text-neutral-700 font-light leading-relaxed max-w-2xl">
              Foot width is separate from shoe length. A correct length can still feel uncomfortable if the footwear is too narrow or too wide for your foot.
            </p>

            {/* 3 Foot Width Illustrations (Point 19) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {/* Narrow */}
              <div className="p-6 bg-[#faf8f5] border border-neutral-200 text-center space-y-3 rounded-sm">
                <span className="font-serif text-sm uppercase tracking-widest text-neutral-900 font-medium">
                  Narrow
                </span>
                <div className="h-40 flex items-center justify-center">
                  <svg viewBox="0 0 100 140" className="w-24 h-auto" fill="none" stroke="currentColor">
                    <path
                      d="M50 125 C38 125, 36 110, 36 95 C36 80, 42 65, 42 45 C42 30, 45 20, 50 20 C55 20, 58 30, 58 45 C58 65, 64 80, 64 95 C64 110, 62 125, 50 125 Z"
                      stroke="#1f1f1f"
                      strokeWidth="1.5"
                    />
                    <line x1="38" y1="52" x2="62" y2="52" stroke="#ac8d3e" strokeWidth="1.5" />
                    <circle cx="38" cy="52" r="1.5" fill="#ac8d3e" />
                    <circle cx="62" cy="52" r="1.5" fill="#ac8d3e" />
                  </svg>
                </div>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  Slender forefoot and narrower ball width. Less volume across the vamp.
                </p>
              </div>

              {/* Standard */}
              <div className="p-6 bg-[#faf8f5] border border-neutral-200 text-center space-y-3 rounded-sm">
                <span className="font-serif text-sm uppercase tracking-widest text-neutral-900 font-medium">
                  Standard
                </span>
                <div className="h-40 flex items-center justify-center">
                  <svg viewBox="0 0 100 140" className="w-24 h-auto" fill="none" stroke="currentColor">
                    <path
                      d="M50 125 C34 125, 30 110, 30 95 C30 78, 38 62, 38 42 C38 28, 44 20, 50 20 C56 20, 62 28, 62 42 C62 62, 70 78, 70 95 C70 110, 66 125, 50 125 Z"
                      stroke="#1f1f1f"
                      strokeWidth="1.5"
                    />
                    <line x1="33" y1="50" x2="67" y2="50" stroke="#ac8d3e" strokeWidth="1.5" />
                    <circle cx="33" cy="50" r="1.5" fill="#ac8d3e" />
                    <circle cx="67" cy="50" r="1.5" fill="#ac8d3e" />
                  </svg>
                </div>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  Proportionate balance between length, forefoot spread, and heel seat.
                </p>
              </div>

              {/* Wide */}
              <div className="p-6 bg-[#faf8f5] border border-neutral-200 text-center space-y-3 rounded-sm">
                <span className="font-serif text-sm uppercase tracking-widest text-neutral-900 font-medium">
                  Wide
                </span>
                <div className="h-40 flex items-center justify-center">
                  <svg viewBox="0 0 100 140" className="w-24 h-auto" fill="none" stroke="currentColor">
                    <path
                      d="M50 125 C30 125, 24 110, 24 95 C24 75, 34 60, 34 40 C34 26, 42 20, 50 20 C58 20, 66 26, 66 40 C66 60, 76 75, 76 95 C76 110, 70 125, 50 125 Z"
                      stroke="#1f1f1f"
                      strokeWidth="1.5"
                    />
                    <line x1="28" y1="48" x2="72" y2="48" stroke="#ac8d3e" strokeWidth="1.5" />
                    <circle cx="28" cy="48" r="1.5" fill="#ac8d3e" />
                    <circle cx="72" cy="48" r="1.5" fill="#ac8d3e" />
                  </svg>
                </div>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  Broader forefoot dimension across metatarsal heads requiring deliberate toe-box room.
                </p>
              </div>
            </div>
          </section>

          {/* 04 — UNDERSTAND YOUR ARCH PROFILE */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-serif text-2xl text-[#ac8d3e] font-light">04</span>
              <h2 className="font-serif text-2xl text-neutral-900 font-medium">
                Understand Your Arch Profile
              </h2>
            </div>
            <p className="text-sm text-neutral-700 font-light leading-relaxed max-w-2xl">
              Your arch profile is another part of your foot’s natural shape. Identifying your arch profile can help you better understand how different footwear may feel on your feet.
            </p>

            {/* 3 Arch Profile Illustrations (Point 19) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {/* Low Arch */}
              <div className="p-6 bg-[#faf8f5] border border-neutral-200 text-center space-y-3 rounded-sm">
                <span className="font-serif text-sm uppercase tracking-widest text-neutral-900 font-medium">
                  Low Arch
                </span>
                <div className="h-36 flex items-center justify-center">
                  <svg viewBox="0 0 160 80" className="w-40 h-auto" fill="none" stroke="currentColor">
                    {/* Ground line */}
                    <line x1="10" y1="70" x2="150" y2="70" stroke="#d5d0c5" strokeWidth="1" />
                    {/* Low arch foot sole contour */}
                    <path
                      d="M20 70 C20 40, 35 30, 50 32 C65 34, 85 40, 110 38 C130 36, 145 50, 145 70 Z"
                      stroke="#1f1f1f"
                      strokeWidth="1.5"
                    />
                    {/* Arch curvature highlight */}
                    <path
                      d="M50 70 Q80 64 115 70"
                      stroke="#ac8d3e"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  Minimal elevation along the medial longitudinal arch, creating broader ground contact.
                </p>
              </div>

              {/* Medium Arch */}
              <div className="p-6 bg-[#faf8f5] border border-neutral-200 text-center space-y-3 rounded-sm">
                <span className="font-serif text-sm uppercase tracking-widest text-neutral-900 font-medium">
                  Medium Arch
                </span>
                <div className="h-36 flex items-center justify-center">
                  <svg viewBox="0 0 160 80" className="w-40 h-auto" fill="none" stroke="currentColor">
                    {/* Ground line */}
                    <line x1="10" y1="70" x2="150" y2="70" stroke="#d5d0c5" strokeWidth="1" />
                    {/* Medium arch foot sole contour */}
                    <path
                      d="M20 70 C20 38, 35 28, 50 30 C65 32, 85 38, 110 36 C130 34, 145 50, 145 70 Z"
                      stroke="#1f1f1f"
                      strokeWidth="1.5"
                    />
                    {/* Arch curvature highlight */}
                    <path
                      d="M50 70 Q80 50 115 70"
                      stroke="#ac8d3e"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  Balanced biomechanical curve supporting natural shock dispersion and anatomical ease.
                </p>
              </div>

              {/* High Arch */}
              <div className="p-6 bg-[#faf8f5] border border-neutral-200 text-center space-y-3 rounded-sm">
                <span className="font-serif text-sm uppercase tracking-widest text-neutral-900 font-medium">
                  High Arch
                </span>
                <div className="h-36 flex items-center justify-center">
                  <svg viewBox="0 0 160 80" className="w-40 h-auto" fill="none" stroke="currentColor">
                    {/* Ground line */}
                    <line x1="10" y1="70" x2="150" y2="70" stroke="#d5d0c5" strokeWidth="1" />
                    {/* High arch foot sole contour */}
                    <path
                      d="M20 70 C20 36, 35 26, 50 28 C65 30, 85 36, 110 34 C130 32, 145 50, 145 70 Z"
                      stroke="#1f1f1f"
                      strokeWidth="1.5"
                    />
                    {/* Arch curvature highlight */}
                    <path
                      d="M50 70 Q80 36 115 70"
                      stroke="#ac8d3e"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  Pronounced elevation through the midfoot arch, concentrating weight at heel and forefoot.
                </p>
              </div>
            </div>
          </section>

          {/* 05 — CONSIDER YOUR INSTEP */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-serif text-2xl text-[#ac8d3e] font-light">05</span>
              <h2 className="font-serif text-2xl text-neutral-900 font-medium">
                Consider Your Instep
              </h2>
            </div>
            <div className="p-6 bg-neutral-50 border border-neutral-200 space-y-2 max-w-2xl">
              <p className="text-sm text-neutral-700 font-light leading-relaxed">
                If footwear frequently feels tight across the top of your foot even when the length is correct, you may have a higher instep. For custom footwear, please mention this when submitting your measurements.
              </p>
            </div>
          </section>

          {/* 06 — NEED HELP? */}
          <section className="p-8 sm:p-12 bg-black text-white border border-[#ac8d3e]/40 rounded-sm space-y-4">
            <div className="flex items-center gap-2 text-[#d6be67]">
              <HelpCircle className="w-5 h-5" />
              <span className="text-[11px] uppercase tracking-widest font-medium">06 — Need Help?</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-white">
              Personalized Fitting Consultation
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed max-w-xl">
              Not sure about your size, width or fit? Contact Tesacola before placing your order and we will guide you through the information required for your footwear.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#d6be67] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#f4e996] transition-colors"
              >
                <span>Contact Tesacola</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/custom"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/20 text-white text-xs uppercase tracking-widest hover:border-[#d6be67] hover:text-[#d6be67] transition-colors"
              >
                <span>Request Custom Sizing</span>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
