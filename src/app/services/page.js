"use client";
import {
  Microscope,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
  Wrench,
  Activity,
} from "lucide-react";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const icons = [
    <Microscope size={30} />,
    <FlaskConical size={30} />,
    <ShieldCheck size={30} />,
    <Stethoscope size={30} />,
    <Wrench size={30} />,
    <Activity size={30} />,
  ];
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "qlytein",
            "pages",
            "services"
          )
        );

        if (snap.exists()) {
          setServices(snap.data().services || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);
  return (
    <>
      {/* Banner */}
      <PageBanner
        title="Our Services"
        subtitle="Delivering trusted biomedical and diagnostic services with innovation, precision, and healthcare excellence."
      />

      {/* Services Grid */}
      <section className="relative overflow-hidden bg-[#FFFDF5] py-24">

        {/* Background Glow */}

        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#F4C542]/10 blur-[150px]" />

        <div className="absolute bottom-0 left-0 h-[280px] w-[280px] rounded-full bg-[#FFE8A3]/15 blur-[120px]" />

        {/* Grid Pattern */}

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#D4A017 1px, transparent 1px), linear-gradient(90deg,#D4A017 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 container-custom">

          <SectionTitle
            badge="What We Offer"
            title="Premium Biomedical Services"
            description="We provide innovative healthcare and biomedical solutions tailored to modern diagnostics and laboratory excellence."
            center
          />

          <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

            {loading
              ? Array.from({ length: 6 }).map((_, index) => (

                <div
                  key={index}
                  className="rounded-[32px] border border-[#F4C542]/15 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,.08)] animate-pulse"
                >

                  <div className="mb-8 h-20 w-20 rounded-3xl bg-[#FEF3C7]" />

                  <div className="mb-6 h-8 w-2/3 rounded bg-slate-200" />

                  <div className="space-y-3">

                    <div className="h-4 rounded bg-slate-200" />

                    <div className="h-4 w-11/12 rounded bg-slate-200" />

                    <div className="h-4 w-8/12 rounded bg-slate-200" />

                  </div>

                </div>

              ))
              : services.map((service, index) => (

                <ServiceCard
                  key={index}
                  icon={icons[index]}
                  title={service.title}
                  description={service.desc}
                />

              ))}

          </div>

        </div>

      </section>

      {/* Working Process */}
      <section className="relative overflow-hidden bg-[#FFFDF5] py-24">

        {/* Background Glow */}

        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#F4C542]/10 blur-[150px]" />

        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#FFE8A3]/15 blur-[120px]" />

        {/* Pattern */}

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#D4A017 1px, transparent 1px), linear-gradient(90deg,#D4A017 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 container-custom">

          <SectionTitle
            badge="How We Work"
            title="Simple & Professional Process"
            description="We follow a streamlined process to ensure reliable biomedical and healthcare solutions."
            center
          />

          <div className="mt-20 grid gap-8 lg:grid-cols-3">

            {[
              {
                step: "01",
                title: "Consultation",
                desc:
                  "Understanding healthcare requirements and diagnostic needs before recommending the right biomedical solution.",
              },
              {
                step: "02",
                title: "Implementation",
                desc:
                  "Professional delivery, installation, calibration and complete equipment setup by certified engineers.",
              },
              {
                step: "03",
                title: "Support",
                desc:
                  "Ongoing AMC, maintenance, technical assistance and nationwide after-sales support.",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="group relative overflow-hidden rounded-[32px] border border-[#F4C542]/15 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,.08)] transition-all duration-500 hover:-translate-y-3 hover:border-[#D4A017]/40 hover:shadow-[0_30px_80px_rgba(15,23,42,.15)]"
              >

                {/* Top Gradient */}

                <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-[#B88700] via-[#D4A017] to-[#F4C542] transition-all duration-500 group-hover:w-full" />

                {/* Background Number */}

                <span className="absolute right-6 top-4 text-7xl font-black text-[#F4C542]/15">

                  {item.step}

                </span>

                {/* Step Badge */}

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#B88700] via-[#D4A017] to-[#F4C542] text-xl font-bold text-white shadow-lg shadow-yellow-200/40 transition duration-500 group-hover:scale-110">

                  {item.step}

                </div>

                {/* Title */}

                <h3 className="mt-8 text-2xl font-bold text-[#1E293B] transition-colors duration-300 group-hover:text-[#B88700]">

                  {item.title}

                </h3>

                {/* Divider */}

                <div className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-[#B88700] to-[#F4C542] transition-all duration-500 group-hover:w-24" />

                {/* Description */}

                <p className="mt-6 leading-8 text-slate-600">

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