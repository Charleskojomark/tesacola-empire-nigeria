import React from "react";
import Link from "next/link";
import Image from "next/image";
import { dbRepository } from "@/db";
import { Hero } from "@/components/storefront/Hero";
import { ProductCard } from "@/components/storefront/ProductCard";
import { CraftSection } from "@/components/storefront/CraftSection";
import { BusinessSection } from "@/components/storefront/BusinessSection";
import { ArrowRight, Award, Compass, ShieldCheck, Sparkles } from "lucide-react";

export default async function HomePage() {
  const featuredProducts = await dbRepository.getProducts({ featured: true });
  const collections = await dbRepository.getCollections();
  const journalPosts = await dbRepository.getJournalPosts();

  return (
    <div className="flex flex-col w-full">
      {/* 1. Black Hero */}
      <Hero />

      {/* 2. White / Clean Product Section - Curated Masterpieces */}
      <section className="bg-white text-black py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-neutral-200 gap-6">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#ac8d3e] font-semibold block mb-2">
                Featured Selection
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-neutral-900 leading-tight">
                Crafted for Authority
              </h2>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-black hover:text-[#ac8d3e] transition-colors group"
            >
              <span>View Full Catalogue</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Soft Ivory Craft Section - The Architecture of Making */}
      <CraftSection />

      {/* 4. Black Editorial Section - Collections Layer */}
      <section className="bg-black text-white py-24 border-t border-[#1f1f1f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#d6be67] font-light block mb-2">
              Curated Worlds
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white">
              The Collections
            </h2>
            <p className="mt-4 text-neutral-400 text-sm font-light">
              Architectural styling structured around life milestones, executive leadership, and trans-continental voyages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((col) => (
              <Link
                key={col.id}
                href={`/collections/${col.slug}`}
                className="group relative aspect-[3/4] overflow-hidden bg-[#121212] border border-[#1f1f1f] hover:border-[#d6be67]/50 transition-all duration-500 block"
              >
                <Image
                  src={
                    col.slug === "executive"
                      ? "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80"
                      : col.slug === "heritage"
                      ? "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80"
                      : col.slug === "travel"
                      ? "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"
                      : "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80"
                  }
                  alt={col.name}
                  fill
                  className="object-cover filter brightness-50 group-hover:scale-105 group-hover:brightness-75 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#d6be67] mb-1 font-light">
                    Collection
                  </span>
                  <h3 className="font-serif text-xl text-white font-medium group-hover:text-[#d6be67] transition-colors">
                    {col.name}
                  </h3>
                  <p className="text-xs text-neutral-300 font-light mt-1 line-clamp-2">
                    {col.description}
                  </p>
                  <span className="text-[11px] uppercase tracking-widest text-[#d6be67] mt-3 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Discover Collection &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Black Business Section - Commercial Partnerships & Manufacturing */}
      <BusinessSection />

      {/* 6. Soft Ivory / Editorial Story Section - Made in Nigeria */}
      <section className="bg-[#f7f4ea] text-black py-24 border-y border-[#e5e0d3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#ac8d3e] font-semibold block">
                Origin &amp; Standard
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 leading-tight">
                Made in Nigeria. Engineered for the World.
              </h2>
              <p className="text-sm text-neutral-700 leading-relaxed font-light">
                Tesacola was founded on an unapologetic belief: that Nigerian industrial craftsmanship has the capacity to construct leather goods of equal or superior durability to the venerated workshops of Northampton or Florence.
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed font-light">
                By investing in high-grade equipment, rigorous worker training, and local sourcing of resilient bovine hides, we prove every day that West African luxury is not an aspiration—it is an existing reality.
              </p>
              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-block px-8 py-3.5 bg-black text-white hover:bg-neutral-800 text-xs uppercase tracking-widest transition-colors font-medium"
                >
                  Read Our Full Story
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-[4/3] bg-neutral-300 overflow-hidden border border-[#e5e0d3]">
              <Image
                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80"
                alt="Tesacola master craftsman finishing shoe sole"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Editorial Journal Teaser */}
      <section className="bg-black text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#1f1f1f] gap-6">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#d6be67] font-light block mb-2">
                The Journal
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white leading-tight">
                Notes on Leather &amp; Industry
              </h2>
            </div>
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-light text-[#d6be67] hover:underline group"
            >
              <span>Read The Journal</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {journalPosts.slice(0, 2).map((post) => (
              <Link
                key={post.id}
                href={`/journal/${post.slug}`}
                className="group flex flex-col bg-[#0a0a0a] border border-[#1f1f1f] hover:border-[#d6be67]/40 transition-all duration-300"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-[#121212]">
                  <Image
                    src={post.coverImage || "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 text-[11px] text-neutral-400 mb-3 uppercase tracking-wider">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span className="text-[#d6be67]">Editorial</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-light text-white group-hover:text-[#d6be67] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-3 line-clamp-2 leading-relaxed font-light">
                    {post.excerpt}
                  </p>
                  <span className="text-[11px] uppercase tracking-widest text-[#d6be67] mt-6 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Article &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Next Steps & Brand Sign-off Call to Action */}
      <section className="bg-[#0f0f0f] text-white py-20 border-t border-[#1f1f1f] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-6 flex items-center justify-center">
            <Image
              src="/tesacol_logo.png"
              alt="Tesacola Empire Crest"
              width={96}
              height={96}
              className="object-contain w-full h-full filter brightness-110 drop-shadow-[0_0_16px_rgba(214,190,103,0.35)]"
            />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-light mb-4">
            Begin Your Tesacola Experience
          </h2>
          <p className="text-sm text-neutral-400 font-light max-w-xl mb-8 leading-relaxed">
            Whether selecting from our ready-to-wear handcrafted catalog or commissioning a tailored private manufacturing run, we invite you into our standard.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/shop"
              className="px-8 py-3.5 bg-[#d6be67] hover:bg-[#f4e996] text-black font-semibold text-xs uppercase tracking-widest transition-all shadow-md"
            >
              Explore Shop
            </Link>
            <Link
              href="/custom"
              className="px-8 py-3.5 border border-white/20 hover:border-[#d6be67] hover:text-[#d6be67] text-white text-xs uppercase tracking-widest transition-all"
            >
              Commission Bespoke Piece
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
