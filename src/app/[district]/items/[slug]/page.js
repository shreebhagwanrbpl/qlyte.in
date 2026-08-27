import ProductDetails from "../../../items/[slug]/ProductDetails";
import { getProductBySlug } from "@/lib/data-fetcher-server";

export async function generateMetadata({ params }) {
    const { slug, district = "jaipur" } = await params;
    const product = await getProductBySlug(slug);

    const districtName = district
        ?.replace(/-/g, " ")
        ?.replace(/\b\w/g, (c) => c.toUpperCase());

    const fallbackName = slug
        ?.replace(/-/g, " ")
        ?.replace(/\b\w/g, (c) => c.toUpperCase());

    const productName = product?.title || fallbackName;

    const title = product?.seoTitle
        ? `${product.seoTitle.replace(/\s*\|\s*Rajbiosis.*$/i, "")} in ${districtName} | Rajbiosis`
        : `${productName} Supplier in ${districtName} | Price & Specs | Rajbiosis`;

    const description = `Buy ${productName} in ${districtName}. ${product?.seoDescription ||
        `Rajbiosis Private Limited supplies biomedical and laboratory equipment for hospitals, pathology labs and diagnostic centers.`
        }`;

    // District pages are intentionally indexable and self-canonical
    // so they can target district search intent.
    const canonicalUrl = `https://qlyte.in/${district}/items/${slug}`;
    const pageUrl = canonicalUrl;

    return {
        title,
        description,

        keywords: [
            ...(Array.isArray(product?.seoKeywords)
                ? product.seoKeywords
                : []),
            `${productName} ${districtName}`,
            `Buy ${productName} ${districtName}`,
            `${productName} Supplier ${districtName}`,
            `${productName} Price ${districtName}`,
            `Biomedical Equipment ${districtName}`,
            "Rajbiosis Private Limited",
        ],

        alternates: {
            canonical: canonicalUrl,
        },

        openGraph: {
            title,
            description,
            url: pageUrl,
            siteName: "Rajbiosis Private Limited",
            type: "website",
            images: [
                {
                    url:
                        product?.images?.[0] ||
                        product?.image ||
                        "https://qlyte.in/logo.png",
                    alt: `${productName} in ${districtName}`,
                },
            ],
        },
    };
}

export default async function Page({ params }) {
    const { slug, district } = await params;

    const product = await getProductBySlug(slug);

    const districtName = district
        ?.replace(/-/g, " ")
        ?.replace(/\b\w/g, (c) => c.toUpperCase());

    const fallbackName = slug
        ?.replace(/-/g, " ")
        ?.replace(/\b\w/g, (c) => c.toUpperCase());

    const productName = product?.title || fallbackName;

    // IMPORTANT:
    // pageUrl must be defined inside Page() because the
    // pageUrl inside generateMetadata() is a different scope.
    const pageUrl = `https://qlyte.in/${district}/items/${slug}`;

    const productSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",

        "name": `${productName} - ${districtName}`,

        "description": `Buy ${productName} in ${districtName} from Rajbiosis Private Limited. Leading biomedical equipment supplier with installation, warranty & AMC in ${districtName}.`,

        "brand": {
            "@type": "Brand",
            "name": product?.brand || "Rajbiosis Private Limited",
        },

        "offers": {
            "@type": "Offer",
            "url": pageUrl,
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",

            "seller": {
                "@type": "Organization",
                "name": "Rajbiosis Private Limited",
            },
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(productSchema),
                }}
            />

            <ProductDetails
                slug={slug}
                district={district}
                initialProduct={product}
            />
        </>
    );
}