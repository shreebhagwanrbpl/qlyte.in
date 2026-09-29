import {
  getDocumentByPath,
  getDocumentsByCollection,
  getDocumentsLikePath,
} from "./sqliteDb.js";
import {
  WEBSITE_ID,
  NORMALIZED_WEBSITE_ID,
  isItemVisibleOnWebsite,
  visibilityWithParents,
  makeSlug,
} from "./catalog-utils.js";
import { adminFetch } from "./admin-api.js";

const companyId = () => process.env.SQLITE_COMPANY_ID || WEBSITE_ID;

async function adminJson(pathname) {
  const response = await adminFetch(pathname);
  return response.json();
}

function uniqueByKey(items) {
  const map = new Map();
  for (const item of items) {
    const key = item.uid || item.id || item.slug || item.title;
    if (key && !map.has(key)) map.set(key, item);
  }
  return [...map.values()];
}

async function findWebsitePage(pageType) {
  const c = companyId();
  const candidates = [
    `websites/${c}/${WEBSITE_ID}/pages/${pageType}`,
    `websites/${WEBSITE_ID}/pages/${pageType}`,
  ];
  for (const p of candidates) {
    const found = getDocumentByPath(p);
    if (found) return found.data;
  }
  const normalized = getDocumentsLikePath(`websites/%/${WEBSITE_ID}/pages/${pageType}`);
  if (normalized[0]?.data) return normalized[0].data;
  try {
    return await adminJson(`/api/site-data?type=${encodeURIComponent(pageType)}&websiteId=${encodeURIComponent(WEBSITE_ID)}`);
  } catch {
    return null;
  }
}

export async function fetchDocCached(pathValue) {
  const direct = getDocumentByPath(pathValue);
  return direct?.data || null;
}

export async function fetchHomeData() {
  return findWebsitePage("home");
}

export async function fetchContactData() {
  return findWebsitePage("contact");
}

export async function fetchServicesData() {
  return findWebsitePage("services");
}

export async function fetchDistrictData(district) {
  if (!district) return null;
  const c = companyId();
  const candidates = [
    `websites/${c}/${WEBSITE_ID}/districts/${district}`,
    `websites/${WEBSITE_ID}/districts/${district}`,
  ];
  for (const p of candidates) {
    const found = getDocumentByPath(p);
    if (found) return found.data;
  }
  const normalized = getDocumentsLikePath(`websites/%/${WEBSITE_ID}/districts/${district}`);
  if (normalized[0]?.data) return normalized[0].data;
  try {
    return await adminJson(`/api/site-data?type=district&district=${encodeURIComponent(district)}&websiteId=${encodeURIComponent(WEBSITE_ID)}`);
  } catch {
    return null;
  }
}

export async function fetchDistricts() {
  const c = companyId();
  const rows = getDocumentsLikePath(`websites/%/${WEBSITE_ID}/districts/%`);
  if (rows.length) return rows.map((r) => ({ id: r.doc_id, ...(r.data || {}) }));
  const fallback = getDocumentsLikePath(`websites/${c}/districts/%`);
  return fallback.map((r) => ({ id: r.doc_id, ...(r.data || {}) }));
}

export async function fetchCategories() {
  const catalog = await fetchFullCatalog();
  const categoryMap = new Map();

  for (const item of catalog) {
    const name = (item.category || "").trim();
    if (name && !categoryMap.has(name.toLowerCase())) {
      const slug = makeSlug(name);
      categoryMap.set(name.toLowerCase(), {
        id: slug,
        name,
        category: name,
        slug,
      });
    }
  }

  return Array.from(categoryMap.values());
}

