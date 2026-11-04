# Teste para candidatos à vaga de Desenvolvedor — Enzzo Detoffol Bez

## Tecnologias
- PHP 8.3
- Laravel 13
- MySQL 8.4
- Docker e Docker Compose
- Blade, Materialize CSS e JavaScript

## Como executar
Na raiz do repositório, execute no PowerShell:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\\setup.ps1
docker compose up -d --build
docker compose exec app php artisan key:generate
docker compose exec app php artisan migrate --seed
```

A aplicação ficará disponível em `http://localhost:8080`.
phpMyAdmin opcional: `docker compose --profile tools up -d` e acesse `http://localhost:8081`.

Usuário local de demonstração: `admin@pedidos.local`
Senha local: `password`

## Migrations, Seeds e Factories
As migrations criam `customers`, `products`, `order_statuses`, `orders` e `order_items`.
O `DatabaseSeeder` insere os status, usuário de demonstração, clientes, produtos e pedidos de exemplo.
Factories disponíveis: `CustomerFactory`, `ProductFactory` e `OrderFactory`.

## Normalização até a 3FN
A estrutura original reunia, na mesma linha, os dados do pedido, do cliente e do produto. Isso gera repetição de nome/CPF/e-mail do cliente e SKU/título/preço/estoque do produto sempre que o pedido possui mais de um item.

A decomposição aplicada é:
- `customers`: nome, CPF, e-mail e telefone.
- `products`: SKU, título, descrição, preço atual e estoque.
- `orders`: cliente, status, data e desconto.
- `order_items`: pedido, produto, quantidade e preço unitário praticado.
- `order_statuses`: catálogo de status.

Cada entidade possui sua própria chave primária; os relacionamentos são representados por chaves estrangeiras. Os atributos não-chave dependem da chave da entidade, sem armazenar dados descritivos de cliente ou produto repetidos no cabeçalho do pedido. O preço unitário em `order_items` é uma fotografia do preço no momento da compra, necessária para preservar o histórico mesmo após alteração do preço do catálogo.

## Comandos úteis
```bash
docker compose exec app php artisan migrate:status
docker compose exec app php artisan migrate:fresh --seed
docker compose exec app php artisan test
docker compose exec app php artisan route:list
```

## API REST
- `/api/customers` — CRUD de clientes.
- `/api/products` — CRUD de produtos.
- `/api/orders` — CRUD de pedidos.
