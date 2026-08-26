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
                            At Rajbiosis, we supply medical diagnostic systems and clinical laboratory machinery to hospitals, pathology centers, and healthcare institutes in <strong>{location}</strong>. Our lineup includes blood analyzers, biochemistry instruments, urine testing systems, and essential diagnostic tools.
                        </p>

                        <p>
                            We aim to make clinical testing reliable and hassle-free for medical staff across India. By offering durable machines and on-site engineering assistance, we help clinics generate accurate diagnostic reports without operational delays.
                        </p>

                        <p>
                            Our technical team assists with equipment installation, routine testing, and ongoing service support. Whether you are opening a new pathology laboratory or upgrading older devices, we guide you to the right machinery for your test volume.
                        </p>

                        <p>
                            With direct delivery and service coverage across cities and districts, Rajbiosis supports healthcare units in maintaining high standards of diagnostic accuracy.
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
                                q: "Can you supply machinery to our location in India?",
                                a: "Yes, we ship and deliver diagnostic machinery to clinics, hospitals, and labs across all states and districts."
                            },
                            {
                                q: "What types of diagnostic machinery do you supply?",
                                a: "We supply CBC blood counters, hematology analyzers, biochemistry testing units, urine strip readers, and pathology lab tools."
                            },
                            {
                                q: "Do you offer installation and initial machine setup?",
                                a: "Yes, our engineers handle complete physical installation, testing, and operational guidance for your lab technicians."
                            },
                            {
                                q: "Who can order equipment from Rajbiosis?",
                                a: "Hospitals, pathology labs, diagnostic clinics, medical research units, and healthcare centers can place orders directly."
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