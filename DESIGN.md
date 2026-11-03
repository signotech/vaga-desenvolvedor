# Design System — Signo Pedidos

<!-- impeccable:design-schema 1 -->

## Mode

Operate — cadastro operacional. Hierarquia a favor da lista e da ação primária.

## Direction

**Binance** light trading desk: canvas claro, painéis brancos, tipografia BinanceNova, acento amarelo `#fcd535`. Nav e hero em banda escura. Materialize como base; tokens Binance por cima.

## Color

| Token | Value | Use |
| --- | --- | --- |
| `--background` | `#ffffff` | Página |
| `--foreground` | `#181a20` | Texto principal |
| `--card` | `#ffffff` | Painéis / tabelas |
| `--muted` | `#f4f4f5` | Superfície secundária |
| `--muted-foreground` | `#666666` | Texto secundário |
| `--border` | `#eaecef` | Divisores |
| `--primary` / action | `#fcd535` | CTA primário |
| `--primary-foreground` | `#181a20` | Texto no CTA amarelo |
| `--secondary` | `#181a20` | Botão secundário / nav |
| `--secondary-foreground` | `#ffffff` | Texto no secundário |
| `--ring` | `#fcd535` | Foco |
| `--trading-up` | `#0ecb81` | Status Pago |
| `--trading-down` | `#f6465d` | Exclusão / Cancelado |
| `--canvas-dark` | `#0a0a0a` | Nav / hero band |

## Typography

- Display / body / UI: **BinanceNova** (fallback Inter, system-ui).
- Mono: ui-monospace stack para IDs/SKU quando útil.
- Weights: 700 / 600 / 500 / 400.
- Sentence case. Sem emoji.

## Radius

- Card: `12px` · Input / button: `8px` · Pill: `9999px`

## Layout

- Conteúdo max ~1120px.
- Toolbar: filtros + sort/limit numa faixa.
- Um painel `card` por listagem.
- Home: hero band dark + CTAs (amarelo primário, secundário no dark).

## Components

- **Primary:** fundo `#fcd535`, texto `#181a20`, hover levemente mais escuro.
- **Secondary on dark:** outline/branco translúcido no hero/nav.
- **Secondary on light:** `#181a20` sólido, texto branco.
- **Tertiary:** texto flat, sem fundo.
- Nav: top nav dark; link ativo com amarelo ou underline.
- Chips: pill; Pago = trading up; Cancelado = trading down; Em Aberto = muted dark.
- Focus ring: `#fcd535`.

## Motion

- `fade-up` só no bloco principal da página.
- Hover de linha: `#f8fafc`.
- Sem glow / shimmer.

## Do / Don’t

- Do: CTA amarelo único por tela; contraste alto em tabelas.
- Don’t: bege “AI”, serif display, gradientes de texto, cards aninhados.
