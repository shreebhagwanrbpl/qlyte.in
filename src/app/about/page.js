import Image from "next/image";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import DDS from "@/components/img/Dds.png";

export default function AboutPage() {
  return (
    <>
      {/* Banner */}
      <PageBanner
        title="About Raj Biosis"
        subtitle="Delivering trusted diagnostic and biomedical technologies with innovation, quality, and healthcare precision."
      />

      {/* About Section */}
      <section className="relative overflow-hidden bg-[#FFFDF5] py-24">

        {/* Background */}

        <div className="absolute -top-40 left-1/2 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-[#F4C542]/10 blur-[150px]" />

        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-[#FFE8A3]/15 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#D4A017 1px, transparent 1px), linear-gradient(90deg,#D4A017 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container-custom relative z-10 grid items-center gap-20 lg:grid-cols-2">

          {/* Left */}

          <div className="relative">

            {/* Image */}

            <div className="overflow-hidden rounded-[40px] border border-[#F4C542]/15 bg-white p-10 shadow-[0_30px_80px_rgba(15,23,42,.08)]">

              <Image
                src={DDS}
                alt="About"
                width={1200}
                height={900}
                className="h-[550px] w-full object-contain transition duration-700 hover:scale-105"
              />

            </div>

            {/* Experience Card */}

            <div className="absolute -bottom-8 left-8 hidden rounded-[28px] border border-[#F4C542]/20 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,.15)] lg:block">

              <h3 className="text-5xl font-black text-[#B88700]">

                10+

              </h3>

              <p className="mt-2 text-slate-600">

                Years of Excellence

              </p>

            </div>

            {/* Floating Badge */}

            <div className="absolute right-8 top-8 hidden rounded-full bg-[#FEF3C7] px-5 py-2 text-sm font-semibold text-[#B88700] shadow-lg lg:block">

              ISO Certified

            </div>

          </div>

          {/* Right */}

          <div>

            <SectionTitle
              badge="Who We Are"
              title="Trusted Partner in Biomedical & Diagnostics"
              description="We provide advanced diagnostic and biomedical solutions focused on healthcare innovation, laboratory precision and modern medical excellence."
            />

            <p className="mt-8 text-lg leading-9 text-slate-600">

              At Raj Biosis, we are committed to delivering
              premium-quality healthcare and biomedical technologies
              designed to improve diagnostics, laboratory performance
              and medical efficiency for hospitals, pathology labs and
              research institutions.

            </p>

            <p className="mt-6 text-lg leading-9 text-slate-600">

              Our mission is to empower healthcare professionals with
              trusted equipment, expert consultation, nationwide service
              support and innovative biomedical solutions tailored to
              modern healthcare requirements.

            </p>

            {/* Features */}

            <div className="mt-12 grid gap-6 sm:grid-cols-2">

              <div className="group rounded-[28px] border border-[#F4C542]/15 bg-white p-6 shadow-[0_15px_40px_rgba(15,23,42,.08)] transition-all duration-500 hover:-translate-y-2 hover:border-[#D4A017]/40">

                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FEF3C7] text-[#B88700] text-2xl">

                  🏥

                </div>

                <h4 className="text-xl font-bold text-[#1E293B]">

                  Premium Equipment

                </h4>

                <p className="mt-3 leading-7 text-slate-600">

                  High-end biomedical and laboratory
                  technologies for modern diagnostics.

                </p>

              </div>

              <div className="group rounded-[28px] border border-[#F4C542]/15 bg-white p-6 shadow-[0_15px_40px_rgba(15,23,42,.08)] transition-all duration-500 hover:-translate-y-2 hover:border-[#D4A017]/40">

                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FEF3C7] text-[#B88700] text-2xl">

                  🤝

                </div>

                <h4 className="text-xl font-bold text-[#1E293B]">

                  Expert Support

                </h4>

                <p className="mt-3 leading-7 text-slate-600">

                  Trusted consultation, installation,
                  AMC and nationwide technical support.

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}