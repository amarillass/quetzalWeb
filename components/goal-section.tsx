"use client";

import { motion } from "framer-motion";
import { PhotoGallery } from "@/components/photo-gallery";

export function GoalSection() {
  return (
    <section className="bg-gray-50 py-20">
      <motion.div
        className="mb-12 md:mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <PhotoGallery />
      </motion.div>
      <div className="max-w-7xl mx-auto px-6">
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
            Donar <span className="inline-block bg-[#00977E] text-white px-4 md:px-6 py-1 md:py-3 rounded-lg shadow-lg">150</span> computadoras.
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
