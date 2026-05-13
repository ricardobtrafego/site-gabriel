"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Menu, X, Mail, Phone } from "lucide-react";

const InstagramIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
import Link from "next/link";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2], [0.4, 0]);

  const navLinks = [
    { name: "A Coleção", href: "#colecao" },
    { name: "Filosofia", href: "#filosofia" },
    { name: "Consultoria", href: "#consultoria" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <main ref={containerRef} className="relative bg-black-900 font-sans text-white overflow-hidden">
      
      {/* --- HEADER (GLASSMORPHISM) --- */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black-900/60 backdrop-blur-lg border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="#" onClick={(e) => scrollToSection(e, "#hero")} className="font-serif text-2xl tracking-tighter text-white">
            GC<span className="text-gold-500">.</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-xs uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#consultoria"
              onClick={(e) => scrollToSection(e, "#consultoria")}
              className="ml-4 text-xs uppercase tracking-widest text-black-900 bg-gold-500 px-6 py-2.5 hover:bg-gold-400 transition-colors"
            >
              Agendar Sessão
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black-900 pt-24 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="font-serif text-4xl text-white border-b border-white/10 pb-4"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>


      {/* --- 1. DYNAMIC HERO --- */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black-900 pt-20">
        
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
        <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between pb-12">
          
          {/* Typography */}
          <motion.div
            style={{ y: heroY }}
            className="w-full md:w-[55%] flex flex-col items-start z-20"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-gold-500 tracking-[0.3em] text-xs md:text-sm uppercase font-sans mb-6 flex items-center gap-4 mt-8 md:mt-0"
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

      {/* --- 2. THE FRAGMENTED GALLERY --- */}
      <section id="colecao" className="relative z-20 bg-black-900 pt-32 pb-32 px-6 md:px-12">
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

            {/* ITEM 3 - FIX: Split Layout to avoid cropping portrait image */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="md:col-span-12 mt-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            >
              <div className="order-2 md:order-1 flex flex-col items-start pr-0 md:pr-12">
                <h3 className="font-serif text-3xl md:text-5xl text-white mb-6">Obras Primas</h3>
                <p className="text-gray-400 font-sans font-light leading-relaxed mb-8">
                  Nossa seleção de maior prestígio. Fragrâncias raras, ingredientes absolutos e frascos que transcendem o design. Cada gota é uma declaração de excelência incomparável.
                </p>
                <a href="#consultoria" onClick={(e) => scrollToSection(e, "#consultoria")} className="flex items-center gap-4 text-gold-500 uppercase tracking-widest text-sm hover:gap-6 transition-all group">
                  Explorar Seleção <ArrowRight size={16} className="group-hover:text-white transition-colors" />
                </a>
              </div>
              <div className="order-1 md:order-2 relative aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-black-800 border border-white/5 group">
                <Image
                  src="/fotos/IMG_1640.JPG"
                  alt="Perfume Premium Obras Primas"
                  fill
                  className="object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- 3. FILOSOFIA --- */}
      <section id="filosofia" className="relative z-20 bg-black-900 py-32 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="w-full md:w-5/12 relative aspect-[3/4] overflow-hidden border border-white/5 shadow-2xl"
          >
            <Image
              src="/fotos/IMG_1594.JPG"
              alt="Gabriel Correia"
              fill
              className="object-cover object-top grayscale-[20%]"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full md:w-7/12 flex flex-col"
          >
            <span className="flex items-center gap-4 text-gold-500 tracking-[0.3em] text-xs uppercase mb-8">
              <span className="w-8 h-[1px] bg-gold-500/50" />
              A Visão
            </span>
            <h2 className="font-serif text-3xl md:text-5xl leading-[1.2] text-white mb-8">
              "A verdadeira exclusividade não grita, ela é sentida. Eu rejeito o hype para focar na essência."
            </h2>
            <p className="text-gray-400 font-light leading-relaxed mb-6">
              O mercado está saturado de tendências passageiras e perfumes que todos usam. Minha missão como curador não é te vender um frasco genérico, mas sim entregar uma identidade olfativa que chegue antes de você e permaneça muito depois que você for.
            </p>
            <p className="text-gray-400 font-light leading-relaxed">
              Cada peça do nosso acervo passa por uma avaliação rigorosa de performance, projeção e, acima de tudo, exclusividade narrativa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- 4. CONSULTORIA OLFATIVA --- */}
      <section id="consultoria" className="relative z-20 bg-black-800 py-32 px-6 md:px-12 border-t border-white/5 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[60vw] h-[90vw] md:h-[60vw] rounded-full bg-gold-600/5 blur-[120px] pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center">
          <span className="text-gold-500 tracking-[0.3em] text-xs uppercase mb-6">Atendimento Exclusivo</span>
          <h2 className="font-serif text-4xl md:text-6xl text-white mb-8">Consultoria Privada</h2>
          <p className="text-gray-400 font-light leading-relaxed mb-12 max-w-2xl text-sm md:text-base">
            Uma consultoria para definir sua assinatura olfativa pessoal. Avaliamos seu perfil, rotina e o impacto exato que você deseja causar, recomendando as obras primas perfeitas para a sua pele.
          </p>
          <a 
            href="#" 
            className="group relative px-8 md:px-12 py-4 md:py-5 bg-gold-500 text-black-900 uppercase tracking-widest text-xs md:text-sm font-semibold overflow-hidden transition-all hover:bg-gold-400 shadow-[0_0_40px_rgba(212,175,55,0.2)] hover:shadow-[0_0_60px_rgba(212,175,55,0.4)]"
          >
            <span className="relative z-10 flex items-center gap-3">
              Agendar Consultoria <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        </div>
      </section>

      {/* --- 5. FOOTER PREMIUM --- */}
      <footer className="relative z-20 bg-black-900 pt-24 pb-8 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <Link href="#" onClick={(e) => scrollToSection(e, "#hero")} className="font-serif text-4xl tracking-tighter text-white mb-6 block">
              GC<span className="text-gold-500">.</span>
            </Link>
            <p className="text-gray-400 font-light max-w-sm text-sm leading-relaxed mb-8">
              Curadoria de alta perfumaria focada em exclusividade e impacto presencial para indivíduos extremamente exigentes.
            </p>
          </div>
          
          <div className="md:col-span-3">
            <h4 className="text-white uppercase tracking-[0.2em] text-xs font-semibold mb-6">Navegação</h4>
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} onClick={(e) => scrollToSection(e, link.href)} className="text-gray-500 hover:text-gold-500 font-light text-sm transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="md:col-span-4">
            <h4 className="text-white uppercase tracking-[0.2em] text-xs font-semibold mb-6">Contato</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <a href="#" className="text-gray-500 hover:text-gold-500 font-light text-sm transition-colors flex items-center gap-3">
                  <Phone size={16} className="text-white/30" /> Consultoria Exclusiva
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-gold-500 font-light text-sm transition-colors flex items-center gap-3">
                  <InstagramIcon size={16} className="text-white/30" /> @gabrielcorreia
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-gold-500 font-light text-sm transition-colors flex items-center gap-3">
                  <Mail size={16} className="text-white/30" /> contato@gabrielcorreia.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 font-light text-xs">
            © {new Date().getFullYear()} Gabriel Correia. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-600 hover:text-white font-light text-xs transition-colors">Privacidade</a>
            <a href="#" className="text-gray-600 hover:text-white font-light text-xs transition-colors">Termos</a>
          </div>
        </div>
      </footer>

    </main>
  );
}
