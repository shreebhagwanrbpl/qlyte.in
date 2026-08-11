"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { fetchFullCatalog } from "@/lib/data-fetcher";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
  const [contactInfo, setContactInfo] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [districtData, setDistrictData] = useState(null);

  const pathname = usePathname();

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const staticRoutes = [
    "about",
    "services",
    "products",
    "contact",
    "items",
  ];

  const district =
    pathParts.length > 0 &&
      !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  useEffect(() => {
    const loadContact = async () => {
      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "qlytein",
            "pages",
            "contact"
          )
        );

        if (snap.exists()) {
          setContactInfo(
            snap.data().contactInfo || []
          );
        }

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    loadContact();
  }, []);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const catalog = await fetchFullCatalog();
        const catSet = new Set();
        catalog.forEach((item) => {
          if (item.category) catSet.add(item.category);
        });
        const catList = Array.from(catSet).sort();
        setCategories(catList);
      } catch (err) {
        console.error("Error loading categories for footer:", err);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadDistrict = async () => {
      if (!district) return;

      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "qlytein",
            "districts",
            district
          )
        );

        if (snap.exists()) {
          setDistrictData(snap.data());
        }
      } catch (err) {
        console.log(err);
      }
    };

    loadDistrict();
  }, [district]);

  const rawPhone = contactInfo.find((x) => x.label === "Phone Number")?.value;
  const phone = rawPhone && rawPhone.trim() ? rawPhone : "9983123469";
  const displayPhone = "+91 9983123469";

  const email =
    contactInfo.find(
      (x) => x.label === "Email Address"
    )?.value || "";

  const displayEmail = email && email.trim() ? email : "rajbiosis@yahoo.in";

  const address =
    contactInfo.find(
      (x) => x.label === "Office Address"
    )?.value || "";

  const defaultAddress = "F-4, 1st Floor, Plot No. 16, D-Block Tagor Nagar, on Ajmer-Delhi, 200 Feet Bypass Rd, Jaipur, Rajasthan 302021";

  const dynamicAddress =
    districtData
      ? `${districtData.district}, ${districtData.state}, India`
      : (address && address.trim() ? address : defaultAddress);

  const makeLink = (path) => {
    if (!district) return path;

    if (path === "/") {
      return `/${district}`;
    }

    return `/${district}${path}`;
  };

  if (loading) {
    return (
      <footer className="bg-white border-t border-slate-200">
        <div className="container-custom py-16">

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">

            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-8 w-40 bg-slate-200 rounded animate-pulse mb-6" />

                {[...Array(5)].map((_, j) => (
                  <div
                    key={j}
                    className="h-5 bg-slate-200 rounded animate-pulse mb-4"
                  />
                ))}
              </div>
            ))}

          </div>

          <div className="border-t border-slate-200 mt-12 pt-6">
            <div className="h-5 w-72 bg-slate-200 rounded animate-pulse" />
          </div>

        </div>
      </footer>
    );
  }

  return (
    <footer className="relative overflow-hidden bg-[#0F172A] text-white">

      {/* Background Glow */}

      <div className="absolute -top-40 left-0 h-80 w-80 rounded-full bg-[#F4C542]/10 blur-[120px]" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#FFE8A3]/10 blur-[120px]" />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg,#ffffff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 container-custom py-20">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">

          {/* Company */}

          <div className="lg:col-span-1">

            <div className="inline-block rounded-2xl bg-white p-2.5 shadow-md border border-[#F4C542]/30">

              <Image
                src="/logo.png"
                alt="Raj Biosis Private Limited"
                width={180}
                height={60}
                className="h-14 w-auto object-contain"
              />

            </div>

            <p className="mt-6 leading-7 text-slate-300 text-sm">

              Delivering trusted biomedical,
              diagnostic and laboratory
              solutions with innovation,
              precision and nationwide
              healthcare support.

            </p>

            {/* Social Media Icons */}

            <div className="mt-6 flex items-center gap-4">

              <a
                href="https://www.instagram.com/rajbiosisindia/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#F4C542] transition-all hover:bg-[#F4C542] hover:text-[#0F172A] hover:scale-110"
              >

                <FaInstagram size={20} />

              </a>

              <a
                href="https://www.facebook.com/rajbiosispvtltd/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#F4C542] transition-all hover:bg-[#F4C542] hover:text-[#0F172A] hover:scale-110"
              >

                <FaFacebook size={20} />

              </a>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="mb-6 text-xl font-bold text-[#F4C542]">

              Quick Links

            </h3>

            <div className="flex flex-col gap-3 text-sm">

              {[
                ["Home", "/"],
                ["About", "/about"],
                ["Services", "/services"],
                ["Products", "/items"],
                ["Contact", "/contact"],
              ].map(([name, url]) => (

                <Link
                  key={name}
                  href={makeLink(url)}
                  className="text-slate-300 transition hover:translate-x-1 hover:text-[#F4C542]"
                >

                  {name}

                </Link>

              ))}

            </div>

          </div>

          {/* Product Categories */}

          <div>

            <h3 className="mb-6 text-xl font-bold text-[#F4C542]">

              Product Categories

            </h3>

            <div className="flex flex-col gap-3 text-sm">

              {categories.length > 0 ? (
                categories.slice(0, 7).map((cat) => {
                  const catSlug = cat.replace(/\s+/g, "-").toLowerCase();
                  const targetUrl = makeLink(`/items?category=${encodeURIComponent(cat)}#${catSlug}`);

                  return (
                    <Link
                      key={cat}
                      href={targetUrl}
                      className="text-slate-300 transition hover:translate-x-1 hover:text-[#F4C542] line-clamp-1"
                    >

                      {cat}

                    </Link>
                  );
                })
              ) : (
                <p className="text-slate-400 text-sm">Loading categories...</p>
              )}

            </div>

          </div>

          {/* Services */}

          <div>

            <h3 className="mb-6 text-xl font-bold text-[#F4C542]">

              Services

            </h3>

            <div className="space-y-3 text-slate-300 text-sm">

              <p>Diagnostic Equipment</p>

              <p>Laboratory Solutions</p>

              <p>Biomedical Instruments</p>

              <p>Maintenance & AMC</p>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="mb-6 text-xl font-bold text-[#F4C542]">

              Contact Info

            </h3>

            <div className="space-y-5 text-sm">

              <div className="flex gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F4C542]/15 text-[#F4C542]">

                  <MapPin size={16} />

                </div>

                <p className="leading-6 text-slate-300">

                  {dynamicAddress}

                </p>

              </div>

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F4C542]/15 text-[#F4C542]">

                  <Phone size={16} />

                </div>

                <a
                  href="tel:+919983123469"
                  className="text-slate-300 hover:text-[#F4C542] transition font-medium"
                >

                  {displayPhone}

                </a>

              </div>

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F4C542]/15 text-[#F4C542]">

                  <Mail size={16} />

                </div>

                <a
                  href={`mailto:${displayEmail}`}
                  className="text-slate-300 hover:text-[#F4C542] transition font-medium break-all"
                >

                  {displayEmail}

                </a>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 text-sm text-slate-400 md:flex-row">

          <p>

            © 2026 Raj Biosis. All Rights Reserved.

          </p>

          <p>

            Designed with Precision for Modern Healthcare.

          </p>

        </div>

      </div>

    </footer>
  );
}