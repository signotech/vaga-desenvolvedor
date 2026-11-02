#!/bin/sh
set -e

echo "Aplicando migrations..."
npx sequelize-cli db:migrate

echo "Executando seeds (idempotentes)..."
npx sequelize-cli db:seed:all

echo "Iniciando aplicação..."
exec "$@"
