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

    const title = `${productName} Supplier in ${districtName} | Price & Specs | Rajbiosis`;
    const description = `Buy ${productName} in ${districtName}. Rajbiosis Private Limited is the leading biomedical and laboratory equipment supplier, dealer and service center in ${districtName}, Rajasthan & India.`;
    
    // Canonical points to main master product page to consolidate rank authority
    const canonicalUrl = `https://qlyte.in/items/${slug}`;
    const pageUrl = `https://qlyte.in/${district}/items/${slug}`;

    return {
        title,
        description,
        keywords: [
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
                    url: product?.images?.[0] || product?.image || "https://qlyte.in/logo.png",
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

    const productSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": `${productName} - ${districtName}`,
        "description": `Buy ${productName} in ${districtName} from Rajbiosis Private Limited. Leading biomedical equipment supplier with installation, warranty & AMC in ${districtName}.`,
        "brand": {
            "@type": "Brand",
            "name": product?.brand || "Rajbiosis Private Limited"
        },
        "offers": {
            "@type": "Offer",
            "url": `https://qlyte.in/items/${slug}`,
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
            "seller": {
                "@type": "Organization",
                "name": "Rajbiosis Private Limited"
            }
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <ProductDetails
                slug={slug}
                district={district}
                initialProduct={product}
            />
        </>
    );
}