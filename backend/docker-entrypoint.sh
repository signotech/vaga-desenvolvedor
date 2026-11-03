#!/bin/sh
set -e

mkdir -p /app/data

echo "Running migrations..."
npx sequelize-cli db:migrate

if [ ! -f /app/data/.seeded ]; then
  echo "Seeding database..."
  npx sequelize-cli db:seed:all
  touch /app/data/.seeded
fi

# Volumes seeded before the usuarios migration still need the demo admin.
echo "Ensuring demo admin..."
node src/scripts/ensure-admin.js

echo "Starting API on port ${PORT:-3000}..."
exec node src/server.js
