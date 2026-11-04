# Sistema de Pedidos de Compra

Aplicação web para cadastro de clientes, produtos e pedidos de compra, feita com **Node.js + Express**, **Sequelize** e **SQLite**. O front-end usa HTML, CSS, JavaScript e **Materialize**.

## Como executar

### Com Docker

```bash
docker compose up --build
```

O container aplica as migrations e os seeds sozinho e sobe em http://localhost:3000.

### Sem Docker (Node.js 22 ou superior)

```bash
npm install
cp .env.example .env    # opcional em desenvolvimento
npm run db:setup        # migrations + seeds
npm start               # ou: npm run dev
```

Acesse http://localhost:3000. Login padrão: **admin@teste.com / 123456**.

### Comandos do banco

| Comando | O que faz |
| --- | --- |
| `npm run db:migrate` | Cria as tabelas (migrations do Sequelize) |
| `npm run db:seed` | Cria o usuário administrador e popula dados de exemplo com factories (Faker). Pode ser executado mais de uma vez |
| `npm run db:setup` | Executa migrations e seeds |
| `npm run db:reset` | Desfaz tudo e recria o banco do zero |
| `npm test` | Testes automatizados (API e regras de negócio) |

## Modelo de dados (3FN)

A tabela única original mistura cliente, pedido e produto. Ela foi dividida em:

- **Clientes** (`id`, `nome`, `cpf`, `email`)
- **Produtos** (`id`, `sku`, `titulo`, `preco`, `estoque`)
- **Pedidos** (`id`, `codigo_pedido`, `cliente_id` → Clientes, `data_pedido`, `status`, `tipo_desconto`, `desconto`)
- **PedidoItens** (`id`, `pedido_id` → Pedidos, `produto_id` → Produtos, `quantidade`, `preco_unitario`)
- **Usuarios**: autenticação

Detalhes:

- Os valores derivados (subtotal do item, subtotal e total do pedido) **não são gravados**. Eles são calculados na consulta, o que evita dependências transitivas e dados inconsistentes.
- `preco_unitario` guarda o preço praticado na venda, que é independente do preço atual do produto.
- Um cliente com pedidos e um produto usado em pedidos não podem ser excluídos (`RESTRICT`). Ao excluir um pedido, os itens dele são excluídos junto (`CASCADE`).

## Funcionalidades

- CRUD de clientes, produtos e pedidos (status: Em Aberto, Pago ou Cancelado), com formulários em modal
- Clique em uma linha para abrir o detalhe do registro num painel lateral. Pelo detalhe do pedido, o status pode ser trocado direto
- Busca em todos os campos ou em um campo específico, ordenação clicando no cabeçalho de qualquer coluna e paginação de 20 itens (configurável). Filtros, ordenação e página ficam na URL
- Confirmação antes de excluir. Exclusão individual ou em massa
- Links entre os CRUDs: cliente do pedido → detalhe do cliente; cliente → pedidos do cliente; item do pedido → detalhe do produto
- Novo pedido já sugere o próximo código e a data de hoje, e avisa quando a quantidade passa do estoque disponível
- Layout responsivo: no celular, as tabelas viram cartões
- Pedidos com status **Pago** baixam o estoque. Ao editar, cancelar ou excluir um pedido pago, o estoque é devolvido
- Desconto percentual ou em valor fixo
- Autenticação JWT e API REST JSON

## API REST

Todas as rotas, exceto o login, exigem o cabeçalho `Authorization: Bearer <token>`.

| Método | Rota | Descrição |
| --- | --- | --- |
| POST | `/api/auth/login` | `{ email, senha }` → `{ token }` |
| GET | `/api/{recurso}` | Lista. Parâmetros: `pagina`, `limite`, `ordenarPor`, `ordem` (ASC/DESC), `busca`, `campo` e `<campo>=<valor>` para filtro exato |
| GET | `/api/{recurso}/:id` | Detalhe |
| POST | `/api/{recurso}` | Cria |
| PUT | `/api/{recurso}/:id` | Atualiza |
| DELETE | `/api/{recurso}/:id` | Exclui |
| DELETE | `/api/{recurso}` | Exclusão em massa: `{ ids: [1, 2, 3] }` |
| PATCH | `/api/pedidos/:id/status` | Troca só o status: `{ status: "Pago" }` |

`{recurso}` pode ser `clientes`, `produtos` ou `pedidos`.

## Estrutura

```
backend/
  config/         conexão com o banco e autenticação
  database/       models, migrations, seeders e factories
  routes/         rotas (crud.js gera as rotas REST de cada recurso)
  controllers/    camada HTTP
  services/       regras de negócio (CrudService genérico + PedidoService)
  repositories/   acesso a dados
  validators/     validações de entrada (express-validator)
  middlewares/    autenticação, validação e tratamento de erros
front/public/
  js/core/        cliente da API, layout (menu, modal, painel lateral) e CrudPage (listagem, detalhe e formulário genéricos)
  js/pages/       configuração de cada página
tests/            testes automatizados (node:test)
```
