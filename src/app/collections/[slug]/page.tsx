import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dbRepository } from "@/db";
import { ProductCard } from "@/components/storefront/ProductCard";
import { Sparkles, ArrowRight } from "lucide-react";

interface CollectionSlugPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CollectionDetailPage({ params }: CollectionSlugPageProps) {
  const { slug } = await params;
  const collection = await dbRepository.getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  // Filter genuine products belonging to this collection
  const allProducts = await dbRepository.getProducts({ publishedOnly: true });
  // Match products by collectionId or by category relevance
  const collectionProducts = allProducts.filter(
    (p) =>
      p.collectionId === collection.id ||
      (p as any).collectionSlug === collection.slug
  );

  const isDeveloping = collectionProducts.length === 0;

  return (
    <div className="bg-black min-h-screen text-white pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-[11px] text-neutral-400 uppercase tracking-widest mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/collections" className="hover:text-white">Collections</Link>
          <span>/</span>
          <span className="text-[#d6be67]">{collection.name}</span>
        </div>

        {/* Collection Hero Header */}
        <div className="mb-16 pb-10 border-b border-[#1f1f1f]">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#d6be67] font-light block mb-2">
            Curated World
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
            {collection.name}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-300 font-light max-w-2xl leading-relaxed">
            {collection.description}
          </p>
        </div>

        {/* Products in Collection or Elegant "Collection in Development" Treatment */}
        {isDeveloping ? (
          <div className="p-12 sm:p-20 bg-[#0a0a0a] border border-[#1f1f1f] text-center max-w-2xl mx-auto space-y-6">
            <span className="inline-block px-3 py-1 border border-[#d6be67]/30 bg-black/60 text-[#d6be67] text-[10px] uppercase tracking-[0.25em] font-light">
              Collection in Development
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-light">
              Crafting The {collection.name} Assemblage
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-lg mx-auto">
              This collection is currently developing within our Nigerian workshop. Tesacola releases pieces progressively, ensuring design, materials, and disciplined finishing align with our uncompromising standards.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/custom"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#d6be67] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#f4e996] transition-colors"
              >
                <span>Request Bespoke Commission</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/20 text-white text-xs uppercase tracking-widest hover:border-[#d6be67] hover:text-[#d6be67] transition-colors"
              >
                <span>View Full Catalogue</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {collectionProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
