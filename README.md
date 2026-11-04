# Enzzo Pedidos — desafio técnico SignoTech

Aplicação de pedidos de compra em Laravel 13, PHP 8.3, MySQL 8.4 e Docker.

## Pré-requisitos
- Docker Desktop iniciado com backend WSL 2.
- Git.
- Windows PowerShell.

## Instalação inicial (Windows)
1. Extraia este projeto para uma pasta.
2. Abra PowerShell nessa pasta.
3. Execute:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\setup.ps1
```

O script cria o Laravel 13 dentro de `app/` usando Composer em container, aplica os arquivos do desafio e prepara o `.env`.

Depois:

```powershell
docker compose up -d --build
docker compose exec app php artisan key:generate
docker compose exec app php artisan migrate --seed
```

Acesse:
- Aplicação: http://localhost:8080
- phpMyAdmin (opcional): execute `docker compose --profile tools up -d`; depois http://localhost:8081

Login local:
- E-mail: `admin@pedidos.local`
- Senha: `password`

## Comandos úteis

```powershell
docker compose ps
docker compose logs -f app
docker compose exec app php artisan test
docker compose exec app php artisan migrate:fresh --seed
docker compose down
```

Para apagar também os dados do MySQL (irreversível):

```powershell
docker compose down -v
```

## Banco e normalização (3FN)
- `customers`: dados cadastrais de clientes.
- `products`: catálogo, SKU, preço atual e estoque.
- `order_statuses`: domínio de status (Em Aberto, Pago, Cancelado).
- `orders`: cabeçalho do pedido, cliente, status, data e desconto.
- `order_items`: itens, quantidade e preço unitário congelado no momento da compra.

A tabela original misturava atributos de cliente, pedido e produto em uma única linha. A decomposição elimina grupos repetidos e dependências transitivas. O preço histórico fica em `order_items.unit_price` para que alterações futuras no catálogo não modifiquem pedidos antigos.

## Regras importantes
- Valores monetários usam `DECIMAL`, nunca `FLOAT`.
- Exclusões de clientes/produtos referenciados são restringidas pelo banco.
- Pedidos e itens são persistidos em transação.
- Filtros e ordenação são limitados a colunas permitidas (proteção contra SQL injection).
- Listagens usam paginação de 20 por padrão e permitem alterar o tamanho.
- API REST disponível em `/api/customers`, `/api/products` e `/api/orders`.

## Entrega GitHub
1. Faça fork de `https://github.com/signotech/vaga-desenvolvedor`.
2. Clone o SEU fork.
3. Copie o conteúdo deste projeto para a raiz do clone (preserve o `teste1.md` original até aplicar o texto atualizado).
4. Crie a branch `Enzzo-Detoffol-Bez`.
5. Atualize `teste1.md` com os comandos e explicação da modelagem.
6. Commit, push e abra Pull Request para `signotech/vaga-desenvolvedor:main`.

Não envie `.env`, senhas reais, `vendor/` ou dados pessoais no repositório.