async function fetchFullCatalogFromSQLite() {
  const c = companyId();
  const categoryMap = new Map();
  const subMap = new Map();
  const products = [];

  const allCategoryDocs = getDocumentsLikePath(`companies/%/categories/%`).concat(
    getDocumentsByCollection(`companies/${c}/categories`),
    getDocumentsLikePath(`companies/%/categories`)
  );

  for (const row of allCategoryDocs) {
    if (row.data) {
      categoryMap.set(row.doc_id, row.data);
      if (row.data.id) categoryMap.set(row.data.id, row.data);
    }
  }

  const subRows = getDocumentsLikePath(`companies/%/categories/%/subcategories/%`);
  for (const row of subRows) {
    const parts = row.path.split("/");
    const categoryId = parts[3] || parts[2];
    const subcategoryId = parts[5] || parts[4];
    const sub = row.data || {};
    subMap.set(subcategoryId, { ...sub, id: subcategoryId, categoryId });

    const category = categoryMap.get(categoryId) || (sub.categoryId ? categoryMap.get(sub.categoryId) : null);
    const embedded = Array.isArray(sub.products) ? sub.products : [];
    embedded.forEach((item, index) => {
      if (!visibilityWithParents(item, category, sub)) return;
      products.push({
        ...item,
        uid: item.uid || `${categoryId}-${subcategoryId}-${index}`,
        categoryId,
        subcategoryId,
        category: item.category || category?.category || category?.name || categoryId,
        subCategory: item.subCategory || sub.subCategory || sub.name || subcategoryId,
        slug: item.slug || makeSlug(item.title),
      });
    });
  }

  const productRows = getDocumentsLikePath(
    `companies/%/categories/%/subcategories/%/products/%`
  );
  for (const row of productRows) {
    const parts = row.path.split("/");
    const categoryId = parts[3] || parts[2];
    const subcategoryId = parts[5] || parts[4];
    const productId = parts[7] || parts[6];
    const item = row.data || {};
    const category = categoryMap.get(categoryId) || (item.categoryId ? categoryMap.get(item.categoryId) : null);
    const sub = subMap.get(subcategoryId);
    if (!visibilityWithParents(item, category, sub)) continue;
    products.push({
      ...item,
      id: item.id || productId,
      uid: item.uid || productId,
      categoryId,
      subcategoryId,
      category: item.category || category?.category || category?.name || categoryId,
      subCategory: item.subCategory || sub?.subCategory || sub?.name || subcategoryId,
      slug: item.slug || makeSlug(item.title),
    });
  }

  const masterRows = getDocumentsLikePath(`companies/%/products/%`).concat(
    getDocumentsLikePath(`companies/%/products`),
    getDocumentsByCollection(`companies/${c}/products`)
  );
  for (const row of masterRows) {
    const item = row.data || {};
    if (!isItemVisibleOnWebsite(item)) continue;

    const categoryId = item.categoryId || item.categoryID;
    const subcategoryId = item.subcategoryId || item.subCategoryId;
    const category = categoryId ? categoryMap.get(categoryId) : null;
    const sub = subcategoryId ? subMap.get(subcategoryId) : null;

    if (category && !isItemVisibleOnWebsite(category)) continue;
    if (sub && !isItemVisibleOnWebsite(sub)) continue;

    products.push({
      ...item,
      id: item.id || row.doc_id,
      uid: item.uid || row.doc_id,
      category: item.category || category?.category || category?.name,
      subCategory: item.subCategory || sub?.subCategory || sub?.name,
      slug: item.slug || makeSlug(item.title),
    });
  }

  return uniqueByKey(products);
}

export async function fetchCatalogCategories() {
  const catalog = await fetchFullCatalog();
  return [...new Set(catalog.map((p) => p.category).filter(Boolean))];
}


export async function fetchFullCatalog() {
  try {
    const local = await fetchFullCatalogFromSQLite();
    if (Array.isArray(local) && local.length) return local;
  } catch (error) {
    console.warn("[catalog] SQLite read unavailable, using Admin API:", error.message);
  }
  try {
    const remote = await adminJson(`/api/catalog?websiteId=${encodeURIComponent(WEBSITE_ID)}`);
    return Array.isArray(remote) ? remote : (Array.isArray(remote?.products) ? remote.products : []);
  } catch (error) {
    console.error("[catalog] Admin API fallback failed:", error);
    return [];
  }
}

export async function getProductBySlug(slug) {
  if (!slug) return null;
  const catalog = await fetchFullCatalog();
  const targetSlug = decodeURIComponent(String(slug)).toLowerCase().trim();

  return (
    catalog.find((p) => {
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
    }) || null
  );
}

export async function getBrands() {
  const catalog = await fetchFullCatalog();
  const brandSet = new Set();
  const brands = [];

  for (const item of catalog) {
    const brand = (item.brand || "").trim();
    if (brand && !brandSet.has(brand.toLowerCase())) {
      brandSet.add(brand.toLowerCase());
      brands.push({
        name: brand,
        slug: makeSlug(brand),
      });
    }
  }

  return brands;
}

export async function getProductsByBrandSlug(slug) {
  const catalog = await fetchFullCatalog();
  const targetSlug = decodeURIComponent(String(slug || "")).toLowerCase().trim();

  const products = catalog.filter((p) => {
    if (
      p?.isPublished === false ||
      p?.isDeleted === true ||
      p?.deleted === true ||
      String(p?.status || "").toLowerCase() === "deleted"
    ) {
      return false;
    }

    const brandName = String(p.brand || "").trim();
    return makeSlug(brandName) === targetSlug || brandName.toLowerCase() === targetSlug;
  });

  const brandName =
    products[0]?.brand ||
    decodeURIComponent(slug || "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  return { brandName, products };
}

export async function getCategories() {
  const catalog = await fetchFullCatalog();
  const categorySet = new Set();
  const categories = [];

  for (const item of catalog) {
    const category = (item.category || "").trim();
    if (category && !categorySet.has(category.toLowerCase())) {
      categorySet.add(category.toLowerCase());
      categories.push({
        name: category,
        slug: makeSlug(category),
      });
    }
  }

  return categories;
}

export async function getProductsByCategorySlug(slug) {
  const catalog = await fetchFullCatalog();
  const targetSlug = decodeURIComponent(String(slug || "")).toLowerCase().trim();

  const products = catalog.filter((p) => {
    if (
      p?.isPublished === false ||
      p?.isDeleted === true ||
      p?.deleted === true ||
      String(p?.status || "").toLowerCase() === "deleted"
    ) {
      return false;
    }

    const categoryName = String(p.category || "").trim();
    return makeSlug(categoryName) === targetSlug || categoryName.toLowerCase() === targetSlug;
  });

  const categoryName =
    products[0]?.category ||
    decodeURIComponent(slug || "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  return { categoryName, products };
}
