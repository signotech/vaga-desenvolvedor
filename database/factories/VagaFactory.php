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
    public function definition(): array
    {
        return [
            'titulo' => $this->faker->jobTitle(),
            'regime' => $this->faker->randomElement(['CLT', 'PJ', 'Freelancer']),
            'tipo' => $this->faker->randomElement(['Presencial', 'Híbrido', 'Remoto']),
            'descricao' => $this->faker->paragraphs(2, true),
            'requisitos' => $this->faker->paragraphs(3, true),
            'status' => $this->faker->boolean(70),
        ];
    }
}
