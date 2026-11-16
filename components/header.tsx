"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { DONATION_FORM_URL } from "@/lib/links";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("light"); // 'light' for light text, 'dark' for dark text

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionTheme = entry.target.getAttribute("data-theme");
            setTheme(sectionTheme === "dark" ? "light" : "dark");
          }
        });
      },
      {
        rootMargin: "-10% 0px -80% 0px",
        threshold: 0,
      }
    );

    const sections = document.querySelectorAll("[data-theme]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const textColor = theme === "light" ? "text-white" : "text-black";
  const mutedTextColor = theme === "light" ? "text-white/80" : "text-black/70";
  
  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
        scrolled ? "py-3 px-6" : "py-6 px-0"
      }`}
      animate={{
        y: scrolled ? 12 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className={`max-w-7xl mx-auto transition-all duration-500 ease-out ${
        scrolled 
          ? "px-6 py-3 bg-white/10 backdrop-blur-2xl rounded-full shadow-lg shadow-black/5 border border-white/10" 
          : "px-6 bg-transparent"
      }`}>
        <div className="flex justify-between items-center">
          <Link href="/" className={`text-2xl font-bold font-heading transition-colors duration-300 ${textColor}`}>
            Quetzal
          </Link>
          <nav className={`hidden md:flex items-center gap-8 transition-colors duration-300 ${mutedTextColor}`}>
            <Link href="#mision" className={`opacity-80 transition-opacity hover:opacity-100`}>Misión</Link>
            <Link href="#stats" className={`opacity-80 transition-opacity hover:opacity-100`}>Impacto</Link>
            <Link href="#proceso" className={`opacity-80 transition-opacity hover:opacity-100`}>Proceso</Link>
          </nav>
          <div className="flex items-center gap-4">
            <a 
              href={DONATION_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 bg-main text-white rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Donar
              <ArrowUpRight className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  );
} 