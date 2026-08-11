export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://qlyte.in/sitemap.xml",
    host: "https://qlyte.in",
  };
}