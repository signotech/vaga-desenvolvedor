<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\OrderStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    public function definition(): array {
        return ['customer_id' => Customer::factory(), 'order_status_id' => OrderStatus::where('slug', 'open')->value('id') ?? 1, 'ordered_at' => fake()->dateTimeBetween('-6 months'), 'discount' => 0];
    }
}
