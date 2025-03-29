<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration { 
    /**
     * Run the migrations.
     */
    public function up(): void {

        $statusPedido = ['Em Aberto', 'Pago', 'Cancelado'];

        Schema::create('pedidos', function (Blueprint $table) use ($statusPedido) {
            $table->id()->autoIncrement();
            $table->foreignId('cliente_id')->constrained('clientes')->onDelete('cascade');
            $table->enum('status', $statusPedido)->default('Em Aberto');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('pedidos');
    }
};
