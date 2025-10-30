<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

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
    public function definition(): array {
        return [
            'titulo' => $this->faker->jobTitle(),
            'descricao' => $this->faker->paragraph(),
            'tipo' => $this->faker->randomElement(['clt', 'pj', 'freelancer']),
            'status' => $this->faker->randomElement(['ativa', 'pausada']),
        ];
    }
}
