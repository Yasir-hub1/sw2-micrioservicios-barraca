# Usa la imagen base de PHP 8.1.9 con FPM y Alpine
FROM php:8.1.9-fpm-alpine

# Actualiza los paquetes y añade dependencias necesarias
RUN apk --no-cache upgrade && \
    apk --no-cache add bash git sudo openssh libxml2-dev oniguruma-dev autoconf gcc g++ make npm freetype-dev libjpeg-turbo-dev libpng-dev

# PHP: Instalar extensiones php
RUN pecl channel-update pecl.php.net
RUN pecl install pcov xdebug swoole
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install gd zip sockets pcntl pdo pdo_mysql bcmath soap
RUN docker-php-ext-enable mongodb xdebug pcov gd zip sockets pcntl bcmath pdo pdo_mysql soap swoole

# Instalar Composer
RUN curl -sS https://getcomposer.org/installer | php -- \
    --install-dir=/usr/local/bin --filename=composer

# Copia Composer y RoadRunner desde imágenes separadas
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
COPY --from=spiralscout/roadrunner:2.4.2 /usr/bin/rr /usr/bin/rr

# Establece el directorio de trabajo y copia el contenido del proyecto
WORKDIR /app
COPY . .

# Instala dependencias de PHP y JavaScript
RUN composer install
RUN composer require laravel/octane spiral/roadrunner
RUN npm install --global yarn
RUN yarn
RUN yarn prod

# Configura Laravel y Octane
RUN php artisan key:generate
RUN php artisan octane:install --server="swoole"
RUN php artisan octane:start --server="swoole" --host="0.0.0.0"

# Comando por defecto al iniciar el contenedor
CMD php artisan octane:start --server="swoole" --host="0.0.0.0"

# Expone el puerto 8000
EXPOSE 8000
