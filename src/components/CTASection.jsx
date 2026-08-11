"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  PhoneCall,
} from "lucide-react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
export default function CTASection({ city }) {

  const pathname = usePathname();

  const staticRoutes = [
    "about",
    "services",
    "products",
    "contact",
    "items",
    "enquiry",
  ];

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const urlDistrict =
    pathParts.length > 0 &&
      !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  const districtSlug = city
    ? city.toLowerCase().replace(/\s+/g, "-")
    : urlDistrict;

  const makeLink = (path) => {
    if (!districtSlug) return path;

    if (path === "/") {
      return `/${districtSlug}`;
    }

    return `/${districtSlug}${path}`;
  };

  return (
    <section className="section-padding bg-[#FFFDF5]">
      <div className="container-custom">

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          viewport={{
            once: true,
          }}
          className="relative overflow-hidden rounded-[42px] bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] p-10 lg:p-20 text-white shadow-[0_30px_80px_rgba(15,23,42,.25)]"
        >

          {/* Background Glow */}

          <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-[#F4C542]/20 blur-[120px]" />

          <div className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-[#FFE8A3]/20 blur-[120px]" />

          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg,#ffffff 1px, transparent 1px)",
              backgroundSize: "55px 55px",
            }}
          />

          <div className="relative z-10 grid lg:grid-cols-2 gap-14 items-center">

            {/* Left */}

            <div>

              <span className="inline-flex items-center gap-2 rounded-full bg-[#F4C542]/15 border border-[#F4C542]/30 px-5 py-2 text-sm font-semibold text-[#FFE8A3]">

                <PhoneCall size={16} />

                Get In Touch

              </span>

              <h2 className="mt-6 text-4xl lg:text-6xl font-black leading-tight">

                Need Premium
                <br />

                Biomedical
                <span className="block text-[#F4C542]">

                  Solutions?

                </span>

              </h2>

              <p className="mt-7 max-w-xl text-lg leading-9 text-slate-300">

                Discover innovative diagnostic systems,
                biomedical equipment, installation,
                AMC, calibration and nationwide
                healthcare support from experienced
                professionals.

              </p>

              <div className="mt-10 flex flex-wrap gap-8">

                <div>

                  <h3 className="text-4xl font-black text-[#F4C542]">

                    500+

                  </h3>

                  <p className="text-slate-400">

                    Hospitals Served

                  </p>

                </div>

                <div>

                  <h3 className="text-4xl font-black text-[#F4C542]">

                    24/7

                  </h3>

                  <p className="text-slate-400">

                    Technical Support

                  </p>

                </div>

              </div>

            </div>

            {/* Right */}

            <div className="flex justify-center lg:justify-end">

              <div className="w-full max-w-md rounded-[34px] border border-[#F4C542]/20 bg-[#FFFDF5] p-8 shadow-[0_25px_60px_rgba(15,23,42,.18)] backdrop-blur-xl">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FEF3C7] text-[#B88700]">

                  <PhoneCall size={30} />

                </div>

                <h3 className="mt-6 text-3xl font-bold text-[#1E293B]">

                  Let's Talk

                </h3>

                <p className="mt-4 leading-8 text-slate-600">

                  Connect with our biomedical experts
                  for consultation, equipment supply,
                  installation, AMC and complete
                  healthcare solutions.

                </p>

                <div className="mt-10 space-y-4">

                  <Link
                    href={makeLink("/contact")}
                  >

                    <button className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#B88700] via-[#D4A017] to-[#F4C542] px-6 py-4 font-semibold text-white shadow-[0_15px_40px_rgba(212,175,55,.35)] transition-all duration-300 hover:scale-[1.03]">

                      Contact Us

                      <ArrowRight
                        size={18}
                        className="transition group-hover:translate-x-1"
                      />

                    </button>

                  </Link>

                  <a
                    href="tel:+919983123469"
                    className="flex w-full items-center justify-center rounded-2xl border border-[#D4A017]/30 bg-white px-6 py-4 font-semibold text-[#1E293B] transition-all hover:bg-[#FEF3C7]"
                  >

                    Call Now (+91 9983123469)

                  </a>

                </div>

              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}