import { NextResponse } from "next/server";
import { fetchFullCatalog, fetchCatalogCategories } from "@/lib/data-fetcher-server";
import { WEBSITE_ID } from "@/lib/catalog-utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET(request) {
  try {
    const mode = new URL(request.url).searchParams.get("mode");
    const data = mode === "categories" ? await fetchCatalogCategories() : await fetchFullCatalog();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0" },
    });
  } catch (error) {
    console.error("Catalog API error:", error);
    return NextResponse.json({ error: "Catalog unavailable", websiteId: WEBSITE_ID }, { status: 500 });
  }
}
