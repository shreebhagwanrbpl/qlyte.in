// src/lib/catalog-utils.js
export const WEBSITE_ID = "qlytein";

export const normalizeDomainId = (value = "") =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/[.\-\s]/g, "")
    .replace(/\/.*$/, "");

export const NORMALIZED_WEBSITE_ID = normalizeDomainId(WEBSITE_ID);

const asStatus = (value) => String(value ?? "").trim().toLowerCase();

export function isItemVisibleOnWebsite(item) {
  if (!item || item.isPublished === false) return false;
  const status = asStatus(item.status);
  if (status === "inactive" || status === "draft") return false;

  if (item.websiteIds === undefined || item.websiteIds === null) return true;
  if (!Array.isArray(item.websiteIds) || item.websiteIds.length === 0) return false;

  return item.websiteIds.some((id) => {
    const normalized = normalizeDomainId(id);
    return normalized === "all" || normalized === NORMALIZED_WEBSITE_ID;
  });
}

export function visibilityWithParents(item, category, subcategory) {
  if (category && !isItemVisibleOnWebsite(category)) return false;
  if (subcategory && !isItemVisibleOnWebsite(subcategory)) return false;
  return isItemVisibleOnWebsite(item);
}

export const makeSlug = (text = "") =>
  String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

export function resolveImageUrl(img, baseUrl = process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL || process.env.ADMIN_API_BASE_URL || "https://admin.rajbiosis.app") {
  if (!img) return "";
  if (typeof img === "object" && img !== null) {
    img = img.url || img.src || img.link || img.secure_url || img.path || "";
  }
  if (typeof img !== "string") return "";
  const trimmed = img.trim();
  if (!trimmed) return "";
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("blob:")
  ) {
    return trimmed;
  }
  if (trimmed.startsWith("//")) {
    return `https:${trimmed}`;
  }
  if (trimmed.startsWith("/uploads/") || trimmed.startsWith("uploads/")) {
    const cleanBase = String(baseUrl || "https://admin.rajbiosis.app").replace(/\/$/, "");
    const cleanPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    return `${cleanBase}${cleanPath}`;
  }
  return trimmed;
}

export const COMPANY_ID = process.env.COMPANY_ID || "rajbiosis";

