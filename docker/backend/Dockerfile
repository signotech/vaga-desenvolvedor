FROM php:8.3-fpm

# Dependências de sistema e extensões PHP comuns para Laravel
RUN apt-get update && apt-get install -y \
    git unzip libzip-dev libicu-dev libxml2-dev libonig-dev \
    libpng-dev libjpeg-dev libfreetype6-dev \
 && docker-php-ext-configure gd --with-jpeg --with-freetype \
 && docker-php-ext-install pdo_mysql zip intl bcmath gd opcache \
 && rm -rf /var/lib/apt/lists/*

# Composer (mantemos para você usar manualmente quando quiser)
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY docker/backend/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 9000
