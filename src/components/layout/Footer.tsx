"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="bg-black text-white border-t border-[#1f1f1f] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Banner Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#1f1f1f]">
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <Image
                src="/tesacol_logo.png"
                alt="Tesacola Empire"
                width={52}
                height={52}
                className="object-contain filter brightness-110"
              />
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-medium tracking-[0.16em] uppercase">
                  Tesacola
                </span>
                <span className="text-[10px] tracking-[0.28em] text-[#d6be67] uppercase -mt-1 font-light">
                  Empire
                </span>
              </div>
            </div>

            <p className="text-neutral-400 text-sm leading-relaxed max-w-md font-light">
              Premium Nigerian leather craftsmanship and commercial manufacturing. Precision-engineered footwear, executive bags, and bespoke leather goods built for enduring longevity and international command.
            </p>

            <div className="pt-2">
              <span className="inline-block text-xs uppercase tracking-[0.22em] text-[#d6be67] border-b border-[#d6be67]/30 pb-1 font-serif">
                Enjoying Trust & Quality
              </span>
            </div>
          </div>

          {/* Quick Links Hierarchy */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* SHOP */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-white mb-4 border-l-2 border-[#d6be67] pl-2">
                Shop
              </h4>
              <ul className="space-y-2.5 text-xs text-neutral-400 font-light">
                <li><Link href="/shop/men" className="hover:text-[#d6be67] transition-colors">Men&apos;s Footwear</Link></li>
                <li><Link href="/shop/women" className="hover:text-[#d6be67] transition-colors">Women&apos;s Footwear</Link></li>
                <li><Link href="/shop/bags" className="hover:text-[#d6be67] transition-colors">Bags &amp; Briefcases</Link></li>
                <li><Link href="/shop/belts" className="hover:text-[#d6be67] transition-colors">Belts</Link></li>
                <li><Link href="/shop/leather-goods" className="hover:text-[#d6be67] transition-colors">Leather Goods</Link></li>
                <li><Link href="/shop/leather-wear" className="hover:text-[#d6be67] transition-colors">Leather Wear</Link></li>
                <li><Link href="/shop/children" className="hover:text-[#d6be67] transition-colors">Children&apos;s Footwear</Link></li>
              </ul>
            </div>

            {/* COMMERCIAL */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-white mb-4 border-l-2 border-[#d6be67] pl-2">
                Business
              </h4>
              <ul className="space-y-2.5 text-xs text-neutral-400 font-light">
                <li><Link href="/business/retailers" className="hover:text-[#d6be67] transition-colors">Retailers</Link></li>
                <li><Link href="/business/wholesale" className="hover:text-[#d6be67] transition-colors">Wholesale</Link></li>
                <li><Link href="/business/manufacturing" className="hover:text-[#d6be67] transition-colors">Manufacturing</Link></li>
                <li><Link href="/business/private-label" className="hover:text-[#d6be67] transition-colors">Private Label</Link></li>
                <li><Link href="/business/corporate" className="hover:text-[#d6be67] transition-colors">Corporate Gifting</Link></li>
                <li><Link href="/custom" className="hover:text-[#d6be67] transition-colors">Custom &amp; Bespoke</Link></li>
              </ul>
            </div>

            {/* ATELIER & ABOUT */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-white mb-4 border-l-2 border-[#d6be67] pl-2">
                The Empire
              </h4>
              <ul className="space-y-2.5 text-xs text-neutral-400 font-light">
                <li><Link href="/about" className="hover:text-[#d6be67] transition-colors">Who We Are</Link></li>
                <li><Link href="/craft" className="hover:text-[#d6be67] transition-colors">The Craft &amp; Method</Link></li>
                <li><Link href="/collections" className="hover:text-[#d6be67] transition-colors">Curated Collections</Link></li>
                <li><Link href="/journal" className="hover:text-[#d6be67] transition-colors">The Journal</Link></li>
                <li><Link href="/about#made-in-nigeria" className="hover:text-[#d6be67] transition-colors">Made in Nigeria</Link></li>
                <li><Link href="/contact" className="hover:text-[#d6be67] transition-colors">Concierge Contact</Link></li>
              </ul>
            </div>

            {/* CLIENT CARE & LEGAL */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-white mb-4 border-l-2 border-[#d6be67] pl-2">
                Support
              </h4>
              <ul className="space-y-2.5 text-xs text-neutral-400 font-light">
                <li><Link href="/faq" className="hover:text-[#d6be67] transition-colors">Client FAQs</Link></li>
                <li><Link href="/shipping" className="hover:text-[#d6be67] transition-colors">Shipping &amp; Delivery</Link></li>
                <li><Link href="/returns" className="hover:text-[#d6be67] transition-colors">Returns Policy</Link></li>
                <li><Link href="/craft/care" className="hover:text-[#d6be67] transition-colors">Leather Care Guide</Link></li>
                <li><Link href="/privacy" className="hover:text-[#d6be67] transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-[#d6be67] transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Core Brand Idea */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p className="font-serif tracking-widest text-[#d6be67]/80 uppercase text-[11px]">
            &ldquo;Tesacola is building its own world.&rdquo;
          </p>
          <div className="flex items-center space-x-6 text-[11px]">
            <span>&copy; {new Date().getFullYear()} Tesacola Empire. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
