export async function fetchSiteDoc(key) {
  const keyString = String(key || "");
  if (keyString.startsWith("district:")) {
    const district = keyString.slice("district:".length);
    const response = await fetch(`/api/site-data?type=district&district=${encodeURIComponent(district)}`, {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
    });
    if (!response.ok) throw new Error(`District data API ${response.status}`);
    const data = await response.json();
    return { exists: () => Boolean(data && !data.error), data: () => data };
  }

  const response = await fetch(`/api/site-data?page=${encodeURIComponent(keyString)}`, {
    cache: "no-store",
    headers: { "Cache-Control": "no-cache" },
  });
  if (!response.ok) throw new Error(`Site data API ${response.status}`);
  const data = await response.json();
  return { exists: () => Boolean(data && !data.error), data: () => data };
}

export async function fetchCollectionDocs(type) {
  const response = await fetch(`/api/catalog?mode=${encodeURIComponent(type)}`, {
    cache: "no-store",
    headers: { "Cache-Control": "no-cache" },
  });
  if (!response.ok) throw new Error(`Catalog API ${response.status}`);
  const data = await response.json();
  const list = Array.isArray(data) ? data : [];
  return {
    empty: list.length === 0,
    docs: list.map((item, index) => ({
      id: item.id || item.slug || String(index),
      data: () => item,
    })),
  };
}

export async function submitQuery(endpoint, payload) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Request failed");
  return data;
}
