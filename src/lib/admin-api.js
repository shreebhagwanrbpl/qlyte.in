// src/lib/admin-api.js
import { WEBSITE_ID } from "./catalog-utils.js";

export const ADMIN_API_BASE_URL =
  process.env.ADMIN_API_BASE_URL ||
  process.env.ADMIN_API_URL ||
  process.env.SQLITE_ADMIN_API_URL ||
  "https://admin.rajbiosis.app";

export const ADMIN_API_LOCAL_URL = "http://localhost:3000";

function joinUrl(base, pathname) {
  return `${String(base).replace(/\/+$/, "")}/${String(pathname).replace(/^\/+/, "")}`;
}

export async function adminFetch(pathname, options = {}) {
  const url = joinUrl(ADMIN_API_BASE_URL, pathname);
  const response = await fetch(url, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(options.headers || {}),
    },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Admin API ${response.status}: ${response.statusText}`);
  }
  return response;
}

export async function submitAdminQuery(endpoint, payload) {
  const body = JSON.stringify({
    ...payload,
    websiteId: WEBSITE_ID,
  });

  const candidates = [ADMIN_API_BASE_URL];
  if (ADMIN_API_BASE_URL !== ADMIN_API_LOCAL_URL) candidates.push(ADMIN_API_LOCAL_URL);

  let lastError;
  for (const base of candidates) {
    try {
      const response = await fetch(joinUrl(base, endpoint), {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body,
        cache: "no-store",
      });
      if (response.ok) return response.json().catch(() => ({ success: true }));
      lastError = new Error(`Admin API ${response.status}: ${response.statusText}`);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error("Unable to submit query");
}
