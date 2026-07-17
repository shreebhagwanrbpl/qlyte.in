"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ShieldCheck,
  Truck,
  BadgeCheck,
  PackageCheck,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";

export default function ProductsPage() {

  const products = [

    {
      category: "Electrolyte Reagents",
      title: "Roche 9180 Electrolyte Reagent",
      image: "/images/product-1.jpg",
      description:
        "High precision electrolyte reagent for Roche analyzers.",
      brand: "Roche",
      model: "9180",
      slug: "roche-9180-electrolyte-reagent",
    },

    {
      category: "Electrolyte Reagents",
      title: "ERBA EC 90 Reagent",
      image: "/images/product-2.jpg",
      description:
        "Premium quality electrolyte reagent.",
      brand: "ERBA",
      model: "EC90",
      slug: "erba-ec90",
    },

    {
      category: "Rapid Test Kits",
      title: "COVID Rapid Test Kit",
      image: "/images/product-3.jpg",
      description:
        "Fast and reliable rapid testing solution.",
      brand: "Bio",
      model: "RT-100",
      slug: "covid-kit",
    },

    {
      category: "Rapid Test Kits",
      title: "Dengue Rapid Kit",
      image: "/images/product-4.jpg",
      description:
        "High sensitivity dengue rapid test.",
      brand: "Bio",
      model: "DG200",
      slug: "dengue-kit",
    },

    {
      category: "Hematology",
      title: "Hematology Reagent",
      image: "/images/product-5.jpg",
      description:
        "Premium hematology solution.",
      brand: "Mindray",
      model: "BC5300",
      slug: "hematology",
    },

  ];

  const [search, setSearch] =
    useState("");

  const [openedCategory, setOpenedCategory] =
    useState("");

  const [activeCategory, setActiveCategory] =
    useState("");

  const filteredProducts =
    useMemo(() => {

      return products.filter((item) => {

        const text = `
        ${item.title}
        ${item.brand}
        ${item.category}
        `.toLowerCase();

        return text.includes(
          search.toLowerCase()
        );

      });

    }, [search]);

  const groupedProducts =
    useMemo(() => {

      const obj = {};

      filteredProducts.forEach((item) => {

        if (!obj[item.category]) {

          obj[item.category] = [];

        }

        obj[item.category].push(item);

      });

      return obj;

    }, [filteredProducts]);

  const categories =
    Object.keys(groupedProducts);

  const toggleCategory = (category) => {

    if (openedCategory === category) {

      setOpenedCategory("");

      return;

    }

    setOpenedCategory(category);

  };

  const scrollToProduct = (
    slug,
    category
  ) => {

    setOpenedCategory(category);

    setActiveCategory(category);

    setTimeout(() => {

      const el =
        document.getElementById(slug);

      if (el) {

        el.scrollIntoView({

          behavior: "smooth",

          block: "start",

        });

      }

    }, 250);

  };

  return (
    <>
      <PageBanner
        title="Our Products"
        subtitle="Explore advanced biomedical and diagnostic equipment designed for modern healthcare excellence."
      />

      <section className="py-24 bg-slate-50">

        <div className="max-w-7xl mx-auto px-5">

          <SectionTitle
            badge="Featured Products"
            title="Premium Biomedical Equipment"
            description="Discover premium diagnostic products for hospitals and laboratories."
            center
          />

          <div className="grid lg:grid-cols-[320px_1fr] gap-10 mt-16">

            {/* ======================
                LEFT SIDEBAR
          ====================== */}

            <aside className="sticky top-28 h-fit overflow-hidden rounded-[32px] border border-[#F4C542]/20 bg-white shadow-[0_25px_70px_rgba(15,23,42,.08)]">

              {/* Header */}

              <div className="border-b border-[#F4C542]/15 bg-[#FFFDF5] p-6">

                <span className="inline-flex items-center rounded-full bg-[#FEF3C7] px-4 py-2 text-sm font-semibold text-[#B88700]">

                  Browse Products

                </span>

                <h2 className="mt-4 text-3xl font-black text-[#1E293B]">

                  Categories

                </h2>

                {/* Search */}

                <div className="relative mt-6">

                  <input
                    type="text"
                    placeholder="Search category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-14 w-full rounded-2xl border border-[#F4C542]/15 bg-white px-5 pr-12 outline-none transition focus:border-[#D4A017] focus:ring-4 focus:ring-[#F4C542]/20"
                  />

                  <Search
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B88700]"
                  />

                </div>

              </div>

              {/* Categories */}

              <div className="max-h-[70vh] overflow-y-auto p-5 custom-scrollbar space-y-4">

                {categories.map((category) => (

                  <div
                    key={category}
                    className="overflow-hidden rounded-2xl border border-[#F4C542]/15 bg-[#FFFDF5]"
                  >

                    <button
                      onClick={() => toggleCategory(category)}
                      className={`flex w-full items-center justify-between px-5 py-4 transition-all duration-300

          ${activeCategory === category
                          ? "bg-gradient-to-r from-[#B88700] via-[#D4A017] to-[#F4C542] text-white"
                          : "hover:bg-[#FEF3C7]"
                        }
          `}
                    >

                      <span className="flex items-center gap-3 font-semibold">

                        {openedCategory === category ? (
                          <ChevronDown size={18} />
                        ) : (
                          <ChevronRight size={18} />
                        )}

                        {category}

                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold

            ${activeCategory === category
                            ? "bg-white/20"
                            : "bg-[#FEF3C7] text-[#B88700]"
                          }
            `}
                      >

                        {groupedProducts[category].length}

                      </span>

                    </button>

                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{
                        maxHeight:
                          openedCategory === category
                            ? groupedProducts[category].length * 48 + "px"
                            : "0px",
                      }}
                    >

                      {groupedProducts[category].map((item) => (

                        <button
                          key={item.slug}
                          onClick={() =>
                            scrollToProduct(item.slug, category)
                          }
                          className="block w-full border-t border-[#F4C542]/10 px-6 py-3 text-left text-sm text-slate-600 transition hover:bg-white hover:text-[#B88700]"
                        >

                          {item.title}

                        </button>

                      ))}

                    </div>

                  </div>

                ))}

              </div>

            </aside>

            {/* ======================
                RIGHT SIDE
          ====================== */}

            <div>

              <div className="space-y-12">

                {Object.entries(groupedProducts).map(
                  ([category, list]) => (

                    <section
                      key={category}
                      id={category
                        .replace(/\s+/g, "-")
                        .toLowerCase()}
                    >

                      {/* CATEGORY TITLE */}

                      <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-8">

                        <h2 className="text-3xl font-bold text-slate-900">

                          {category}

                        </h2>

                        <span className="text-slate-500 font-medium">

                          {list.length} Products

                        </span>

                      </div>

                      <div className="space-y-6">

                        {list.map((product) => (

                          <div
                            key={product.slug}
                            id={product.slug}
                            className="bg-white rounded-[28px] border border-slate-200 shadow-lg p-7 hover:shadow-xl transition"
                          >

                            <div className="grid items-center gap-8 lg:grid-cols-[260px_1fr_200px]">

                              {/* IMAGE */}

                              <div className="group relative flex h-[230px] items-center justify-center overflow-hidden rounded-[28px] border border-[#F4C542]/15 bg-[#FFFDF5]">

                                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#F4C542]/10 blur-3xl" />

                                <Image
                                  src={product.image}
                                  alt={product.title}
                                  width={230}
                                  height={230}
                                  className="relative z-10 max-h-[190px] object-contain transition duration-500 group-hover:scale-105"
                                />

                              </div>

                              {/* CONTENT */}

                              <div>

                                <span className="inline-flex items-center rounded-full bg-[#FEF3C7] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#B88700]">

                                  Premium Biomedical Equipment

                                </span>

                                <h3 className="mt-4 text-3xl font-black text-[#1E293B]">

                                  {product.title}

                                </h3>

                                <p className="mt-5 leading-8 text-slate-600">

                                  {product.description}

                                </p>

                                {/* Specs */}

                                <div className="mt-8 grid grid-cols-2 gap-4">

                                  <div className="rounded-2xl border border-[#F4C542]/15 bg-[#FFFDF5] p-4">

                                    <p className="text-xs font-semibold uppercase tracking-wider text-[#B88700]">

                                      Brand

                                    </p>

                                    <p className="mt-2 font-bold text-[#1E293B]">

                                      {product.brand}

                                    </p>

                                  </div>

                                  <div className="rounded-2xl border border-[#F4C542]/15 bg-[#FFFDF5] p-4">

                                    <p className="text-xs font-semibold uppercase tracking-wider text-[#B88700]">

                                      Model

                                    </p>

                                    <p className="mt-2 font-bold text-[#1E293B]">

                                      {product.model}

                                    </p>

                                  </div>

                                </div>

                              </div>

                              {/* BUTTON */}

                              <div className="flex justify-center lg:justify-end">

                                <Link
                                  href={`/products/${product.slug}`}
                                  className="w-full lg:w-auto"
                                >

                                  <button className="w-full rounded-2xl bg-gradient-to-r from-[#B88700] via-[#D4A017] to-[#F4C542] px-8 py-4 font-semibold text-white shadow-[0_15px_40px_rgba(212,175,55,.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_50px_rgba(212,175,55,.45)] lg:w-auto">

                                    View Details →

                                  </button>

                                </Link>

                              </div>

                            </div>

                          </div>

                        ))}

                      </div>

                    </section>

                  )
                )}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ===========================
            WHY CHOOSE US
      =========================== */}

      <section className="relative overflow-hidden bg-[#FFFDF5] py-24">

        {/* Background Glow */}

        <div className="absolute -top-40 left-1/2 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-[#F4C542]/10 blur-[150px]" />

        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#FFE8A3]/15 blur-[120px]" />

        {/* Grid Pattern */}

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#D4A017 1px, transparent 1px), linear-gradient(90deg,#D4A017 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-5">

          <SectionTitle
            badge="Why Choose Our Products"
            title="Trusted Quality & Innovation"
            description="Every product is manufactured to meet international quality standards with reliable support."
            center
          />

          <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

            {[
              {
                icon: <ShieldCheck size={32} />,
                title: "Certified Quality",
                desc: "Premium biomedical products tested under strict international quality standards.",
              },
              {
                icon: <Truck size={32} />,
                title: "Fast Delivery",
                desc: "Quick dispatch across India with secure packaging and reliable logistics.",
              },
              {
                icon: <BadgeCheck size={32} />,
                title: "Trusted Support",
                desc: "Professional installation, AMC and technical support whenever required.",
              },
              {
                icon: <PackageCheck size={32} />,
                title: "Premium Equipment",
                desc: "Advanced biomedical equipment designed for modern laboratories and hospitals.",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="group relative overflow-hidden rounded-[32px] border border-[#F4C542]/15 bg-white p-8 text-center shadow-[0_20px_60px_rgba(15,23,42,.08)] transition-all duration-500 hover:-translate-y-3 hover:border-[#D4A017]/40 hover:shadow-[0_30px_80px_rgba(15,23,42,.15)]"
              >

                {/* Gold Glow */}

                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#F4C542]/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

                {/* Top Gradient */}

                <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-[#B88700] via-[#D4A017] to-[#F4C542] transition-all duration-500 group-hover:w-full" />

                {/* Icon */}

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#FEF3C7] text-[#B88700] shadow-lg shadow-yellow-200/40 transition duration-500 group-hover:scale-110 group-hover:rotate-6">

                  {item.icon}

                </div>

                {/* Title */}

                <h3 className="mt-7 text-2xl font-bold text-[#1E293B] transition-colors duration-300 group-hover:text-[#B88700]">

                  {item.title}

                </h3>

                {/* Divider */}

                <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-[#B88700] to-[#F4C542] transition-all duration-500 group-hover:w-24" />

                {/* Description */}

                <p className="mt-5 leading-7 text-slate-600">

                  {item.desc}

                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* CTA */}

      <CTASection />

    </>

  );

}