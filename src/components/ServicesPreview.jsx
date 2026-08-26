"use client";

import { motion } from "framer-motion";
import {
  Microscope,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import SectionTitle from "./SectionTitle";
import ServiceCard from "./ServiceCard";

export default function ServicesPreview() {
  const services = [
    {
      icon: <Microscope size={30} />,
      title: "Diagnostic Machine Supply",
      description:
        "Advanced testing systems tailored for medical clinics, pathology labs, and diagnostic centers.",
    },
    {
      icon: <FlaskConical size={30} />,
      title: "Complete Lab Setup",
      description:
        "End-to-end guidance and equipment installation for setting up or upgrading your laboratory.",
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "Preventive Maintenance",
      description:
        "Routine checkups and scheduled servicing to keep your diagnostic machinery running perfectly.",
    },
    {
      icon: <Stethoscope size={30} />,
      title: "Technical Guidance",
      description:
        "Practical advice and hands-on staff training to ensure smooth, trouble-free daily operation.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#FFFDF5] py-24">

      {/* Background Glow */}

      <div className="absolute -top-40 left-1/2 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-[#F4C542]/10 blur-[150px]" />

      <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-[#FFE8A3]/15 blur-[120px]" />

      <div className="absolute top-32 right-0 h-[260px] w-[260px] rounded-full bg-[#FFF3BF] blur-[120px]" />

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

        {/* Section Title */}

        <SectionTitle
          badge="Our Services"
          title="Essential Services We Offer"
          description="Providing modern medical machinery, laboratory tools, and dedicated maintenance support for clinics."
          center
        />

        {/* Cards */}

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {services.map((service, index) => (

            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 60,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
              }}
              viewport={{
                once: true,
              }}
            >

              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
              />

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}