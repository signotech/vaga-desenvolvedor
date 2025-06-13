# 📦 CRUD de vagas de emprego
Este projeto é uma aplicação web desenvolvida em **PHP Artisan + Javascript**, com gerenciamento de vagas e de usuários, autenticação de usuário, possibilidade de se candidatar a vagas e documentação via **Swagger**. Os testes são realizados com **PHP Unit**.

---

## 🚀 Como rodar o projeto

### 1. Buildar o docker-compose na pasta raiz do projeto

```bash
  docker compose up -d --build
```

>   Dependendo da versão do docker o comando pode ser docker-compose up -d --build


### 2. Entrar no container do backend_app

```bash
docker exec -it backend_app bash
```

### 3. Instalar as dependências do PHP (composer)

```bash
composer install
```
### 4. Configurar as variáveis de ambiente
Copie o .env.example para .env e .env.test

```bash
cp .env.example .env
cp .env.example .env.test
```

### 5. Gerar a chave da aplicação para os ambientes (app key)

```bash
php artisan key:generate
php artisan key:generate --env=.env.test
```
---

### 6. Gerar a chave JWT (JWT secret)

```bash
php artisan jwt:secret
```
>   Para o ambiente de teste, copie o JWT_SECRET para o .env.teste ou configure manualmente
---

### 7. (opcional) Rodar testes automatizados

```bash
php artisan test
```
---

### 8. Rodar as migrations e seeders (base limpa)

```bash
php artisan migrate:fresh --seed
```
---


### 9. Gerar documentação Swagger

```bash
php artisan l5-swagger:generate
```

---

## 📄 Documentação da API

A documentação da API está disponível através do **Swagger**.

### Acesse no endpoint:

```
/api/documentation/
```

A documentação inclui:
- Descrição dos endpoints
- Parâmetros e exemplos
- Schemas de resposta

---
