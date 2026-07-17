export default function SeoContent({ city = "" }) {
    const location = city || "India";

    return (
        <section className="relative overflow-hidden bg-[#FFFDF5] py-24">

            {/* Background */}

            <div className="absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#F4C542]/10 blur-[150px]" />

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

                <div className="max-w-4xl">

                    <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A017]/30 bg-[#FEF3C7] px-5 py-2 text-sm font-semibold text-[#B88700]">

                        Biomedical Solutions

                    </div>

                    <h2 className="mt-6 text-4xl lg:text-5xl font-black text-[#1E293B]">

                        Biomedical Equipment Supplier in {location}

                    </h2>

                    <div className="mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-[#B88700] via-[#F4C542] to-[#B88700]" />

                </div>

                {/* Content */}

                <div className="mt-12 rounded-[32px] border border-[#F4C542]/15 bg-white p-10 shadow-[0_25px_70px_rgba(15,23,42,.08)]">

                    <div className="space-y-7 text-lg leading-9 text-slate-600">

                        <p>
                            Central Biomedicals is a trusted supplier of biomedical
                            and laboratory equipment in <strong>{location}</strong>.
                            We provide CBC Machines, Hematology Analyzers,
                            Biochemistry Analyzers, Urine Analyzers,
                            ELISA Readers and diagnostic instruments for
                            hospitals, pathology labs and healthcare facilities.
                        </p>

                        <p>
                            Our mission is to provide reliable and high-quality
                            laboratory equipment to healthcare professionals across
                            India. We work with diagnostic centres, hospitals,
                            research laboratories and medical institutions to
                            deliver advanced biomedical solutions.
                        </p>

                        <p>
                            We offer installation assistance, product guidance
                            and technical support for a wide range of laboratory
                            instruments. Whether you are setting up a new
                            diagnostic laboratory or upgrading existing equipment,
                            our team can help you select the right solution.
                        </p>

                        <p>
                            Central Biomedicals supplies equipment across
                            multiple districts and cities, helping healthcare
                            providers improve testing efficiency and
                            diagnostic accuracy.
                        </p>

                    </div>

                </div>

                {/* FAQ */}

                <div className="mt-20">

                    <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A017]/30 bg-[#FEF3C7] px-5 py-2 text-sm font-semibold text-[#B88700]">

                        Frequently Asked Questions

                    </div>

                    <h2 className="mt-6 text-4xl font-black text-[#1E293B]">

                        Common Questions

                    </h2>

                    <div className="mt-10 grid gap-6">

                        {[
                            {
                                q: "Do you supply biomedical equipment across India?",
                                a: "Yes, we supply biomedical and laboratory equipment across multiple districts and cities."
                            },
                            {
                                q: "Which laboratory instruments do you provide?",
                                a: "We provide CBC Machines, Hematology Analyzers, Biochemistry Analyzers, ELISA Readers, Urine Analyzers and more."
                            },
                            {
                                q: "Do you provide installation support?",
                                a: "Yes, installation assistance and technical support are available depending on the equipment and location."
                            },
                            {
                                q: "Who can purchase biomedical equipment?",
                                a: "Hospitals, pathology labs, diagnostic centres, research laboratories and healthcare facilities."
                            }
                        ].map((item, index) => (

                            <div
                                key={index}
                                className="rounded-3xl border border-[#F4C542]/15 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                            >

                                <h3 className="text-xl font-bold text-[#1E293B]">

                                    {item.q}

                                </h3>

                                <p className="mt-3 leading-8 text-slate-600">

                                    {item.a}

                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </section>
    );
}