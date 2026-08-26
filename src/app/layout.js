import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  metadataBase: new URL(
    "https://qlyte.in"
  ),

  title:
    "Biomedical Equipment & Diagnostic Machines Supplier | Rajbiosis Private Limited",

  description:
    "Rajbiosis Private Limited is India's trusted supplier of CBC Machines, Hematology Analyzers, Biochemistry Analyzers, Blood Gas Analyzers, ELISA Readers, and Pathology Laboratory Equipment with complete installation, AMC & warranty.",

  keywords: [
    "Rajbiosis Private Limited",
    "Raj Biosis",
    "Biomedical Equipment Supplier India",
    "Laboratory Equipment Supplier Jaipur",
    "CBC Machine Price India",
    "Hematology Analyzer Supplier",
    "Biochemistry Analyzer Supplier",
    "Blood Gas Analyzer Supplier",
    "ELISA Reader Supplier",
    "Diagnostic Equipment Supplier",
    "Pathology Lab Equipment Price",
    "Medical Equipment AMC & Calibration Jaipur",
  ],

  openGraph: {
    title:
      "Biomedical Equipment & Diagnostic Machines Supplier | Rajbiosis Private Limited",

    description:
      "Rajbiosis Private Limited supplies premium CBC Machines, Hematology Analyzers, Biochemistry Analyzers & Laboratory Diagnostics across India.",

    url: "https://qlyte.in",

    siteName: "Rajbiosis Private Limited",

    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Rajbiosis Private Limited Logo",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Comprehensive Biomedical Equipment Supplier Across India | Rajbiosis Private Limited",

    description:
      "Your Trusted Partner for Biomedical & Laboratory Equipment Across India.",

    images: ["/logo.png"],
  },

  alternates: {
    canonical: "https://qlyte.in",
  },
};

export default function RootLayout({
  children,
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Rajbiosis Private Limited",
    "alternateName": ["Raj Biosis", "Raj Biosis Pvt Ltd"],
    "url": "https://qlyte.in",
    "logo": "https://qlyte.in/logo.png",
    "image": "https://qlyte.in/logo.png",
    "description": "Rajbiosis Private Limited is a premier biomedical and laboratory diagnostic equipment supplier across India, offering CBC machines, hematology analyzers, biochemistry analyzers, blood gas analyzers, ELISA readers, and hospital supplies.",
    "telephone": "+91-9983123469",
    "email": "rajbiosis@yahoo.in",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "F-4, 1st Floor, Plot No. 16, D-Block Tagor Nagar, on Ajmer-Delhi, 200 Feet Bypass Rd",
      "addressLocality": "Jaipur",
      "addressRegion": "Rajasthan",
      "postalCode": "302021",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 26.8851,
      "longitude": 75.7483
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "19:00"
    },
    "sameAs": [
      "https://www.instagram.com/rajbiosisindia/",
      "https://www.facebook.com/rajbiosispvtltd/"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Navbar />

        <main>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
            }}
          />

          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}