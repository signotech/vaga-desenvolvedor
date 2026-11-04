<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('orders', function (Blueprint $table) {
            $table->id(); $table->foreignId('customer_id')->constrained()->restrictOnDelete();
            $table->foreignId('order_status_id')->constrained()->restrictOnDelete();
            $table->dateTime('ordered_at'); $table->decimal('discount', 10, 2)->default(0); $table->timestamps();
            $table->index(['customer_id', 'ordered_at']);
        });
    }
    public function down(): void { Schema::dropIfExists('orders'); }
};
