# Estado Atual do Projeto: Site Gabriel Correia

Este arquivo serve como **ponto da verdade (Single Source of Truth)** para manter o contexto perfeitamente alinhado entre desenvolvedores humanos, o Claude Code (VS Code) e o Antigravity (Gemini).

## 🚀 Visão Geral
*   **Projeto:** Plataforma de Consultoria e Curadoria de Alta Perfumaria
*   **Objetivo:** Transformar a antiga landing page em um Web App Premium com design luxuoso, performance otimizada na Vercel e foco em conversão para consultoria olfativa.
*   **Referência Estética:** transformandofaces.com.br (Black/Gold, Layout Editorial, Assemétrico)

## 🛠️ Stack Tecnológica
*   **Framework:** Next.js 16.2.6 (App Router)
*   **Estilização:** Tailwind CSS v4 (Cores: `black-900`, `gold-500`)
*   **Animações:** Framer Motion (Scroll animations, Parallax, Glassmorphism)
*   **Ícones:** Lucide React v1.14.0 (Atenção: versão 1.x não possui ícones de redes sociais, usar SVGs inline).
*   **Hospedagem:** Vercel (CI/CD via branch `main`)

## 🎨 Decisões de Design (UI/UX)
*   **Cores:** Fundo escuro absoluto (`#050505`) com contrastes em dourado elegante (`#D4AF37`).
*   **Tipografia:** `Playfair Display` para Títulos Serifados (Sofisticação) e `Inter` para leitura Sans-serif.
*   **Navegação:** `One-Page` suave (Smooth Scroll) utilizando Header Fixo com efeito de vidro (*Glassmorphism*).

## ✅ O que já foi implementado (Última Sessão)
1.  **Limpeza de Repositório:** Otimização da pasta `public/fotos/`. Apenas imagens estritamente necessárias estão no repo para evitar *timeout* no build da Vercel (cerca de 5~6 imagens em uso).
2.  **Layout Editorial e Dinâmico (`src/app/page.tsx`):**
    *   **Header:** Fixo, responsivo (Menu Hambúrguer mobile), navegação via âncoras.
    *   **Hero Section:** Fundo dinâmico com fumaça/spray de perfume (`IMG_1626`), tipografia grandiosa e foto do Gabriel (`IMG_1677`).
    *   **Galeria Fragmentada (A Coleção):** Blocos assimétricos (*masonry*) com animações de *hover*.
    *   **Correção de Enquadramento:** A seção "Obras Primas" (`IMG_1640`) foi adaptada para um *Split Layout* (metade texto, metade imagem 3:4/4:5) para evitar cortes na cabeça na imagem vertical.
    *   **Seção de Filosofia:** Criada usando a `IMG_1594` (Gabriel de terno bege escurecida), focando na citação de autoridade.
    *   **Seção de Atendimento (Call-to-Action):** Bloco escuro com *glow* dourado no fundo focado em agendamento da Consultoria.
    *   **Rodapé Institucional (Footer):** Multi-colunas com logo, mapa do site, contatos sociais. Ícone do Instagram feito em **SVG inline** (devido à remoção do Lucide v1.x).

## 🚧 Próximos Passos (To-Do)
*   [ ] Inserir os links definitivos nas âncoras do WhatsApp e Instagram.
*   [ ] Implementar sistema de CMS ou envio de formulário para os agendamentos (opcional, se não for usar WhatsApp direto).
*   [ ] Verificar Core Web Vitals (Lighthouse) para garantir pontuação > 90 de performance no mobile.
*   [ ] Adicionar metadados avançados de SEO na Home (`layout.tsx`) como *OpenGraph images* e *schema.org*.

## 🚨 Avisos Importantes (Para os Agentes IA)
1.  **Não usar pacotes grandes para ícones sociais:** Manter SVGs em linha na interface. `lucide-react` atual é V1+.
2.  **Não suba imagens "raw":** As imagens de alta resolução originais causaram o erro de timeout no upload da Vercel. Caso necessite adicionar mais imagens, compacte-as primeiro.
3.  **Não remova o `"use client"` da Home:** A Home (`page.tsx`) é amplamente dependente dos hooks do `framer-motion` (`useScroll`, `useTransform`).
