# Vaga desenvolvedor
O projeto foi todo desenvolvido com PHP + Laravel, usando apenas as libs e dependências nativas dos mesmos. 

Ele consiste em um sistema de cadastro de usuários e vagas que contém:
1. CRUD de usuários
2. CRUD de vagas
3. Paginação
4. Filtros
5. Ordenação de resultados

## Requisitos
- php 8.2
- laravel 12.0
- laravel/tinker 2.10.1

Demais requisitos da aplicação estão listados no arquivo composer.json  
As configurações do banco de dados [pgsql] estão no arquivo .env

## Testes
Os testes estão em tests/Feature. Para executá-los, primeiro rode as migrations  
$ php artisan migrate

Depois popule o banco executando  
$ php artisan db:seed 

Por fim execute o comando para rodar todos os testes  
$ php artisan test 

Ou se preferir executar um teste específico  
$ php artisan test --env=testing --filter=nome_do_teste


Para os testes o Laravel 12 usa automaticamente o arquivo .env.testing, que já está configurado, porém é importante confirmar que este é o arquivo que está sendo usado ao executar o teste.


