import React from "react";
import Link from "next/link";
import Image from "next/image";
import { dbRepository } from "@/db";
import { formatDate } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "The Journal | Essays on Craft, Leather & Industry",
  description:
    "Editorial writings, material studies, and manufacturing chronicles from the master craftsmen at Tesacola Empire Nigeria.",
};

export default async function JournalPage() {
  const posts = await dbRepository.getJournalPosts();

  return (
    <div className="bg-black min-h-screen text-white pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16 pb-8 border-b border-[#1f1f1f]">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#d6be67] font-light block mb-2">
            Editorial Perspectives
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
            The Tesacola Journal
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
            Essays on historical lasting techniques, anatomical shoemaking, raw bovine hide grading, and the rising horizon of Nigerian industrial manufacturing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-[#0a0a0a] border border-[#1f1f1f] hover:border-[#d6be67]/40 transition-all duration-300 flex flex-col group"
            >
              <Link href={`/journal/${post.slug}`} className="relative aspect-[16/9] overflow-hidden bg-[#121212] block">
                <Image
                  src={post.coverImage || "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                />
              </Link>
              <div className="p-8 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-neutral-500 uppercase tracking-widest mb-3">
                    <span className="text-[#d6be67]">{post.author}</span>
                    <span>•</span>
                    <span>{post.publishedAt ? formatDate(post.publishedAt) : "Editorial"}</span>
                  </div>

                  <Link href={`/journal/${post.slug}`}>
                    <h2 className="font-serif text-xl sm:text-2xl font-light text-white group-hover:text-[#d6be67] transition-colors leading-snug">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-xs text-neutral-400 font-light leading-relaxed mt-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#1f1f1f] flex items-center justify-between">
                  <div className="flex gap-2">
                    {post.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-wider text-neutral-500 px-2 py-0.5 border border-[#262626]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/journal/${post.slug}`}
                    className="text-xs uppercase tracking-widest text-[#d6be67] hover:underline inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read Essay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
