"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { fetchSiteDoc } from "@/lib/site-data-client";
import {
  ShieldCheck,
  CheckCircle2,
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
    badgeText: "",
  });

  const heroSlides = [
    {
      id: 1,
      image: "/hero-1.png",
      tag: "Biochemistry & Hematology",
      title: "Fast & Accurate Testing Systems",
      subtitle: "Automated clinical analyzers engineered for seamless daily diagnostics.",
    },
    {
      id: 2,
      image: "/hero-2.png",
      tag: "Critical Care Diagnostic",
      title: "High Precision Lab Machinery",
      subtitle: "Calibrated for dependable accuracy across hospitals and testing centers.",
    },
    {
      id: 3,
      image: "/hero-3.png",
      tag: "Engineering & Support",
      title: "Complete Technical Assistance",
      subtitle: "Direct delivery, certified installation, warranty, and lifetime support.",
    },
  ];

  useEffect(() => {
    let isMounted = true;
    const fetchHeroData = async () => {
      try {
        const snap = await fetchSiteDoc("home");
        if (snap && typeof snap.exists === "function" && snap.exists() && isMounted) {
          setHeroData(snap.data() || {});
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchHeroData();
    return () => {
      isMounted = false;
    };
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

  const displayTitle =
    heroData.title ||
    "Modern Medical & Diagnostic Equipment for Modern Labs";

  const displayDesc =
    heroData.description ||
    "Providing high-precision electrolyte analyzers, biochemistry systems, and dependable technical care for hospitals and diagnostic centers.";

  const primaryBtn = heroData.button1Text || "Explore Equipment";
  const secondaryBtn = heroData.button2Text || "Contact Us";

  return (
    <section className="relative overflow-hidden bg-[#FFFDF5] pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20">
      {/* Background Subtle Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[500px] rounded-full bg-amber-100/40 blur-[100px]" />
        <div className="absolute top-1/2 right-0 h-[280px] w-[280px] rounded-full bg-yellow-100/30 blur-[90px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#D4A017 1px, transparent 1px), linear-gradient(90deg,#D4A017 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 container-custom">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 text-center lg:text-left"
          >
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/60 bg-amber-50/90 px-3.5 py-1.5 text-xs font-semibold text-amber-900 shadow-sm backdrop-blur-md mb-4 sm:mb-5">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
              </span>
              <ShieldCheck size={14} className="text-amber-700" />
              <span>
                {heroData.badgeText || "Certified Diagnostic & Biomedical Equipment"}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-black tracking-tight text-slate-900 leading-[1.18]">
              {loading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-10 w-[90%] rounded-lg bg-amber-100/60 mx-auto lg:mx-0" />
                  <div className="h-10 w-[70%] rounded-lg bg-amber-100/60 mx-auto lg:mx-0" />
                </div>
              ) : (
                <>
                  {displayTitle}
                  {city && (
                    <span className="block mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-amber-600">
                      in {city}
                    </span>
                  )}
                </>
              )}
            </h1>

            {/* Description */}
            <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {loading ? (
                <span className="animate-pulse block h-14 w-full rounded-lg bg-amber-100/40" />
              ) : (
                <>
                  {displayDesc}
                  {city && (
                    <> Dedicated service and fast delivery across <strong>{city}</strong>.</>
                  )}
                </>
              )}
            </p>

            {/* Quick Micro-Trust Badges */}
            <div className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-xs sm:text-sm font-medium text-slate-700">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                Direct Manufacturer Warranty
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                Certified On-Site Setup
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                24/7 Service Support
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
              <Link href={makeLink("/items")}>
                <button className="group inline-flex h-12 sm:h-13 items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 px-6 sm:px-7 font-bold text-white shadow-[0_8px_20px_rgba(217,119,6,0.25)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_26px_rgba(217,119,6,0.35)] active:scale-[0.98]">
                  <span>{primaryBtn}</span>
                  <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </Link>
              <Link href={makeLink("/contact")}>
                <button className="inline-flex h-12 sm:h-13 items-center justify-center gap-2 rounded-xl border border-slate-300/80 bg-white/95 px-6 sm:px-7 font-semibold text-slate-800 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-amber-50/60 hover:border-amber-400 hover:text-amber-900 active:scale-[0.98]">
                  {secondaryBtn}
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Right Showcase Carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-amber-200/60 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)] group">
              {/* Slide Viewport */}
              <div className="relative h-[270px] sm:h-[340px] lg:h-[380px] w-full bg-slate-900">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={heroSlides[currentSlide].image}
                      alt={heroSlides[currentSlide].title}
                      fill
                      priority
                      className="object-cover"
                    />

                    {/* Subtle Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent" />

                    {/* Bottom Caption */}
                    <div className="absolute bottom-5 left-5 right-5 z-10 text-white">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-0.5 text-xs font-bold text-slate-950 shadow-sm mb-2">
                        <Sparkles size={12} />
                        {heroSlides[currentSlide].tag}
                      </span>
                      <h3 className="text-lg sm:text-xl font-black leading-tight text-white drop-shadow-sm">
                        {heroSlides[currentSlide].title}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-slate-200 line-clamp-2 leading-relaxed opacity-90">
                        {heroSlides[currentSlide].subtitle}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Prev / Next Navigation */}
              <button
                onClick={prevSlide}
                aria-label="Previous Slide"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/20 bg-slate-900/60 text-white backdrop-blur-md opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-all hover:bg-amber-500 hover:text-slate-950 hover:scale-105"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={nextSlide}
                aria-label="Next Slide"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/20 bg-slate-900/60 text-white backdrop-blur-md opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-all hover:bg-amber-500 hover:text-slate-950 hover:scale-105"
              >
                <ChevronRight size={18} />
              </button>

              {/* Top Dots Indicator */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 rounded-full bg-slate-900/60 backdrop-blur-md px-2.5 py-1.5 border border-white/15">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === idx
                        ? "w-6 bg-amber-400"
                        : "w-2 bg-white/40 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}