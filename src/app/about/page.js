import Image from "next/image";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";
import { ShieldCheck, Award, HeartHandshake, Truck, Wrench, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "About Us | Rajbiosis Private Limited",
  description: "Learn about Rajbiosis Private Limited - India's leading supplier of biomedical equipment, pathology laboratory analyzers, hospital diagnostic systems, installation, AMC & calibration services.",
  keywords: [
    "About Rajbiosis Private Limited",
    "Raj Biosis Company Profile",
    "Biomedical Equipment Supplier Jaipur",
    "Laboratory Equipment Dealer India",
    "Diagnostic Equipment Distributor",
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
        subtitle="Empowering medical diagnostics and healthcare institutions with precision biomedical technologies across India."
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
                  <h3 className="text-xl font-black text-[#1E293B]">Years of Excellence</h3>
                  <p className="text-xs font-semibold text-slate-500">Biomedical Engineering & Supply</p>
                </div>
              </div>
            </div>

            {/* Floating Quality Badge */}
            <div className="absolute top-6 left-6 inline-flex items-center gap-2 rounded-full bg-[#0F172A]/80 text-white backdrop-blur-md px-4 py-2 text-xs font-bold shadow-lg border border-white/20">
              <ShieldCheck size={16} className="text-[#F4C542]" />
              <span>Certified Healthcare Quality</span>
            </div>
          </div>

          {/* Right Column: Text Story */}
          <div>
            <SectionTitle
              badge="Who We Are"
              title="Trusted Partner in Biomedical & Healthcare Diagnostics"
              description="Rajbiosis Private Limited delivers state-of-the-art diagnostic machines, hematology systems, biochemistry analyzers, and pathology equipment to hospitals, diagnostic centers, and medical colleges across India."
            />

            <p className="mt-6 text-base sm:text-lg leading-8 text-slate-600">
              Headquartered in Jaipur, Rajasthan, <strong>Rajbiosis Private Limited</strong> has established itself as a benchmark for quality, technical excellence, and customer trust. We specialize in providing comprehensive diagnostic equipment solutions tailored to clinical laboratories, pathology units, emergency ICUs, and research institutes.
            </p>

            <p className="mt-4 text-base sm:text-lg leading-8 text-slate-600">
              Our dedicated team of certified biomedical engineers ensures complete end-to-end support — from initial consultation and equipment selection to seamless installation, staff training, calibration, and long-term Annual Maintenance Contracts (AMC).
            </p>

            {/* Key Bullet Checklist */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "100% Genuine Leading Brands",
                "Certified Engineers & AMC",
                "Fast Pan-India Delivery",
                "24/7 Technical Helpline",
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
            description="Guiding the future of healthcare diagnostics with innovation and unyielding quality standards."
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
                To be India’s most trusted and preferred biomedical equipment provider, empowering laboratories and hospitals with world-class diagnostic technology that ensures fast, accurate, and lifesaving patient outcomes.
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
                To deliver authentic, high-precision medical machinery at competitive prices, backed by prompt installation, rigorous calibration, staff training, and round-the-clock technical service support across all regions.
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
              Built on Reliability, Precision & Integrity
            </h2>
            <p className="mt-4 text-slate-300">
              Every equipment we supply undergoes multi-stage quality testing to guarantee uncompromised accuracy in medical diagnostics.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <ShieldCheck size={28} />,
                title: "Authentic Products",
                desc: "Direct supply of 100% genuine blood analyzers, reagents, and pathology instruments from top manufacturers.",
              },
              {
                icon: <Wrench size={28} />,
                title: "Certified Engineers",
                desc: "Expert biomedical engineers providing immediate installation, preventive maintenance, and AMC service.",
              },
              {
                icon: <Truck size={28} />,
                title: "Express Logistics",
                desc: "Safe, transit-insured delivery across all states and districts in India with zero damage guarantee.",
              },
              {
                icon: <Award size={28} />,
                title: "Warranty & Support",
                desc: "Comprehensive equipment warranty, calibration certificates, and 24/7 dedicated helpline assistance.",
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