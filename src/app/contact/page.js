"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { extractPhones, extractEmails, getContactAddress, getWorkingHours } from "@/lib/contact-utils";
import { fetchSiteDoc, submitQuery } from "@/lib/site-data-client";

import toast from "react-hot-toast";
import {
  Mail,
  Phone,
  MapPin,
  Clock3,
  ArrowRight,
} from "lucide-react";
import PageBanner from "@/components/PageBanner";
import CTASection from "@/components/CTASection";

export default function ContactPage({ city = "" }) {
  const [loading, setLoading] = useState(true);
  const [districtData, setDistrictData] = useState(null);
  const [contactInfo, setContactInfo] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const pathname = usePathname();

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const staticRoutes = [
    "about",
    "services",
    "products",
    "contact",
    "items",
    "enquiry",
    "biomedical-equipment",
    "brand",
    "category",
    "diagnostic-equipment",
    "laboratory-equipment",
  ];

  const currentDistrict =
    (city ? city.toLowerCase().replace(/\s+/g, "-") : "") ||
    (pathParts.length > 0 && !staticRoutes.includes(pathParts[0].toLowerCase())
      ? pathParts[0]
      : null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phoneRegex =
      /^[6-9]\d{9}$/;

    if (!form.name.trim()) {
      return toast.error(
        "Name is required"
      );
    }

    if (!emailRegex.test(form.email)) {
      return toast.error(
        "Enter valid email"
      );
    }

    if (!phoneRegex.test(form.phone)) {
      return toast.error(
        "Enter valid mobile number"
      );
    }

    if (!form.message.trim()) {
      return toast.error(
        "Message is required"
      );
    }

    try {
      setSubmitting(true);

      await submitQuery("/api/contact-query", {
        ...form,
        createdAt: new Date().toISOString(),
      }
      );

      toast.success(
        "Message submitted successfully"
      );

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      toast.error(
        "Something went wrong"
      );
    } finally {
      setSubmitting(false);
    }
  };
  useEffect(() => {
    const loadDistrict = async () => {
      if (!currentDistrict) return;

      try {
        const snap = await fetchSiteDoc(`district:${currentDistrict}`);

        if (snap.exists()) {
          setDistrictData(snap.data());
        }
      } catch (err) {
        console.log(err);
      }
    };

    loadDistrict();
  }, [currentDistrict]);
  useEffect(() => {
    const loadContact = async () => {
      try {
        const snap = await fetchSiteDoc("contact");

        if (snap.exists()) {
          setContactInfo(
            snap.data().contactInfo || []
          );
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadContact();
  }, []);

  const formatDistrictAddress = (data) => {
    if (!data) return "";
    if (data.address && String(data.address).trim()) return String(data.address).trim();
    const parts = [data.district, data.state, "India"].filter(Boolean);
    if (parts.length > 1) return parts.join(", ");
    return "";
  };

  const defaultAddress =
    "F-4, 1st Floor, Plot No. 16, D-Block Tagor Nagar, Ajmer-Delhi Bypass Rd, Jaipur, Rajasthan 302021, India";

  const phones = extractPhones(contactInfo);
  const emails = extractEmails(contactInfo);
  const address = getContactAddress(contactInfo);
  const hours = getWorkingHours(contactInfo);
  const dynamicAddress =
    formatDistrictAddress(districtData) ||
    address ||
    defaultAddress;
  const displayPhone = phones.length > 0 ? phones.join(", ") : "+91 9983123469";
  const displayEmail = emails.length > 0 ? emails.join(", ") : "rajbiosis@yahoo.in";
  const displayHours = hours || "Mon - Sat: 9:30 AM - 7:00 PM";
  const mapAddress = encodeURIComponent(dynamicAddress);
  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-custom">

          <div className="grid lg:grid-cols-2 gap-12">

            <div>
              <div className="h-12 w-64 bg-slate-200 rounded animate-pulse mb-8" />

              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-28 bg-slate-200 rounded-3xl animate-pulse mb-6"
                />
              ))}
            </div>

            <div className="bg-white p-10 rounded-3xl">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-14 bg-slate-200 rounded-2xl animate-pulse mb-5"
                />
              ))}
            </div>

          </div>

        </div>
      </section>
    );
  }
  return (
    <>
      {/* Banner */}
      <PageBanner
        title="Contact Our Technical Support Team"
        subtitle="Have questions about machinery or need fast technical help? We are here to support your clinic."
      />

      {/* Contact Section */}
      <section className="section-padding bg-white">
        <div className="container-custom grid lg:grid-cols-2 gap-14">

          {/* Left Info */}
          <div>

            <span className="inline-flex items-center gap-2 rounded-full border border-[#F4C542]/20 bg-[#FEF3C7] px-5 py-2.5 text-sm font-semibold text-[#B88700] shadow-sm mb-5">

              <span className="h-2 w-2 rounded-full bg-[#D4A017]" />

              Contact Information

            </span>

            <h2 className="section-title">
              Let’s Start a Conversation
            </h2>

            <p className="section-subtitle">
              Reach out for equipment inquiries, price estimates, or instant technical service for your laboratory.
            </p>

            {/* Contact Cards */}
            <div className="mt-10 space-y-6">

              {[
                {
                  icon: <Phone size={24} />,
                  title: "Phone Number",
                  value: displayPhone,
                  href: `tel:${phones[0] || "+919983123469"}`,
                },
                {
                  icon: <Mail size={24} />,
                  title: "Email Address",
                  value: displayEmail,
                  href: `mailto:${emails[0] || "rajbiosis@yahoo.in"}`,
                },
                {
                  icon: <MapPin size={24} />,
                  title: "Office Address",
                  value: dynamicAddress,
                  href: null,
                },
                {
                  icon: <Clock3 size={24} />,
                  title: "Working Hours",
                  value: displayHours,
                  href: null,
                },
              ].map((item, index) => (

                <div
                  key={index}
                  className="group relative overflow-hidden rounded-[28px] border border-[#F4C542]/15 bg-white p-6 shadow-[0_15px_40px_rgba(15,23,42,.08)] transition-all duration-500 hover:-translate-y-2 hover:border-[#D4A017]/40 hover:shadow-[0_25px_60px_rgba(15,23,42,.15)]"
                >

                  {/* Glow */}

                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#F4C542]/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

                  {/* Top Line */}

                  <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-[#B88700] via-[#D4A017] to-[#F4C542] transition-all duration-500 group-hover:w-full" />

                  <div className="flex items-start gap-5">

                    {/* Icon */}

                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-[#FEF3C7] text-[#B88700] shadow-lg shadow-yellow-200/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">

                      {item.icon}

                    </div>

                    {/* Content */}

                    <div>

                      <h4 className="text-xl font-bold text-[#1E293B]">

                        {item.title}

                      </h4>

                      <div className="mt-3 h-1 w-14 rounded-full bg-gradient-to-r from-[#B88700] to-[#F4C542] transition-all duration-500 group-hover:w-20" />

                      {item.href ? (
                        <a
                          href={item.href}
                          className="mt-4 block leading-7 font-semibold text-[#B88700] hover:underline break-words"
                        >

                          {item.value}

                        </a>
                      ) : (
                        <p className="mt-4 leading-7 text-slate-600 break-words">

                          {item.value}

                        </p>
                      )}

                    </div>

                  </div>

                </div>

              ))}

            </div>
          </div>

          {/* Right Form */}
          <div className="relative overflow-hidden rounded-[40px] border border-[#F4C542]/20 bg-white p-8 lg:p-10 shadow-[0_30px_80px_rgba(15,23,42,.12)]">

            {/* Background Glow */}

            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-[#F4C542]/10 blur-[120px]" />

            <div className="relative z-10">

              {/* Badge */}

              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A017]/30 bg-[#FEF3C7] px-5 py-2 text-sm font-semibold text-[#B88700]">

                Quick Response

              </div>

              {/* Title */}

              <h3 className="mt-6 text-4xl font-black text-[#1E293B]">

                Send Us a Direct Message

              </h3>

              <p className="mt-4 leading-8 text-slate-600">

                Fill out the form below and an engineer will reply quickly.

              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-10 space-y-5"
              >

                {/* Name */}

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#E5E7EB] bg-[#FFFCF3] px-5 py-4 text-[#1E293B] outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#D4A017] focus:bg-white focus:ring-4 focus:ring-[#F4C542]/20"
                />

                {/* Email */}

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#E5E7EB] bg-[#FFFCF3] px-5 py-4 text-[#1E293B] outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#D4A017] focus:bg-white focus:ring-4 focus:ring-[#F4C542]/20"
                />

                {/* Phone */}

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  maxLength={10}
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  className="w-full rounded-2xl border border-[#E5E7EB] bg-[#FFFCF3] px-5 py-4 text-[#1E293B] outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#D4A017] focus:bg-white focus:ring-4 focus:ring-[#F4C542]/20"
                />



                {/* Message */}

                <textarea
                  rows={5}
                  name="message"
                  placeholder="Your Message"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full resize-none rounded-2xl border border-[#E5E7EB] bg-[#FFFCF3] px-5 py-4 text-[#1E293B] outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#D4A017] focus:bg-white focus:ring-4 focus:ring-[#F4C542]/20"
                />

                {/* Button */}

                <button
                  type="submit"
                  disabled={submitting}
                  className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#B88700] via-[#D4A017] to-[#F4C542] py-4 font-semibold text-white shadow-[0_15px_40px_rgba(212,175,55,.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(212,175,55,.45)] disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {submitting ? "Submitting..." : "Send Message"}

                  {!submitting && <ArrowRight size={18} />}

                </button>

              </form>

            </div>

          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="pb-24 bg-white">
        <div className="container-custom">
          <div className="rounded-[40px] overflow-hidden border border-slate-100 card-shadow">

            <iframe
              src={`https://maps.google.com/maps?q=${mapAddress}&z=13&output=embed`}
              width="100%"
              height="500"
              loading="lazy"
              className="border-0 w-full"
            ></iframe>

          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}