import { NextResponse } from "next/server";
import { submitAdminQuery } from "@/lib/admin-api";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function POST(request) {
  try {
    const payload = await request.json();
    const data = await submitAdminQuery("api/contact-query", payload);
    return NextResponse.json({ success: true, ...data });
  } catch (error) {
    console.error("Contact query error:", error);
    return NextResponse.json({ success: false, error: "Unable to submit contact query" }, { status: 500 });
  }
}
