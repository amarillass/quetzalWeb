"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { DONATION_FORM_URL } from "@/lib/links";

const NAV_LINKS = [
  { id: "mision", label: "Misión" },
  { id: "stats", label: "Impacto" },
  { id: "proceso", label: "Proceso" },
];

export function Header() {
  const barRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  // Theme of the section currently behind the bar. The text always takes the opposite color.
  const [behind, setBehind] = useState<"dark" | "light">("dark");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 50);

      // Look at the page exactly where the bar sits, so the text color flips
      // at the moment a section boundary passes behind it.
      const bar = barRef.current?.getBoundingClientRect();
      const probeY = bar ? bar.top + bar.height / 2 : 40;
      for (const section of document.querySelectorAll<HTMLElement>("[data-theme]")) {
        const r = section.getBoundingClientRect();
        if (r.top <= probeY && r.bottom > probeY) {
          setBehind(section.dataset.theme === "light" ? "light" : "dark");
          break;
        }
      }

      // Highlight the nav item whose section crosses the upper third of the screen.
      const line = window.innerHeight / 3;
      let current: string | null = null;
      for (const { id } of NAV_LINKS) {
        const r = document.getElementById(id)?.getBoundingClientRect();
        if (r && r.top <= line && r.bottom > line) current = id;
      }
      setActiveId(current);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Close the phone menu on Escape, or if the window grows to desktop width.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const desktop = window.matchMedia("(min-width: 768px)");
    const onResize = () => desktop.matches && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [menuOpen]);

  const onLight = behind === "light";
  const textColor = onLight ? "text-black" : "text-white";
  // Glass tint follows the section behind it, so contrast holds even over photos.
  const glass = onLight
    ? "bg-white/70 border-black/10"
    : "bg-black/40 border-white/10";
  const showGlass = scrolled || menuOpen;

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-[padding] duration-500 ease-out ${
        scrolled ? "py-3 px-3 md:px-6" : "py-4 md:py-6 px-0"
      }`}
      animate={{ y: scrolled ? 12 : 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div
        ref={barRef}
        className={`max-w-7xl mx-auto border transition-[background-color,border-color,padding,border-radius] duration-300 ease-out ${
          showGlass
            ? `${glass} backdrop-blur-2xl shadow-lg shadow-black/5 px-4 md:px-6 py-3 ${menuOpen ? "rounded-3xl" : "rounded-full"}`
            : "bg-transparent border-transparent px-6"
        }`}
      >
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className={`text-2xl font-bold font-heading transition-colors duration-300 ${textColor}`}
          >
            Quetzal
          </Link>

          <nav className={`hidden md:flex items-center gap-2 ${textColor}`} aria-label="Secciones">
            {NAV_LINKS.map(({ id, label }) => {
              const active = activeId === id;
              return (
                <Link
                  key={id}
                  href={`#${id}`}
                  aria-current={active ? "location" : undefined}
                  className={`px-3 py-1.5 rounded-full transition-[opacity,background-color] duration-300 ${
                    active
                      ? `opacity-100 ${onLight ? "bg-black/[0.07]" : "bg-white/15"}`
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={DONATION_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 bg-main text-white rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Donar
              <ArrowUpRight className="w-4 h-4 text-white" />
            </a>
            <button
              type="button"
              className={`md:hidden -mr-2 p-2 rounded-full transition-colors duration-300 ${textColor}`}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              aria-controls="menu-movil"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.nav
              id="menu-movil"
              aria-label="Secciones"
              className={`md:hidden overflow-hidden ${textColor}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <ul className="pt-3 pb-1 flex flex-col">
                {NAV_LINKS.map(({ id, label }) => {
                  const active = activeId === id;
                  return (
                    <li key={id}>
                      <Link
                        href={`#${id}`}
                        aria-current={active ? "location" : undefined}
                        onClick={() => setMenuOpen(false)}
                        className={`block px-3 py-3 rounded-xl text-lg transition-colors ${
                          active
                            ? `font-semibold ${onLight ? "bg-black/[0.07]" : "bg-white/15"}`
                            : "opacity-80"
                        }`}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
