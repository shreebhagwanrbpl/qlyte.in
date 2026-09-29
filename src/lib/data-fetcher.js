const noStore = { cache: "no-store", headers: { "Cache-Control": "no-cache" } };

async function requestJson(url) {
  const response = await fetch(url, noStore);
  if (!response.ok) throw new Error(`Data API ${response.status}`);
  return response.json();
}

export async function fetchDocCached(pathValue) {
  const parts = String(pathValue).split("/");
  const websiteIndex = parts.indexOf("websites");
  const pageIndex = parts.indexOf("pages");
  if (websiteIndex >= 0 && pageIndex >= 0) {
    const pageType = parts[pageIndex + 1];
    return fetchSiteData(pageType);
  }
  return null;
}

export async function fetchHomeData() { return fetchSiteData("home"); }
export async function fetchContactData() { return fetchSiteData("contact"); }
export async function fetchServicesData() { return fetchSiteData("services"); }

export async function fetchDistrictData(district) {
  if (!district) return null;
  return requestJson(`/api/site-data?type=district&district=${encodeURIComponent(district)}`);
}

export async function fetchSiteData(page) {
  return requestJson(`/api/site-data?page=${encodeURIComponent(page)}`);
}

export async function fetchFullCatalog() {
  const data = await requestJson("/api/catalog");
  return Array.isArray(data) ? data : (data.products || []);
}
