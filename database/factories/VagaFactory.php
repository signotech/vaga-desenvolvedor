<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vaga>
 */
class VagaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'nome' => fake()->catchPhrase(),
            'descricao' => fake()->text(),
            'tipo' => 'PJ',
            'user_id' => User::factory()->create(['role' => 'empresa'])->id,
            'pausada' => false,
        ];
    }
}
