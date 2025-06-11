<?php

namespace Database\Seeders;
use App\Models\User;
use App\Models\Job;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Job::factory(10)->create();

        User::factory()->count(10)->create([
            'user_type' => 1,
        ]);

        User::factory()->count(2)->create([
            'user_type' => 2,
        ]);
    }
}
