FROM node:22-bookworm-slim

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./

# Rebuild sqlite3 from source so the native addon matches the image glibc.
RUN npm ci \
  && npm rebuild sqlite3 --build-from-source

COPY .sequelizerc ./
COPY src ./src
COPY database/migrations ./database/migrations
COPY database/seeders ./database/seeders
COPY docker-entrypoint.sh ./docker-entrypoint.sh

RUN chmod +x docker-entrypoint.sh \
  && mkdir -p /app/data

ENV NODE_ENV=production
ENV PORT=3000
ENV DB_STORAGE=/app/data/database.sqlite

EXPOSE 3000

ENTRYPOINT ["./docker-entrypoint.sh"]
