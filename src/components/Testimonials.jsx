"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

export default function Testimonials() {
  const reviews = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Healthcare Specialist",
      review:
        "Raj Biosis has consistently delivered reliable diagnostic equipment with outstanding support.",
    },
    {
      name: "Amit Sharma",
      role: "Lab Director",
      review:
        "Professional service, premium products, and excellent biomedical consultation experience.",
    },
    {
      name: "Neha Verma",
      role: "Research Head",
      review:
        "Their healthcare solutions improved our laboratory efficiency significantly.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#FFFDF5] py-24">

      {/* Background Glow */}

      <div className="absolute -top-40 left-1/2 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-[#F4C542]/10 blur-[150px]" />

      <div className="absolute bottom-0 left-0 h-[280px] w-[280px] rounded-full bg-[#FFE8A3]/15 blur-[120px]" />

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

        <SectionTitle
          badge="Testimonials"
          title="What Our Clients Say"
          description="Trusted by healthcare professionals, laboratories and biomedical institutions across India."
          center
        />

        <div className="mt-20 grid gap-8 lg:grid-cols-3">

          {reviews.map((item, index) => (

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
                duration: 0.6,
                delay: index * 0.15,
              }}
              viewport={{
                once: true,
              }}
              className="group relative overflow-hidden rounded-[32px] border border-[#F4C542]/15 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,.08)] transition-all duration-500 hover:-translate-y-3 hover:border-[#D4A017]/40 hover:shadow-[0_30px_80px_rgba(15,23,42,.15)]"
            >

              {/* Glow */}

              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#F4C542]/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

              {/* Quote */}

              <div className="mb-6 text-6xl font-black leading-none text-[#F4C542]/30">

                “

              </div>

              {/* Stars */}

              <div className="mb-6 flex gap-1 text-xl text-[#F4C542]">

                ★★★★★

              </div>

              {/* Review */}

              <p className="leading-8 italic text-slate-600">

                "{item.review}"

              </p>

              {/* Divider */}

              <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-[#F4C542]/40 to-transparent" />

              {/* User */}

              <div className="mt-8 flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FEF3C7] text-lg font-bold text-[#B88700]">

                  {item.name?.charAt(0)}

                </div>

                <div>

                  <h4 className="font-bold text-[#1E293B]">

                    {item.name}

                  </h4>

                  <p className="text-sm text-slate-500">

                    {item.role}

                  </p>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}