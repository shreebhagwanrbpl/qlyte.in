"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const [contactInfo, setContactInfo] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const [districtData, setDistrictData] =
    useState(null);

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
            "centralbiomedicals",
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
    const loadDistrict = async () => {
      if (!district) return;

      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "centralbiomedicals",
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

  const phone =
    contactInfo.find(
      (x) => x.label === "Phone Number"
    )?.value || "";

  const email =
    contactInfo.find(
      (x) => x.label === "Email Address"
    )?.value || "";

  const address =
    contactInfo.find(
      (x) => x.label === "Office Address"
    )?.value || "";

  const dynamicAddress =
    districtData
      ? `${districtData.district}, ${districtData.state}, India`
      : address;

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

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Company */}

          <div>

            <h2 className="text-3xl font-black">

              <span className="text-[#F4C542]">

                Central

              </span>

              <span className="text-white">

                {" "}Biomedicals

              </span>

            </h2>

            <p className="mt-6 leading-8 text-slate-300">

              Delivering trusted biomedical,
              diagnostic and laboratory
              solutions with innovation,
              precision and nationwide
              healthcare support.

            </p>

          </div>

          {/* Links */}

          <div>

            <h3 className="mb-6 text-xl font-bold text-[#F4C542]">

              Quick Links

            </h3>

            <div className="flex flex-col gap-4">

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
                  className="text-slate-300 transition hover:translate-x-2 hover:text-[#F4C542]"
                >

                  {name}

                </Link>

              ))}

            </div>

          </div>

          {/* Services */}

          <div>

            <h3 className="mb-6 text-xl font-bold text-[#F4C542]">

              Services

            </h3>

            <div className="space-y-4 text-slate-300">

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

            <div className="space-y-6">

              <div className="flex gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F4C542]/15 text-[#F4C542]">

                  <MapPin size={18} />

                </div>

                <p className="leading-7 text-slate-300">

                  {dynamicAddress}

                </p>

              </div>

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F4C542]/15 text-[#F4C542]">

                  <Phone size={18} />

                </div>

                <p className="text-slate-300">

                  {phone}

                </p>

              </div>

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F4C542]/15 text-[#F4C542]">

                  <Mail size={18} />

                </div>

                <p className="text-slate-300 break-all">

                  {email}

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 text-sm text-slate-400 md:flex-row">

          <p>

            © 2026 Central Biomedicals. All Rights Reserved.

          </p>

          <p>

            Designed with Precision for Modern Healthcare.

          </p>

        </div>

      </div>

    </footer>
  );
}