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

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2], [0.4, 0]);

  return (
    <main ref={containerRef} className="relative min-h-[200vh] bg-black-900">
      
      {/* 1. DYNAMIC HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black-900">
        
        {/* Dynamic Background with the Perfume Spray */}
        <motion.div 
          style={{ scale: bgScale, opacity: bgOpacity }}
          className="absolute inset-0 z-0 origin-center"
        >
          <Image
            src="/fotos/IMG_1626.JPG"
            alt="Perfume Mist"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay gradient to blend background into the content smoothly */}
          <div className="absolute inset-0 bg-gradient-to-b from-black-900/60 via-black-900/80 to-black-900" />
        </motion.div>

        {/* Hero Content: Editorial Layout */}
        <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between pt-20">
          
          {/* Typography */}
          <motion.div
            style={{ y: heroY }}
            className="w-full md:w-[55%] flex flex-col items-start z-20"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-gold-500 tracking-[0.3em] text-xs md:text-sm uppercase font-sans mb-6 flex items-center gap-4"
            >
              <span className="w-12 h-[1px] bg-gold-500/50" />
              Curadoria Exclusiva
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-6xl md:text-8xl lg:text-[8vw] leading-[0.85] text-white font-semibold tracking-tighter"
            >
              GABRIEL <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">CORREIA</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-8 text-gray-400 font-sans font-light text-sm md:text-base leading-relaxed max-w-md"
            >
              O perfume é a sua assinatura invisível. Uma seleção rigorosa, sem hype, focada em verdadeira essência e presença de alto nível.
            </motion.p>
          </motion.div>

          {/* Authority Portrait Image */}
          <motion.div
             initial={{ opacity: 0, scale: 0.9, x: 20 }}
             animate={{ opacity: 1, scale: 1, x: 0 }}
             transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
             className="w-full md:w-[35%] mt-12 md:mt-0 relative aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-black-800 border border-white/5 shadow-2xl"
          >
            <Image
              src="/fotos/IMG_1677.JPG"
              alt="Gabriel Correia"
              fill
              className="object-cover object-top grayscale-[30%] hover:grayscale-0 transition-all duration-1000 hover:scale-105"
              priority
            />
            {/* Inner vignette for premium depth */}
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] pointer-events-none" />
          </motion.div>

        </div>
      </section>

      {/* 2. THE FRAGMENTED GALLERY (Z-index above sticky) */}
      <section className="relative z-20 bg-black-900 pt-32 pb-48 px-6 md:px-12">
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
                  src="/fotos/IMG_1625.JPG"
                  alt="Perfume Assinatura"
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
              <div className="relative aspect-[3/4] overflow-hidden bg-black-900 border border-white/5">
                <Image
                  src="/fotos/IMG_1605.JPG"
                  alt="Perfume Noturno"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-80"
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
                  src="/fotos/IMG_1640.JPG"
                  alt="Perfume Premium Obras Primas"
                  fill
                  className="object-cover object-top transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-80"
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
