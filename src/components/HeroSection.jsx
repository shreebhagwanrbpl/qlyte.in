"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import {
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function HeroSection({ city }) {
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [heroData, setHeroData] = useState({
    title: "",
    description: "",
    button1Text: "",
    button2Text: "",
  });

  const heroSlides = [
    {
      id: 1,
      image: "/hero-1.png",
      tag: "Biochemistry & Hematology",
      title: "Advanced Diagnostic Analyzers",
      subtitle: "High-throughput, fully automated blood and pathology testing systems for modern laboratories.",
    },
    {
      id: 2,
      image: "/hero-2.png",
      tag: "Blood Gas & Critical Care",
      title: "Precision Medical Equipment",
      subtitle: "State-of-the-art diagnostic instruments designed for hospitals and healthcare centers.",
    },
    {
      id: 3,
      image: "/hero-3.png",
      tag: "Pathology & Lab Solutions",
      title: "Complete Healthcare Excellence",
      subtitle: "Reliable equipment with complete installation, warranty, AMC, and technical support.",
    },
  ];

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

  // Auto slide effect every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // District Routing
  const districtSlug = city
    ? city.toLowerCase().replace(/\s+/g, "-")
    : "";

  const makeLink = (path) => {
    return districtSlug ? `/${districtSlug}${path}` : path;
  };

  const displayTitle = heroData.title || "Rajbiosis Private Limited - Leading Biomedical Equipment Supplier";
  const displayDesc = heroData.description || "Delivering trusted biomedical, diagnostic, and laboratory equipment with precision, innovation, and nationwide support across India.";

  return (
    <section className="relative overflow-hidden bg-[#FFFDF5] pt-12 pb-20 md:pt-16 md:pb-28">

      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
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

      <div className="relative z-10 container-custom">

        {/* Top Tagline Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-3 rounded-full border border-yellow-200 bg-white/80 backdrop-blur-md px-5 py-2 shadow-[0_15px_40px_rgba(212,175,55,.15)]">
            <ShieldCheck size={18} className="text-[#C89200]" />
            <span className="text-sm font-bold text-[#C89200]">
              Rajbiosis Private Limited • Trusted Biomedical Systems
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Left Text Area */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-[#1E293B]">
              {loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-12 w-[85%] rounded-xl bg-gray-200"></div>
                  <div className="h-12 w-[65%] rounded-xl bg-gray-200"></div>
                </div>
              ) : (
                <>
                  {displayTitle}
                  {city && (
                    <span className="block mt-3 text-2xl lg:text-3xl font-bold text-[#C89200]">
                      Serving {city}
                    </span>
                  )}
                </>
              )}
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-8 text-slate-700 max-w-2xl mx-auto lg:mx-0">
              {loading ? (
                <span className="animate-pulse block h-16 w-full rounded-xl bg-gray-200" />
              ) : (
                <>
                  {displayDesc}
                  {city && (
                    <> delivering trusted healthcare equipment across <strong>{city}</strong>.</>
                  )}
                </>
              )}
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
              <Link href={makeLink("/services")}>
                <button className="group flex h-14 items-center gap-3 rounded-2xl bg-gradient-to-r from-[#B88700] via-[#D4A017] to-[#F4C542] px-8 font-bold text-white shadow-[0_15px_40px_rgba(212,175,55,.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_50px_rgba(212,175,55,.45)]">
                  <span>{heroData.button1Text || "Explore Services"}</span>
                  <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                </button>
              </Link>

              <Link href={makeLink("/contact")}>
                <button className="h-14 rounded-2xl border border-[#D4A017]/30 bg-white px-8 font-bold text-slate-800 shadow-sm transition-all duration-300 hover:bg-[#FEF3C7] hover:border-[#D4A017]">
                  {heroData.button2Text || "Contact Us"}
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Right Image Carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative overflow-hidden rounded-[36px] border border-[#F4C542]/30 bg-white shadow-[0_30px_80px_rgba(15,23,42,.14)] group">

              {/* Slide Images */}
              <div className="relative h-[340px] sm:h-[420px] lg:h-[460px] w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={heroSlides[currentSlide].image}
                      alt={heroSlides[currentSlide].title}
                      fill
                      priority
                      className="object-cover"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/30 to-transparent" />

                    {/* Caption Overlay */}
                    <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4C542] px-3.5 py-1 text-xs font-bold text-[#0F172A] shadow-md mb-2">
                        <Sparkles size={13} />
                        {heroSlides[currentSlide].tag}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black leading-tight text-white drop-shadow-md">
                        {heroSlides[currentSlide].title}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-slate-200 line-clamp-2 leading-relaxed drop-shadow">
                        {heroSlides[currentSlide].subtitle}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Prev / Next Arrows */}
              <button
                onClick={prevSlide}
                aria-label="Previous Slide"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#0F172A]/60 text-white backdrop-blur-md transition-all hover:bg-[#F4C542] hover:text-[#0F172A] hover:scale-110"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={nextSlide}
                aria-label="Next Slide"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#0F172A]/60 text-white backdrop-blur-md transition-all hover:bg-[#F4C542] hover:text-[#0F172A] hover:scale-110"
              >
                <ChevronRight size={20} />
              </button>

              {/* Pagination Dots */}
              <div className="absolute top-5 right-6 z-20 flex items-center gap-2 rounded-full bg-[#0F172A]/50 backdrop-blur-md px-3 py-1.5 border border-white/20">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentSlide === idx ? "w-7 bg-[#F4C542]" : "w-2.5 bg-white/50 hover:bg-white"
                    }`}
                  />
                ))}
              </div>

            </div>
          </motion.div>

        </div>

        {/* Stats Row */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {[
            ["10+", "Years Experience"],
            ["500+", "Products Delivered"],
            ["100%", "Quality Assurance"],
            ["24/7", "Technical Support"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-3xl border border-[#F4C542]/20 bg-white/80 p-6 backdrop-blur-md text-center shadow-[0_15px_35px_rgba(212,175,55,.12)] transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-3xl sm:text-4xl font-black text-[#C89200]">
                {value}
              </h3>
              <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-600">
                {label}
              </p>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}