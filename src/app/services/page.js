"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Microscope,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
  Wrench,
  Activity,
  PhoneCall,
  CheckCircle,
} from "lucide-react";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const icons = [
    <Microscope key="1" size={30} />,
    <FlaskConical key="2" size={30} />,
    <ShieldCheck key="3" size={30} />,
    <Stethoscope key="4" size={30} />,
    <Wrench key="5" size={30} />,
    <Activity key="6" size={30} />,
  ];

  const defaultServices = [
    {
      title: "Medical Machine Supply",
      desc: "Authorized supply of CBC counters, hematology systems, biochemistry analyzers, blood gas units, and pathology laboratory instruments.",
    },
    {
      title: "On-Site Setup & Testing",
      desc: "Professional physical installation and accuracy configuration by experienced biomedical technicians before your first patient test.",
    },
    {
      title: "Annual Maintenance Plans (AMC)",
      desc: "Scheduled preventive servicing contracts to protect your machinery from sudden breakdowns and ensure long operational life.",
    },
    {
      title: "Calibration & Accuracy Audits",
      desc: "Routine calibration checks meeting essential healthcare guidelines to guarantee reliable patient diagnostic results.",
    },
    {
      title: "Operator & Staff Training",
      desc: "Practical hands-on training sessions for lab technicians and doctors to operate equipment safely and efficiently.",
    },
    {
      title: "Emergency Repairs & Spares",
      desc: "Fast troubleshooting assistance and genuine replacement spare parts across India to minimize laboratory downtime.",
    },
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const snap = await getDoc(
          doc(db, "websites", "qlytein", "pages", "services")
        );

        if (snap.exists() && snap.data().services?.length) {
          setServices(snap.data().services);
        } else {
          setServices(defaultServices);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setServices(defaultServices);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const displayServices = services.length ? services : defaultServices;

  return (
    <>
      {/* Page Banner */}
      <PageBanner
        title="Our Services & Technical Support"
        subtitle="Everything your clinic needs — from machine supply and setup to routine servicing."
      />

      {/* Services Showcase Hero */}
      <section className="relative overflow-hidden bg-[#FFFDF5] pt-20 pb-16">
        <div className="container-custom relative z-10 grid items-center gap-12 lg:grid-cols-12">
          
          {/* Left Description */}
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#FEF3C7] border border-[#F4C542]/30 px-4 py-1.5 text-xs font-bold text-[#B88700]">
              <ShieldCheck size={16} />
              Complete Lifecycle Support
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E293B] leading-tight">
              Complete Care Throughout Your Equipment's Lifecycle
            </h2>
            <p className="mt-5 text-base sm:text-lg leading-8 text-slate-600">
              At <strong>Rajbiosis Private Limited</strong>, our relationship with clinics and hospitals goes far beyond machinery delivery. We assist you with complete operational guidance and technician support whenever you need help.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Turnkey Pathology Setup & Machine Recommendation",
                "Direct Service Coverage Across Cities & Districts",
                "Authentic Reagents, Testing Strips & OEM Spare Parts",
                "Fast Engineering Helpline & On-Call Guidance",
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-[#B88700] shrink-0" />
                  <span className="text-sm font-bold text-[#1E293B]">{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="tel:+919983123469"
                className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#B88700] via-[#D4A017] to-[#F4C542] px-7 py-3.5 font-bold text-white shadow-lg transition hover:scale-105"
              >
                <PhoneCall size={18} />
                <span>Call Engineer: +91 9983123469</span>
              </a>
            </div>
          </div>

          {/* Right Showcase Image Card */}
          <div className="lg:col-span-6 relative">
            <div className="overflow-hidden rounded-[36px] border border-[#F4C542]/20 bg-white p-3 shadow-[0_25px_70px_rgba(15,23,42,.12)]">
              <div className="relative h-[360px] sm:h-[440px] w-full overflow-hidden rounded-[28px]">
                <Image
                  src="/services-hero.png"
                  alt="Biomedical Engineer Service & Calibration"
                  fill
                  priority
                  className="object-cover transition duration-700 hover:scale-105"
                />
              </div>
            </div>

            <div className="absolute -bottom-6 right-6 hidden sm:block rounded-[24px] bg-[#0F172A] p-5 text-white shadow-2xl border border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F4C542] text-[#0F172A] font-black text-xl">
                  24/7
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Technical Support</h4>
                  <p className="text-xs text-slate-400">Jaipur & Pan-India Helpline</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Services Grid */}
      <section className="relative overflow-hidden bg-[#FFFDF5] py-20 border-t border-[#F4C542]/15">
        <div className="container-custom relative z-10">
          <SectionTitle
            badge="What We Offer"
            title="Our Core Biomedical Services"
            description="High-precision solutions tailored to modern hospitals, pathology laboratories, and diagnostic centers."
            center
          />

          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-[32px] border border-[#F4C542]/15 bg-white p-8 shadow-sm animate-pulse"
                  >
                    <div className="mb-8 h-16 w-16 rounded-2xl bg-[#FEF3C7]" />
                    <div className="mb-4 h-7 w-2/3 rounded bg-slate-200" />
                    <div className="h-4 rounded bg-slate-200" />
                  </div>
                ))
              : displayServices.map((service, index) => (
                  <ServiceCard
                    key={index}
                    icon={icons[index % icons.length]}
                    title={service.title || service.name}
                    description={service.desc || service.description}
                  />
                ))}
          </div>
        </div>
      </section>

      {/* 3-Step Work Process */}
      <section className="relative overflow-hidden bg-[#FFFDF5] py-24 border-t border-[#F4C542]/15">
        <div className="container-custom relative z-10">
          <SectionTitle
            badge="How We Work"
            title="Simple 3-Step Process"
            description="We follow a clear workflow from initial consultation to equipment setup and continuous technical support."
            center
          />

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {[
              {
                step: "01",
                title: "Understanding Your Needs",
                desc: "We analyze your lab's sample volume and testing goals to suggest the most efficient equipment model.",
              },
              {
                step: "02",
                title: "Safe Setup & Training",
                desc: "We deliver the machine safely, perform full physical setup, test accuracy, and train your laboratory team.",
              },
              {
                step: "03",
                title: "Continuous Technical Support",
                desc: "We remain available 24/7 for preventive checkups, routine maintenance contracts, and prompt repairs.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-[32px] border border-[#F4C542]/20 bg-white p-8 shadow-[0_15px_40px_rgba(15,23,42,.06)] transition-all duration-500 hover:-translate-y-2 hover:border-[#D4A017]/40 hover:shadow-xl"
              >
                <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-[#B88700] via-[#D4A017] to-[#F4C542] transition-all duration-500 group-hover:w-full" />
                <span className="absolute right-6 top-4 text-7xl font-black text-[#F4C542]/15">
                  {item.step}
                </span>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#B88700] via-[#D4A017] to-[#F4C542] text-xl font-bold text-white shadow-md transition duration-500 group-hover:scale-110">
                  {item.step}
                </div>
                <h3 className="mt-8 text-2xl font-bold text-[#1E293B] transition duration-300 group-hover:text-[#B88700]">
                  {item.title}
                </h3>
                <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#B88700] to-[#F4C542] transition-all duration-500 group-hover:w-24" />
                <p className="mt-6 leading-8 text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </>
  );
}