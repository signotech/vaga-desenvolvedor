#!/usr/bin/env bash
set -e

# Pastas essenciais e permissões (sem criar vendor)
mkdir -p storage/framework/{cache,sessions,views} storage/logs bootstrap/cache || true
touch storage/logs/laravel.log || true

# www-data (33) como grupo para evitar problemas de escrita
chgrp -R 33 storage bootstrap || true
chmod -R g+rwX storage bootstrap || true

# Avisos úteis, mas sem fazer nada automaticamente
if [ ! -f "vendor/autoload.php" ]; then
  echo ">> Aviso: vendor/ ausente. Nenhuma instalação automática será feita."
  echo "   Rode manualmente: docker compose exec backend composer install"
fi

if [ ! -f ".env" ]; then
  echo ">> Aviso: .env ausente. Crie manualmente (cp .env.example .env) se necessário."
fi

# Não geramos APP_KEY automaticamente; apenas avisamos
if [ -f ".env" ] && (! grep -q "^APP_KEY=" .env || [ -z "$(grep '^APP_KEY=' .env | cut -d= -f2)" ]); then
  echo ">> Aviso: APP_KEY ausente. Para gerar: docker compose exec backend php artisan key:generate"
fi

exec docker-php-entrypoint php-fpm
