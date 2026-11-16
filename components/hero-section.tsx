"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Sparkles, Rocket, ArrowDown } from "lucide-react";
import { RECRUITMENT_FORM_URL } from "@/lib/links";

function Particle() {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    const animateParticle = () => {
      if (!ref.current) return;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const duration = 5000 + Math.random() * 5000;
      ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      ref.current.style.transition = `transform ${duration}ms linear`;
      setTimeout(animateParticle, duration);
    };
    // Set initial random position
    ref.current.style.left = `${Math.random() * 100}vw`;
    ref.current.style.top = `${Math.random() * 100}vh`;

    animateParticle();
  }, []);
  
  return (
    <div
      ref={ref}
      className="absolute w-1 h-1 bg-main rounded-full opacity-50"
      // Initial style is set via useEffect to avoid server/client mismatch
    />
  );
}

function FloatingOrb() {
  return (
    <motion.div
      className="absolute w-72 h-72 rounded-full bg-main/10"
      animate={{
        y: [0, -40, 0],
        x: [0, 30, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        filter: 'blur(80px)',
      }}
    />
  );
}

export function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark text-light">
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <Particle key={i} />
        ))}
        <FloatingOrb />
      </div>

      <motion.div
        className="fixed w-5 h-5 bg-main rounded-full pointer-events-none z-50"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.3, repeat: Infinity }}
      />
      
      <motion.div
        className="relative z-20 text-center px-6 max-w-5xl mx-auto"
        style={{ y, opacity }}
      >
        <motion.div
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-main/10 border border-main/30 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Sparkles className="w-4 h-4 text-main" />
          <span className="text-sm font-medium">Transformando el Futuro de México</span>
        </motion.div>
        
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-6 font-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Una Computadora para Cada <span className="text-main">Estudiante Mexicano</span>
        </motion.h1>
        
        <motion.p
          className="text-lg md:text-xl text-light/80 max-w-3xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Cerramos la brecha digital donando computadoras reacondicionadas.
          Porque cada estudiante merece la oportunidad de alcanzar su máximo potencial.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <motion.a
            href={RECRUITMENT_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 bg-main text-dark rounded-full text-lg font-bold shadow-lg shadow-main/20 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              <Rocket className="w-5 h-5" />
              Únete a la Misión
            </span>
          </motion.a>
          
          <motion.a
            href="#stats"
            className="px-8 py-4 border-2 border-light/30 text-light rounded-full text-lg font-semibold backdrop-blur-sm hover:bg-light/10 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Nuestro Impacto
          </motion.a>
        </motion.div>
        
        <motion.div
          className="absolute bottom-[-10vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-light/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
} 