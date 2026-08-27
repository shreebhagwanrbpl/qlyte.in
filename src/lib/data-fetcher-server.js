import { fetchFullCatalog as fetchFullCatalogRaw } from "./data-fetcher";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { cache } from "react";

// Global in-memory cache for the server process to bypass Next.js 2MB unstable_cache limit
let cachedCatalog = null;
let cachedCatalogTimestamp = 0;
let cachedDistricts = null;
let cachedDistrictsTimestamp = 0;
const CACHE_TTL = 15 * 1000; // Short TTL so admin publish/delete becomes visible quickly.

export const makeSlug = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

async function getCachedCatalog() {
  const now = Date.now();
  if (cachedCatalog && (now - cachedCatalogTimestamp) < CACHE_TTL) {
    return cachedCatalog;
  }

  const data = await fetchFullCatalogRaw();
  cachedCatalog = data;
  cachedCatalogTimestamp = now;
  return data;
}

export const fetchFullCatalog = cache(async () => {
  return await getCachedCatalog();
});

export const getProductBySlug = cache(async (slug) => {
  if (!slug) return null;
  const catalog = await fetchFullCatalog();
  const targetSlug = decodeURIComponent(slug).toLowerCase().trim();

  return catalog.find((p) => {
    if (
      p?.isPublished === false ||
      p?.isDeleted === true ||
      p?.deleted === true ||
      String(p?.status || "").toLowerCase() === "deleted"
    ) {
      return false;
    }

    const candidateSlugs = [
      p.slug,
      p.productSlug,
      p.seoSlug,
      p.masterSlug,
      makeSlug(p.title || ""),
    ]
      .filter(Boolean)
      .map((value) => decodeURIComponent(String(value)).toLowerCase().trim());

    return (
      candidateSlugs.includes(targetSlug) ||
      String(p.id || "").toLowerCase() === targetSlug ||
      String(p.uid || "").toLowerCase() === targetSlug
    );
  }) || null;
});

export const getCategories = cache(async () => {
  const catalog = await fetchFullCatalog();
  const catMap = new Map();

  catalog.forEach((item) => {
    if (item.category && item.category.trim()) {
      const name = item.category.trim();
      const slug = makeSlug(name);
      if (!catMap.has(slug)) {
        catMap.set(slug, {
          name,
          slug,
          count: 1,
        });
      } else {
        catMap.get(slug).count += 1;
      }
    }
  });

  return Array.from(catMap.values());
});

export const getProductsByCategorySlug = cache(async (categorySlug) => {
  if (!categorySlug) return { categoryName: "", products: [] };
  const catalog = await fetchFullCatalog();
  const targetSlug = decodeURIComponent(categorySlug).toLowerCase().trim();

  const products = catalog.filter((p) => {
    const catName = p.category || "";
    return makeSlug(catName) === targetSlug;
  });

  const categoryName = products.length > 0
    ? products[0].category
    : targetSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return { categoryName, products };
});

export const getBrands = cache(async () => {
  const catalog = await fetchFullCatalog();
  const brandMap = new Map();

  catalog.forEach((item) => {
    if (item.brand && item.brand.trim()) {
      const name = item.brand.trim();
      const slug = makeSlug(name);
      if (!brandMap.has(slug)) {
        brandMap.set(slug, {
          name,
          slug,
          count: 1,
        });
      } else {
        brandMap.get(slug).count += 1;
      }
    }
  });

  return Array.from(brandMap.values());
});

export const getProductsByBrandSlug = cache(async (brandSlug) => {
  if (!brandSlug) return { brandName: "", products: [] };
  const catalog = await fetchFullCatalog();
  const targetSlug = decodeURIComponent(brandSlug).toLowerCase().trim();

  const products = catalog.filter((p) => {
    const bName = p.brand || "";
    return makeSlug(bName) === targetSlug;
  });

  const brandName = products.length > 0
    ? products[0].brand
    : targetSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return { brandName, products };
});

export const fetchDistricts = cache(async () => {
  const now = Date.now();
  if (cachedDistricts && (now - cachedDistrictsTimestamp) < CACHE_TTL) {
    return cachedDistricts;
  }

  try {
    const snap = await getDocs(collection(db, "websites", "qlytein", "districts"));
    const districts = snap.docs.map((doc) => doc.data()).filter((d) => Boolean(d.slug));
    cachedDistricts = districts;
    cachedDistrictsTimestamp = now;
    return districts;
  } catch (err) {
    console.error("Error fetching districts server-side:", err);
    return [];
  }
});

