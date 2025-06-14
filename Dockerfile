FROM php:8.2-cli

# Instala dependências necessárias
RUN apt-get update && apt-get install -y \
    unzip \
    curl \
    git \
    libzip-dev \
    libpq-dev \
    zip \
    && docker-php-ext-configure zip \
    && docker-php-ext-install pdo pdo_pgsql zip

# Instala Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copia os arquivos do Laravel
COPY . /var/www

WORKDIR /var/www

# Instala dependências do Laravel
RUN composer install

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
