import { ArrowUpRight, ArrowRight } from "lucide-react";

export default function ServiceCard({
  icon,
  title,
  description,
  loading = false,
}) {

  if (loading) {
    return (
      <div className="bg-white rounded-[30px] p-8 border border-slate-100 card-shadow animate-pulse">
        <div className="w-16 h-16 rounded-[22px] bg-slate-200 mb-6"></div>

        <div className="h-8 bg-slate-200 rounded mb-4"></div>

        <div className="space-y-3">
          <div className="h-4 bg-slate-200 rounded"></div>
          <div className="h-4 bg-slate-200 rounded w-11/12"></div>
          <div className="h-4 bg-slate-200 rounded w-8/12"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative overflow-hidden rounded-[30px] border border-[#F4C542]/15 bg-white p-8 shadow-[0_15px_50px_rgba(15,23,42,.08)] transition-all duration-500 hover:-translate-y-3 hover:border-[#D4A017]/40 hover:shadow-[0_25px_70px_rgba(15,23,42,.15)]">

      {/* Top Glow */}

      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#F4C542]/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

      {/* Gold Line */}

      <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-[#B88700] via-[#F4C542] to-[#FFE8A3] transition-all duration-500 group-hover:w-full" />

      {/* Icon */}

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FEF3C7] text-[#B88700] shadow-lg shadow-yellow-200/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">

        {icon}

      </div>

      {/* Title */}

      <h3 className="mt-7 text-2xl font-bold text-[#1E293B] transition-colors duration-300 group-hover:text-[#B88700]">

        {title}

      </h3>

      {/* Divider */}

      <div className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-[#B88700] to-[#F4C542] transition-all duration-500 group-hover:w-24" />

      {/* Description */}

      <p className="mt-6 leading-8 text-slate-600">

        {description}

      </p>

      {/* Bottom Arrow */}

      <div className="mt-8 flex items-center gap-2 font-semibold text-[#B88700] opacity-0 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100">

        Learn More

        <ArrowRight size={18} />

      </div>

    </div>
  );
}