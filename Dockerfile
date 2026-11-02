FROM node:24-alpine AS deps

WORKDIR /app

# sqlite3 pode precisar compilar nativamente no Alpine (musl).
RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json .sequelizerc ./
RUN npm ci

FROM node:24-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/package-lock.json ./package-lock.json
COPY --from=deps /app/.sequelizerc ./.sequelizerc

COPY src ./src
COPY public ./public
COPY docker-entrypoint.sh ./docker-entrypoint.sh

RUN chmod +x ./docker-entrypoint.sh && mkdir -p /app/data

EXPOSE 3000

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["npm", "start"]
