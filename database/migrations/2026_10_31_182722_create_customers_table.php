<?php

// Importa as classes que usamos para criar e configurar a tabela no banco.
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Classe responsável por criar e remover a tabela de clientes.
return new class extends Migration
{
    // Esse método é executado quando rodamos o comando php artisan migrate.
    public function up(): void
    {
        // Cria a tabela customers no banco de dados.
        Schema::create('customers', function (Blueprint $table) {

            // Cria o ID do cliente, que será gerado automaticamente.
            $table->id();

            // Guarda o nome do cliente.
            $table->string('name');

            // Guarda o e-mail do cliente e não permite e-mails repetidos.
            $table->string('email')->unique();

            // Guarda o telefone. O campo pode ficar vazio caso não seja informado.
            $table->string('phone')->nullable();

            // Cria os campos created_at e updated_at para registrar as datas.
            $table->timestamps();
        });
    }

    // Esse método é executado caso seja necessário desfazer essa migration.
    public function down(): void
    {
        // Remove a tabela customers do banco, caso ela exista.
        Schema::dropIfExists('customers');
    }
};
