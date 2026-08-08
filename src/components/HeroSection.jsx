"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import CBG from "../components/img/CBG.png";

import {

  ShieldCheck,
  Microscope,
  BadgeCheck,

} from "lucide-react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
export default function HeroSection({ city }) {
  const [loading, setLoading] = useState(true);

  const [heroData, setHeroData] = useState({
    title: "",
    description: "",
    button1Text: "",
    button2Text: "",
  });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const snap = await getDoc(
          doc(db, "websites", "qlytein", "pages", "home")
        );

        if (snap.exists()) {
          setHeroData(snap.data());
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // District Routing
  const districtSlug = city
    ? city.toLowerCase().replace(/\s+/g, "-")
    : "";

  const makeLink = (path) => {
    return districtSlug ? `/${districtSlug}${path}` : path;
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#FFFDF5]">

      {/* Background */}
      <div className="absolute inset-0">

        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-[#FFE8A3]/40 blur-[120px]" />

        <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-[#FFF0B8] blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#D6C17D 1px, transparent 1px), linear-gradient(90deg,#D6C17D 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

      </div>

      <div className="relative z-10 container-custom min-h-screen flex items-center justify-center py-24">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          className="max-w-6xl text-center"
        >

          {/* Badge */}

          <div className="inline-flex items-center gap-3 rounded-full border border-yellow-200 bg-[#FFFDF5] px-5 py-2 shadow-[0_20px_50px_rgba(212,175,55,.18)]">

            <ShieldCheck
              size={18}
              className="text-[#C89200]"
            />

            <span className="font-semibold text-[#C89200]">

              Trusted Biomedical Systems

            </span>

          </div>

          {/* Heading */}

          <h1 className="mt-8 text-5xl md:text-6xl xl:text-8xl font-black leading-tight text-[#1E293B]">

            {loading ? (

              <div className="animate-pulse space-y-4">

                <div className="mx-auto h-12 w-[80%] rounded bg-gray-200"></div>

                <div className="mx-auto h-12 w-[60%] rounded bg-gray-200"></div>

                <div className="mx-auto h-12 w-[70%] rounded bg-gray-200"></div>

              </div>

            ) : (

              <>

                {heroData.title}

                {city && (

                  <span className="block mt-4 text-2xl md:text-3xl font-semibold text-[#C89200]">

                    Serving {city}

                  </span>

                )}

              </>

            )}

          </h1>

          {/* Description */}

          {loading ? (

            <div className="animate-pulse mt-8 space-y-3">

              <div className="mx-auto h-4 w-full rounded bg-gray-200"></div>

              <div className="mx-auto h-4 w-[85%] rounded bg-gray-200"></div>

              <div className="mx-auto h-4 w-[70%] rounded bg-gray-200"></div>

            </div>

          ) : (

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-slate-700">

              {heroData.description}

              {city && (
                <>
                  {" "}
                  delivering trusted biomedical solutions across{" "}
                  <strong>{city}</strong>.
                </>
              )}

            </p>

          )}

          {/* Buttons */}

          <div className="mt-12 flex flex-wrap justify-center gap-5">

            {loading ? (

              <>
                <div className="h-14 w-44 animate-pulse rounded-2xl bg-gray-200"></div>

                <div className="h-14 w-40 animate-pulse rounded-2xl bg-gray-200"></div>
              </>

            ) : (

              <>
                <Link href={makeLink("/services")}>

                  <button className="group flex h-14 items-center gap-3 rounded-2xl bg-gradient-to-r from-[#B88700] to-[#F4C542] px-8 font-semibold text-white shadow-xl transition hover:scale-105">

                    {heroData.button1Text || "Explore Services"}

                    <ArrowRight
                      size={18}
                      className="transition group-hover:translate-x-1"
                    />

                  </button>

                </Link>

                <Link href={makeLink("/contact")}>

                  <button className="h-14 rounded-2xl border border-yellow-300 bg-[#FFFDF5] px-8 font-semibold text-slate-700 transition hover:border-yellow-400 hover:bg-yellow-50">

                    {heroData.button2Text || "Contact Us"}

                  </button>

                </Link>

              </>

            )}

          </div>

          {/* Stats */}

          <div className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4">

            {[
              ["10+", "Years Experience"],
              ["500+", "Products Delivered"],
              ["100%", "Quality Assurance"],
              ["24/7", "Support"],
            ].map(([value, label]) => (

              <div
                key={label}
                className="rounded-3xl border border-yellow-100 bg-[#FFFDF5]/80 p-6 backdrop-blur-lg shadow-[0_20px_50px_rgba(212,175,55,.18)]"
              >

                <h3 className="text-4xl font-black text-[#C89200]">

                  {value}

                </h3>

                <p className="mt-2 text-sm text-slate-500">

                  {label}

                </p>

              </div>

            ))}

          </div>

        </motion.div>

      </div>

    </section>
  );
}