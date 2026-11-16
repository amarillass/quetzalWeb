"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function GoalSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            className="relative h-96 overflow-hidden rounded-lg shadow-xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/images/equipo-trabajando.webp"
              alt="Equipo preparando computadoras"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </motion.div>
          <motion.div
            className="relative h-96 overflow-hidden rounded-lg shadow-xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/images/donacion-computadora.webp"
              alt="Entrega de computadoras donadas"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </motion.div>
        </div>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
            Nuestra Meta para este 2027:
          </h2>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-8 leading-tight">
                            Donar <span className="bg-[#00977E] text-white px-6 py-3 rounded-lg shadow-lg">150</span> computadoras.
          </h2>
        </motion.div>
      </div>
    </section>
  );
} 