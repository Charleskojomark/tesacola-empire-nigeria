import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dbRepository } from "@/db";
import { ProductDetailClient } from "@/components/shop/ProductDetailClient";
import { ProductCard } from "@/components/storefront/ProductCard";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await dbRepository.getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | Tesacola Empire`,
      description: product.shortDescription,
      images: [
        {
          url: product.images?.[0]?.url || "/tesacol_logo.png",
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await dbRepository.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Related products from same category
  const relatedProducts = await dbRepository.getProducts({
    categorySlug: product.category?.slug,
    limit: 3 as any,
  });

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images?.map((i) => i.url) || [],
    description: product.shortDescription,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: "Tesacola Empire",
    },
    offers: {
      "@type": "Offer",
      url: `https://tesacola.com/product/${product.slug}`,
      priceCurrency: product.currency,
      price: product.price,
      availability:
        product.status === "IN_STOCK"
          ? "https://schema.org/InStock"
          : "https://schema.org/PreOrder",
    },
  };

  return (
    <div className="bg-black text-white min-h-screen pt-28 pb-24">
      {/* Schema.org JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-[11px] text-neutral-400 uppercase tracking-widest mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-white">Catalogue</Link>
          {product.category && (
            <>
              <span>/</span>
              <Link href={`/shop?category=${product.category.slug}`} className="hover:text-[#d6be67]">
                {product.category.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-white truncate max-w-[200px]">{product.name}</span>
        </div>

        {/* Interactive Product Details */}
        <ProductDetailClient product={product} />

        {/* Related Creations */}
        <div className="mt-28 pt-16 border-t border-[#1f1f1f]">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#d6be67] block mb-1">
                Atelier Pairing
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-light">
                Complementary Pieces
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs uppercase tracking-widest text-[#d6be67] hover:underline"
            >
              Explore All &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts
              .filter((p) => p.id !== product.id)
              .slice(0, 3)
              .map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
