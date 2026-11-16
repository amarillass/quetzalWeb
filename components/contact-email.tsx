"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Mail, SquareArrowOutUpRight } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { CONTACT_EMAIL } from "@/lib/links";

const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}`;

// A plain mailto: link only works if the visitor has a mail app set up. Most
// people use Gmail or Outlook in the browser, so the click silently did nothing.
// This opens a small menu instead: Gmail, the device's mail app, or copy.
export function ContactEmail({
  children,
  className = "",
  placement = "below",
  menuClassName = "left-0",
}: {
  children: React.ReactNode;
  className?: string;
  placement?: "below" | "above";
  menuClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
    } catch {
      // Clipboard API unavailable (old browser): fall back to a hidden text field.
      const field = document.createElement("textarea");
      field.value = CONTACT_EMAIL;
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      setCopied(document.execCommand("copy"));
      field.remove();
    }
  };

  const item =
    "flex w-full items-center gap-3 px-4 py-3 text-left text-base text-gray-800 rounded-xl hover:bg-gray-100 focus-visible:bg-gray-100 outline-none transition-colors";

  return (
    <div ref={rootRef} className="relative inline-block">
      <button
        type="button"
        className={className}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
      >
        {children}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            className={`absolute z-30 w-72 max-w-[calc(100vw-3rem)] p-2 bg-white rounded-2xl shadow-xl ring-1 ring-black/5 ${
              placement === "above" ? "bottom-full mb-2" : "top-full mt-2"
            } ${menuClassName}`}
            initial={{ opacity: 0, y: placement === "above" ? 6 : -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: placement === "above" ? 6 : -6 }}
            transition={{ duration: 0.15 }}
          >
            <p className="px-4 pt-2 pb-1 text-sm text-gray-500 [overflow-wrap:anywhere]">{CONTACT_EMAIL}</p>
            <a
              href={GMAIL_COMPOSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={item}
              onClick={() => setOpen(false)}
            >
              <SquareArrowOutUpRight className="w-5 h-5 shrink-0 text-[#00977E]" />
              Escribir en Gmail
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className={item} onClick={() => setOpen(false)}>
              <Mail className="w-5 h-5 shrink-0 text-[#00977E]" />
              Abrir mi app de correo
            </a>
            <button type="button" className={item} onClick={copyEmail}>
              {copied ? (
                <Check className="w-5 h-5 shrink-0 text-[#00977E]" />
              ) : (
                <Copy className="w-5 h-5 shrink-0 text-[#00977E]" />
              )}
              <span aria-live="polite">{copied ? "¡Correo copiado!" : "Copiar correo"}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
