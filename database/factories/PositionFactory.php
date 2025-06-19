<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Position>
 */
class PositionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->jobTitle(),
            'contract' => $this->faker->randomElement(['CLT', 'PJ', 'Freelancer']),
            'type' => $this->faker->randomElement(['Presencial', 'Híbrido', 'Remoto']),
            'description' => $this->faker->paragraphs(2, true),
            'requirements' => $this->faker->paragraphs(3, true),
            'status' => $this->faker->boolean(70),
        ];
    }
}
