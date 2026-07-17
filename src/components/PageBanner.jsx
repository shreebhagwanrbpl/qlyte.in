"use client";

import { motion } from "framer-motion";

export default function PageBanner({
  title,
  subtitle,
}) {
  return (
    <section className="relative overflow-hidden bg-[#FFFDF5] py-28 lg:py-36">

      {/* Background Glow */}
      <div className="absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#F4C542]/15 blur-[140px]" />

      <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-[#FFE8A3]/20 blur-[120px]" />

      <div className="absolute top-20 right-0 h-[260px] w-[260px] rounded-full bg-[#FFF3BF] blur-[120px]" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#D4A017 1px, transparent 1px), linear-gradient(90deg,#D4A017 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top Decorative Line */}
      <div className="absolute top-0 left-1/2 h-[2px] w-72 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#D4A017] to-transparent" />

      <div className="container-custom relative z-10">

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mx-auto max-w-5xl text-center"
        >

          {/* Badge */}

          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A017]/30 bg-[#FEF3C7] px-6 py-2 text-sm font-semibold text-[#B88700] shadow-lg shadow-yellow-200/30">

            ✨ Premium Biomedical Solutions

          </div>

          {/* Heading */}

          <h1 className="mt-8 text-5xl font-black leading-tight text-[#1E293B] md:text-6xl xl:text-7xl">

            {title}

          </h1>

          {/* Divider */}

          <div className="mx-auto mt-8 h-1 w-28 rounded-full bg-gradient-to-r from-[#B88700] via-[#F4C542] to-[#B88700]" />

          {/* Subtitle */}

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-slate-700">

            {subtitle}

          </p>

        </motion.div>

      </div>

      {/* Bottom Decorative Line */}

      <div className="absolute bottom-0 left-1/2 h-[2px] w-72 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#D4A017] to-transparent" />

    </section>
  );
}