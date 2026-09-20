import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { dbRepository } from "@/db";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

interface JournalSlugProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: JournalSlugProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await dbRepository.getJournalPostBySlug(slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Tesacola Journal`,
      description: post.excerpt,
      images: [{ url: post.coverImage || "/tesacol_logo.png" }],
    },
  };
}

export default async function JournalPostPage({ params }: JournalSlugProps) {
  const { slug } = await params;
  const post = await dbRepository.getJournalPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="bg-black min-h-screen text-white pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-[11px] text-neutral-400 uppercase tracking-widest mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/journal" className="hover:text-white">The Journal</Link>
          <span>/</span>
          <span className="text-[#d6be67] truncate max-w-[200px]">{post.title}</span>
        </div>

        {/* Header */}
        <div className="space-y-4 mb-10 text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-widest text-[#d6be67]">
            <span>{post.author}</span>
            <span>•</span>
            <span>{post.publishedAt ? formatDate(post.publishedAt) : "Editorial"}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
            {post.title}
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed pt-2">
            {post.excerpt}
          </p>
        </div>

        {/* Hero Image */}
        {post.coverImage && (
          <div className="relative aspect-[16/9] w-full bg-[#121212] border border-[#1f1f1f] overflow-hidden mb-12">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* Essay Content */}
        <div className="prose prose-invert prose-neutral max-w-none text-neutral-300 text-sm sm:text-base font-light leading-loose space-y-6">
          <p>{post.content}</p>
          <blockquote className="border-l-2 border-[#d6be67] pl-6 my-8 italic text-white font-serif text-lg">
            &ldquo;Tesacola is building its own world. Not by mimicry, but by mastery of materials, discipline of design, and pride in Nigerian manufacturing.&rdquo;
          </blockquote>
          <p>
            When investing in fine leather goods, one does not merely purchase a temporary accessory; one acquires a dynamic relationship with natural animal hide, crafted by hands that honor ancestral technique and modern mechanical precision.
          </p>
        </div>

        {/* Author Sign-off Footer */}
        <div className="mt-16 pt-10 border-t border-[#1f1f1f] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-[#d6be67]/40 flex items-center justify-center bg-[#121212]">
              <Image src="/tesacol_logo.png" alt="Tesacola" width={28} height={28} className="object-contain" />
            </div>
            <div>
              <p className="font-serif text-sm text-white">{post.author}</p>
              <p className="text-[11px] text-[#d6be67] uppercase tracking-wider">Enjoying Trust &amp; Quality</p>
            </div>
          </div>

          <Link
            href="/journal"
            className="text-xs uppercase tracking-widest text-[#d6be67] hover:underline"
          >
            &larr; Back to Journal
          </Link>
        </div>
      </div>
    </article>
  );
}
