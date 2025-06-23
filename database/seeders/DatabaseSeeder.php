<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->count(2)->create([
            'role' => 'admin'
        ]);

        User::factory()->count(3)->create([
            'role' => 'moderator'
        ]);

        User::factory()->count(78)->create([
            'role' => 'user'
        ]);

        $this->call([
            PositionsTableSeeder::class,
        ]);
    }
}


