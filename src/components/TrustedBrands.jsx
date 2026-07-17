export default function TrustedBrands() {
  const brands = [
    "HealthCare+",
    "BioMed Labs",
    "MediCore",
    "Life Diagnostics",
    "Care Plus",
  ];

  return (
    <section className="relative overflow-hidden bg-[#FFFDF5] py-20">

      {/* Background Glow */}

      <div className="absolute -top-32 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-[#F4C542]/10 blur-[140px]" />

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

        {/* Heading */}

        <div className="text-center">

          <span className="inline-flex items-center gap-2 rounded-full border border-[#D4A017]/30 bg-[#FEF3C7] px-5 py-2 text-sm font-semibold text-[#B88700]">

            Trusted Partners

          </span>

          <h2 className="mt-6 text-4xl font-black text-[#1E293B]">

            Trusted by Healthcare &
            Biomedical Organizations

          </h2>

          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-[#B88700] via-[#F4C542] to-[#B88700]" />

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">

            Partnering with hospitals, laboratories,
            diagnostic centres and healthcare
            institutions across India.

          </p>

        </div>

        {/* Brands */}

        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">

          {brands.map((brand, index) => (

            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl border border-[#F4C542]/15 bg-white p-8 text-center shadow-[0_15px_40px_rgba(15,23,42,.08)] transition-all duration-500 hover:-translate-y-2 hover:border-[#D4A017]/40 hover:shadow-[0_25px_60px_rgba(15,23,42,.15)]"
            >

              {/* Top Line */}

              <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-[#B88700] via-[#F4C542] to-[#FFE8A3] transition-all duration-500 group-hover:w-full" />

              {/* Logo Circle */}

              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#FEF3C7] text-2xl font-black text-[#B88700] transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">

                {brand.charAt(0)}

              </div>

              {/* Brand */}

              <h3 className="text-lg font-bold text-[#1E293B] transition-colors duration-300 group-hover:text-[#B88700]">

                {brand}

              </h3>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}