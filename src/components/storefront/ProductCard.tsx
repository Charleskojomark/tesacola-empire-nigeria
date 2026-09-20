"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { Plus } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const mainImage = product.images?.[0]?.url || "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80";
  const hoverImage = product.images?.[1]?.url || mainImage;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Default to first variant if exists, else product
    const defaultVariant = product.variants?.[0];
    addItem(product, defaultVariant, 1);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "MADE_TO_ORDER":
        return <span className="text-[10px] tracking-widest text-[#d6be67] uppercase font-light">Made To Order</span>;
      case "PRE_ORDER":
        return <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-light">Pre-Order</span>;
      case "UNAVAILABLE":
        return <span className="text-[10px] tracking-widest text-red-400 uppercase font-light">Archived</span>;
      default:
        return <span className="text-[10px] tracking-widest text-emerald-400/90 uppercase font-light">In Stock</span>;
    }
  };

  return (
    <div className="group flex flex-col bg-[#0a0a0a] border border-[#1f1f1f] hover:border-[#d6be67]/40 transition-all duration-300">
      {/* Product Image Stage */}
      <Link href={`/product/${product.slug}`} className="relative aspect-[4/5] overflow-hidden bg-[#121212] block">
        <Image
          src={mainImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {hoverImage !== mainImage && (
          <Image
            src={hoverImage}
            alt={`${product.name} secondary angle`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}

        {/* Quick Add floating action */}
        {product.status !== "UNAVAILABLE" && (
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-3 right-3 bg-black/80 hover:bg-[#d6be67] hover:text-black text-white p-2.5 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg border border-white/10"
            title="Quick Add to Bag"
            aria-label="Add to bag"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </Link>

      {/* Product Meta */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-black/60">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            {getStatusBadge(product.status)}
            <span className="text-[10px] text-neutral-500 tracking-wider uppercase">
              {product.sku}
            </span>
          </div>

          <Link href={`/product/${product.slug}`}>
            <h3 className="font-serif text-sm sm:text-base font-medium text-white group-hover:text-[#d6be67] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-neutral-400 mt-1 line-clamp-2 font-light leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        <div className="pt-4 mt-3 border-t border-[#1f1f1f] flex items-center justify-between">
          <span className="text-sm sm:text-base font-medium text-white font-serif tracking-wide">
            {formatCurrency(product.price, product.currency)}
          </span>
          <Link
            href={`/product/${product.slug}`}
            className="text-[11px] uppercase tracking-widest text-[#d6be67] hover:underline font-light"
          >
            View Piece &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
