"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ShieldCheck,
  Truck,
  BadgeCheck,
  PackageCheck,
  Search,
  ChevronDown,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import { ArrowRight } from "lucide-react";
import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { usePathname } from "next/navigation";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";

const makeSlug = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");



export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categorySearch, setCategorySearch] =
    useState("");

  const [productSearch, setProductSearch] =
    useState("");
  const [loading, setLoading] = useState(true);



  const [openedCategory, setOpenedCategory] =
    useState("");

  const [activeCategory, setActiveCategory] =
    useState("");

  const [pendingScroll, setPendingScroll] =
    useState(null);

  const [loadedImages, setLoadedImages] =
    useState({});

  const [showTopButton, setShowTopButton] =
    useState(false);

  const pathname = usePathname();

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const district =
    pathParts[0] === "items"
      ? null
      : pathParts[0];

  useEffect(() => {
    const fetchProducts = async () => {
      try {

        const categorySnap = await getDocs(
          collection(
            db,
            "websites",
            "centralbiomedicals",
            "pages",
            "categoryproducts",
            "categories"
          )
        );

        const allProducts = [];

        categorySnap.forEach((categoryDoc) => {

          const data = categoryDoc.data();

          const categoryProducts =
            (data.products || [])
              .filter(
                (p) => p.isPublished !== false
              )
              .map((item, index) => ({
                ...item,
                uid: `${categoryDoc.id}-${index}`,
                category:
                  data.category ||
                  categoryDoc.id,
                slug:
                  item.slug ||
                  makeSlug(item.title),
              }));

          allProducts.push(
            ...categoryProducts
          );

        });

        const oldSnap = await getDoc(
          doc(
            db,
            "websites",
            "centralbiomedicals",
            "pages",
            "products"
          )
        );

        if (oldSnap.exists()) {

          const oldProducts =
            (oldSnap.data().products || [])
              .filter(
                (p) => p.isPublished !== false
              )
              .map((item, index) => ({
                ...item,
                uid: `other-${index}`,
                category:
                  "Other Products",
                slug:
                  item.slug ||
                  makeSlug(item.title),
              }));

          allProducts.push(
            ...oldProducts
          );

        }
        console.log("ALL PRODUCTS", allProducts);
        setProducts(allProducts);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const text = `
      ${item.title}
      ${item.brand}
      ${item.model}
      ${item.category}
      `
        .toLowerCase();

      return text.includes(
        productSearch.toLowerCase()
      );
    });
  }, [products, productSearch]);

  const groupedProducts = useMemo(() => {
    const obj = {};

    filteredProducts.forEach((item) => {
      if (!obj[item.category]) {
        obj[item.category] = [];
      }

      obj[item.category].push(item);
    });

    return obj;
  }, [filteredProducts]);

  const sortedGroupedProducts =
    useMemo(() => {

      const entries =
        Object.entries(
          groupedProducts
        );

      entries.sort(([a], [b]) => {

        if (
          a === "Other Products"
        )
          return 1;

        if (
          b === "Other Products"
        )
          return -1;

        return a.localeCompare(b);

      });

      return Object.fromEntries(
        entries
      );

    }, [groupedProducts]);
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
    setPendingScroll(slug);
  };

  useEffect(() => {
    if (!pendingScroll) return;

    const timer = setTimeout(() => {
      const el =
        document.getElementById(
          pendingScroll
        );

      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      setPendingScroll(null);
    }, 300);

    return () => clearTimeout(timer);
  }, [openedCategory, pendingScroll]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(
        window.scrollY > 500
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-[420px] rounded-[32px] bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Banner */}
      <PageBanner
        title="Our Products"
        subtitle="Explore advanced biomedical and diagnostic equipment designed for modern healthcare excellence."
      />

      {/* Products */}
      <section className="section-padding bg-white">
        <div className="container-custom">

          <SectionTitle
            badge="Featured Products"
            title="Premium Biomedical Equipment"
            description="Discover high-quality diagnostic and biomedical technologies tailored for laboratories, healthcare institutions, and modern diagnostics."
            center
          />
        </div>

        {/* Search */}
        <div className="relative mx-auto mt-8 max-w-2xl px-4 lg:mt-10 lg:px-0">

          {/* Glow */}

          <div className="absolute inset-0 rounded-3xl bg-[#F4C542]/10 blur-xl" />

          <div className="relative">

            <Search
              size={22}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-[#B88700]"
            />

            <input
              type="text"
              placeholder="Search biomedical equipment..."
              value={productSearch}
              onChange={(e) =>
                setProductSearch(e.target.value)
              }
              className="h-16 w-full rounded-3xl border border-[#F4C542]/20 bg-white pl-16 pr-6 text-[#1E293B] shadow-[0_15px_40px_rgba(15,23,42,.08)] outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#D4A017] focus:ring-4 focus:ring-[#F4C542]/20"
            />

          </div>

        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-6 lg:gap-10 mt-8 lg:mt-16 items-start px-4 lg:px-0">
          <aside
            className="
    lg:sticky
    lg:top-24
    self-start
    overflow-hidden
    rounded-[30px]
    border
    border-[#F4C542]/20
    bg-white
    shadow-[0_20px_60px_rgba(15,23,42,.08)]
  "
          >

            {/* Header */}

            <div className="border-b border-[#F4C542]/15 bg-[#FFFDF5] p-6">

              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A017]/30 bg-[#FEF3C7] px-4 py-2 text-sm font-semibold text-[#B88700]">

                Browse

              </div>

              <h3 className="mt-5 text-3xl font-black text-[#1E293B]">

                Categories

              </h3>

            </div>

            {/* Categories */}

            <div className="space-y-3 p-5">

              {Object.keys(sortedGroupedProducts)
                .filter((category) =>
                  category
                    .toLowerCase()
                    .includes(categorySearch.toLowerCase())
                )
                .map((category) => (

                  <div
                    key={category}
                    className="overflow-hidden rounded-2xl border border-[#F4C542]/15 bg-[#FFFCF3]"
                  >

                    <button
                      onClick={() =>
                        toggleCategory(category)
                      }
                      className={`flex w-full items-center justify-between px-5 py-4 font-semibold transition-all duration-300

              ${activeCategory === category
                          ? "bg-gradient-to-r from-[#B88700] via-[#D4A017] to-[#F4C542] text-white"
                          : "text-[#1E293B] hover:bg-[#FEF3C7]"
                        }
            `}
                    >

                      <span className="flex items-center gap-3">

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
                          }`}
                      >

                        {groupedProducts[category].length}

                      </span>

                    </button>

                    <div
                      className={`custom-scrollbar overflow-y-auto transition-all duration-300

              ${openedCategory === category
                          ? "max-h-72"
                          : "max-h-0 overflow-hidden"
                        }
            `}
                    >

                      {groupedProducts[category].map((item) => (

                        <button
                          key={item.uid}
                          onClick={() =>
                            scrollToProduct(
                              item.slug,
                              category
                            )
                          }
                          className="block w-full border-t border-[#F4C542]/10 px-6 py-3 text-left text-slate-600 transition-all hover:bg-[#FFF7DA] hover:text-[#B88700]"
                        >

                          {item.title}

                        </button>

                      ))}

                    </div>

                  </div>

                ))}

            </div>

          </aside>



          {/* ==========================
                RIGHT SIDE START
            ========================== */}

          <div className="space-y-16">
            {filteredProducts.length === 0 ? (

              <div className="relative overflow-hidden rounded-[36px] border border-[#F4C542]/20 bg-white p-10 text-center shadow-[0_25px_70px_rgba(15,23,42,.08)] lg:p-16">

                {/* Background Glow */}

                <div className="absolute -top-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-[#F4C542]/10 blur-[120px]" />

                <div className="relative z-10">

                  {/* Icon */}

                  <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#FEF3C7] text-5xl shadow-lg shadow-yellow-200/40">

                    🔍

                  </div>

                  {/* Badge */}

                  <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A017]/30 bg-[#FEF3C7] px-5 py-2 text-sm font-semibold text-[#B88700]">

                    Search Result

                  </div>

                  {/* Heading */}

                  <h2 className="mt-6 text-3xl font-black text-[#1E293B] lg:text-5xl">

                    Product Not Found

                  </h2>

                  {/* Divider */}

                  <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-[#B88700] via-[#F4C542] to-[#B88700]" />

                  {/* Description */}

                  <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">

                    We couldn't find any products matching

                    <span className="font-bold text-[#B88700]">

                      {" "} "{productSearch}" {" "}

                    </span>

                    . Please try another keyword or browse another category.

                  </p>

                  {/* Button */}

                  <button
                    onClick={() => setProductSearch("")}
                    className="mt-10 rounded-2xl bg-gradient-to-r from-[#B88700] via-[#D4A017] to-[#F4C542] px-8 py-4 font-semibold text-white shadow-[0_15px_40px_rgba(212,175,55,.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_50px_rgba(212,175,55,.45)]"
                  >

                    View All Products

                  </button>

                </div>

              </div>

            ) : (

              Object.entries(groupedProducts).map(
                ([category, list]) => (

                  <section
                    key={category}
                    id={category
                      .replace(/\s+/g, "-")
                      .toLowerCase()}
                  >

                    {/* Category Header */}

                    <div className="mb-8 flex flex-col gap-5 rounded-[30px] border border-[#F4C542]/20 bg-white p-6 shadow-[0_15px_40px_rgba(15,23,42,.08)] sm:flex-row sm:items-center sm:justify-between">

                      {/* Left */}

                      <div>

                        <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A017]/30 bg-[#FEF3C7] px-4 py-2 text-sm font-semibold text-[#B88700]">

                          <span className="h-2 w-2 rounded-full bg-[#D4A017]" />

                          Biomedical Category

                        </div>

                        <h2 className="mt-5 text-3xl lg:text-4xl font-black text-[#1E293B]">

                          {category}

                        </h2>

                        <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[#B88700] via-[#D4A017] to-[#F4C542]" />

                      </div>

                      {/* Right */}

                      <div className="flex items-center gap-4 rounded-2xl border border-[#F4C542]/20 bg-[#FFFDF5] px-6 py-4 shadow-lg">

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#B88700] via-[#D4A017] to-[#F4C542] text-xl font-bold text-white">

                          {list.length}

                        </div>

                        <div>

                          <p className="text-xs font-semibold uppercase tracking-widest text-[#B88700]">

                            Available

                          </p>

                          <p className="text-lg font-bold text-[#1E293B]">

                            Products

                          </p>

                        </div>

                      </div>

                    </div>

                    {/* Product List */}

                    <div className="space-y-8">

                      {list.map((product) => (

                        <div
                          key={product.uid}
                          id={product.slug}
                          className="group relative overflow-hidden rounded-[32px] border border-[#F4C542]/20 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,.08)] transition-all duration-500 hover:-translate-y-2 hover:border-[#D4A017]/40 hover:shadow-[0_30px_80px_rgba(15,23,42,.15)]"
                        >

                          {/* Gold Glow */}

                          <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#F4C542]/10 blur-3xl opacity-0 transition-all duration-500 group-hover:opacity-100" />

                          {/* Top Line */}

                          <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-[#B88700] via-[#D4A017] to-[#F4C542] transition-all duration-500 group-hover:w-full" />

                          <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-[260px_1fr_190px]">

                            {/* Image */}

                            <div className="relative flex h-[220px] items-center justify-center overflow-hidden rounded-[28px] border border-[#F4C542]/15 bg-[#FFFCF3]">

                              {!loadedImages[product.uid] && (
                                <div className="absolute inset-0 animate-pulse bg-[#F8F5E9]" />
                              )}

                              <img
                                src={
                                  product.images?.[0] ||
                                  product.image ||
                                  "/placeholder.jpg"
                                }
                                alt={product.title}
                                onLoad={() =>
                                  setLoadedImages((prev) => ({
                                    ...prev,
                                    [product.uid]: true,
                                  }))
                                }
                                onError={(e) => {
                                  e.currentTarget.src = "/placeholder.jpg";
                                }}
                                className={`h-full w-full object-contain p-6 transition duration-500 group-hover:scale-105 ${loadedImages[product.uid]
                                  ? "opacity-100"
                                  : "opacity-0"
                                  }`}
                              />

                            </div>

                            {/* Content */}

                            <div>

                              <h3 className="text-3xl font-black text-[#1E293B]">

                                {product.title}

                              </h3>

                              <p className="mt-5 leading-8 text-slate-600">

                                {product.description ||
                                  product.desc ||
                                  "Premium biomedical equipment designed for laboratories, hospitals and diagnostic centres."}

                              </p>

                              {/* Specs */}

                              <div className="mt-8 grid gap-4 md:grid-cols-2">

                                <div className="rounded-2xl border border-[#F4C542]/15 bg-[#FFFCF3] p-4">

                                  <p className="text-xs font-semibold uppercase tracking-wider text-[#B88700]">

                                    Brand

                                  </p>

                                  <p className="mt-2 font-bold text-[#1E293B]">

                                    {product.brand || "N/A"}

                                  </p>

                                </div>

                                <div className="rounded-2xl border border-[#F4C542]/15 bg-[#FFFCF3] p-4">

                                  <p className="text-xs font-semibold uppercase tracking-wider text-[#B88700]">

                                    Model

                                  </p>

                                  <p className="mt-2 font-bold text-[#1E293B]">

                                    {product.model || "N/A"}

                                  </p>

                                </div>

                                <div className="rounded-2xl border border-[#F4C542]/15 bg-[#FFFCF3] p-4">

                                  <p className="text-xs font-semibold uppercase tracking-wider text-[#B88700]">

                                    Instrument

                                  </p>

                                  <p className="mt-2 font-bold text-[#1E293B]">

                                    {product.instrument || "N/A"}

                                  </p>

                                </div>

                                <div className="rounded-2xl border border-[#F4C542]/15 bg-[#FFFCF3] p-4">

                                  <p className="text-xs font-semibold uppercase tracking-wider text-[#B88700]">

                                    Category

                                  </p>

                                  <p className="mt-2 font-bold text-[#1E293B]">

                                    {product.category}

                                  </p>

                                </div>

                              </div>

                            </div>

                            {/* Button */}

                            <div className="flex justify-center lg:justify-end">

                              <Link
                                href={
                                  district
                                    ? `/${district}/items/${product.slug}`
                                    : `/items/${product.slug}`
                                }
                                className="group/button flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#B88700] via-[#D4A017] to-[#F4C542] px-8 py-4 font-semibold text-white shadow-[0_15px_40px_rgba(212,175,55,.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_50px_rgba(212,175,55,.45)]"
                              >

                                Get Quote

                                <ArrowRight
                                  size={18}
                                  className="transition group-hover/button:translate-x-1"
                                />

                              </Link>

                            </div>

                          </div>

                        </div>

                      ))}

                    </div>

                  </section>

                ))
            )}

          </div>

        </div>

      </section>

      {/* Why Choose Products */}
      <section className="relative overflow-hidden bg-[#FFFDF5] py-24">

        {/* Background Glow */}

        <div className="absolute -top-40 left-1/2 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-[#F4C542]/10 blur-[150px]" />

        <div className="absolute bottom-0 right-0 h-[280px] w-[280px] rounded-full bg-[#FFE8A3]/15 blur-[120px]" />

        {/* Grid Pattern */}

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#D4A017 1px, transparent 1px), linear-gradient(90deg,#D4A017 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container-custom relative z-10">

          <SectionTitle
            badge="Why Our Products"
            title="Trusted Quality & Innovation"
            description="We provide biomedical products designed for performance, reliability and healthcare excellence."
            center
          />

          <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

            {[
              {
                icon: <ShieldCheck size={30} />,
                title: "Certified Quality",
                desc: "ISO certified biomedical equipment with trusted quality standards."
              },
              {
                icon: <Truck size={30} />,
                title: "Fast Delivery",
                desc: "Quick and secure delivery across India with reliable logistics."
              },
              {
                icon: <BadgeCheck size={30} />,
                title: "Trusted Support",
                desc: "Dedicated technical assistance, installation and AMC support."
              },
              {
                icon: <PackageCheck size={30} />,
                title: "Premium Equipment",
                desc: "Advanced laboratory systems designed for modern diagnostics."
              },
            ].map((item, index) => (

              <div
                key={index}
                className="group relative overflow-hidden rounded-[30px] border border-[#F4C542]/15 bg-white p-8 text-center shadow-[0_20px_60px_rgba(15,23,42,.08)] transition-all duration-500 hover:-translate-y-3 hover:border-[#D4A017]/40 hover:shadow-[0_30px_80px_rgba(15,23,42,.15)]"
              >

                {/* Gold Glow */}

                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#F4C542]/10 blur-3xl opacity-0 transition-all duration-500 group-hover:opacity-100" />

                {/* Top Border */}

                <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-[#B88700] via-[#D4A017] to-[#F4C542] transition-all duration-500 group-hover:w-full" />

                {/* Icon */}

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FEF3C7] text-[#B88700] shadow-lg shadow-yellow-200/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">

                  {item.icon}

                </div>

                {/* Title */}

                <h3 className="mt-7 text-2xl font-bold text-[#1E293B] transition-colors duration-300 group-hover:text-[#B88700]">

                  {item.title}

                </h3>

                {/* Divider */}

                <div className="mx-auto mt-5 h-1 w-14 rounded-full bg-gradient-to-r from-[#B88700] to-[#F4C542] transition-all duration-500 group-hover:w-20" />

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

      {/* Back To Top */}

      {showTopButton && (

        <button
          onClick={scrollToTop}
          className="group fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full border border-[#F4C542]/20 bg-gradient-to-br from-[#B88700] via-[#D4A017] to-[#F4C542] text-white shadow-[0_20px_50px_rgba(212,175,55,.40)] transition-all duration-300 hover:-translate-y-2 hover:scale-110 hover:shadow-[0_25px_60px_rgba(212,175,55,.55)]"
        >

          {/* Glow */}

          <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <ChevronUp
            size={26}
            className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1"
          />

        </button>

      )}

    </>

  );

}