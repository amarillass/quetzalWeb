"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import estudiantesConComputadoras from "@/public/images/estudiantes-con-computadoras.webp";
import { DONATION_FORM_URL } from "@/lib/links";

export function MissionSection() {
  return (
    <section id="mision" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-8 leading-tight">
            Donamos
            <br />
            Computadoras
            <br />
            a Estudiantes
            <br />
                            <span className="text-[#00977E]">Prometedores</span>
          </h2>
          <div className="relative">
            <motion.a
              href={DONATION_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
                              className="inline-block bg-[#00977E] hover:bg-[#007a68] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Quiero Donar Una Computadora
            </motion.a>
          </div>
        </motion.div>
        <motion.div
          className="relative h-72 md:h-96"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={estudiantesConComputadoras}
            placeholder="blur"
            alt="Estudiantes con las computadoras donadas"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover rounded-lg shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
} 