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
       Schema::create('jobs', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->decimal('salary', 10, 2);
        $table->string('company');
        $table->enum('type', ['CLT', 'PJ', 'Freelance']);
        $table->boolean('paused')->default(false);
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'applications')->withTimestamps();
    }

};
