export async function generateMetadata({ params }) {

  const { district = "jaipur" } = await params;

  const districtName = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const url = `https://qlyte.in/${district}`;
  const title = `Biomedical & Laboratory Equipment Supplier in ${districtName} | Rajbiosis Private Limited`;
  const description = `Rajbiosis Private Limited is the leading biomedical and laboratory diagnostic equipment supplier, dealer and distributor in ${districtName}. Offering CBC Machines, Hematology Analyzers, Biochemistry Analyzers & Hospital Equipment.`;

  return {
    title,
    description,

    keywords: [
      `Biomedical Equipment ${districtName}`,
      `Diagnostic Machines ${districtName}`,
      `Laboratory Equipment ${districtName}`,
      `Pathology Equipment ${districtName}`,
      `Biomedical Supplier ${districtName}`,
      `CBC Machine Price ${districtName}`,
      `Biochemistry Analyzer Dealer ${districtName}`,
      `Medical Equipment AMC ${districtName}`,
      `Rajbiosis Private Limited ${districtName}`,
    ],

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

export default async function DistrictLayout({ children, params }) {
  const { district = "jaipur" } = await params;

  const districtName = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const districtSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Rajbiosis Private Limited - ${districtName}`,
    "url": `https://qlyte.in/${district}`,
    "telephone": "+91-9983123469",
    "email": "rajbiosis@yahoo.in",
    "description": `Biomedical and pathology laboratory diagnostic equipment supplier in ${districtName}.`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": districtName,
      "addressRegion": "Rajasthan",
      "addressCountry": "IN"
    },
    "parentOrganization": {
      "@type": "Organization",
      "name": "Rajbiosis Private Limited",
      "url": "https://qlyte.in"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(districtSchema) }}
      />
      {children}
    </>
  );
}