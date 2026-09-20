import React from "react";
import Link from "next/link";
import { dbRepository } from "@/db";
import { ProductCard } from "@/components/storefront/ProductCard";
import { SlidersHorizontal } from "lucide-react";

interface ShopPageProps {
  searchParams: Promise<{
    category?: string;
    sort?: string;
    status?: string;
    search?: string;
  }>;
}

export const metadata = {
  title: "Shop Handcrafted Leather Footwear & Goods",
  description:
    "Explore Tesacola's signature collection of wholecut oxfords, artisanal loafers, executive briefcases, and solid brass belts.",
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const categories = await dbRepository.getCategories();
  const products = await dbRepository.getProducts({
    categorySlug: params.category,
    sort: params.sort,
    status: params.status,
    search: params.search,
  });

  const activeCategory = categories.find((c) => c.slug === params.category);

  return (
    <div className="bg-black min-h-screen text-white pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <div className="mb-10 pb-8 border-b border-[#1f1f1f]">
          <div className="text-[11px] text-neutral-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-[#d6be67]">Catalogue</span>
            {activeCategory && (
              <>
                <span>/</span>
                <span className="text-white">{activeCategory.name}</span>
              </>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-tight">
            {activeCategory ? activeCategory.name : "The Complete Collection"}
          </h1>
          <p className="mt-3 text-sm text-neutral-400 font-light max-w-2xl">
            {activeCategory?.description ||
              "Handcrafted Nigerian leather footwear, executive briefcases, and precision accessories built to international standards."}
          </p>
        </div>

        {/* Category Filter Pills & Sorting */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#1f1f1f]">
          {/* Categories bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <Link
              href="/shop"
              className={`px-4 py-2 text-xs uppercase tracking-widest whitespace-nowrap transition-colors rounded-sm border ${
                !params.category
                  ? "bg-[#d6be67] text-black border-[#d6be67] font-semibold"
                  : "bg-[#0d0d0d] text-neutral-300 border-[#262626] hover:border-neutral-500"
              }`}
            >
              All Pieces
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className={`px-4 py-2 text-xs uppercase tracking-widest whitespace-nowrap transition-colors rounded-sm border ${
                  params.category === cat.slug
                    ? "bg-[#d6be67] text-black border-[#d6be67] font-semibold"
                    : "bg-[#0d0d0d] text-neutral-300 border-[#262626] hover:border-neutral-500"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <SlidersHorizontal className="w-4 h-4 text-[#d6be67]" />
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <span>Sort:</span>
              <Link
                href={`/shop?${new URLSearchParams({ ...params, sort: "newest" }).toString()}`}
                className={`hover:text-white ${params.sort === "newest" ? "text-[#d6be67] font-semibold" : ""}`}
              >
                Newest
              </Link>
              <span>•</span>
              <Link
                href={`/shop?${new URLSearchParams({ ...params, sort: "price-asc" }).toString()}`}
                className={`hover:text-white ${params.sort === "price-asc" ? "text-[#d6be67] font-semibold" : ""}`}
              >
                Price: Low to High
              </Link>
              <span>•</span>
              <Link
                href={`/shop?${new URLSearchParams({ ...params, sort: "price-desc" }).toString()}`}
                className={`hover:text-white ${params.sort === "price-desc" ? "text-[#d6be67] font-semibold" : ""}`}
              >
                Price: High to Low
              </Link>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto space-y-4">
            <h3 className="font-serif text-2xl text-white font-light">No Pieces Found</h3>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              We could not find any items matching your active filter criteria. Clear filters to explore all available collections.
            </p>
            <Link
              href="/shop"
              className="inline-block px-6 py-2.5 bg-[#d6be67] text-black text-xs uppercase tracking-widest font-semibold mt-4"
            >
              Reset Filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
