<?php

// Importa as classes necessárias para criar e configurar a tabela.
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Classe responsável por criar e remover a tabela de pedidos.
return new class extends Migration
{
    // Esse método é executado quando rodamos o comando php artisan migrate.
    public function up(): void
    {
        // Cria a tabela orders no banco de dados.
        Schema::create('orders', function (Blueprint $table) {

            // Cria o ID do pedido, gerado automaticamente.
            $table->id();

            // Cria o campo customer_id para guardar o ID do cliente relacionado ao pedido.
            $table->foreignId('customer_id')

                // Define que esse campo está relacionado à tabela customers.
                ->constrained('customers')

                // Impede que um cliente seja excluído enquanto possuir pedidos.
                ->restrictOnDelete();

            // Define os possíveis status do pedido.
            // O pedido começa como "open" caso nenhum status seja informado.
            $table->enum('status', ['open', 'paid', 'cancelled'])
                  ->default('open');

            // Cria os campos de data de criação e última atualização.
            $table->timestamps();
        });
    }

    // Esse método é executado quando precisamos desfazer a migration.
    public function down(): void
    {
        // Exclui a tabela orders, caso ela exista.
        Schema::dropIfExists('orders');
    }
};
