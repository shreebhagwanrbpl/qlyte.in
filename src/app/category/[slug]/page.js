import { getProductsByCategorySlug, getCategories } from "@/lib/data-fetcher-server";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { ShieldCheck, Truck, Wrench, ChevronRight } from "lucide-react";
import CTASection from "@/components/CTASection";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { categoryName, products } = await getProductsByCategorySlug(slug);

  const title = `${categoryName} Supplier & Dealer in India | Catalog & Price | Rajbiosis`;
  const description = `Browse top-rated ${categoryName} from Rajbiosis Private Limited. Direct supplier of diagnostic analyzers, pathology equipment, installation & AMC services across India.`;
  const url = `https://qlyte.in/category/${slug}`;

  return {
    title,
    description,
    keywords: [
      categoryName,
      `${categoryName} Supplier`,
      `${categoryName} Dealer`,
      `${categoryName} Price`,
      `${categoryName} Specifications`,
      "Biomedical Equipment Supplier India",
      "Pathology Lab Instruments",
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

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const { categoryName, products } = await getProductsByCategorySlug(slug);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${categoryName} Catalog - Rajbiosis Private Limited`,
    "description": `Comprehensive catalog of ${categoryName} supplied by Rajbiosis Private Limited across India.`,
    "url": `https://qlyte.in/category/${slug}`,
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
        "name": categoryName,
        "item": `https://qlyte.in/category/${slug}`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is the price range for ${categoryName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Prices for ${categoryName} depend on throughput, parameters, automation level, and warranty. Contact Rajbiosis Private Limited for exact commercial quotations.`
        }
      },
      {
        "@type": "Question",
        "name": `Do you provide installation and service for ${categoryName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, Rajbiosis Private Limited provides complete installation, user training, warranty, and AMC support for all ${categoryName} instruments across India.`
        }
      }
    ]
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bg-[#FFFDF5] min-h-screen py-12">
        <div className="container-custom">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-[#B88700] transition">Home</Link>
            <ChevronRight size={14} />
            <Link href="/items" className="hover:text-[#B88700] transition">Products</Link>
            <ChevronRight size={14} />
            <span className="font-semibold text-[#1E293B]">{categoryName}</span>
          </nav>

          {/* Banner */}
          <div className="rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] p-8 lg:p-12 text-white shadow-xl mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-64 w-64 bg-[#F4C542]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-3xl">
              <span className="inline-block rounded-full bg-[#F4C542]/20 text-[#F4C542] border border-[#F4C542]/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-4">
                Biomedical Category Hub
              </span>
              <h1 className="text-3xl lg:text-5xl font-black text-white leading-tight">
                {categoryName}
              </h1>
              <p className="mt-4 text-slate-300 text-lg leading-relaxed">
                Explore our full selection of high-precision {categoryName} designed for medical institutes, pathology labs, and diagnostic centers across India.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="text-[#F4C542]" size={18} />
                  <span>100% Genuine Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="text-[#F4C542]" size={18} />
                  <span>Pan-India Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wrench className="text-[#F4C542]" size={18} />
                  <span>AMC & Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Category Informational Guide Section */}
          <div className="bg-white rounded-3xl p-8 lg:p-10 border border-[#F4C542]/20 shadow-md mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#1E293B] mb-4">
              About {categoryName} Solutions
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {categoryName} play a vital role in modern pathology, hospital operations, and clinical diagnostics. At Rajbiosis Private Limited, we partner with top global biomedical brands to bring state-of-the-art instruments featuring automated workflows, high throughput, and precise reagent delivery.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Whether you are upgrading an existing laboratory setup or establishing a new diagnostic facility, our engineering team ensures seamless installation, calibration, and ongoing maintenance.
            </p>
          </div>

          {/* Products Grid */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl lg:text-3xl font-black text-[#1E293B]">
                  Available {categoryName} ({products.length})
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Select an item to view complete technical specifications and request quotes.
                </p>
              </div>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.uid || product.slug} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <p className="text-slate-600 font-medium text-lg">
                  No products currently listed in this category.
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

          {/* Category FAQ Section */}
          <div className="bg-white rounded-3xl p-8 lg:p-10 border border-[#F4C542]/20 shadow-md mb-16">
            <h2 className="text-2xl font-bold text-[#1E293B] mb-6">
              Frequently Asked Questions on {categoryName}
            </h2>
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-bold text-[#1E293B] text-lg">
                  What factors determine the price of {categoryName}?
                </h3>
                <p className="text-slate-600 mt-2 leading-relaxed">
                  Key factors include testing speed (tests per hour), degree of automation (semi-auto vs fully automated), brand reputation, number of parameters, and warranty coverage terms.
                </p>
              </div>
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-bold text-[#1E293B] text-lg">
                  Why choose Rajbiosis Private Limited for {categoryName}?
                </h3>
                <p className="text-slate-600 mt-2 leading-relaxed">
                  Rajbiosis Private Limited provides end-to-end biomedical services including direct supply of authentic machines, genuine reagents, certified installation engineers, and prompt local AMC support across India.
                </p>
              </div>
            </div>
          </div>

          <CTASection />
        </div>
      </div>
    </>
  );
}
