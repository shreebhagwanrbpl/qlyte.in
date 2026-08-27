import { fetchFullCatalog, getCategories, getBrands, fetchDistricts } from "@/lib/data-fetcher-server";

export default async function sitemap() {
    const baseUrl = "https://qlyte.in";
    const urls = [];

    // Static Pages
    urls.push(
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/items`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        }
    );

    try {
        // DISTRICT HUBS
        const districts = await fetchDistricts();
        districts.forEach((district) => {
            if (!district.slug) return;
            urls.push({
                url: `${baseUrl}/${district.slug}`,
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: 0.8,
            });
        });

        // CATEGORY HUBS
        const categories = await getCategories();
        categories.forEach((cat) => {
            if (!cat.slug) return;
            urls.push({
                url: `${baseUrl}/category/${cat.slug}`,
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: 0.8,
            });
        });

        // BRAND HUBS
        const brands = await getBrands();
        brands.forEach((brand) => {
            if (!brand.slug) return;
            urls.push({
                url: `${baseUrl}/brand/${brand.slug}`,
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: 0.75,
            });
        });

        // PRIMARY PRODUCTS (without district)
        const products = await fetchFullCatalog();
        products.forEach((product) => {
            const slug = product.slug || product.productSlug;
            if (!slug) return;

            urls.push({
                url: `${baseUrl}/items/${slug}`,
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: 0.9,
            });
        });

        // DISTRICT PRODUCT PAGES (with district)
        // These are separate indexable pages with self-canonical URLs.
        districts.forEach((district) => {
            if (!district.slug) return;
            products.forEach((product) => {
                const slug = product.slug || product.productSlug;
                if (!slug) return;
                urls.push({
                    url: `${baseUrl}/${district.slug}/items/${slug}`,
                    lastModified: new Date(),
                    changeFrequency: "weekly",
                    priority: 0.85,
                });
            });
        });
    } catch (error) {
        console.error("Sitemap Generation Error:", error);
    }

    return urls;
}
