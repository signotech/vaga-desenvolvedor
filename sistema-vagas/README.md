# Sistema de Gerenciamento de Vagas e Candidatos

Este projeto é uma aplicação web para a inscrição de candidatos a oportunidades de emprego, construída com o framework PHP Laravel.

## Funcionalidades Implementadas

### Requisitos Principais
* **CRUD de Vagas:** Criar, editar, excluir e listar vagas.
* **CRUD de Candidatos:** Criar, editar, excluir e listar candidatos.
* **Tipos de Vaga:** As vagas podem ser CLT, Pessoa Jurídica ou Freelancer.
* **Inscrição:** Um candidato pode se inscrever em uma ou mais vagas.
* **Pausar Vaga:** Funcionalidade para "pausar" uma vaga, evitando novas inscrições.
* **Gerenciamento de CRUDs:**
    * Listagens com filtros e ordenação por qualquer campo.
    * Paginação de 20 itens por padrão.
    * Formulários para criação e atualização.
    * Validação de campos obrigatórios e tipos de dados via Form Requests.
* **Banco de Dados:**
    * Estrutura criada com *Migrations*.
    * Banco de dados populado com *Factories* e *Seeders*.
* **Testes:** Testes de funcionalidade (Feature tests) para os principais fluxos do CRUD.

### Funcionalidades Bônus
* **API REST JSON:** Endpoints de API para todos os CRUDS (Vagas e Candidatos).
* **Itens por Página:** Permite ao usuário alterar o número de itens por página na listagem (20, 50 ou 100).
* **Autenticação:** Sistema completo de autenticação de usuário (login, registro, recuperação de senha) implementado com o Laravel Breeze. Todas as rotas de gerenciamento são protegidas.
* **Documentação da API:** Documentação da API gerada automaticamente com o padrão OpenAPI (Swagger).
* **Deploy com Docker:** O projeto já está "deployado" dentro do Docker. O ambiente de desenvolvimento é o ambiente de produção, utilizando o `compose.yaml` e os `Dockerfiles` do Laravel Sail.

## Tecnologias Utilizadas
* PHP 8.3
* Laravel 11
* PostgreSQL (ou MySQL, via Docker)
* Docker (Laravel Sail)
* Blade (HTML) / CSS / Javascript
* Swagger (l5-swagger) para documentação da API

---

## ⚠️ Pré-requisito Obrigatório: Ambiente WSL2

Este projeto é configurado para rodar exclusivamente dentro do **WSL2 (Windows Subsystem for Linux)**. Todos os comandos devem ser executados de dentro de um terminal WSL (como o Ubuntu).

**Certifique-se de que você tem:**
1.  O **WSL2** instalado (com uma distribuição como o Ubuntu).
2.  O **Docker Desktop** instalado e configurado para usar o *backend do WSL2* (verifique em Settings > General > "Use the WSL 2 based engine").

---

## Instalação (Para um Novo Desenvolvedor)

### 1. Configuração Inicial via WSL2
Abra seu terminal WSL (ex: Ubuntu) e navegue até a pasta onde seus projetos são armazenados (ex: `C:\dev` se torna `/mnt/c/dev`).

```bash
cd /mnt/c/dev
```

### 2. Instalação do Projeto (via Laravel Build)
Este comando usa o Docker para criar o projeto, instalar o Sail e todas as dependências do Composer. Escolha `pgsql` (PostgreSQL) ou `mysql` quando perguntado.

```bash
curl -s "[https://laravel.build/sistema-vagas](https://laravel.build/sistema-vagas)" | bash
```

### 3. Entrar na Pasta e Iniciar o Sail
Após a conclusão, entre na pasta do projeto e inicie os contêineres Docker.

```bash
cd sistema-vagas
./vendor/bin/sail up -d
```
*(O Docker Desktop deve estar em execução no Windows).*

### 4. Configuração Final do Banco de Dados
Execute as *migrations* (para criar as tabelas) e os *seeders* (para popular o banco com dados de teste).

```bash
./vendor/bin/sail artisan migrate:fresh --seed
```

### 5. Compilar Assets (CSS/JS)
O Laravel Breeze requer que os assets de front-end sejam compilados.

```bash
./vendor/bin/sail npm install
./vendor/bin/sail npm run dev
```

### 6. Gerar Documentação da API
Gere o arquivo da documentação Swagger/OpenAPI.

```bash
./vendor/bin/sail artisan l5-swagger:generate
```

## Acesso à Aplicação

Seu ambiente está pronto e acessível:

* **Aplicação Web:** [http://localhost](http://localhost)
    * (Faça o login ou registre um novo usuário para acessar os CRUDS).
* **Documentação da API:** [http://localhost/api/documentation](http://localhost/api/documentation)

---

## Comandos do Dia-a-Dia (Sempre dentro do WSL)

**Lembrete:** Todos os comandos `artisan`, `composer` ou `npm` devem ser prefixados com `./vendor/bin/sail`.

* **Iniciar o ambiente:**
    ```bash
    ./vendor/bin/sail up -d
    ```
* **Parar o ambiente:**
    ```bash
    ./vendor/bin/sail down
    ```
* **Executar Testes:**
    ```bash
    ./vendor/bin/sail artisan test
    ```
* **Executar Migrations:**
    ```bash
    ./vendor/bin/sail artisan migrate
    ```
* **Limpar Caches (se algo parecer quebrado):**
    ```bash
    ./vendor/bin/sail artisan route:clear
    ./vendor/bin/sail artisan config:clear
    ./vendor/bin/sail composer dump-autoload
    ```