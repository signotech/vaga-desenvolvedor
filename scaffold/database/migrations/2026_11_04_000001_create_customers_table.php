<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('customers', function (Blueprint $table) {
            $table->id(); $table->string('name', 150); $table->char('cpf', 11)->nullable()->unique();
            $table->string('email')->unique(); $table->string('phone', 30)->nullable(); $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('customers'); }
};
