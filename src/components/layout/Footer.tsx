"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SoundToggle } from "@/components/layout/SoundToggle";

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="bg-black text-white border-t border-[#1f1f1f] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Banner Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#1f1f1f]">
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center">
                <Image
                  src="/tesacol_logo.png"
                  alt="Tesacola Empire Nigeria"
                  width={80}
                  height={80}
                  className="object-contain w-full h-full filter brightness-110 drop-shadow-[0_0_12px_rgba(214,190,103,0.3)]"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-cinzel text-2xl sm:text-3xl font-semibold tracking-[0.22em] uppercase leading-none">
                  Tesacola
                </span>
                <span className="font-cinzel text-xs sm:text-sm tracking-[0.42em] text-[#d6be67] uppercase font-medium mt-1">
                  Empire
                </span>
              </div>
            </div>

            <p className="text-neutral-400 text-sm leading-relaxed max-w-md font-light">
              Premium Nigerian leather craftsmanship, bespoke design and commercial production built with a global outlook. Made in Nigeria. Built for the World.
            </p>

            {/* Atelier Credibility & Contact Info */}
            <div className="space-y-1.5 text-xs text-neutral-400 font-light border-t border-[#1f1f1f] pt-4">
              <p className="text-white font-medium">Workshop &amp; Fitting Atelier:</p>
              <p>Benin City, Edo State, Federal Republic of Nigeria</p>
              <p className="text-neutral-300">
                Concierge Desk:{" "}
                <a href="https://wa.me/2348008372265" target="_blank" rel="noopener noreferrer" className="text-[#d6be67] hover:underline font-mono">
                  +234 800 TESACOLA
                </a>
              </p>
              <p className="text-[11px] text-neutral-500">
                Corporate Affairs Commission Registered &bull; RC: 7389214
              </p>
            </div>

            <div className="pt-2">
              <span className="inline-block text-xs uppercase tracking-[0.22em] text-[#d6be67] border-b border-[#d6be67]/30 pb-1 font-serif">
                Enjoying Trust &amp; Quality
              </span>
            </div>
          </div>

          {/* Quick Links Hierarchy */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* SHOP (Point 29: Consistent Category Names) */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-white mb-4 border-l-2 border-[#d6be67] pl-2">
                Shop
              </h4>
              <ul className="space-y-2.5 text-xs text-neutral-400 font-light">
                <li><Link href="/shop/men" className="hover:text-[#d6be67] transition-colors">Men&apos;s Footwear</Link></li>
                <li><Link href="/shop/women" className="hover:text-[#d6be67] transition-colors">Women&apos;s Footwear</Link></li>
                <li><Link href="/shop/bags" className="hover:text-[#d6be67] transition-colors">Bags &amp; Portfolios</Link></li>
                <li><Link href="/shop/belts" className="hover:text-[#d6be67] transition-colors">Belts</Link></li>
                <li><Link href="/shop/leather-goods" className="hover:text-[#d6be67] transition-colors">Small Leather Goods</Link></li>
                <li><Link href="/shop/leather-wear" className="hover:text-[#d6be67] transition-colors">Leather Wear</Link></li>
                <li><Link href="/shop/children" className="hover:text-[#d6be67] transition-colors">Children&apos;s Footwear</Link></li>
              </ul>
            </div>

            {/* COMMERCIAL (Point 8) */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-white mb-4 border-l-2 border-[#d6be67] pl-2">
                Business
              </h4>
              <ul className="space-y-2.5 text-xs text-neutral-400 font-light">
                <li><Link href="/business?type=MANUFACTURING" className="hover:text-[#d6be67] transition-colors">Commercial Production</Link></li>
                <li><Link href="/business?type=PRIVATE_LABEL" className="hover:text-[#d6be67] transition-colors">Private Label</Link></li>
                <li><Link href="/business?type=WHOLESALER" className="hover:text-[#d6be67] transition-colors">Wholesale &amp; Stockists</Link></li>
                <li><Link href="/business?type=CORPORATE" className="hover:text-[#d6be67] transition-colors">Corporate &amp; Bespoke</Link></li>
                <li><Link href="/business?type=INTERNATIONAL" className="hover:text-[#d6be67] transition-colors">International &amp; Diaspora</Link></li>
                <li><Link href="/custom" className="hover:text-[#d6be67] transition-colors">Custom Enquiry</Link></li>
              </ul>
            </div>

            {/* ATELIER & ABOUT (Point 10, 11, 12) */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-white mb-4 border-l-2 border-[#d6be67] pl-2">
                The Empire
              </h4>
              <ul className="space-y-2.5 text-xs text-neutral-400 font-light">
                <li><Link href="/about" className="hover:text-[#d6be67] transition-colors">Building Our Own World</Link></li>
                <li><Link href="/craft" className="hover:text-[#d6be67] transition-colors">The Craft &amp; Method</Link></li>
                <li><Link href="/collections" className="hover:text-[#d6be67] transition-colors">The Collections</Link></li>
                <li><Link href="/journal" className="hover:text-[#d6be67] transition-colors">The Journal</Link></li>
                <li><Link href="/about#made-in-nigeria" className="hover:text-[#d6be67] transition-colors">Made in Nigeria</Link></li>
                <li><Link href="/contact" className="hover:text-[#d6be67] transition-colors">Concierge Contact</Link></li>
              </ul>
            </div>

            {/* SUPPORT ARCHITECTURE (Point 17 & 31) */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-white mb-4 border-l-2 border-[#d6be67] pl-2">
                Support
              </h4>
              <ul className="space-y-2.5 text-xs text-neutral-400 font-light">
                <li><Link href="/fit-guide" className="hover:text-[#d6be67] transition-colors font-medium text-neutral-300">Find Your Fit</Link></li>
                <li><Link href="/care" className="hover:text-[#d6be67] transition-colors font-medium text-neutral-300">Shoe &amp; Leather Care</Link></li>
                <li><Link href="/colours" className="hover:text-[#d6be67] transition-colors font-medium text-neutral-300">Colour &amp; Material Guide</Link></li>
                <li><Link href="/faq" className="hover:text-[#d6be67] transition-colors">FAQs</Link></li>
                <li><Link href="/shipping" className="hover:text-[#d6be67] transition-colors">Shipping &amp; Delivery</Link></li>
                <li><Link href="/returns" className="hover:text-[#d6be67] transition-colors">Returns &amp; Adjustments</Link></li>
                <li><Link href="/privacy" className="hover:text-[#d6be67] transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-[#d6be67] transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Core Brand Idea & Future Sonic Control */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p className="font-serif tracking-widest text-[#d6be67] uppercase text-[11px]">
            &ldquo;Tesacola is building its own world.&rdquo;
          </p>

          <div className="flex items-center space-x-6 text-[11px]">
            <SoundToggle />
            <span>&copy; {new Date().getFullYear()} Tesacola Empire Nigeria. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
