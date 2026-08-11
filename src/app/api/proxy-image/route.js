export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return new Response(JSON.stringify({ error: "Missing url param" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const res = await fetch(imageUrl);
    if (!res.ok) {
      return new Response(JSON.stringify({ error: `Failed to fetch image: ${res.status}` }), {
        status: res.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const contentType = res.headers.get("content-type") || "image/jpeg";
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = `data:${contentType};base64,${buffer.toString("base64")}`;

    return new Response(JSON.stringify({ base64 }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (err) {
    console.error("Proxy image error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
