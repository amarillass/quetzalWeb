"use client";

import { motion } from "framer-motion";
import { Instagram, Mail } from "lucide-react";

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
            className="flex justify-start md:justify-end items-center space-x-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <a
              href="https://www.instagram.com/quetzal.lat/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Quetzal Computers en Instagram"
                                  className="text-white hover:text-[#00977E] transition-colors"
            >
              <Instagram size={28} />
            </a>
            <a
              href="mailto:computers.quetzal@gmail.com"
                                  className="text-white hover:text-[#00977E] transition-colors flex items-center space-x-2"
            >
              <Mail size={28} />
              <span className="text-lg">computers.quetzal@gmail.com</span>
            </a>
          </motion.div>
        </div>
        <div className="text-center text-gray-500 mt-16">
          <p>&copy; {new Date().getFullYear()} Quetzal Computers. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
} 