<?php

// Importa as classes que vamos utilizar para criar a tabela.
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Classe responsável por criar e remover a tabela de produtos.
return new class extends Migration
{
    // Esse método é executado quando rodamos o comando php artisan migrate.
    public function up(): void
    {
        // Cria a tabela products no banco de dados.
        Schema::create('products', function (Blueprint $table) {

            // Cria o ID do produto, gerado automaticamente.
            $table->id();

            // Armazena o nome do produto.
            $table->string('name');

            // Armazena a descrição do produto. Esse campo pode ficar vazio.
            $table->text('description')->nullable();

            // Armazena o preço com até 10 dígitos, sendo 2 casas decimais.
            $table->decimal('price', 10, 2);

            // Cria os campos de data de criação e última atualização.
            $table->timestamps();
        });
    }

    // Esse método é executado quando precisamos desfazer a migration.
    public function down(): void
    {
        // Exclui a tabela products, caso ela exista.
        Schema::dropIfExists('products');
    }
};
