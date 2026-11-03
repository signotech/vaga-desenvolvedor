# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Operadores administrativos que cadastram e consultam clientes, produtos e pedidos de compra em um fluxo diário de escritório/estoque. Trabalham em desktop, com uso ocasional de tablet.

## Product Purpose

Permitir o CRUD completo de clientes, produtos e pedidos (com itens, status e desconto), com filtro, ordenação e paginação — para o teste técnico Signotech de desenvolvedor.

## Positioning

Aplicação de cadastro operacional com API REST + UI Materialize, focada em clareza tabular e confirmação segura de exclusões, não em marketing.

## Operating Context

Listagens densas, formulários de criação/edição em modal, confirmação antes de apagar, e links cruzados entre pedidos ↔ clientes ↔ produtos.

## Capabilities and Constraints

- Stack front: React, TypeScript, Vite, Materialize CSS (obrigatório no enunciado).
- Stack back: Node, Express, Sequelize, SQLite.
- Status de pedido: Em Aberto | Pago | Cancelado.
- Paginação padrão 20; limite configurável.
- Autenticação JWT (login); CRUDs protegidos.

## Brand Commitments

- Nome do produto: **Signo Pedidos**.
- Biblioteca UI: **Materialize** (não substituir por outro design system).

## Evidence on Hand

- Spec: `teste1.md`, `README.md` e modelagem `banco.png`.
- API documentada em `/api/docs`.
- Seeds demo (~150 pedidos) em `backend/database/seeders`.
- Docker Compose (`compose.yaml`) para subir API + frontend; profile `test` roda e2e.
- E2e Playwright em `e2e/` (API + UI), via host (`npm run test:e2e`) ou Docker (`npm run test:e2e:docker`).
- Bônus do enunciado: auth, itens/página, deleção em massa, desconto, Materialize responsivo, API REST, Docker.

## Product Principles

1. A tarefa principal da tela é óbvia em menos de dois segundos.
2. Dados tabulares vêm primeiro; decoração não compete com a ação.
3. Exclusão sempre pede confirmação explícita.
4. Filtros e ordenação ficam próximos da lista, sem atrapalhar a leitura.
5. O visual serve o modo Operate: precisão, contraste e consistência.

## Accessibility & Inclusion

Contraste legível em texto e controles; foco de teclado visível; alvos clicáveis confortáveis; labels associados aos campos.
