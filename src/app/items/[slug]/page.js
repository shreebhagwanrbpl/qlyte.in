import ProductDetails from "./ProductDetails";
import { getProductBySlug } from "@/lib/data-fetcher-server";

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    const fallbackName = slug
        ?.replace(/-/g, " ")
        ?.replace(/\b\w/g, (c) => c.toUpperCase());

    const title = product?.title
        ? `${product.title} Supplier in India | Price & Specifications | Rajbiosis`
        : `${fallbackName} Supplier in India | Price & Specs | Rajbiosis Private Limited`;

    const description = product?.description
        ? `${product.description.slice(0, 155)}... Buy ${product.title} at best price in India from Rajbiosis Private Limited. Direct supplier & distributor.`
        : `Buy ${fallbackName} at best price in India from Rajbiosis Private Limited. Trusted supplier, dealer and distributor of ${fallbackName} for hospitals and pathology labs across India.`;

    const url = `https://qlyte.in/items/${slug}`;
    const mainImage = product?.images?.[0] || product?.image || "https://qlyte.in/logo.png";
    const brandName = product?.brand || "Rajbiosis Private Limited";
    const categoryName = product?.category || "Biomedical Equipment";

    return {
        title,
        description,
        keywords: [
            product?.title || fallbackName,
            `${product?.title || fallbackName} Supplier`,
            `${product?.title || fallbackName} Dealer`,
            `${product?.title || fallbackName} Distributor`,
            `${product?.title || fallbackName} Price`,
            `${product?.title || fallbackName} Price in India`,
            `${product?.title || fallbackName} Specifications`,
            brandName,
            categoryName,
            "Biomedical Equipment Supplier India",
            "Pathology Laboratory Equipment",
            "Medical Equipment Supplier Jaipur",
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
            locale: "en_IN",
            images: [
                {
                    url: mainImage,
                    width: 800,
                    height: 600,
                    alt: product?.title || fallbackName,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [mainImage],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        metadataBase: new URL("https://qlyte.in"),
    };
}

export default async function Page({ params }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    const fallbackName = slug
        ?.replace(/-/g, " ")
        ?.replace(/\b\w/g, (c) => c.toUpperCase());

    const productName = product?.title || fallbackName;
    const mainImage = product?.images?.[0] || product?.image || "https://qlyte.in/logo.png";
    const brandName = product?.brand || "Rajbiosis Private Limited";
    const categoryName = product?.category || "Biomedical Equipment";

    const productSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": productName,
        "image": product?.images?.length ? product.images : [mainImage],
        "description": product?.description || `Buy ${productName} at best price in India from Rajbiosis Private Limited. Leading biomedical equipment supplier.`,
        "category": categoryName,
        "brand": {
            "@type": "Brand",
            "name": brandName
        },
        "offers": {
            "@type": "Offer",
            "url": `https://qlyte.in/items/${slug}`,
            "priceCurrency": "INR",
            "priceValidUntil": "2028-12-31",
            "itemCondition": "https://schema.org/NewCondition",
            "availability": "https://schema.org/InStock",
            "seller": {
                "@type": "Organization",
                "name": "Rajbiosis Private Limited"
            }
        }
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://qlyte.in"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Products",
                "item": "https://qlyte.in/items"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": categoryName,
                "item": `https://qlyte.in/items?category=${encodeURIComponent(categoryName)}`
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": productName,
                "item": `https://qlyte.in/items/${slug}`
            }
        ]
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": `What is ${productName} used for?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `${productName} is utilized in hospital laboratories, pathology labs, and diagnostic centers for precise clinical diagnostic analysis and testing.`
                }
            },
            {
                "@type": "Question",
                "name": `Does Rajbiosis provide warranty and AMC for ${productName}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Yes, Rajbiosis Private Limited provides standard manufacturer warranty, complete installation assistance, staff training, and Annual Maintenance Contracts (AMC) across India.`
                }
            },
            {
                "@type": "Question",
                "name": `How can I request a quotation for ${productName}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `You can submit a quick enquiry through the product page or contact Rajbiosis Private Limited directly at +91-9983123469 or email rajbiosis@yahoo.in to receive an official commercial quote.`
                }
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <ProductDetails slug={slug} initialProduct={product} />
        </>
    );
}