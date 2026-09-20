"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, ProductVariant } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import {
  ShieldCheck,
  Truck,
  Clock,
  ChevronDown,
  Check,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

export function ProductDetailClient({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants?.[0]
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "care" | "shipping">("details");

  const images = product.images && product.images.length > 0
    ? product.images
    : [
        {
          id: "default-img",
          productId: product.id,
          url: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1000&q=80",
          altText: product.name,
          isMain: true,
          sortOrder: 1,
        },
      ];

  const currentPrice = product.price + (selectedVariant?.priceAdjustment || 0);

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
      {/* Left Column: Image Gallery Stage */}
      <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[600px] scrollbar-none">
            {images.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative w-20 h-24 flex-shrink-0 bg-[#141414] border transition-all ${
                  selectedImageIndex === idx
                    ? "border-[#d6be67] opacity-100 ring-1 ring-[#d6be67]"
                    : "border-[#262626] opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.altText || product.name}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Main Stage View */}
        <div className="relative aspect-[4/5] flex-1 bg-[#121212] border border-[#1f1f1f] overflow-hidden group">
          <Image
            src={images[selectedImageIndex]?.url || images[0].url}
            alt={images[selectedImageIndex]?.altText || product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 border border-white/10 text-[10px] uppercase tracking-widest text-[#d6be67]">
            {product.status === "MADE_TO_ORDER"
              ? "Bespoke / Made To Order"
              : product.status === "IN_STOCK"
              ? "In Stock / Ready Dispatch"
              : "Pre-Order"}
          </div>
        </div>
      </div>

      {/* Right Column: Product Meta, Variants, & Order Actions */}
      <div className="lg:col-span-5 flex flex-col justify-between">
        <div className="space-y-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#d6be67] font-light block mb-2">
              {product.category?.name || "Tesacola Atelier"} • {product.sku}
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-light text-white leading-tight">
              {product.name}
            </h1>
            <p className="mt-4 text-2xl font-serif text-[#d6be67] font-medium tracking-wide">
              {formatCurrency(currentPrice, product.currency)}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Sizing / Variant Selector */}
          {product.variants && product.variants.length > 0 && (
            <div className="pt-4 border-t border-[#1f1f1f]">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs uppercase tracking-wider text-neutral-300">
                  Select Specification / Size
                </span>
                <span className="text-[11px] text-neutral-500 underline cursor-pointer hover:text-[#d6be67]">
                  Size Guide
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant?.id === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`py-3 px-2 text-xs font-medium border transition-all text-center flex flex-col items-center justify-center ${
                        isSelected
                          ? "bg-[#d6be67] text-black border-[#d6be67] font-semibold shadow-md"
                          : "bg-[#0d0d0d] text-neutral-300 border-[#262626] hover:border-neutral-500"
                      }`}
                    >
                      <span>{v.size || v.name}</span>
                      {v.stockQuantity <= 3 && v.stockQuantity > 0 && (
                        <span className="text-[9px] text-amber-500 font-light">Only {v.stockQuantity} left</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add to Cart CTA */}
          <div className="space-y-3 pt-6 border-t border-[#1f1f1f]">
            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-[#d6be67] hover:bg-[#f4e996] text-black font-semibold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-xl flex items-center justify-center gap-3"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Shopping Bag</span>
            </button>

            <Link
              href={`/custom?product=${encodeURIComponent(product.name)}`}
              className="w-full py-3.5 border border-white/20 hover:border-[#d6be67] hover:text-[#d6be67] text-white text-xs uppercase tracking-widest text-center block transition-colors"
            >
              Request Custom Leather / Colour
            </Link>
          </div>

          {/* Production vs Courier Time Breakdown (Section 26 & 41) */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-[#0d0d0d] border border-[#1f1f1f] text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[#d6be67] font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>Production Time</span>
              </div>
              <p className="text-neutral-400 font-light text-[11px] leading-relaxed">
                {product.productionTime || "48 hours workshop dispatch for in-stock orders."}
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-neutral-300 font-medium">
                <Truck className="w-3.5 h-3.5" />
                <span>Courier / Transit Time</span>
              </div>
              <p className="text-neutral-400 font-light text-[11px] leading-relaxed">
                {product.deliveryInfo || "2–4 working days nationwide via insured logistics."}
              </p>
            </div>
          </div>

          {/* Editorial Specs Accordion Tabs */}
          <div className="pt-6 border-t border-[#1f1f1f]">
            <div className="flex border-b border-[#262626]">
              <button
                onClick={() => setActiveTab("details")}
                className={`py-2 px-4 text-xs uppercase tracking-wider transition-colors border-b-2 ${
                  activeTab === "details"
                    ? "border-[#d6be67] text-[#d6be67] font-medium"
                    : "border-transparent text-neutral-400 hover:text-white"
                }`}
              >
                Construction &amp; Material
              </button>
              <button
                onClick={() => setActiveTab("care")}
                className={`py-2 px-4 text-xs uppercase tracking-wider transition-colors border-b-2 ${
                  activeTab === "care"
                    ? "border-[#d6be67] text-[#d6be67] font-medium"
                    : "border-transparent text-neutral-400 hover:text-white"
                }`}
              >
                Leather Care
              </button>
              <button
                onClick={() => setActiveTab("shipping")}
                className={`py-2 px-4 text-xs uppercase tracking-wider transition-colors border-b-2 ${
                  activeTab === "shipping"
                    ? "border-[#d6be67] text-[#d6be67] font-medium"
                    : "border-transparent text-neutral-400 hover:text-white"
                }`}
              >
                Delivery &amp; Returns
              </button>
            </div>

            <div className="py-4 text-xs text-neutral-300 font-light leading-relaxed space-y-3">
              {activeTab === "details" && (
                <>
                  <p>{product.fullDescription}</p>
                  {product.material && (
                    <p><strong className="text-white">Material:</strong> {product.material}</p>
                  )}
                  {product.construction && (
                    <p><strong className="text-white">Construction:</strong> {product.construction}</p>
                  )}
                  {product.colour && (
                    <p><strong className="text-white">Colour:</strong> {product.colour}</p>
                  )}
                </>
              )}

              {activeTab === "care" && (
                <p>
                  {product.careInstructions ||
                    "Store with aromatic cedar shoe trees between wearings to preserve lasting contours and absorb moisture. Condition with a neutral beeswax balm once a month to keep the calfskin hydrated."}
                </p>
              )}

              {activeTab === "shipping" && (
                <div className="space-y-2">
                  <p>
                    All items are delivered in signature Tesacola cotton dust bags and rigid presentation boxes.
                  </p>
                  <p>
                    <strong>Exchange Policy:</strong> Unworn footwear and leather goods in original condition may be exchanged for alternative sizing within 7 days of verified delivery.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
