import React from "react";
import Link from "next/link";
import Image from "next/image";
import { dbRepository } from "@/db";

export const metadata = {
  title: "Curated Collections",
  description:
    "Explore Tesacola's curated editorial collections: The Executive Collection, The Heritage Collection, The Travel Collection, and The Occasion Collection.",
};

export default async function CollectionsPage() {
  const collections = await dbRepository.getCollections();

  return (
    <div className="bg-black min-h-screen text-white pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16 pb-8 border-b border-[#1f1f1f]">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#d6be67] font-light block mb-2">
            Curated Worlds
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
            The Collections
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
            Thematic assemblies uniting footwear silhouettes, structured briefcases, and bespoke accessories tailored for distinct arenas of life and leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((col) => (
            <Link
              key={col.id}
              href={`/collections/${col.slug}`}
              className="group relative aspect-[16/10] overflow-hidden bg-[#121212] border border-[#1f1f1f] hover:border-[#d6be67]/50 transition-all duration-500 block"
            >
              <Image
                src={
                  col.slug === "executive"
                    ? "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80"
                    : col.slug === "heritage"
                    ? "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80"
                    : col.slug === "travel"
                    ? "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80"
                    : "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=80"
                }
                alt={col.name}
                fill
                className="object-cover filter brightness-50 group-hover:scale-105 group-hover:brightness-75 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#d6be67] mb-2 font-light">
                  Tesacola Collection
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-white font-light group-hover:text-[#d6be67] transition-colors">
                  {col.name}
                </h2>
                <p className="text-xs text-neutral-300 font-light mt-2 max-w-md leading-relaxed">
                  {col.description}
                </p>
                <span className="text-[11px] uppercase tracking-widest text-[#d6be67] mt-4 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore Curated Pieces &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
