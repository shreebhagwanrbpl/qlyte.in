"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

import { usePathname } from "next/navigation";

import {
    FaPlay,
    FaShareAlt,
    FaWhatsapp,
    FaFacebook,
    FaInstagram,
    FaLink,
} from "react-icons/fa";

import {
    doc,
    getDoc,
    getDocs,
    addDoc,
    collection,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
const makeSlug = (text = "") =>
    text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
export default function ProductDetails({ slug }) {
    const [product, setProduct] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedMedia, setSelectedMedia] = useState("image");
    const [showShare, setShowShare] = useState(false);

    const shareRef = useRef();
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [submitting, setSubmitting] =
        useState(false);
    const pathname = usePathname();

    const pathParts = pathname
        .split("/")
        .filter(Boolean);

    const city =
        pathParts.length > 1
            ? pathParts[0]
            : "India";

    const cityName =
        city.charAt(0).toUpperCase() +
        city.slice(1);

    useEffect(() => {
        const loadProduct = async () => {
            try {

                // NORMAL PRODUCTS
                const snap = await getDoc(
                    doc(
                        db,
                        "websites",
                        "qlytein",
                        "pages",
                        "products"
                    )
                );

                let allProducts = [];

                if (snap.exists()) {
                    allProducts = (snap.data().products || []).map((item) => ({
                        ...item,
                        slug:
                            item.slug ||
                            item.productSlug ||
                            makeSlug(item.title),
                    }));
                }

                // CATEGORY PRODUCTS
                const categorySnap = await getDocs(
                    collection(
                        db,
                        "websites",
                        "qlytein",
                        "pages",
                        "categoryproducts",
                        "categories"
                    )
                );

                categorySnap.forEach((docSnap) => {
                    const data = docSnap.data();

                    if (data.products?.length) {
                        allProducts.push(
                            ...(data.products || []).map((item) => ({
                                ...item,
                                slug:
                                    item.slug ||
                                    item.productSlug ||
                                    makeSlug(item.title),
                            }))
                        );
                    }
                });

                const found = allProducts.find(
                    (p) => p.slug === slug
                );
                console.log("URL SLUG:", slug);

                allProducts.forEach((p) => {
                    console.log("PRODUCT:", p.title);
                    console.log("PRODUCT SLUG:", p.slug);
                });
                console.log("SLUG FROM URL:", slug);
                console.log(
                    "TOTAL PRODUCTS:",
                    allProducts.length
                );
                console.log(
                    "FOUND PRODUCT:",
                    found
                );

                setProduct(found || null);

                if (found) {

                    if (
                        found.images?.length > 0
                    ) {
                        setSelectedImage(
                            found.images[0]
                        );
                    } else {
                        setSelectedImage(
                            found.image || ""
                        );
                    }

                    setSelectedMedia("image");
                }

            } catch (error) {
                console.error(error);
            }
        };

        loadProduct();
    }, [slug]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const phoneRegex = /^[6-9]\d{9}$/;
        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!form.name.trim()) {
            return toast.error(
                "Name is required"
            );
        }

        if (!emailRegex.test(form.email)) {
            return toast.error(
                "Enter valid email"
            );
        }

        if (!phoneRegex.test(form.phone)) {
            return toast.error(
                "Enter valid mobile number"
            );
        }

        try {
            setSubmitting(true);

            await addDoc(
                collection(
                    db,
                    "websitesQueries",
                    "qlytein",
                    "productQueries"
                ),
                {
                    ...form,
                    productName: product.title,
                    productSlug: product.slug,
                    brand: product.brand || "",
                    model: product.model || "",
                    createdAt: new Date(),
                }
            );

            toast.success(
                "Your enquiry has been submitted successfully."
            );

            setForm({
                name: "",
                email: "",
                phone: "",
            });
        } catch (error) {
            console.error(error);
            toast.error(
                "Something went wrong"
            );
        } finally {
            setSubmitting(false);
        }
    };
    const productSchema = product
        ? {
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            image: product.image ? [product.image] : [],
            description:
                product.desc ||
                product.description ||
                product.title,
            brand: {
                "@type": "Brand",
                name: product.brand || "Raj Biosis",
            },
        }
        : null;

    const faqSchema = product
        ? {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
                {
                    "@type": "Question",
                    name: `What is ${product.title} used for?`,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: `${product.title} is used in hospitals, pathology labs and diagnostic centres.`,
                    },
                },
                {
                    "@type": "Question",
                    name: "Do you provide installation support?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes, installation and technical support are available.",
                    },
                },
            ],
        }
        : null;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link Copied");
        setShowShare(false);
    };

    const handleWhatsapp = () => {
        const shareText = `🔬 ${product?.title}

${product?.desc}

🌐 ${window.location.href}`;

        window.open(
            `https://wa.me/?text=${encodeURIComponent(shareText)}`,
            "_blank"
        );
    };

    const handleFacebook = () => {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                window.location.href
            )}`,
            "_blank"
        );
    };

    const handleInstagram = async () => {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Instagram direct sharing available nahi hai. Link copied.");
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            await navigator.share({
                title: product.title,
                text: product.desc,
                url: window.location.href,
            });
        } else {
            setShowShare(!showShare);
        }
    };

    useEffect(() => {
        const close = (e) => {
            if (
                shareRef.current &&
                !shareRef.current.contains(e.target)
            ) {
                setShowShare(false);
            }
        };

        document.addEventListener("mousedown", close);

        return () =>
            document.removeEventListener("mousedown", close);
    }, []);

    if (!product) {
        return (
            <section className="py-10 md:py-20 bg-slate-50">
                <div className="container-custom">

                    <div className="grid lg:grid-cols-2 gap-12">

                        <div className="h-[420px] md:h-[520px] rounded-[36px] bg-slate-200 animate-pulse" />

                        <div>
                            <div className="h-12 w-3/4 bg-slate-200 rounded-xl animate-pulse mb-8" />

                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-6 bg-slate-200 rounded-lg animate-pulse mb-4"
                                />
                            ))}
                        </div>

                    </div>

                    <div className="mt-16 grid lg:grid-cols-[600px_1fr] gap-8">

                        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 sm:p-6 md:p-8 shadow-sm">
                            <div className="h-10 w-48 bg-slate-200 rounded-lg animate-pulse mb-6" />

                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-14 bg-slate-200 rounded-2xl animate-pulse mb-4"
                                />
                            ))}
                        </div>

                        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 sm:p-6 md:p-8 shadow-sm">
                            <div className="h-10 w-60 bg-slate-200 rounded-lg animate-pulse mb-6" />

                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-5 bg-slate-200 rounded animate-pulse mb-4"
                                />
                            ))}
                        </div>

                    </div>

                </div>
            </section>
        );
    }
    return (
        <section className="py-10 md:py-20 bg-slate-50">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(productSchema),
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema),
                }}
            />
            <div className="container-custom">
                <div className="mb-6 text-sm text-slate-500">
                    Home / Products / {product.title}
                </div>
                {/* Top Section */}

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Product Image */}

                    <div>

                        <div className="group relative overflow-hidden rounded-[36px] border border-[#F4C542]/20 bg-white shadow-[0_30px_80px_rgba(15,23,42,.12)]">

                            {/* Background Glow */}

                            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#F4C542]/10 blur-[140px]" />

                            {/* Top Badge */}

                            <div className="absolute left-6 top-6 z-20 rounded-full border border-[#D4A017]/30 bg-[#FEF3C7] px-4 py-2 text-sm font-semibold text-[#B88700] shadow-lg">

                                Premium Quality

                            </div>

                            {/* Image Area */}

                            <div className="relative flex h-[340px] items-center justify-center sm:h-[420px] md:h-[500px] lg:h-[580px]">

                                {selectedMedia === "video" && product.video ? (

                                    <video
                                        controls
                                        autoPlay
                                        className="h-full w-full object-contain p-8"
                                    >
                                        <source
                                            src={product.video}
                                            type="video/mp4"
                                        />
                                    </video>

                                ) : (

                                    <>
                                        {!imageLoaded && (
                                            <div className="absolute inset-0 animate-pulse bg-[#F8F5E9]" />
                                        )}

                                        <Image
                                            src={selectedImage || product.image}
                                            alt={product.title}
                                            fill
                                            priority
                                            onLoad={() => setImageLoaded(true)}
                                            className={`object-contain p-8 transition-all duration-700 group-hover:scale-105 ${imageLoaded
                                                ? "opacity-100"
                                                : "opacity-0"
                                                }`}
                                        />
                                    </>

                                )}

                            </div>

                            {/* Bottom Gradient */}

                            <div className="absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r from-[#B88700] via-[#D4A017] to-[#F4C542]" />

                        </div>

                        <div className="mt-6 flex flex-wrap gap-4">

                            {(product.images?.length
                                ? product.images
                                : [product.image]
                            ).map((img, index) => (

                                <button
                                    key={index}
                                    onClick={() => {
                                        setSelectedImage(img);
                                        setSelectedMedia("image");
                                    }}
                                    className={`group relative h-24 w-24 overflow-hidden rounded-2xl border-2 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl

        ${selectedMedia === "image" &&
                                            selectedImage === img
                                            ? "border-[#D4A017] ring-4 ring-[#F4C542]/20"
                                            : "border-[#F4C542]/20 hover:border-[#D4A017]/50"
                                        }
      `}
                                >

                                    <Image
                                        src={img}
                                        alt={`Product Image ${index + 1}`}
                                        width={96}
                                        height={96}
                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                                    />

                                    {selectedMedia === "image" &&
                                        selectedImage === img && (

                                            <div className="absolute inset-0 flex items-center justify-center bg-[#B88700]/20">

                                                <div className="rounded-full bg-white p-1">

                                                    ✓

                                                </div>

                                            </div>

                                        )}

                                </button>

                            ))}

                            {/* Video */}

                            {product.video && (

                                <button
                                    onClick={() => setSelectedMedia("video")}
                                    className={`group flex h-24 w-24 flex-col items-center justify-center rounded-2xl border-2 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl

        ${selectedMedia === "video"
                                            ? "border-[#D4A017] ring-4 ring-[#F4C542]/20"
                                            : "border-[#F4C542]/20 hover:border-[#D4A017]/50"
                                        }
      `}
                                >

                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FEF3C7] text-[#B88700] transition group-hover:scale-110">

                                        <FaPlay size={18} />

                                    </div>

                                    <span className="mt-2 text-xs font-semibold text-[#1E293B]">

                                        Video

                                    </span>

                                </button>

                            )}

                            {/* PDF */}

                            {product.pdf && (

                                <a
                                    href={product.pdf}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex h-24 w-24 flex-col items-center justify-center rounded-2xl border border-[#F4C542]/20 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A017]/50 hover:shadow-xl"
                                >

                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FEF3C7] text-xl">

                                        📄

                                    </div>

                                    <span className="mt-2 text-xs font-semibold text-[#1E293B]">

                                        PDF

                                    </span>

                                </a>

                            )}

                        </div>

                    </div>

                    {/* Product Details */}

                    <div>

                        <div className="relative flex items-start justify-between gap-6">

                            {/* Title */}

                            <div>

                                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4A017]/30 bg-[#FEF3C7] px-4 py-2 text-sm font-semibold text-[#B88700]">

                                    Premium Biomedical Equipment

                                </div>

                                <h1 className="text-3xl font-black leading-tight text-[#1E293B] sm:text-4xl lg:text-5xl">

                                    {product.title}

                                </h1>

                            </div>

                            {/* Share */}

                            <div
                                ref={shareRef}
                                className="relative"
                            >

                                <button
                                    onClick={handleNativeShare}
                                    className="group flex h-14 w-14 items-center justify-center rounded-full border border-[#F4C542]/20 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A017] hover:bg-[#FEF3C7]"
                                >

                                    <FaShareAlt
                                        size={18}
                                        className="text-[#B88700] transition group-hover:rotate-12"
                                    />

                                </button>

                                {showShare && (

                                    <div className="absolute right-0 top-16 z-50 w-64 overflow-hidden rounded-2xl border border-[#F4C542]/20 bg-white shadow-[0_25px_60px_rgba(15,23,42,.15)]">

                                        <div className="border-b border-[#F4C542]/10 bg-[#FFFDF5] px-5 py-3">

                                            <h4 className="font-bold text-[#1E293B]">

                                                Share Product

                                            </h4>

                                        </div>

                                        <div className="p-2">

                                            <button
                                                onClick={handleCopy}
                                                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition hover:bg-[#FEF3C7]"
                                            >

                                                <FaLink className="text-[#B88700]" />

                                                Copy Link

                                            </button>

                                            <button
                                                onClick={handleWhatsapp}
                                                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition hover:bg-[#FEF3C7]"
                                            >

                                                <FaWhatsapp className="text-green-600" />

                                                WhatsApp

                                            </button>

                                            <button
                                                onClick={handleFacebook}
                                                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition hover:bg-[#FEF3C7]"
                                            >

                                                <FaFacebook className="text-blue-600" />

                                                Facebook

                                            </button>

                                            <button
                                                onClick={handleInstagram}
                                                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition hover:bg-[#FEF3C7]"
                                            >

                                                <FaInstagram className="text-pink-600" />

                                                Instagram

                                            </button>

                                        </div>

                                    </div>

                                )}

                            </div>

                        </div>

                        <div className="mt-8 rounded-[32px] border border-[#F4C542]/20 bg-white p-6 shadow-[0_25px_70px_rgba(15,23,42,.08)]">

                            <div className="mb-6 flex items-center justify-between">

                                <h3 className="text-2xl font-bold text-[#1E293B]">
                                    Product Specifications
                                </h3>

                                <span className="rounded-full bg-[#FEF3C7] px-4 py-2 text-sm font-semibold text-[#B88700]">
                                    Technical Details
                                </span>

                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">

                                {[
                                    ["Brand", product.brand || "N/A"],
                                    ["Model", product.model || "N/A"],
                                    ["Instrument", product.instrument || "N/A"],
                                    ["Capacity", product.capacity || "N/A"],
                                    ["Throughput", product.throughput || "N/A"],
                                    ["Usage", product.usage || "N/A"],
                                    ["Automation", product.automation || "N/A"],
                                    ["Availability", product.availability || "N/A"],
                                ].map(([label, value]) => (

                                    <div
                                        key={label}
                                        className="group rounded-2xl border border-[#F4C542]/15 bg-[#FFFDF5] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A017]/40 hover:shadow-lg"
                                    >

                                        <p className="text-xs font-semibold uppercase tracking-widest text-[#B88700]">

                                            {label}

                                        </p>

                                        <p className="mt-2 text-lg font-bold text-[#1E293B]">

                                            {value}

                                        </p>

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>

                </div>

                {/* Description + Form */}

                <div className="mt-16">
                    <div className="grid grid-cols-1 lg:grid-cols-[500px_1fr] xl:grid-cols-[600px_1fr] gap-6 md:gap-8">

                        {/* Quote Form */}

                        <div className="sticky top-24 h-fit overflow-hidden rounded-[32px] border border-[#F4C542]/20 bg-white shadow-[0_30px_80px_rgba(15,23,42,.10)]">

                            {/* Top Gradient */}

                            <div className="h-2 w-full bg-gradient-to-r from-[#B88700] via-[#D4A017] to-[#F4C542]" />

                            <div className="relative p-6 md:p-8">

                                {/* Glow */}

                                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#F4C542]/10 blur-[90px]" />

                                <div className="relative z-10">

                                    <span className="inline-flex items-center rounded-full bg-[#FEF3C7] px-4 py-2 text-sm font-semibold text-[#B88700]">

                                        Request A Quote

                                    </span>

                                    <h2 className="mt-5 text-3xl font-black text-[#1E293B]">

                                        Need More Information?

                                    </h2>

                                    <p className="mt-3 text-slate-600">

                                        Product :

                                        <span className="ml-2 font-bold text-[#1E293B]">

                                            {product.title}

                                        </span>

                                    </p>

                                    <form
                                        onSubmit={handleSubmit}
                                        className="mt-8 space-y-5"
                                    >

                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            value={form.name}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    name: e.target.value,
                                                })
                                            }
                                            className="w-full rounded-2xl border border-[#F4C542]/15 bg-[#FFFDF5] px-5 py-4 outline-none transition focus:border-[#D4A017] focus:ring-4 focus:ring-[#F4C542]/20"
                                        />

                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            value={form.email}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    email: e.target.value,
                                                })
                                            }
                                            className="w-full rounded-2xl border border-[#F4C542]/15 bg-[#FFFDF5] px-5 py-4 outline-none transition focus:border-[#D4A017] focus:ring-4 focus:ring-[#F4C542]/20"
                                        />

                                        <input
                                            type="tel"
                                            placeholder="Phone Number"
                                            maxLength={10}
                                            value={form.phone}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    phone: e.target.value.replace(/\D/g, ""),
                                                })
                                            }
                                            className="w-full rounded-2xl border border-[#F4C542]/15 bg-[#FFFDF5] px-5 py-4 outline-none transition focus:border-[#D4A017] focus:ring-4 focus:ring-[#F4C542]/20"
                                        />

                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#B88700] via-[#D4A017] to-[#F4C542] py-4 font-semibold text-white shadow-[0_15px_40px_rgba(212,175,55,.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(212,175,55,.45)] disabled:cursor-not-allowed disabled:opacity-70"
                                        >

                                            {submitting ? "Submitting..." : "Get Free Quote"}

                                        </button>

                                    </form>

                                </div>

                            </div>

                        </div>

                        {/* Description */}

                        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 sm:p-6 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">

                            <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-slate-900">
                                Product Description
                            </h3>

                            <p className="text-slate-600 leading-7 md:leading-9 text-base md:text-lg">
                                {product.desc ||
                                    product.description ||
                                    "No description available."}
                            </p>

                            {/* Specifications Table */}

                            <div className="mt-12 overflow-hidden rounded-[32px] border border-[#F4C542]/20 bg-white shadow-[0_25px_70px_rgba(15,23,42,.08)]">

                                {/* Header */}

                                <div className="flex items-center justify-between border-b border-[#F4C542]/15 bg-[#FFFDF5] px-6 py-5">

                                    <h3 className="text-2xl font-bold text-[#1E293B]">
                                        Technical Specifications
                                    </h3>

                                    <span className="rounded-full bg-[#FEF3C7] px-4 py-2 text-sm font-semibold text-[#B88700]">
                                        Product Details
                                    </span>

                                </div>

                                <div className="overflow-x-auto">

                                    <table className="w-full">

                                        <tbody>

                                            {[
                                                ["Brand", product.brand || "N/A"],
                                                ["Model", product.model || "N/A"],
                                                ["Usage", product.usage || "N/A"],
                                                ["Automation", product.automation || "N/A"],
                                                ["Capacity", product.capacity || "N/A"],
                                                ["Throughput", product.throughput || "N/A"],
                                            ].map(([label, value], index) => (

                                                <tr
                                                    key={label}
                                                    className={`transition hover:bg-[#FFFDF5] ${index !== 5
                                                        ? "border-b border-[#F4C542]/10"
                                                        : ""
                                                        }`}
                                                >

                                                    <td className="w-1/3 bg-[#FEF3C7]/40 px-6 py-5 font-semibold text-[#B88700]">

                                                        {label}

                                                    </td>

                                                    <td className="px-6 py-5 font-medium text-[#1E293B]">

                                                        {value}

                                                    </td>

                                                </tr>

                                            ))}

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                            {/* SEO Content */}

                            <div className="mt-16 rounded-[36px] border border-[#F4C542]/20 bg-white p-8 md:p-12 shadow-[0_25px_70px_rgba(15,23,42,.08)]">

                                {/* Header */}

                                <div className="mb-12 text-center">

                                    <span className="inline-flex items-center rounded-full bg-[#FEF3C7] px-5 py-2 text-sm font-semibold text-[#B88700]">

                                        Product Information

                                    </span>

                                    <h2 className="mt-5 text-4xl font-black text-[#1E293B]">

                                        Everything About {product.title}

                                    </h2>

                                    <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-[#B88700] via-[#D4A017] to-[#F4C542]" />

                                </div>

                                <div className="space-y-8">

                                    {[
                                        {
                                            title: `Why Choose Raj Biosis in ${cityName}?`,
                                            text: `Raj Biosis is a trusted supplier and distributor of ${product.title} in ${cityName}. We provide high-quality biomedical and laboratory equipment for hospitals, pathology laboratories, diagnostic centres and healthcare facilities.`,
                                        },
                                        {
                                            title: `Features of ${product.title}`,
                                            text: `${product.title} offers reliable performance, accurate results, easy operation, long service life and efficient workflow for laboratories and hospitals.`,
                                        },
                                        {
                                            title: `Applications of ${product.title}`,
                                            text: `Widely used in hospitals, pathology labs, diagnostic centres, blood banks, research institutes and healthcare facilities.`,
                                        },
                                        {
                                            title: `${product.title} Supplier in ${cityName}`,
                                            text: `Raj Biosis supplies ${product.title} in ${cityName} with technical support, installation assistance and customer service for hospitals and laboratories.`,
                                        },
                                        {
                                            title: `${product.title} Dealer in ${cityName}`,
                                            text: `Raj Biosis is a trusted dealer of ${product.title} in ${cityName}. We supply biomedical equipment, laboratory instruments, diagnostic analyzers and healthcare devices.`,
                                        },
                                        {
                                            title: `${product.title} Distributor in ${cityName}`,
                                            text: `Looking for a reliable distributor of ${product.title} in ${cityName}? We provide installation support, product guidance, maintenance assistance and fast delivery.`,
                                        },
                                        {
                                            title: `Buy ${product.title} in ${cityName}`,
                                            text: `Buy high-quality ${product.title} in ${cityName} at competitive prices. Contact Raj Biosis for the latest quotation and product availability.`,
                                        },
                                        {
                                            title: `${product.title} Price in ${cityName}`,
                                            text: `The price of ${product.title} depends on brand, model, specifications and features. Contact our team for the latest pricing, availability and delivery details.`,
                                        },
                                    ].map((item, index) => (

                                        <div
                                            key={index}
                                            className="rounded-3xl border border-[#F4C542]/15 bg-[#FFFDF5] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A017]/40 hover:shadow-lg"
                                        >

                                            <h3 className="text-2xl font-bold text-[#1E293B]">

                                                {item.title}

                                            </h3>

                                            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#B88700] to-[#F4C542]" />

                                            <p className="mt-5 leading-8 text-slate-600">

                                                {item.text}

                                            </p>

                                        </div>

                                    ))}

                                </div>

                            </div>

                            {/* FAQ Section */}

                            <div className="mt-16 rounded-[36px] border border-[#F4C542]/20 bg-white p-8 md:p-12 shadow-[0_25px_70px_rgba(15,23,42,.08)]">

                                {/* Header */}

                                <div className="mb-10 text-center">

                                    <span className="inline-flex items-center rounded-full bg-[#FEF3C7] px-5 py-2 text-sm font-semibold text-[#B88700]">

                                        FAQs

                                    </span>

                                    <h3 className="mt-5 text-4xl font-black text-[#1E293B]">

                                        Frequently Asked Questions

                                    </h3>

                                    <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-[#B88700] via-[#D4A017] to-[#F4C542]" />

                                </div>

                                <div className="space-y-5">

                                    {[
                                        {
                                            q: `What is ${product.title} used for in ${cityName}?`,
                                            a: `${product.title} is commonly used in hospitals, pathology laboratories and diagnostic centres.`,
                                        },
                                        {
                                            q: `What is the price of ${product.title} in ${cityName}?`,
                                            a: "Pricing depends on specifications, brand and model. Contact us for a quotation.",
                                        },
                                        {
                                            q: `Are you an authorized supplier of ${product.title}?`,
                                            a: "Yes, we supply genuine biomedical and laboratory equipment from trusted manufacturers.",
                                        },
                                        {
                                            q: `Can hospitals in ${cityName} order this product?`,
                                            a: "Yes. Hospitals, pathology laboratories, diagnostic centres and healthcare facilities can order this product.",
                                        },
                                        {
                                            q: "Do you provide installation support?",
                                            a: "Yes. Installation assistance and technical support are available depending on the product.",
                                        },
                                        {
                                            q: "Can I request a quotation?",
                                            a: "Yes. Submit the enquiry form on this page and our team will contact you with pricing and product information.",
                                        },
                                        {
                                            q: "Do you provide warranty?",
                                            a: "Warranty depends on the manufacturer, model and product category.",
                                        },
                                        {
                                            q: "Do you deliver across India?",
                                            a: "Yes. We provide safe packaging and reliable logistics support across India.",
                                        },
                                        {
                                            q: "How can I contact Raj Biosis?",
                                            a: "You can fill out the enquiry form or contact our team directly for quotations and technical assistance.",
                                        },
                                    ].map((item, index) => (

                                        <div
                                            key={index}
                                            className="group rounded-3xl border border-[#F4C542]/15 bg-[#FFFDF5] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A017]/40 hover:shadow-lg"
                                        >

                                            <div className="flex items-start gap-4">

                                                <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#FEF3C7] font-bold text-[#B88700]">

                                                    ?

                                                </div>

                                                <div>

                                                    <h4 className="text-lg font-bold text-[#1E293B]">

                                                        {item.q}

                                                    </h4>

                                                    <p className="mt-3 leading-8 text-slate-600">

                                                        {item.a}

                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}