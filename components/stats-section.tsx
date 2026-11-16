"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, Download, Diamond } from "lucide-react";

function useCountUp(end: number, duration: number = 2) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return { count, ref };
}

function StatCard({ icon: Icon, value, label }: {
  icon: React.ElementType;
  value: string;
  label: string;
}) {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  const { count, ref } = useCountUp(numericValue);

  return (
    <div ref={ref} className="glass-dark rounded-2xl p-6 md:p-8 text-center border border-light/10">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-main/10 flex items-center justify-center">
          <Icon className="w-8 h-8 text-main" />
        </div>
      </div>
      <div className="text-4xl md:text-5xl font-bold font-heading text-light mb-2">
        {value.includes('+') && '+'}
        {count.toLocaleString()}
        {value.includes('MXN') && ' MXN'}
      </div>
      <p className="text-light/80">{label}</p>
    </div>
  );
}

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section id="stats" className="py-24 bg-dark text-light">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading mb-4">
            Nuestro Impacto en <span className="text-main">Cifras Reales</span>
          </h2>
          <p className="text-lg text-light/80 max-w-3xl mx-auto">
            Cada número representa una historia de superación y una oportunidad creada.
            Estas son las cifras que nos impulsan a seguir adelante.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-4 md:gap-8">
          <StatCard icon={Users} value="117" label="Computadoras Donadas" />
          <StatCard icon={Download} value="+200" label="Computadoras Recibidas" />
          <StatCard icon={Diamond} value="+700,000 MXN" label="Valor Estimado" />
        </div>
      </div>
    </section>
  );
} 