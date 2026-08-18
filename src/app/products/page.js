import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import ProductsClient from "../items/ProductsClient";

export const revalidate = 3600;

export const metadata = {
  title: "Biomedical Equipment & Diagnostic Machine Catalog | Rajbiosis",
  description: "Browse Rajbiosis Private Limited catalog of CBC machines, hematology analyzers, biochemistry analyzers, blood gas analyzers, ELISA readers, and pathology laboratory equipment across India.",
  keywords: [
    "Biomedical Equipment Catalog",
    "Laboratory Equipment List",
    "CBC Machine Catalog",
    "Hematology Analyzer Models",
    "Biochemistry Analyzer Catalog",
    "Pathology Equipment India",
    "Rajbiosis Private Limited",
  ],
  alternates: {
    canonical: "https://qlyte.in/items",
  },
  openGraph: {
    title: "Biomedical Equipment Catalog | Rajbiosis Private Limited",
    description: "Full catalog of diagnostic and biomedical laboratory equipment across India.",
    url: "https://qlyte.in/items",
    siteName: "Rajbiosis Private Limited",
    type: "website",
  },
};

export default async function ProductsPage({ district = null, city = null }) {
  const allProducts = await fetchFullCatalog();

  return (
    <ProductsClient
      initialProducts={allProducts}
      district={district}
      city={city}
    />
  );
}