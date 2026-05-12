# Gabriel Correia — Mini Site Premium

Landing page estática (1 página) para curadoria de perfumes e vinhos.
Paleta: preto & dourado. Stack: HTML + CSS + JS vanilla, sem build.

---

## Estrutura de arquivos

```
Site Gabriel Correia/
├── index.html
├── styles.css
├── script.js
├── README.md
├── fotos/              ← fotos originais (não publicar, apenas referência)
└── assets/
    └── gabriel/        ← coloque aqui as imagens do site (ver abaixo)
```

---

## 1. Colocar as imagens

Copie os arquivos da pasta `fotos/` para `assets/gabriel/` com os nomes abaixo:

| Arquivo original | Destino esperado pelo site |
|---|---|
| `fotos/IMG_1635.JPG` | `assets/gabriel/IMG_1635.jpg` |
| `fotos/IMG_1632.JPG` | `assets/gabriel/IMG_1632.jpg` |
| `fotos/IMG_1626.JPG` | `assets/gabriel/IMG_1626.jpg` |
| `fotos/IMG_1634.JPG` | `assets/gabriel/IMG_1634.jpg` |

> **Atenção no Windows:** o servidor local e hospedagens Linux são sensíveis a maiúsculas/minúsculas.
> Renomeie os arquivos para letras minúsculas no destino (`.jpg`, não `.JPG`).

---

## 2. Editar os textos principais

Todos os textos estão diretamente no `index.html`, organizados por seção com comentários:

```html
<!-- (1) HERO -->
<!-- (2) ATALHOS -->
<!-- (3) RECOMENDAÇÕES -->
...
```

Abra o arquivo em qualquer editor (VS Code, Notepad++) e localize a seção pelo comentário.

---

## 3. Atualizar as recomendações da semana

Os 6 cards da seção **Recomendações** são gerados pelo JavaScript.
Edite o array `recommendations` no início de `script.js`:

```js
const recommendations = [
  {
    tag: 'Perfume',          // 'Perfume' ou 'Vinho'
    nome: 'Nome do produto', // texto exibido como título do card
    porQueVale: 'Frase curta de curadoria.',
    href: '#'                // substituir pelo link real quando disponível
  },
  // ... mais itens
];
```

- Mantenha sempre 6 itens (3 Perfume + 3 Vinho) para o grid ficar equilibrado.
- Quando o `href` for `'#'`, o botão exibe "(link em breve)" automaticamente.
- Quando o `href` for um link real, ele abre em nova aba com `rel="noopener"`.

---

## 4. Substituir os links "em breve"

Busque por `href="#"` no `index.html` para localizar todos os links placeholder.
Há também os botões de WhatsApp e Instagram no Hero e na seção Contato — basta substituir `href="#"` pela URL real.

Exemplo:
```html
<!-- Antes -->
<a href="#" class="btn btn-outline">WhatsApp <small>(link em breve)</small></a>

<!-- Depois -->
<a href="https://wa.me/5511999999999" class="btn btn-outline" target="_blank" rel="noopener">WhatsApp</a>
```

---

## 5. Publicar (deploy estático)

O site é 100% estático — basta fazer upload da pasta raiz para qualquer host:

- **Netlify / Vercel**: arraste a pasta ou conecte ao repositório Git.
- **GitHub Pages**: faça push para um repositório e ative Pages na branch `main`.
- **Hostinger / cPanel**: upload por FTP, aponte o domínio para a pasta.

Não há servidor, banco de dados nem processo de build necessário.

---

## 6. Paleta de cores (referência rápida)

| Variável | Valor | Uso |
|---|---|---|
| `--bg` | `#0B0B0F` | Fundo principal |
| `--panel` | `#111118` | Fundo de cards e seções alternadas |
| `--text` | `#F5F5F7` | Texto principal |
| `--muted` | `#B9BAC6` | Texto secundário |
| `--gold` | `#D4AF37` | Dourado principal |
| `--goldSoft` | `#F2D77C` | Dourado suave (gradientes) |
| `--line` | `rgba(212,175,55,.18)` | Bordas e divisores |

Para alterar a identidade visual, edite as variáveis no bloco `:root` no início de `styles.css`.
