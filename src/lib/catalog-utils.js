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
