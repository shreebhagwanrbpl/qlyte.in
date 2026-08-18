import CategoryPage, { generateMetadata as generateCategoryMetadata, generateStaticParams as generateCategoryParams } from "@/app/category/[slug]/page";

export async function generateStaticParams() {
  return generateCategoryParams();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const meta = await generateCategoryMetadata({ params });

  const rawTitle = meta.title || "";
  const bioTitle = `Biomedical Equipment - ${rawTitle}`;
  const canonicalUrl = `https://qlyte.in/biomedical-equipment/${slug}`;

  return {
    ...meta,
    title: bioTitle,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function Page({ params }) {
  return <CategoryPage params={params} />;
}
