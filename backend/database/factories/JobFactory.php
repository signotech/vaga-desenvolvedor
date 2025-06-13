<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Job>
 */
class jobFactory extends Factory
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
            'salary' => $this->faker->randomFloat(2, 1500, 15000),
            'company' => $this->faker->company(),
            'type' => $this->faker->randomElement(['CLT', 'PJ', 'Freelance']),
            'paused' => $this->faker->boolean(20),
        ];
    }
}
