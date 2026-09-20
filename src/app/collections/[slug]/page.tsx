import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dbRepository } from "@/db";
import { ProductCard } from "@/components/storefront/ProductCard";

interface CollectionSlugPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CollectionDetailPage({ params }: CollectionSlugPageProps) {
  const { slug } = await params;
  const collection = await dbRepository.getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  // Fetch all products
  const allProducts = await dbRepository.getProducts();

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
            Thematic Assemblage
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
            {collection.name}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-300 font-light max-w-2xl leading-relaxed">
            {collection.description}
          </p>
        </div>

        {/* Products in Collection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
