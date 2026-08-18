import CategoryPage, { generateMetadata as generateCategoryMetadata, generateStaticParams as generateCategoryParams } from "@/app/category/[slug]/page";

export async function generateStaticParams() {
  return generateCategoryParams();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const meta = await generateCategoryMetadata({ params });

  const rawTitle = meta.title || "";
  const labTitle = `Laboratory Equipment - ${rawTitle}`;
  const canonicalUrl = `https://qlyte.in/laboratory-equipment/${slug}`;

  return {
    ...meta,
    title: labTitle,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function Page({ params }) {
  return <CategoryPage params={params} />;
}
