FROM node:22-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV DB_STORAGE=/app/data/database.sqlite
EXPOSE 3000

# Aplica migrations e seeds (idempotentes) antes de subir o servidor.
CMD ["sh", "-c", "npm run db:setup && npm start"]
