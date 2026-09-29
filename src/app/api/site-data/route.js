import { NextResponse } from "next/server";
import {
  fetchHomeData,
  fetchContactData,
  fetchServicesData,
  fetchDistrictData,
} from "@/lib/data-fetcher-server";
import { WEBSITE_ID } from "@/lib/catalog-utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET(request) {
  const params = new URL(request.url).searchParams;
  const page = params.get("page");
  const type = params.get("type");
  try {
    let data = null;
    if (type === "district") data = await fetchDistrictData(params.get("district"));
    else if (page === "home") data = await fetchHomeData();
    else if (page === "contact") data = await fetchContactData();
    else if (page === "services") data = await fetchServicesData();
    else return NextResponse.json({ error: "Invalid page" }, { status: 400 });

    return NextResponse.json(data || {}, {
      headers: { "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0" },
    });
  } catch (error) {
    console.error("Site data API error:", error);
    return NextResponse.json({ error: "Site data unavailable", websiteId: WEBSITE_ID }, { status: 500 });
  }
}
