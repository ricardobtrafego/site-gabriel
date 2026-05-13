"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Menu, X, Mail, Phone, ChevronRight } from "lucide-react";
import Link from "next/link";

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

const heroImages = [
  "/fotos/IMG_1594.JPG",
  "/fotos/IMG_1640.JPG",
  "/fotos/IMG_1625.JPG",
];

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Muda a cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: "Identidade", href: "#identidade" },
    { name: "A Coleção", href: "#colecao" },
    { name: "Parcerias B2B", href: "#parcerias" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <main ref={containerRef} className="bg-black min-h-screen text-gray-200 font-sans selection:bg-gold-500/30 selection:text-white">
      
      {/* --- HEADER --- */}
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <Link href="#" onClick={(e) => scrollToSection(e, "#hero")} className="font-serif text-2xl tracking-tighter text-white z-50">
            GC<span className="text-gold-500">.</span>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-xs uppercase tracking-[0.2em] font-medium text-gray-400 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#parcerias" 
              onClick={(e) => scrollToSection(e, "#parcerias")}
              className="px-6 py-2.5 bg-white text-black uppercase tracking-widest text-xs font-semibold hover:bg-gray-200 transition-colors"
            >
              Contato Comercial
            </a>
          </nav>

          <button className="md:hidden z-50 text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-0 w-full h-screen bg-black z-40 flex flex-col items-center justify-center gap-8 px-6"
            >
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="font-serif text-3xl text-white hover:text-gold-500 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#parcerias"
                onClick={(e) => scrollToSection(e, "#parcerias")}
                className="mt-8 px-8 py-4 bg-white text-black uppercase tracking-widest text-sm font-semibold w-full text-center"
              >
                Contato Comercial
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* --- 1. HERO SECTION DINÂMICO --- */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-32 pb-16">
        {/* Background Blurred Image */}
        <motion.div style={{ scale: bgScale }} className="absolute inset-0 w-full h-full opacity-10 blur-[100px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={heroImages[currentImageIndex]}
                alt="Background"
                fill
                priority
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-8 mt-4 md:mt-0">
          
          {/* Esquerda: Textos e CTAs */}
          <motion.div style={{ y: heroY }} className="w-full md:w-6/12 flex flex-col items-start text-left z-10">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-gold-500 tracking-[0.4em] text-xs md:text-sm uppercase mb-6 block font-medium"
            >
              Gabriel Correia
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-4xl md:text-5xl lg:text-7xl text-white leading-[1.1] tracking-tight mb-8"
            >
              Especialista em perfumes e referência em fragrâncias que criam presença.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-gray-300 font-light text-base md:text-lg max-w-xl leading-relaxed mb-12"
            >
              Análises autênticas, experiências olfativas e conteúdos que conectam marcas premium ao público apaixonado por sofisticação, identidade e performance.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
            >
              <a href="#parcerias" onClick={(e) => scrollToSection(e, "#parcerias")} className="group flex items-center justify-center gap-3 px-8 py-4 bg-white text-black uppercase tracking-widest text-xs font-semibold hover:bg-gray-200 transition-colors w-full sm:w-auto">
                Associar Minha Marca <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#parcerias" onClick={(e) => scrollToSection(e, "#parcerias")} className="group flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-white/20 text-white uppercase tracking-widest text-xs font-semibold hover:border-white transition-colors w-full sm:w-auto">
                Falar com Assessoria
              </a>
            </motion.div>
          </motion.div>

          {/* Direita: Imagem Dinâmica */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="w-full md:w-5/12 relative aspect-[4/5] md:aspect-[3/4] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(212,175,55,0.05)]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={heroImages[currentImageIndex]}
                  alt="Gabriel Correia"
                  fill
                  priority
                  className="object-cover object-center grayscale-[10%]"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black-950/40 via-transparent to-transparent" />
          </motion.div>

        </div>
      </section>

      {/* --- 2. BARRA DE AUTORIDADE --- */}
      <section className="relative z-20 bg-black border-t border-b border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center divide-x-0 md:divide-x divide-white/5">
          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl md:text-4xl font-serif text-white mb-2">+1000</span>
            <span className="text-gray-500 uppercase tracking-widest text-[10px]">Perfumes Analisados</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl md:text-4xl font-serif text-white mb-2">+2M</span>
            <span className="text-gray-500 uppercase tracking-widest text-[10px]">Visualizações Mensais</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl md:text-4xl font-serif text-white mb-2">Premium</span>
            <span className="text-gray-500 uppercase tracking-widest text-[10px]">Nacionais & Importados</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl md:text-4xl font-serif text-white mb-2">Lifestyle</span>
            <span className="text-gray-500 uppercase tracking-widest text-[10px]">Audiência Engajada</span>
          </div>
        </div>
      </section>

      {/* --- 3. IDENTIDADE --- */}
      <section id="identidade" className="relative z-20 bg-[#050505] py-32 md:py-48 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="font-serif text-4xl md:text-6xl text-white mb-16 leading-[1.2]">
              "Perfume não é apenas aroma. É presença. É memória."
            </h2>
            <div className="text-gray-400 font-light text-base md:text-lg leading-relaxed flex flex-col gap-6">
              <p>
                É a forma como as pessoas lembram de você antes de você falar e depois que você vai embora.
              </p>
              <p>
                Gabriel Correia se tornou referência no universo da perfumaria ao traduzir fragrâncias em experiências reais, ajudando pessoas a encontrarem perfumes ideais para encontros, eventos, negócios e momentos inesquecíveis.
              </p>
              <p>
                Com uma coleção exclusiva e amplo conhecimento técnico, seu conteúdo une sofisticação, autenticidade e verdadeira influência comercial.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- 4. EXPERIÊNCIA SENSORIAL (CARDS) --- */}
      <section className="relative z-20 bg-black py-32 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="text-gold-500 tracking-[0.3em] text-xs uppercase mb-6 block">A Ciência da Avaliação</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white">Especialista em fragrâncias<br />que despertam sensações.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Para Encontros", desc: "Fragrâncias envolventes, especiadas e marcantes para criar magnetismo e presença." },
              { title: "Para o Dia a Dia", desc: "Elegância, frescor e versatilidade. A assinatura pessoal que te acompanha." },
              { title: "Para Balada", desc: "Performance extrema, projeção intensa e impacto absoluto no ambiente." },
              { title: "De Luxo (Nicho)", desc: "Experiências exclusivas, absolutos puros para quem valoriza altíssima sofisticação." }
            ].map((card, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="group bg-[#0A0A0A] border border-white/5 p-10 hover:bg-[#111] hover:border-gold-500/20 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <h3 className="font-serif text-2xl text-white mb-4 group-hover:text-gold-500 transition-colors relative z-10">{card.title}</h3>
                <p className="text-gray-400 font-light text-sm leading-relaxed relative z-10">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. O BLOCO COMERCIAL B2B --- */}
      <section className="relative z-20 bg-black-900 py-32 px-6 md:px-12 overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full md:w-5/12 relative aspect-square md:aspect-[4/5] border border-white/5"
          >
            {/* SUGERIDO: Foto de terno olhando para a câmera */}
            <Image src="/fotos/IMG_1640.JPG" alt="Gabriel Correia Especialista" fill className="object-cover object-top grayscale-[10%]" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full md:w-7/12 flex flex-col"
          >
            <h2 className="font-serif text-4xl md:text-6xl text-white mb-8 leading-[1.1]">
              Sua marca conectada<br />ao público certo.
            </h2>
            <p className="text-gray-400 font-light text-base md:text-lg leading-relaxed mb-8">
              Marcas que desejam posicionamento, desejo e autoridade encontram em Gabriel Correia um parceiro estratégico para campanhas, lançamentos e divulgação de produtos.
            </p>
            <p className="text-gray-400 font-light text-base md:text-lg leading-relaxed mb-12">
              Seu público acompanha recomendações reais, experiências autênticas e conteúdos que influenciam decisões de compra. A associação da sua marca com um especialista reconhecido fortalece a percepção premium, a confiança e o alcance qualificado.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4 mb-12 border-l border-white/10 pl-6">
              {['Campanhas', 'Lançamentos', 'Publis', 'Embaixador', 'Reviews', 'Posicionamento'].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <ChevronRight size={14} className="text-gold-500" />
                  <span className="text-gray-300 font-light text-sm">{item}</span>
                </div>
              ))}
            </div>

            <a href="#parcerias" onClick={(e) => scrollToSection(e, "#parcerias")} className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black uppercase tracking-widest text-xs font-semibold hover:bg-gray-200 transition-colors self-start">
              Falar com Assessoria <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* --- 6. A COLEÇÃO (DOSSIÊ EDITORIAL) --- */}
      <section id="colecao" className="relative z-20 bg-[#050505] py-32 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 md:mb-32">
            <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">Uma coleção construída<br />com experiência.</h2>
            <p className="text-gray-400 font-light max-w-2xl text-base">As obras-primas da perfumaria mundial, desde os clássicos absolutos até as formulações raras de nicho.</p>
          </div>

          <div className="flex flex-col gap-32">
            {/* Dossiê 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row items-center gap-12 md:gap-24"
            >
              <div className="w-full md:w-5/12 relative aspect-[3/4] bg-[#0A0A0A] border border-white/5 overflow-hidden group">
                <Image src="/fotos/IMG_1625.JPG" alt="Coleção Premium" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <div className="w-full md:w-7/12 flex flex-col">
                <span className="text-gold-500 tracking-[0.3em] text-[10px] uppercase mb-4">Marcas Premium</span>
                <h3 className="font-serif text-3xl md:text-4xl text-white mb-6">O Alto Padrão do Nicho</h3>
                <p className="text-gray-400 font-light leading-relaxed mb-8 text-base">
                  A excelência não aceita atalhos. O acervo conta com peças de perfumaria de nicho onde as marcas possuem liberdade criativa total, resultando em composições exclusivas. Casas como Creed, Tom Ford, Xerjoff, Maison Francis Kurkdjian e Dior (La Collection Privée) definem o topo da pirâmide olfativa.
                </p>
                <div className="flex flex-wrap gap-4">
                  {['Tom Ford', 'Dior', 'Creed', 'Chanel', 'Xerjoff'].map(brand => (
                    <span key={brand} className="px-4 py-2 border border-white/10 text-gray-400 text-xs tracking-widest uppercase">{brand}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Dossiê 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-24"
            >
              <div className="w-full md:w-5/12 relative aspect-[3/4] bg-[#0A0A0A] border border-white/5 overflow-hidden group">
                <Image src="/fotos/IMG_1605.JPG" alt="Relíquias e Lattafa" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <div className="w-full md:w-7/12 flex flex-col">
                <span className="text-gold-500 tracking-[0.3em] text-[10px] uppercase mb-4">Novas Fronteiras</span>
                <h3 className="font-serif text-3xl md:text-4xl text-white mb-6">Perfumaria Árabe & Descontinuados</h3>
                <p className="text-gray-400 font-light leading-relaxed text-base">
                  Para dominar o mercado, é preciso ir além do óbvio. A perfumaria oriental (como Lattafa e afins) trouxe potência e luxo a um novo patamar de atenção. Além disso, a coleção abriga formulações vintage raras e frascos descontinuados que não podem mais ser comprados, servindo de base de estudo e compreensão do que realmente inova hoje.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- 7. INFLUÊNCIA --- */}
      <section className="relative z-20 bg-black py-32 px-6 md:px-12 border-t border-white/5 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-8">Influência construída com autenticidade.</h2>
          <p className="text-gray-400 font-light leading-relaxed mb-12 text-base md:text-lg">
            Com conteúdos voltados ao universo da perfumaria masculina e feminina, Gabriel Correia compartilha análises, tendências e recomendações que ajudam milhares de pessoas a encontrarem fragrâncias que combinam com sua personalidade.
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-gold-500 uppercase tracking-widest text-xs font-semibold">
            <span>Experiência</span>
            <span className="hidden md:inline">•</span>
            <span>Lifestyle</span>
            <span className="hidden md:inline">•</span>
            <span>Elegância</span>
            <span className="hidden md:inline">•</span>
            <span>Influência Real</span>
          </div>
        </div>
      </section>

      {/* --- 8. CTA FINAL COMERCIAL --- */}
      <section id="parcerias" className="relative z-20 bg-black py-40 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <h2 className="font-serif text-5xl md:text-7xl text-white mb-8">Transforme sua marca em desejo.</h2>
          <p className="text-gray-400 font-light leading-relaxed mb-16 text-lg">
            Associe sua marca a uma autoridade do universo da perfumaria e conecte seu produto ao público certo.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto">
            <a href="mailto:contato@gabrielcorreia.com" className="px-10 py-5 bg-white text-black text-sm uppercase tracking-widest font-semibold hover:bg-gray-200 transition-colors w-full sm:w-auto">
              Assessoria Comercial
            </a>
            <a href="#" className="px-10 py-5 bg-transparent border border-white/20 text-white text-sm uppercase tracking-widest font-semibold hover:border-white transition-colors w-full sm:w-auto flex items-center justify-center gap-3">
              <InstagramIcon size={18} /> Instagram
            </a>
          </div>
        </div>
      </section>

      {/* --- 9. BLOCO SEO INVISÍVEL E FOOTER --- */}
      <footer className="relative z-20 bg-[#020202] pt-16 pb-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* SEO Block - Subtle */}
          <div className="mb-16">
            <p className="text-[#222] text-[10px] md:text-xs leading-relaxed text-justify">
              Especialista em perfumes importados, perfumes árabes e fragrâncias premium. Influenciador digital de perfumaria com conteúdo sobre perfumes masculinos, perfumes femininos, perfumes de luxo, perfumes para encontros, perfumes para balada, perfumes marcantes, perfumes para o dia a dia, reviews de perfumes importados e tendências do universo da perfumaria. Gabriel Correa compartilha experiências olfativas autênticas, dicas de perfumes e análises completas das fragrâncias mais desejadas do mercado.
            </p>
          </div>
          
          <div className="border-t border-[#111] pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <Link href="#" onClick={(e) => scrollToSection(e, "#hero")} className="font-serif text-2xl tracking-tighter text-white">
              GC<span className="text-gold-500">.</span>
            </Link>
            <p className="text-[#555] font-light text-xs">
              © {new Date().getFullYear()} Gabriel Correia. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <a href="mailto:contato@gabrielcorreia.com" className="text-[#555] hover:text-white font-light text-xs transition-colors flex items-center gap-2">
                <Mail size={12} /> contato@gabrielcorreia.com
              </a>
            </div>
          </div>
        </div>
      </footer>

    </main>
  );
}
