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
        Schema::table('users', function(Blueprint $table) {
            $table->dropColumn('id');
        });

        Schema::table('users', function(Blueprint $table) {
            $table->uuid('id')->primary();
            $table->enum('role', ['user', 'admin', 'moderator'])->default('user')->after('emmail');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function(Blueprint $table) {
            $table->bigIncrements('id')->primary()->change();
            $table->dropColumn('role');
        });
    }
};
