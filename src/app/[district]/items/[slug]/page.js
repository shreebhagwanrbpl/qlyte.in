import ProductDetails from "../../../items/[slug]/ProductDetails";

export async function generateMetadata({ params }) {
    const { slug, district = "jaipur" } = await params;

    const districtName = district
        ?.replace(/-/g, " ")
        ?.replace(/\b\w/g, (c) => c.toUpperCase());

    const productName = slug
        ?.replace(/-/g, " ")
        ?.replace(/\b\w/g, (c) => c.toUpperCase());

    const title = `${productName} Supplier in ${districtName} | Price & Specs | Rajbiosis Private Limited`;
    const description = `Buy ${productName} in ${districtName}. Rajbiosis Private Limited is the leading biomedical and laboratory equipment supplier, dealer and service center in ${districtName}, Rajasthan & India.`;
    const url = `https://qlyte.in/${district}/items/${slug}`;

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

export default async function Page({ params }) {
    const { slug, district } = await params;

    const districtName = district
        ?.replace(/-/g, " ")
        ?.replace(/\b\w/g, (c) => c.toUpperCase());

    const productName = slug
        ?.replace(/-/g, " ")
        ?.replace(/\b\w/g, (c) => c.toUpperCase());

    const productSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": `${productName} - ${districtName}`,
        "description": `Buy ${productName} in ${districtName} from Rajbiosis Private Limited. Leading biomedical equipment supplier with installation, warranty & AMC in ${districtName}.`,
        "brand": {
            "@type": "Brand",
            "name": "Rajbiosis Private Limited"
        },
        "offers": {
            "@type": "Offer",
            "url": `https://qlyte.in/${district}/items/${slug}`,
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
            />
        </>
    );
}