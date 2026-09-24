import { MetadataRoute } from "next";
import { dbRepository } from "@/db";
import { getBaseUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/shop`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/collections`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/custom`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/business`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/craft`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/journal`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/fit-guide`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/care`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/colours`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/shipping`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/returns`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  // Dynamic products
  const products = await dbRepository.getProducts({ publishedOnly: true });
  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${baseUrl}/product/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Dynamic collections
  const collections = await dbRepository.getCollections(true);
  const collectionRoutes: MetadataRoute.Sitemap = collections.map((c) => ({
    url: `${baseUrl}/collections/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Dynamic journal posts
  const journalPosts = await dbRepository.getJournalPosts(true);
  const journalRoutes: MetadataRoute.Sitemap = journalPosts.map((j) => ({
    url: `${baseUrl}/journal/${j.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...collectionRoutes, ...journalRoutes];
}
