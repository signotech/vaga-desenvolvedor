FROM mcr.microsoft.com/playwright:v1.64.1-jammy

WORKDIR /app

USER root

RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
COPY backend/package.json backend/package-lock.json ./backend/
COPY frontend/package.json frontend/package-lock.json ./frontend/

RUN npm ci \
  && npm ci --prefix backend \
  && npm rebuild --prefix backend sqlite3 --build-from-source \
  && npm ci --prefix frontend

COPY playwright.config.ts ./
COPY e2e ./e2e
COPY backend ./backend
COPY frontend ./frontend

ENV CI=true
ENV NODE_ENV=development

CMD ["npx", "playwright", "test"]
