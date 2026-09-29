import { NextResponse } from "next/server";
import { submitAdminQuery } from "@/lib/admin-api";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function POST(request) {
  try {
    const payload = await request.json();
    const data = await submitAdminQuery("api/product-query", payload);
    return NextResponse.json({ success: true, ...data });
  } catch (error) {
    console.error("Product query error:", error);
    return NextResponse.json({ success: false, error: "Unable to submit product query" }, { status: 500 });
  }
}
