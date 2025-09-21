<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
    Schema::create('vagas', function (Blueprint $table) {
        $table->id();
        $table->string('titulo');
        $table->enum('tipo', ['CLT', 'PJ', 'Freelancer']);
        $table->enum('status', ['ativa', 'pausada'])->default('ativa');
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vagas');
    }
};
