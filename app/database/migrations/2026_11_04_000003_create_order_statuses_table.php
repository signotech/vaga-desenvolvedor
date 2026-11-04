<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('order_statuses', function (Blueprint $table) {
            $table->id(); $table->string('name', 40)->unique(); $table->string('slug', 40)->unique(); $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('order_statuses'); }
};
