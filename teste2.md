# Vaga desenvolvedor
O projeto foi todo desenvolvido com PHP + Laravel, usando apenas as libs e dependências nativas dos mesmos. 

## Requisitos
- php 8.2
- laravel 12.0
- laravel/tinker 2.10.1

Demais requisitos da aplicação estão listados no arquivo composer.json  
As configurações do banco de dados [pgsql] estão no arquivo .env

## Testes
Para a execução dos testes, primeiro rode as migrations  
$ php artisan migrate

Depois popule o banco executando  
$ php artisan db:seed  

Para os testes o Laravel 12 usa automaticamente o arquivo .env.testing, que já está configurado, porém é importante confirmar que este é o arquivo que está sendo usado ao executar o teste.


