"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const staticRoutes = [
    "about",
    "services",
    "items",
    "contact",
  ];

  const district =
    pathParts.length > 0 &&
      !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  const makeLink = (path) => {
    if (!district) return path;

    if (path === "/") {
      return `/${district}`;
    }

    return `/${district}${path}`;
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Products", path: "/items" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#F4C542]/20 bg-[#FFFDF5]/90 backdrop-blur-2xl">

      <div className="container-custom flex h-20 items-center justify-between">

        {/* Logo */}

        <Link href={makeLink("/")} className="flex items-center gap-3 group">

          <div className="relative h-14 w-auto shrink-0 transition group-hover:scale-105">

            <Image
              src="/logo.png"
              alt="Raj Biosis Private Limited"
              width={160}
              height={56}
              priority
              className="h-14 w-auto object-contain drop-shadow-sm"
            />

          </div>

        </Link>

        {/* Desktop Menu */}

        <nav className="hidden lg:flex items-center gap-10">

          {navLinks.map((link) => (

            <Link
              key={link.name}
              href={makeLink(link.path)}
              className="relative font-semibold text-[#475569] transition-all duration-300 hover:text-[#C89200] after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-[#C89200] after:transition-all after:duration-300 hover:after:w-full"
            >

              {link.name}

            </Link>

          ))}

        </nav>

        {/* Desktop Button */}

        <div className="hidden lg:block">

          <Link href={makeLink("/contact")}>

            <button className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#B88700] via-[#D4A017] to-[#F4C542] px-7 py-3 font-semibold text-white shadow-[0_15px_40px_rgba(212,175,55,.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_50px_rgba(212,175,55,.45)]">

              Get Quote

              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />

            </button>

          </Link>

        </div>

        {/* Mobile Button */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#F4C542]/20 bg-white text-[#1E293B] transition hover:bg-[#FEF3C7] lg:hidden"
        >

          {menuOpen ? (

            <X size={24} />

          ) : (

            <Menu size={24} />

          )}

        </button>

      </div>

      {/* Mobile Menu */}

      <div
        className={`overflow-hidden transition-all duration-500 lg:hidden ${menuOpen ? "max-h-[500px]" : "max-h-0"
          }`}
      >

        <div className="border-t border-[#F4C542]/15 bg-[#FFFDF5] p-6">

          <nav className="flex flex-col gap-5">

            {navLinks.map((link) => (

              <Link
                key={link.name}
                href={makeLink(link.path)}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 font-semibold text-[#475569] transition-all hover:bg-[#FEF3C7] hover:text-[#B88700]"
              >

                {link.name}

              </Link>

            ))}

            <Link
              href={makeLink("/contact")}
              onClick={() => setMenuOpen(false)}
            >

              <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#B88700] via-[#D4A017] to-[#F4C542] px-6 py-4 font-semibold text-white shadow-[0_15px_40px_rgba(212,175,55,.35)] transition hover:scale-[1.02]">

                Get Quote

                <ArrowRight size={18} />

              </button>

            </Link>

          </nav>

        </div>

      </div>

    </header>
  );
}