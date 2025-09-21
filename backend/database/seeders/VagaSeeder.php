<?php

namespace Database\Seeders;

use App\Models\Vaga;
use Illuminate\Database\Seeder;

class VagaSeeder extends Seeder
{
    public function run(): void
    {
        Vaga::factory()
            ->count(15)
            ->state(fn () => ['status' => fake()->randomElement(['ativa','pausada'])])
            ->create();

        if (! Vaga::where('status', 'ativa')->exists()) {
            Vaga::factory()->create(['status' => 'ativa']);
        }
    }
}
