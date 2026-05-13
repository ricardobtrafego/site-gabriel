# Estado Atual do Projeto: Site Gabriel Correia

Este arquivo serve como **ponto da verdade (Single Source of Truth)** para manter o contexto perfeitamente alinhado entre desenvolvedores humanos, o Claude Code (VS Code) e o Antigravity (Gemini).

## 🚀 Visão Geral
*   **Projeto:** Mídia Kit / Portfólio Comercial B2B de Alta Perfumaria.
*   **Objetivo:** Posicionar Gabriel Correia como a principal autoridade (Especialista + Influenciador) para atrair parcerias comerciais com marcas de luxo. Transição do foco B2C (consultoria) para foco B2B (associação de marcas e campanhas).
*   **Referência Estética:** Nível editorial premium (Dior, Tom Ford, GQ). Design focado em "Blackout" com respiros profundos e interações elegantes.

## 🛠️ Stack Tecnológica
*   **Framework:** Next.js 16.2.6 (App Router)
*   **Estilização:** Tailwind CSS v4
*   **Animações:** Framer Motion (Scroll animations, AnimatePresence, Hover Effects)
*   **Ícones:** Lucide React v1.14.0 (Atenção: SVGs inline para redes sociais).
*   **Hospedagem:** Vercel (CI/CD via branch `main`)

## 🎨 Decisões de Design (UI/UX - Estrutura 10/10)
*   **Cores:** Fundo escuro absoluto (Blackout - `bg-black` puro e `bg-black-950`) com toques cirúrgicos de luxo em dourado (`gold-500` e `gold-400`).
*   **Botões e Conversão:** Para garantir o contraste máximo de luxo, botões primários usam `bg-gold-500` com texto preto (`text-black`) e uma sombra glow suave. Botões secundários possuem hover dourado na borda.
*   **Tipografia:** `Playfair Display` para Títulos Serifados (Sofisticação) e `Inter` para leitura Sans-serif.
*   **Layout Fotográfico:** O Hero section utiliza um **Split Layout (Tela Dividida)** no desktop para exibir o slider dinâmico (`AnimatePresence`) dentro de um contêiner `aspect-[4/5]`. Isso foi decidido para evitar definitivamente o corte das fotos em formato retrato (portrait) em monitores de PC. No fundo da tela, a imagem é espelhada com um desfoque (blur) massivo de 100px para criar o ambiente.

## ✅ O que já foi implementado (Última Sessão)
1.  **Pivot B2C -> B2B:** Refatoração completa da cópia e narrativa do site. Saíram os blocos de consultoria, entraram blocos de prospecção e autoridade de marca.
2.  **Hero Dinâmico:** Carrossel infinito de imagens em crossfade.
3.  **Barra de Autoridade:** Criação de bloco direto com números (Ex: +1000 perfumes, +2M Views) totalmente em dourado.
4.  **Blocos Editoriais e B2B:**
    *   **Identidade e Sensações:** Textos espaçados enfatizando a conexão emocional do perfume.
    *   **Cards de Uso:** Grid elegante descrevendo os momentos (Balada, Luxo, Encontros).
    *   **Bloco Comercial B2B:** Seção dedicada com checklist de serviços (Publis, Lançamentos, Embaixador).
    *   **Dossiê de Coleção:** Focado em marcas High-End (Creed, Xerjoff, Dior) e mercado Árabe/Descontinuados, aumentando a percepção de conhecedor profundo.
5.  **SEO Oculto:** O rodapé (footer) totalmente preto abriga um extenso bloco de texto cinza bem escuro otimizado para dezenas de palavras-chave, sem quebrar a estética premium.

## 🚧 Próximos Passos (To-Do)
*   [ ] O usuário precisa subir as novas fotos com temática **"Cinematográfica e Terno Escuro"** na pasta `public/fotos/` e apenas substituir os nomes no array `heroImages` e nas tags `<Image>` (linhas ~28, ~245, ~262 de `page.tsx`).
*   [ ] Inserir os links definitivos nas âncoras do WhatsApp e Instagram nos botões "Falar com Assessoria" e "Associar Minha Marca".
*   [ ] Verificar Core Web Vitals (Lighthouse) para garantir a melhor performance na Vercel.

## 🚨 Avisos Importantes (Para os Agentes IA)
1.  **Não adicionar muitas cores ou cards "comuns":** A identidade é *Blackout Editorial*. Muito texto e imagem grande, zero elementos de Dashboard ou landing pages de marketing agressivo.
2.  **Não usar `object-cover` em contêiner `w-full h-screen` com fotos retrato:** Lembre-se do problema de corte. Se adicionar novas fotos retrato, coloque-as em contêineres de aspecto `3/4` ou `4/5`.
3.  **Não remova o `"use client"` da Home:** A Home (`page.tsx`) depende profundamente do `framer-motion`.
