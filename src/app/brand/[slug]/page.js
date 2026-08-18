import { getProductsByBrandSlug, getBrands } from "@/lib/data-fetcher-server";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { ShieldCheck, Truck, Wrench, ChevronRight } from "lucide-react";
import CTASection from "@/components/CTASection";

export async function generateStaticParams() {
  const brands = await getBrands();
  return brands.map((b) => ({
    slug: b.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { brandName, products } = await getProductsByBrandSlug(slug);

  const title = `${brandName} Laboratory & Diagnostic Equipment Supplier in India | Rajbiosis`;
  const description = `Authorized supplier and distributor of genuine ${brandName} biomedical machines, analyzers, reagents, installation and AMC services across India.`;
  const url = `https://qlyte.in/brand/${slug}`;

  return {
    title,
    description,
    keywords: [
      brandName,
      `${brandName} Supplier`,
      `${brandName} Distributor`,
      `${brandName} Price in India`,
      `${brandName} Analyzer Price`,
      "Biomedical Equipment Distributor",
      "Rajbiosis Private Limited",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Rajbiosis Private Limited",
      type: "website",
    },
  };
}

export default async function BrandPage({ params }) {
  const { slug } = await params;
  const { brandName, products } = await getProductsByBrandSlug(slug);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${brandName} Products - Rajbiosis Private Limited`,
    "description": `Authorized catalog of ${brandName} biomedical equipment and clinical analyzers supplied across India.`,
    "url": `https://qlyte.in/brand/${slug}`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": products.length,
      "itemListElement": products.map((p, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": p.title,
        "url": `https://qlyte.in/items/${p.slug}`,
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://qlyte.in",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": "https://qlyte.in/items",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": brandName,
        "item": `https://qlyte.in/brand/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="bg-[#FFFDF5] min-h-screen py-12">
        <div className="container-custom">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-[#B88700] transition">Home</Link>
            <ChevronRight size={14} />
            <Link href="/items" className="hover:text-[#B88700] transition">Products</Link>
            <ChevronRight size={14} />
            <span className="font-semibold text-[#1E293B]">{brandName}</span>
          </nav>

          {/* Banner */}
          <div className="rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] p-8 lg:p-12 text-white shadow-xl mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-64 w-64 bg-[#F4C542]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-3xl">
              <span className="inline-block rounded-full bg-[#F4C542]/20 text-[#F4C542] border border-[#F4C542]/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-4">
                Brand Hub
              </span>
              <h1 className="text-3xl lg:text-5xl font-black text-white leading-tight">
                {brandName} Medical Equipment
              </h1>
              <p className="mt-4 text-slate-300 text-lg leading-relaxed">
                Browse our selection of genuine {brandName} laboratory equipment, diagnostic analyzers, and original reagents backed by full warranty and technical support.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="text-[#F4C542]" size={18} />
                  <span>100% Genuine Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="text-[#F4C542]" size={18} />
                  <span>Nationwide Distribution</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wrench className="text-[#F4C542]" size={18} />
                  <span>Certified Engineers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Brand Info */}
          <div className="bg-white rounded-3xl p-8 lg:p-10 border border-[#F4C542]/20 shadow-md mb-12">
            <h2 className="text-2xl font-bold text-[#1E293B] mb-3">
              Trusted {brandName} Sales & Service Across India
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Rajbiosis Private Limited is a reliable distributor and sales/service partner for {brandName} diagnostic equipment. We assist hospitals, diagnostic laboratories, and medical institutions in selecting, installing, and servicing high-performance {brandName} systems.
            </p>
          </div>

          {/* Products Grid */}
          <div className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-black text-[#1E293B] mb-8">
              {brandName} Catalog ({products.length})
            </h2>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.uid || product.slug} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <p className="text-slate-600 font-medium text-lg">
                  No products found under {brandName}.
                </p>
                <Link
                  href="/items"
                  className="mt-4 inline-block bg-[#B88700] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#966d00] transition"
                >
                  Browse Full Catalog
                </Link>
              </div>
            )}
          </div>

          <CTASection />
        </div>
      </div>
    </>
  );
}
