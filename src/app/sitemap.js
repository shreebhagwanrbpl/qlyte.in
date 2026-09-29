import { fetchFullCatalog, fetchDistricts } from "@/lib/data-fetcher-server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function sitemap() {
  const baseUrl = "https://qlyte.in";
  const now = new Date();

  const urls = [
    { url: baseUrl, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/items`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
  ];

  try {
    const districts = await fetchDistricts();
    for (const district of districts) {
      const slug = district.slug || district.id;
      if (!slug || String(slug).toLowerCase() === "jaipur") continue;
      urls.push({
        url: `${baseUrl}/${slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    const products = await fetchFullCatalog();
    const seen = new Set();
    for (const product of products) {
      const slug = product?.slug;
      if (!slug || seen.has(slug)) continue;
      seen.add(slug);
      urls.push({
        url: `${baseUrl}/items/${slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.9,
      });
    }
  } catch (error) {
    console.error("Sitemap Generation Error:", error);
  }

  return urls;
}
