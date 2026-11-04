<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('products', function (Blueprint $table) {
            $table->id(); $table->string('sku', 100)->unique(); $table->string('title', 150);
            $table->text('description')->nullable(); $table->decimal('price', 10, 2); $table->unsignedInteger('stock')->default(0); $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('products'); }
};
