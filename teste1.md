<div align="center">
  <img src="https://signotech.com.br/assets/images/logo-preta.png" width="20%" />
</div>

## Entrega

- Para iniciar o teste, faça um fork deste repositório; **Se você apenas clonar o repositório não vai conseguir fazer push.**
- Crie uma branch com o seu nome completo;
- Altere o arquivo teste1.md com as informações necessárias para executar o seu teste (comandos, migrations, seeds, etc);
- Depois de finalizado, envie-nos o pull request;


## Step by step de como começar:                :D

- Configure, se necessário, a pasta .env com o id de seu HOST;
- Tenha uma pasta chamada "teste1" em seu banco de dados;
- Em seu terminal:
  - Escreva: 
      cd signo
      php artisan migrate
      php artisan db:seed ClienteSeeder
      php artisan db:seed ProdutoSeeder
      php artisan db:seed PedidoSeeder
      php artisan serve

- Acesse o link que aparecer no terminal.
