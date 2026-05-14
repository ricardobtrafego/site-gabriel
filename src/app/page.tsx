"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Menu, X, Mail, ChevronRight } from "lucide-react";
import Link from "next/link";

const InstagramIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
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

const nicheBrands = [
  "Amouage", "Clive Christian", "Creed", "Initio",
  "Mancera", "Mind Games", "Tiziana Terenzi", "Nishane",
  "Parfums de Marly", "Roja", "Sospiro", "Xerjoff",
];

type Lang = "pt" | "en" | "ar";

const translations = {
  pt: {
    nav: { identity: "Identidade", collection: "A Coleção", b2b: "Parcerias B2B", contact: "Contato Comercial" },
    hero: {
      tagline: "Gabriel Correia",
      h1: "Especialista em perfumes e referência em fragrâncias que criam presença.",
      sub: "Análises autênticas, experiências olfativas e conteúdos que conectam marcas premium ao público apaixonado por sofisticação, identidade e performance.",
      cta1: "Associar Minha Marca",
      cta2: "Falar com Assessoria",
    },
    authority: {
      s1: "+1000", l1: "Perfumes Analisados",
      s2: "+2M",  l2: "Visualizações Mensais",
      s3: "Premium", l3: "Nacionais & Importados",
      s4: "Lifestyle", l4: "Audiência Engajada",
    },
    identity: {
      quote: '"Perfume não é apenas aroma. É presença. É memória."',
      p1: "É a forma como as pessoas lembram de você antes de você falar e depois que você vai embora.",
      p2: "Gabriel Correia se tornou referência no universo da perfumaria ao traduzir fragrâncias em experiências reais, ajudando pessoas a encontrarem perfumes ideais para encontros, eventos, negócios e momentos inesquecíveis.",
      p3: "Com uma coleção exclusiva e amplo conhecimento técnico, seu conteúdo une sofisticação, autenticidade e verdadeira influência comercial.",
    },
    sensorial: {
      eyebrow: "A Ciência da Avaliação",
      h2: "Especialista em fragrâncias\nque despertam sensações.",
      cards: [
        { title: "Para Encontros",   desc: "Fragrâncias envolventes, especiadas e marcantes para criar magnetismo e presença." },
        { title: "Para o Dia a Dia", desc: "Elegância, frescor e versatilidade. A assinatura pessoal que te acompanha." },
        { title: "Para Balada",      desc: "Performance extrema, projeção intensa e impacto absoluto no ambiente." },
        { title: "De Luxo (Nicho)",  desc: "Experiências exclusivas, absolutos puros para quem valoriza altíssima sofisticação." },
      ],
    },
    b2b: {
      h2: "Sua marca conectada\nao público certo.",
      p1: "Marcas que desejam posicionamento, desejo e autoridade encontram em Gabriel Correia um parceiro estratégico para campanhas, lançamentos e divulgação de produtos.",
      p2: "Seu público acompanha recomendações reais, experiências autênticas e conteúdos que influenciam decisões de compra. A associação da sua marca com um especialista reconhecido fortalece a percepção premium, a confiança e o alcance qualificado.",
      services: ["Campanhas", "Lançamentos", "Publis", "Embaixador", "Reviews", "Posicionamento"],
      cta: "Falar com Assessoria",
    },
    collection: {
      h2: "Uma coleção construída\ncom experiência.",
      sub: "As obras-primas da perfumaria mundial, desde os clássicos absolutos até as formulações raras de nicho.",
      d1: {
        eyebrow: "Marcas Premium",
        h3: "O Alto Padrão do Nicho",
        p: "A excelência não aceita atalhos. O acervo conta com as maiores casas da perfumaria de nicho, onde criatividade absoluta resulta em composições únicas. Creed, Amouage, Xerjoff, Clive Christian e Roja definem o topo da pirâmide olfativa.",
      },
      d2: {
        eyebrow: "Novas Fronteiras",
        h3: "Perfumaria Árabe & Descontinuados",
        p: "Para dominar o mercado, é preciso ir além do óbvio. A perfumaria oriental trouxe potência e luxo a um novo patamar. Além disso, a coleção abriga formulações vintage raras e frascos descontinuados que servem de base de estudo para entender o que realmente inova hoje.",
      },
    },
    influence: {
      h2: "Influência construída com autenticidade.",
      p: "Com conteúdos voltados ao universo da perfumaria masculina e feminina, Gabriel Correia compartilha análises, tendências e recomendações que ajudam milhares de pessoas a encontrarem fragrâncias que combinam com sua personalidade.",
      tags: ["Experiência", "Lifestyle", "Elegância", "Influência Real"],
    },
    cta: {
      h2: "Transforme sua marca em desejo.",
      p: "Associe sua marca a uma autoridade do universo da perfumaria e conecte seu produto ao público certo.",
      btn1: "Assessoria Comercial",
      btn2: "Instagram",
    },
    footer: { rights: "Todos os direitos reservados." },
  },

  en: {
    nav: { identity: "Identity", collection: "The Collection", b2b: "B2B Partnerships", contact: "Commercial Contact" },
    hero: {
      tagline: "Gabriel Correia",
      h1: "Fragrance specialist and reference for scents that create presence.",
      sub: "Authentic reviews, olfactory experiences and content that connects premium brands to audiences passionate about sophistication, identity and performance.",
      cta1: "Partner My Brand",
      cta2: "Talk to Management",
    },
    authority: {
      s1: "+1000", l1: "Fragrances Reviewed",
      s2: "+2M",  l2: "Monthly Views",
      s3: "Premium", l3: "National & Imported",
      s4: "Lifestyle", l4: "Engaged Audience",
    },
    identity: {
      quote: '"Perfume is not just a scent. It is presence. It is memory."',
      p1: "It is how people remember you before you speak and after you leave.",
      p2: "Gabriel Correia has become a reference in the world of perfumery by translating fragrances into real experiences, helping people find the ideal perfume for dates, events, business and unforgettable moments.",
      p3: "With an exclusive collection and vast technical knowledge, his content combines sophistication, authenticity and genuine commercial influence.",
    },
    sensorial: {
      eyebrow: "The Science of Evaluation",
      h2: "Specialist in fragrances\nthat awaken the senses.",
      cards: [
        { title: "For Dates",      desc: "Enveloping, spicy and striking fragrances to create magnetism and presence." },
        { title: "For Everyday",   desc: "Elegance, freshness and versatility. The personal signature that accompanies you." },
        { title: "For Nightlife",  desc: "Extreme performance, intense projection and absolute impact on the environment." },
        { title: "Luxury (Niche)", desc: "Exclusive experiences, pure absolutes for those who value the highest sophistication." },
      ],
    },
    b2b: {
      h2: "Your brand connected\nto the right audience.",
      p1: "Brands seeking positioning, desire and authority find in Gabriel Correia a strategic partner for campaigns, launches and product promotion.",
      p2: "His audience follows real recommendations, authentic experiences and content that influences purchasing decisions. Associating your brand with a recognised specialist strengthens premium perception, trust and qualified reach.",
      services: ["Campaigns", "Launches", "Sponsored", "Ambassador", "Reviews", "Positioning"],
      cta: "Talk to Management",
    },
    collection: {
      h2: "A collection built\nwith experience.",
      sub: "The masterpieces of world perfumery, from absolute classics to rare niche formulations.",
      d1: {
        eyebrow: "Premium Brands",
        h3: "The Niche Standard",
        p: "Excellence accepts no shortcuts. The collection features the greatest houses in niche perfumery, where total creative freedom results in unique compositions. Creed, Amouage, Xerjoff, Clive Christian and Roja define the top of the olfactory pyramid.",
      },
      d2: {
        eyebrow: "New Frontiers",
        h3: "Arabic Perfumery & Discontinued",
        p: "To master the market, one must go beyond the obvious. Oriental perfumery brought power and luxury to a new level. The collection also houses rare vintage formulations and discontinued bottles that serve as a study base for understanding what truly innovates today.",
      },
    },
    influence: {
      h2: "Influence built with authenticity.",
      p: "With content focused on the world of masculine and feminine perfumery, Gabriel Correia shares analyses, trends and recommendations that help thousands of people find fragrances that match their personality.",
      tags: ["Experience", "Lifestyle", "Elegance", "Real Influence"],
    },
    cta: {
      h2: "Transform your brand into desire.",
      p: "Associate your brand with an authority in the world of perfumery and connect your product to the right audience.",
      btn1: "Commercial Advisory",
      btn2: "Instagram",
    },
    footer: { rights: "All rights reserved." },
  },

  ar: {
    nav: { identity: "الهوية", collection: "المجموعة", b2b: "شراكات الأعمال", contact: "التواصل التجاري" },
    hero: {
      tagline: "غابرييل كوريا",
      h1: "خبير العطور ومرجع في الروائح التي تصنع الحضور.",
      sub: "مراجعات أصيلة وتجارب شمية ومحتوى يربط العلامات التجارية الفاخرة بجمهور شغوف بالرقي والهوية والأداء.",
      cta1: "شراكة علامتي التجارية",
      cta2: "التواصل مع الإدارة",
    },
    authority: {
      s1: "+١٠٠٠", l1: "عطر تم تحليله",
      s2: "+٢M",   l2: "مشاهدة شهرية",
      s3: "فاخر", l3: "محلي ومستورد",
      s4: "لايف ستايل", l4: "جمهور متفاعل",
    },
    identity: {
      quote: '"العطر ليس مجرد رائحة. إنه حضور. إنه ذاكرة."',
      p1: "هو الطريقة التي يتذكرك بها الناس قبل أن تتكلم وبعد أن تغادر.",
      p2: "أصبح غابرييل كوريا مرجعاً في عالم العطور من خلال ترجمة الروائح إلى تجارب حقيقية، مساعداً الناس في إيجاد العطور المثالية للمقابلات والفعاليات والأعمال واللحظات التي لا تُنسى.",
      p3: "بمجموعة حصرية ومعرفة تقنية واسعة، يجمع محتواه بين الرقي والأصالة والتأثير التجاري الحقيقي.",
    },
    sensorial: {
      eyebrow: "علم التقييم",
      h2: "خبير في العطور\nالتي تُوقظ الحواس.",
      cards: [
        { title: "للقاءات",       desc: "عطور محيطة وتوابلية ومميزة لخلق المغناطيسية والحضور." },
        { title: "لليوم اليومي", desc: "أناقة ونضارة وتنوع. التوقيع الشخصي الذي يرافقك." },
        { title: "للحفلات",       desc: "أداء استثنائي وإسقاط مكثف وتأثير مطلق في البيئة." },
        { title: "فاخر (نيش)",    desc: "تجارب حصرية ومطلقات نقية لمن يقدّر أعلى مستويات الرقي." },
      ],
    },
    b2b: {
      h2: "علامتك التجارية\nمتصلة بالجمهور المناسب.",
      p1: "تجد العلامات التجارية الباحثة عن التموضع والرغبة والسلطة في غابرييل كوريا شريكاً استراتيجياً للحملات والإطلاقات والترويج للمنتجات.",
      p2: "يتابع جمهوره التوصيات الحقيقية والتجارب الأصيلة والمحتوى الذي يؤثر في قرارات الشراء. ربط علامتك التجارية بخبير معروف يعزز التصور الفاخر والثقة والوصول المؤهل.",
      services: ["حملات", "إطلاقات", "محتوى مدفوع", "سفير علامة", "مراجعات", "تموضع"],
      cta: "التواصل مع الإدارة",
    },
    collection: {
      h2: "مجموعة مبنية\nبالخبرة.",
      sub: "روائع العطور العالمية، من الكلاسيكيات المطلقة إلى التركيبات النادرة من النيش.",
      d1: {
        eyebrow: "علامات فاخرة",
        h3: "المعيار الرفيع للنيش",
        p: "التميز لا يقبل الاختصارات. تضم المجموعة أبرز دور العطور النيش حيث تتمتع العلامات بحرية إبداعية كاملة مما ينتج عنه تركيبات حصرية. كريد وأمواج وإكسرجوف وكلايف كريستيان وروجا تحدد قمة الهرم العطري.",
      },
      d2: {
        eyebrow: "آفاق جديدة",
        h3: "العطور العربية والمتوقفة",
        p: "لإتقان السوق يجب المضي إلى ما هو أبعد من الواضح. جلبت العطور الشرقية القوة والفخامة إلى مستوى جديد. تحتضن المجموعة أيضاً تركيبات عتيقة نادرة وزجاجات متوقفة الإنتاج لا يمكن شراؤها بعد الآن وتعمل كأساس لفهم ما يبتكر حقاً اليوم.",
      },
    },
    influence: {
      h2: "تأثير مبني على الأصالة.",
      p: "من خلال المحتوى المتعلق بعالم العطور الرجالية والنسائية، يشارك غابرييل كوريا التحليلات والاتجاهات والتوصيات التي تساعد آلاف الأشخاص على إيجاد عطور تتناسب مع شخصيتهم.",
      tags: ["خبرة", "أسلوب حياة", "أناقة", "تأثير حقيقي"],
    },
    cta: {
      h2: "حوّل علامتك التجارية إلى رغبة.",
      p: "ارتبط علامتك التجارية بسلطة في عالم العطور ووصّل منتجك بالجمهور المناسب.",
      btn1: "الاستشارة التجارية",
      btn2: "إنستغرام",
    },
    footer: { rights: "جميع الحقوق محفوظة." },
  },
};

