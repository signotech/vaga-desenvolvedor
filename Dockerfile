FROM php:8.3-apache

# Diretório de trabalho
WORKDIR /var/www/html

# Copiar todo o projeto
COPY . .

# Ativar mod_rewrite
RUN a2enmod rewrite

# Apontar DocumentRoot para a pasta public
RUN sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|' /etc/apache2/sites-available/000-default.conf

# Permitir overrides via .htaccess
RUN echo "<Directory /var/www/html/public>\n    AllowOverride All\n    Require all granted\n</Directory>" >> /etc/apache2/apache2.conf

# Instalar extensões PHP necessárias
RUN apt-get update && apt-get install -y libicu-dev \
    && docker-php-ext-install mysqli pdo pdo_mysql intl

# Ajustar permissões das pastas que o Laravel precisa
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Expor porta 80
EXPOSE 80

# Comando padrão
CMD ["apache2-foreground"]
