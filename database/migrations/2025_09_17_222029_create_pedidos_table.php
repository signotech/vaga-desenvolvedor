<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pedidos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cliente_id')->constrained()->onDelete('cascade');
            $table->dateTime('data_pedido');
            $table->enum('status', ['Em Aberto','Pago','Cancelado'])->default('Em Aberto');
            $table->timestamps();
        });
    }
};
