FROM php:8.2-fpm-alpine

ENV COMPOSER_ALLOW_SUPERUSER=1 \
    COMPOSER_NO_INTERACTION=1

RUN apk update && apk add --no-cache \
    bash \
    git \
    curl \
    zip \
    unzip \
    libzip-dev \
    oniguruma-dev \
    autoconf \
    gcc \
    g++ \
    make \
    icu-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    freetype-dev \
    postgresql-dev \
    nodejs \
    npm \
    && docker-php-ext-configure gd \
        --with-freetype \
        --with-jpeg \
        --with-webp \
    && docker-php-ext-install -j$(nproc) gd pdo pdo_pgsql mbstring zip bcmath intl pcntl opcache \
    && pecl install xdebug \
    && docker-php-ext-enable xdebug \
    && npm install -g npm@latest \
    && npm cache clean --force

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer

WORKDIR /var/www/html

COPY composer.json composer.lock ./
COPY package.json package-lock.json* ./

RUN composer install --no-dev --optimize-autoloader
RUN npm install
RUN npm run build

COPY . .

RUN chown -R www-data:www-data storage bootstrap/cache
RUN chmod -R 775 storage bootstrap/cache

EXPOSE 9000

CMD ["php-fpm"]
