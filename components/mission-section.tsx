"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
              href="https://forms.gle/nufxiVqQL84w6x3e6"
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
          className="relative h-96"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="https://images.squarespace-cdn.com/content/v1/659c1436fe4d984933d761c9/a79fc882-8510-4bd8-b53b-caa219ecfeb8/PHOTO-2024-02-19-19-52-32.jpg"
            alt="Students with computers"
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
} 