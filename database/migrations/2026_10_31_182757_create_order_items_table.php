<?php

// Importa as classes necessárias para criar e configurar a tabela.
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Classe responsável por criar e remover a tabela de itens dos pedidos.
return new class extends Migration
{
    // Esse método é executado quando rodamos o comando php artisan migrate.
    public function up(): void
    {
        // Cria a tabela order_items no banco de dados.
        Schema::create('order_items', function (Blueprint $table) {

            // Cria o ID de cada item do pedido.
            $table->id();

            // Cria o campo que identifica a qual pedido esse item pertence.
            $table->foreignId('order_id')

                // Define o relacionamento com a tabela orders.
                ->constrained('orders')

                // Se um pedido for excluído, seus itens também serão excluídos.
                ->cascadeOnDelete();

            // Cria o campo que identifica qual produto está no pedido.
            $table->foreignId('product_id')

                // Define o relacionamento com a tabela products.
                ->constrained('products')

                // Impede a exclusão de um produto que já esteja em algum pedido.
                ->restrictOnDelete();

            // Armazena a quantidade desse produto no pedido.
            $table->integer('quantity');

            // Armazena o preço do produto no momento em que ele foi incluído no pedido.
            $table->decimal('unit_price', 10, 2);

            // Cria os campos de data de criação e última atualização.
            $table->timestamps();
        });
    }

    // Esse método é executado quando precisamos desfazer a migration.
    public function down(): void
    {
        // Exclui a tabela order_items, caso ela exista.
        Schema::dropIfExists('order_items');
    }
};
