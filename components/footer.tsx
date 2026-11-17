"use client";

import { motion } from "framer-motion";
import { Instagram, Mail } from "lucide-react";
import { ContactEmail } from "@/components/contact-email";
import { CONTACT_EMAIL, INSTAGRAM_URL } from "@/lib/links";

export function Footer() {
  return (
    <footer className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold mb-4">Quetzal Computers</h3>
            <p className="text-xl text-[#00977E]">
              Cambiemos el juego. Juntos.
            </p>
          </motion.div>
          <motion.div
            className="relative z-10 flex flex-wrap justify-start md:justify-end items-center gap-x-6 gap-y-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Quetzal Computers en Instagram"
                                  className="text-white hover:text-[#00977E] transition-colors"
            >
              <Instagram size={28} />
            </a>
            <ContactEmail
              placement="above"
              menuClassName="left-0 md:left-auto md:right-0"
              className="text-white hover:text-[#00977E] transition-colors flex items-center gap-2 text-left"
            >
              <Mail size={28} className="shrink-0" />
              <span className="text-base md:text-lg [overflow-wrap:anywhere]">{CONTACT_EMAIL}</span>
            </ContactEmail>
          </motion.div>
        </div>
        <div className="text-center text-gray-500 mt-16">
          <p>&copy; {new Date().getFullYear()} Quetzal Computers. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
} 