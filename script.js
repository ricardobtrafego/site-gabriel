/* ============================================================
   Gabriel Correia — script.js
   Responsabilidades:
     1. Renderizar cards de recomendações a partir do array abaixo
     2. Scroll suave para âncoras
     3. Animação reveal via IntersectionObserver
     4. Botão voltar ao topo
   ============================================================ */

/* ============================================================
   ARRAY DE RECOMENDAÇÕES
   Para atualizar: edite nome, porQueVale e href de cada item.
   - tag: 'Perfume' | 'Vinho'
   - nome: nome ou descrição do produto (placeholder até ter real)
   - porQueVale: frase curta de curadoria
   - href: substituir '#' pelo link real quando disponível
   ============================================================ */
const recommendations = [
  {
    tag: 'Perfume',
    nome: 'Masculino Intenso',
    porQueVale: 'Assinatura elegante, funciona no dia a dia.',
    href: '#'
  },
  {
    tag: 'Perfume',
    nome: 'Clássico Versátil',
    porQueVale: 'Presença na medida — marcante sem exagero.',
    href: '#'
  },
  {
    tag: 'Perfume',
    nome: 'Custo-Benefício Certo',
    porQueVale: 'Custo-benefício acima da média.',
    href: '#'
  },
  {
    tag: 'Vinho',
    nome: 'Tinto de Destaque',
    porQueVale: 'Boa escolha pra jantar, encontro ou celebração.',
    href: '#'
  },
  {
    tag: 'Vinho',
    nome: 'Branco Elegante',
    porQueVale: 'Entrega mais do que promete.',
    href: '#'
  },
  {
    tag: 'Vinho',
    nome: 'Opção Presente',
    porQueVale: 'Ótimo pra presente: fácil de agradar.',
    href: '#'
  }
];

/* ---- Helpers DOM seguros ---- */
function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  Object.entries(props).forEach(([k, v]) => {
    if (k === 'className')       node.className = v;
    else if (k === 'textContent') node.textContent = v;
    else if (k === 'title')       node.title = v;
    else                          node.setAttribute(k, v);
  });
  children.forEach(child => {
    if (child == null) return;
    node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  });
  return node;
}

/* ---- 1. Renderizar cards de recomendação ---- */
function renderCards() {
  const grid = document.getElementById('rec-grid');
  if (!grid) return;

  recommendations.forEach((item, index) => {
    const isPerfume  = item.tag === 'Perfume';
    const tagClass   = isPerfume ? 'rec-card-tag--perfume' : 'rec-card-tag--vinho';
    const isPlaceholder = item.href === '#';

    /* Tag (Perfume / Vinho) */
    const tag = el('span', { className: `rec-card-tag ${tagClass}`, textContent: item.tag });

    /* Nome */
    const nome = el('p', { className: 'rec-card-nome', textContent: item.nome });

    /* Por que vale */
    const motivo = el('p', { className: 'rec-card-motivo', textContent: item.porQueVale });

    /* Link */
    const linkAttrs = {
      href: item.href,
      className: 'btn btn-outline btn-sm',
      'aria-label': `Ver recomendação: ${item.nome}`
    };
    if (!isPlaceholder) {
      linkAttrs.target  = '_blank';
      linkAttrs.rel     = 'noopener noreferrer';
    }

    const linkText  = document.createTextNode('Ver recomendação ');
    const soonSpan  = isPlaceholder ? el('span', { className: 'soon', textContent: '(link em breve)' }) : null;
    const extIcon   = el('span', { className: 'ext-icon', 'aria-hidden': 'true', textContent: '↗' });
    const link      = el('a', linkAttrs, linkText, soonSpan, ' ', extIcon);

    /* Selo afiliado */
    const selo = el('span', {
      className: 'rec-card-afiliado',
      title: 'Este pode ser um link de afiliado',
      textContent: 'Link de afiliado'
    });

    /* Footer do card */
    const footer = el('div', { className: 'rec-card-footer' }, link, selo);

    /* Card completo */
    const card = el('article', {
      className: 'rec-card reveal',
      role: 'listitem',
      style: `transition-delay: ${index * 75}ms`
    }, tag, nome, motivo, footer);

    grid.appendChild(card);

    /* Registra no observer depois de criar */
    revealObserver.observe(card);
  });
}

/* ---- 2. Scroll suave para âncoras ---- */
function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

/* ---- 3. Animação reveal via IntersectionObserver ---- */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -36px 0px'
});

function initReveal() {
  if (prefersReducedMotion) return;
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

/* ---- 4. Botão voltar ao topo ---- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        btn.classList.toggle('visible', window.scrollY > 480);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
  renderCards();
  initSmoothScroll();
  initReveal();
  initBackToTop();
});
