## Ambiente de desenvolvimento

### Usando Node localmente

```bash
pnpm install
pnpm dev
```

O app ficará disponível em [http://localhost:3000](http://localhost:3000).

### Usando Docker

1. Garanta que você tenha **Docker** e **Docker Compose** instalados.
2. Ajuste as variáveis de ambiente em `.env.docker` caso necessário.
3. Construa e suba os serviços:

   ```bash
   docker compose up --build
   ```

   O frontend estará acessível em [http://localhost:3000](http://localhost:3000) e o Postgres em `localhost:5432` (usuário `postgres`, senha `1234`, banco `vaga-signotech`).

4. Para rodar comandos dentro do container da aplicação use, por exemplo:

   ```bash
   docker compose exec app pnpm prisma migrate dev
   docker compose exec app pnpm prisma db seed
   ```

5. Pare os serviços com:

   ```bash
   docker compose down
   ```

### Usuários de teste

- Empresas: `contato@techsolutions.com` e `talentos@inovarh.com` (senha `empresa123`)
- Candidatos: `ana.souza@teste.com`, `bruno.oliveira@teste.com`, `carla.lima@teste.com` (senha `candidato123`)
