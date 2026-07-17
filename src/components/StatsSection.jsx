"use client";

import { motion } from "framer-motion";
import {
  Users,
  FlaskConical,
  BadgeCheck,
  Building2,
} from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      icon: <Building2 size={34} />,
      number: "10+",
      label: "Years Experience",
    },
    {
      icon: <FlaskConical size={34} />,
      number: "500+",
      label: "Biomedical Products",
    },
    {
      icon: <Users size={34} />,
      number: "200+",
      label: "Trusted Clients",
    },
    {
      icon: <BadgeCheck size={34} />,
      number: "100%",
      label: "Quality Assurance",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#FFFDF5] py-24">

      {/* Background Glow */}

      <div className="absolute -top-40 left-1/2 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-[#F4C542]/10 blur-[160px]" />

      <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#FFE8A3]/15 blur-[120px]" />

      {/* Grid */}

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#D4A017 1px, transparent 1px), linear-gradient(90deg,#D4A017 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container-custom relative z-10">

        <div className="rounded-[40px] border border-[#F4C542]/15 bg-white p-10 lg:p-16 shadow-[0_25px_70px_rgba(15,23,42,.08)]">

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            {stats.map((item, index) => (

              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                }}
                viewport={{
                  once: true,
                }}
                className="group rounded-3xl p-6 text-center transition-all duration-500 hover:-translate-y-3 hover:bg-[#FFFDF5]"
              >

                {/* Icon */}

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#FEF3C7] text-[#B88700] shadow-lg shadow-yellow-200/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">

                  {item.icon}

                </div>

                {/* Number */}

                <h3 className="mt-8 text-5xl font-black text-[#1E293B] transition-colors duration-300 group-hover:text-[#B88700]">

                  {item.number}

                </h3>

                {/* Divider */}

                <div className="mx-auto mt-5 h-1 w-14 rounded-full bg-gradient-to-r from-[#B88700] to-[#F4C542] transition-all duration-500 group-hover:w-20" />

                {/* Label */}

                <p className="mt-5 text-lg text-slate-600">

                  {item.label}

                </p>

              </motion.div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}