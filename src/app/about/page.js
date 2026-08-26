import Image from "next/image";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";
import { ShieldCheck, Award, HeartHandshake, Truck, Wrench, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "About Us | Rajbiosis Private Limited",
  description: "Learn about Rajbiosis Private Limited - supplying trusted diagnostic machinery, laboratory testing units, setup guidance, and maintenance support across India.",
  keywords: [
    "About Rajbiosis Private Limited",
    "Rajbiosis Medical Supplier",
    "Diagnostic Equipment Jaipur",
    "Laboratory Testing Machinery India",
    "Biomedical Service Support",
  ],
  alternates: {
    canonical: "https://qlyte.in/about",
  },
  openGraph: {
    title: "About Rajbiosis Private Limited",
    description: "Trusted partner in biomedical diagnostic and laboratory equipment across India.",
    url: "https://qlyte.in/about",
    siteName: "Rajbiosis Private Limited",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Page Banner */}
      <PageBanner
        title="About Rajbiosis Private Limited"
        subtitle="Helping diagnostic centers deliver accurate patient reports every single day."
      />

      {/* Main Story Section */}
      <section className="relative overflow-hidden bg-[#FFFDF5] py-20 lg:py-28">
        <div className="absolute -top-40 left-1/2 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-[#F4C542]/10 blur-[150px]" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-[#FFE8A3]/15 blur-[120px]" />

        <div className="container-custom relative z-10 grid items-center gap-14 lg:grid-cols-2 lg:gap-20">

          {/* Left Column: Image Card */}
          <div className="relative">
            <div className="overflow-hidden rounded-[36px] border border-[#F4C542]/20 bg-white p-3 shadow-[0_25px_70px_rgba(15,23,42,.12)]">
              <div className="relative h-[380px] sm:h-[480px] w-full overflow-hidden rounded-[28px]">
                <Image
                  src="/about-hero.png"
                  alt="Rajbiosis Private Limited Showroom & Laboratory Equipment"
                  fill
                  priority
                  className="object-cover transition duration-700 hover:scale-105"
                />
              </div>
            </div>

            {/* Experience Floating Card */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 rounded-[28px] border border-[#F4C542]/30 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,.15)] backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FEF3C7] text-[#B88700] font-black text-2xl">
                  10+
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#1E293B]">Years Supporting Healthcare</h3>
                  <p className="text-xs font-semibold text-slate-500">Diagnostic Supply & Maintenance</p>
                </div>
              </div>
            </div>

            {/* Floating Quality Badge */}
            <div className="absolute top-6 left-6 inline-flex items-center gap-2 rounded-full bg-[#0F172A]/80 text-white backdrop-blur-md px-4 py-2 text-xs font-bold shadow-lg border border-white/20">
              <ShieldCheck size={16} className="text-[#F4C542]" />
              <span>Verified Laboratory Solutions</span>
            </div>
          </div>

          {/* Right Column: Text Story */}
          <div>
            <SectionTitle
              badge="Who We Are"
              title="Who We Are & What We Stand For"
              description="Rajbiosis Private Limited provides clinical testing machinery, blood counters, biochemistry systems, and pathology supplies to clinics and hospitals across India."
            />

            <p className="mt-6 text-base sm:text-lg leading-8 text-slate-600">
              Based in Jaipur, Rajasthan, <strong>Rajbiosis Private Limited</strong> focuses on making clinical diagnostic equipment easy to acquire and simple to operate. We supply reliable testing systems tailored for clinical pathology units, hospital ICUs, diagnostic labs, and medical centers.
            </p>

            <p className="mt-4 text-base sm:text-lg leading-8 text-slate-600">
              Our field engineers assist clinics with complete end-to-end support. From choosing the suitable testing machine for your daily workload to proper installation, staff operational guidance, and routine maintenance, we ensure your lab runs smoothly.
            </p>

            {/* Key Bullet Checklist */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Authentic Machinery Only",
                "Trained Field Engineers",
                "Safe Transit Nationwide",
                "Clear Warranty Terms",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 rounded-2xl bg-white p-3.5 border border-[#F4C542]/20 shadow-sm">
                  <CheckCircle2 size={18} className="text-[#B88700] shrink-0" />
                  <span className="text-sm font-bold text-[#1E293B]">{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="relative overflow-hidden bg-[#FFFDF5] py-20 border-t border-[#F4C542]/15">
        <div className="container-custom">
          <SectionTitle
            badge="Our Philosophy"
            title="Vision & Mission"
            description="Guiding diagnostic excellence with practical technology and dependable technical service."
            center
          />

          <div className="mt-16 grid gap-8 md:grid-cols-2">

            {/* Card 1: Vision */}
            <div className="group relative overflow-hidden rounded-[32px] border border-[#F4C542]/20 bg-white p-8 sm:p-10 shadow-[0_20px_50px_rgba(15,23,42,.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FEF3C7] text-[#B88700]">
                <Award size={32} />
              </div>
              <h3 className="text-2xl font-black text-[#1E293B] transition group-hover:text-[#B88700]">
                Our Vision
              </h3>
              <p className="mt-4 leading-8 text-slate-600">
                To make high-quality medical testing technology accessible and easy to run for every laboratory and clinic across India.
              </p>
            </div>

            {/* Card 2: Mission */}
            <div className="group relative overflow-hidden rounded-[32px] border border-[#F4C542]/20 bg-white p-8 sm:p-10 shadow-[0_20px_50px_rgba(15,23,42,.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FEF3C7] text-[#B88700]">
                <HeartHandshake size={32} />
              </div>
              <h3 className="text-2xl font-black text-[#1E293B] transition group-hover:text-[#B88700]">
                Our Mission
              </h3>
              <p className="mt-4 leading-8 text-slate-600">
                To supply genuine diagnostic machines, offer clear hands-on staff training, and provide fast technical repairs whenever clinics need help.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Us Grid */}
      <section className="relative overflow-hidden bg-[#0F172A] py-24 text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block rounded-full bg-[#F4C542]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#F4C542]">
              Why Choose Rajbiosis
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              Reliable Machinery & Honest Guidance
            </h2>
            <p className="mt-4 text-slate-300">
              Every instrument we deliver is tested for performance to help your laboratory output accurate diagnostic results.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <ShieldCheck size={28} />,
                title: "Verified Brands",
                desc: "Direct supply of tested analyzers, testing reagents, and pathology instruments.",
              },
              {
                icon: <Wrench size={28} />,
                title: "On-Site Engineers",
                desc: "Skilled technicians handling physical installation, routine maintenance, and fast servicing.",
              },
              {
                icon: <Truck size={28} />,
                title: "Safe Shipping",
                desc: "Careful packaging and transit coverage to ensure your equipment arrives damage-free.",
              },
              {
                icon: <Award size={28} />,
                title: "Warranty & Help",
                desc: "Equipment warranty options, clear calibration reports, and quick telephone technical support.",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-slate-800 bg-slate-900/80 p-7 backdrop-blur-md transition-all duration-300 hover:border-[#F4C542]/50 hover:-translate-y-2"
              >
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4C542]/15 text-[#F4C542]">
                  {card.icon}
                </div>
                <h4 className="text-xl font-bold text-white">{card.title}</h4>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">{card.desc}</p>
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