const flags: Record<Lang, string> = { pt: "🇧🇷", en: "🇬🇧", ar: "🇦🇪" };
const labels: Record<Lang, string> = { pt: "PT", en: "EN", ar: "AR" };

function renderLines(text: string) {
  return text.split("\n").map((line, i, arr) => (
    <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
  ));
}

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lang, setLang] = useState<Lang>("pt");
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
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang === "ar" ? "ar" : lang === "en" ? "en" : "pt-BR";
  }, [lang]);

  const t = translations[lang];

  const navLinks = [
    { name: t.nav.identity,   href: "#identidade" },
    { name: t.nav.collection, href: "#colecao" },
    { name: t.nav.b2b,        href: "#parcerias" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 80;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const LangSwitcher = ({ className = "" }: { className?: string }) => (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {(["pt", "en", "ar"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`flex items-center gap-1 px-2 py-1 text-[10px] uppercase tracking-widest font-medium rounded transition-colors ${
            lang === l
              ? "text-gold-500"
              : "text-gray-600 hover:text-gray-300"
          }`}
        >
          <span className="text-sm leading-none">{flags[l]}</span>
          <span>{labels[l]}</span>
        </button>
      ))}
    </div>
  );

  return (
    <main ref={containerRef} className="bg-black min-h-screen text-gray-200 font-sans selection:bg-gold-500/30 selection:text-white">

      {/* --- HEADER --- */}
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <Link href="#" onClick={(e) => scrollToSection(e, "#hero")} className="font-serif text-2xl tracking-tighter text-white z-50">
            GC<span className="text-gold-500">.</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
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
            <LangSwitcher />
            <a
              href="#parcerias"
              onClick={(e) => scrollToSection(e, "#parcerias")}
              className="px-6 py-2.5 bg-gold-500 text-black shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:bg-gold-400 uppercase tracking-widest text-xs font-semibold transition-colors"
            >
              {t.nav.contact}
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
              <LangSwitcher className="mt-2" />
              <a
                href="#parcerias"
                onClick={(e) => scrollToSection(e, "#parcerias")}
                className="mt-4 px-8 py-4 bg-gold-500 text-black shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:bg-gold-400 uppercase tracking-widest text-sm font-semibold w-full text-center"
              >
                {t.nav.contact}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* --- 1. HERO --- */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-32 pb-16">
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
              <Image src={heroImages[currentImageIndex]} alt="Background" fill priority className="object-cover" />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-8 mt-4 md:mt-0">
          <motion.div style={{ y: heroY }} className="w-full md:w-6/12 flex flex-col items-start text-left z-10">
            <motion.span
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              className="text-gold-500 tracking-[0.4em] text-xs md:text-sm uppercase mb-6 block font-medium"
            >
              {t.hero.tagline}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-4xl md:text-5xl lg:text-7xl text-white leading-[1.1] tracking-tight mb-8"
            >
              {t.hero.h1}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
              className="text-gray-300 font-light text-base md:text-lg max-w-xl leading-relaxed mb-12"
            >
              {t.hero.sub}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
            >
              <a href="#parcerias" onClick={(e) => scrollToSection(e, "#parcerias")} className="group flex items-center justify-center gap-3 px-8 py-4 bg-gold-500 text-black shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:bg-gold-400 uppercase tracking-widest text-xs font-semibold transition-colors w-full sm:w-auto">
                {t.hero.cta1} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#parcerias" onClick={(e) => scrollToSection(e, "#parcerias")} className="group flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-white/20 text-white uppercase tracking-widest text-xs font-semibold hover:border-gold-500 hover:text-gold-500 transition-colors w-full sm:w-auto">
                {t.hero.cta2}
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, delay: 0.4 }}
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
                <Image src={heroImages[currentImageIndex]} alt="Gabriel Correia" fill priority className="object-cover object-center grayscale-[10%]" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black-950/40 via-transparent to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* --- 2. BARRA DE AUTORIDADE --- */}
      <section className="relative z-20 bg-black border-t border-b border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center divide-x-0 md:divide-x divide-white/5">
          {([
            [t.authority.s1, t.authority.l1],
            [t.authority.s2, t.authority.l2],
            [t.authority.s3, t.authority.l3],
            [t.authority.s4, t.authority.l4],
          ] as [string, string][]).map(([val, label], i) => (
            <div key={i} className="flex flex-col items-center justify-center">
              <span className="text-3xl md:text-4xl font-serif text-gold-500 mb-2">{val}</span>
              <span className="text-gray-500 uppercase tracking-widest text-[10px]">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* --- 3. IDENTIDADE --- */}
      <section id="identidade" className="relative z-20 bg-[#050505] py-32 md:py-48 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
          >
            <h2 className="font-serif text-4xl md:text-6xl text-white mb-16 leading-[1.2]">{t.identity.quote}</h2>
            <div className="text-gray-400 font-light text-base md:text-lg leading-relaxed flex flex-col gap-6">
              <p>{t.identity.p1}</p>
              <p>{t.identity.p2}</p>
              <p>{t.identity.p3}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- 4. EXPERIÊNCIA SENSORIAL --- */}
      <section className="relative z-20 bg-black py-32 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="text-gold-500 tracking-[0.3em] text-xs uppercase mb-6 block">{t.sensorial.eyebrow}</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white">{renderLines(t.sensorial.h2)}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.sensorial.cards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: idx * 0.15 }}
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

      {/* --- 5. BLOCO COMERCIAL B2B --- */}
      <section className="relative z-20 bg-black-900 py-32 px-6 md:px-12 overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
            className="w-full md:w-5/12 relative aspect-square md:aspect-[4/5] border border-white/5"
          >
            <Image src="/fotos/IMG_1640.JPG" alt="Gabriel Correia Especialista" fill className="object-cover object-top grayscale-[10%]" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
            className="w-full md:w-7/12 flex flex-col"
          >
            <h2 className="font-serif text-4xl md:text-6xl text-white mb-8 leading-[1.1]">{renderLines(t.b2b.h2)}</h2>
            <p className="text-gray-400 font-light text-base md:text-lg leading-relaxed mb-8">{t.b2b.p1}</p>
            <p className="text-gray-400 font-light text-base md:text-lg leading-relaxed mb-12">{t.b2b.p2}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4 mb-12 border-l border-white/10 pl-6">
              {t.b2b.services.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <ChevronRight size={14} className="text-gold-500 shrink-0" />
                  <span className="text-gray-300 font-light text-sm">{item}</span>
                </div>
              ))}
            </div>
            <a href="#parcerias" onClick={(e) => scrollToSection(e, "#parcerias")} className="inline-flex items-center gap-3 px-8 py-4 bg-gold-500 text-black shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:bg-gold-400 uppercase tracking-widest text-xs font-semibold transition-colors self-start">
              {t.b2b.cta} <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* --- 6. A COLEÇÃO --- */}
      <section id="colecao" className="relative z-20 bg-[#050505] py-32 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 md:mb-32">
            <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">{renderLines(t.collection.h2)}</h2>
            <p className="text-gray-400 font-light max-w-2xl text-base">{t.collection.sub}</p>
          </div>
          <div className="flex flex-col gap-32">
            {/* Dossiê 1 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row items-center gap-12 md:gap-24"
            >
              <div className="w-full md:w-5/12 relative aspect-[3/4] bg-[#0A0A0A] border border-white/5 overflow-hidden group">
                <Image src="/fotos/IMG_1625.JPG" alt="Coleção Premium" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <div className="w-full md:w-7/12 flex flex-col">
                <span className="text-gold-500 tracking-[0.3em] text-[10px] uppercase mb-4">{t.collection.d1.eyebrow}</span>
                <h3 className="font-serif text-3xl md:text-4xl text-white mb-6">{t.collection.d1.h3}</h3>
                <p className="text-gray-400 font-light leading-relaxed mb-8 text-base">{t.collection.d1.p}</p>
                <div className="flex flex-wrap gap-3">
                  {nicheBrands.map((brand) => (
                    <span key={brand} className="px-4 py-2 border border-white/10 text-gray-400 text-xs tracking-widest uppercase hover:border-gold-500/40 hover:text-gray-300 transition-colors">{brand}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Dossiê 2 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-24"
            >
              <div className="w-full md:w-5/12 relative aspect-[3/4] bg-[#0A0A0A] border border-white/5 overflow-hidden group">
                <Image src="/fotos/IMG_1605.JPG" alt="Perfumaria Árabe" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <div className="w-full md:w-7/12 flex flex-col">
                <span className="text-gold-500 tracking-[0.3em] text-[10px] uppercase mb-4">{t.collection.d2.eyebrow}</span>
                <h3 className="font-serif text-3xl md:text-4xl text-white mb-6">{t.collection.d2.h3}</h3>
                <p className="text-gray-400 font-light leading-relaxed text-base">{t.collection.d2.p}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- 7. INFLUÊNCIA --- */}
      <section className="relative z-20 bg-black py-32 px-6 md:px-12 border-t border-white/5 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-8">{t.influence.h2}</h2>
          <p className="text-gray-400 font-light leading-relaxed mb-12 text-base md:text-lg">{t.influence.p}</p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-gold-500 uppercase tracking-widest text-xs font-semibold">
            {t.influence.tags.map((tag, i) => (
              <span key={i} className="flex items-center gap-4">
                {tag}
                {i < t.influence.tags.length - 1 && <span className="hidden md:inline">•</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --- 8. CTA FINAL --- */}
      <section id="parcerias" className="relative z-20 bg-black py-40 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <h2 className="font-serif text-5xl md:text-7xl text-white mb-8">{t.cta.h2}</h2>
          <p className="text-gray-400 font-light leading-relaxed mb-16 text-lg">{t.cta.p}</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto">
            <a href="mailto:contato@gabrielcorreia.com" className="px-10 py-5 bg-gold-500 text-black shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:bg-gold-400 text-sm uppercase tracking-widest font-semibold transition-colors w-full sm:w-auto">
              {t.cta.btn1}
            </a>
            <a href="#" className="px-10 py-5 bg-transparent border border-white/20 text-white text-sm uppercase tracking-widest font-semibold hover:border-gold-500 hover:text-gold-500 transition-colors w-full sm:w-auto flex items-center justify-center gap-3">
              <InstagramIcon size={18} /> {t.cta.btn2}
            </a>
          </div>
        </div>
      </section>

      {/* --- 9. FOOTER --- */}
      <footer className="relative z-20 bg-[#020202] pt-16 pb-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-[#222] text-[10px] md:text-xs leading-relaxed text-justify">
              Especialista em perfumes importados, perfumes árabes e fragrâncias premium. Influenciador digital de perfumaria com conteúdo sobre perfumes masculinos, perfumes femininos, perfumes de luxo, perfumes para encontros, perfumes para balada, perfumes marcantes, perfumes para o dia a dia, reviews de perfumes importados e tendências do universo da perfumaria. Gabriel Correia compartilha experiências olfativas autênticas, dicas de perfumes e análises completas das fragrâncias mais desejadas do mercado.
            </p>
          </div>
          <div className="border-t border-[#111] pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <Link href="#" onClick={(e) => scrollToSection(e, "#hero")} className="font-serif text-2xl tracking-tighter text-white">
              GC<span className="text-gold-500">.</span>
            </Link>
            <p className="text-[#555] font-light text-xs">
              © {new Date().getFullYear()} Gabriel Correia. {t.footer.rights}
            </p>
            <a href="mailto:contato@gabrielcorreia.com" className="text-[#555] hover:text-white font-light text-xs transition-colors flex items-center gap-2">
              <Mail size={12} /> contato@gabrielcorreia.com
            </a>
          </div>
        </div>
      </footer>

    </main>
  );
}
