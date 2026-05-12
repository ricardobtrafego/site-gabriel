"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <main ref={containerRef} className="relative min-h-[200vh] bg-black-900">
      {/* 1. MASSIVE TYPOGRAPHIC HERO */}
      <section className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 flex flex-col items-center justify-center w-full px-4"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-gold-500 tracking-[0.3em] text-xs md:text-sm uppercase font-sans mb-6"
          >
            Curadoria Exclusiva
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-6xl md:text-[10vw] leading-[0.8] text-center text-white font-semibold tracking-tighter"
          >
            GABRIEL <br /> CORREIA
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 md:mt-24 w-full max-w-sm"
          >
            <p className="text-gray-400 text-center font-sans font-light text-sm md:text-base leading-relaxed">
              O perfume é a sua assinatura invisível. <br />
              Uma seleção rigorosa, sem hype, focada em essência e presença.
            </p>
          </motion.div>
        </motion.div>

        {/* Abstract Dark Overlay Elements for Depth */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-gold-600/5 blur-[120px]" />
        </div>
      </section>

      {/* 2. THE FRAGMENTED GALLERY (Z-index above sticky) */}
      <section className="relative z-20 bg-black-800 pt-32 pb-48 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-24">
            <h2 className="font-serif text-4xl md:text-6xl text-white tracking-tight">
              A Coleção
            </h2>
            <p className="text-gray-400 font-sans mt-4 md:mt-0 max-w-xs text-sm uppercase tracking-widest border-b border-gold-600/30 pb-2">
              Arte em frascos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            
            {/* ITEM 1 - Asymmetric Large */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="md:col-span-7 group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-black-900 border border-white/5">
                <Image
                  src="/fotos/IMG_1589.JPG"
                  alt="Perfume Exclusivo"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="mt-6 flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-2xl text-white group-hover:text-gold-500 transition-colors">Assinatura</h3>
                  <p className="text-gray-500 font-sans text-sm mt-1">Presença marcante</p>
                </div>
                <ArrowRight className="text-white/30 group-hover:text-gold-500 transition-colors transform group-hover:translate-x-2" />
              </div>
            </motion.div>

            {/* ITEM 2 - Asymmetric Small, Pushed Down */}
            <motion.div 
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:col-span-5 md:mt-48 group cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden bg-black-900 border border-white/5">
                <Image
                  src="/fotos/IMG_1590.JPG"
                  alt="Perfume Noturno"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-80 grayscale group-hover:grayscale-0"
                />
              </div>
              <div className="mt-6 flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-xl text-white group-hover:text-gold-500 transition-colors">Noite & Encontros</h3>
                  <p className="text-gray-500 font-sans text-sm mt-1">Intensidade e mistério</p>
                </div>
              </div>
            </motion.div>

            {/* ITEM 3 - Full Width Staggered */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="md:col-span-12 mt-24 group cursor-pointer"
            >
              <div className="relative aspect-[21/9] overflow-hidden bg-black-900 border border-white/5">
                <Image
                  src="/fotos/IMG_1595.JPG"
                  alt="Perfume Premium"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-gold-500 font-sans tracking-[0.2em] uppercase text-sm border border-gold-500/50 px-8 py-3 bg-black/50 backdrop-blur-sm">
                    Explorar Obras Primas
                  </span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. FOOTER MINIMALISTA */}
      <footer className="relative z-20 bg-black-900 py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-serif text-white/50 text-sm">
            © {new Date().getFullYear()} Gabriel Correia.
          </p>
          <p className="font-sans text-gold-600/50 text-xs tracking-widest uppercase">
            Menos ruído. Mais essência.
          </p>
        </div>
      </footer>

    </main>
  );
}
