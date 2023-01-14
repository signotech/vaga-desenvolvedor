FROM composer AS composer
WORKDIR /app
COPY . .
RUN composer install

FROM node:19.4.0-alpine as npm
WORKDIR /app
COPY --from=composer /app .
RUN npm install
RUN npm run build

FROM php:8.1.13-apache AS laravel

ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

RUN a2enmod rewrite headers

RUN docker-php-ext-install pdo_mysql
WORKDIR /var/www/html
COPY --from=npm /app .