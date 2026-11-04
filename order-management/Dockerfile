FROM node:20-alpine

# Instala o wait-for-it e outros utilitários
RUN apk add --no-cache bash curl

WORKDIR /app

# Copia os arquivos de pacotes
COPY backend/package*.json ./

# Instala as dependências
RUN npm ci --only=production

# Copia o código da aplicação sem as dependências locais do host
COPY backend/src ./src
COPY backend/migrations ./migrations
COPY backend/seeders ./seeders
COPY backend/factories ./factories
COPY frontend/public /frontend/public

# Cria um usuário sem privilégios de root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000

CMD ["node", "src/server.js"]
