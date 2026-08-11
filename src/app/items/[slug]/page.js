import ProductDetails from "./ProductDetails";

export async function generateMetadata({ params }) {
    const { slug } = await params;

    const productName = slug
        ?.replace(/-/g, " ")
        ?.replace(/\b\w/g, (c) => c.toUpperCase());

    const title = `${productName} Supplier in India | Price & Specifications | Rajbiosis Private Limited`;

    const description = `Buy ${productName} at best price in India from Rajbiosis Private Limited. Trusted supplier, dealer and distributor of ${productName} for hospitals, laboratories, diagnostic centers, pathology labs and medical institutes across India.`;

    const url = `https://qlyte.in/items/${slug}`;

    return {
        title,
        description,

        keywords: [
            productName,
            `${productName} Supplier`,
            `${productName} Dealer`,
            `${productName} Distributor`,
            `${productName} Manufacturer`,
            `${productName} Exporter`,
            `${productName} Price`,
            `${productName} Price in India`,
            `${productName} Supplier in India`,
            `${productName} Dealer in India`,
            `${productName} Distributor in India`,
            `Buy ${productName}`,
            `${productName} for Laboratory`,
            `${productName} for Hospital`,
            `${productName} for Diagnostic Center`,
            "Biomedical Equipment",
            "Medical Equipment",
            "Laboratory Equipment",
            "Diagnostic Equipment",
            "Hospital Equipment",
            "Healthcare Equipment",
            "Rajbiosis Private Limited",
            "Raj Biosis",
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
        },

        twitter: {
            card: "summary_large_image",
            title,
            description,
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

    const productName = slug
        ?.replace(/-/g, " ")
        ?.replace(/\b\w/g, (c) => c.toUpperCase());

    const productSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": productName,
        "description": `Buy ${productName} at best price in India from Rajbiosis Private Limited. Trusted biomedical, diagnostic and laboratory equipment supplier for hospitals and pathology labs.`,
        "brand": {
            "@type": "Brand",
            "name": "Rajbiosis Private Limited"
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
                "name": productName,
                "item": `https://qlyte.in/items/${slug}`
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
            <ProductDetails slug={slug} />
        </>
    );
}