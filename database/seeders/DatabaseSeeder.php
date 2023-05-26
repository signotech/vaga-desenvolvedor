<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Listing;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();
        $admin = User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@mail.com',
            'role' => 'admin',
            'password' => Hash::make('123456')
        ]);

        $candidate = User::factory()->create([
            'name' => 'Candidato',
            'email' => 'candidato@mail.com',
            'role' => 'candidate',
            'password' => Hash::make('123456')
        ]);

        $employer = User::factory()->create([
            'name' => 'Empregador',
            'email' => 'empregador@mail.com',
            'role' => 'employer',
            'password' => Hash::make('123456')
        ]);

        User::factory(100)->create([
            'role' => 'candidate',
            'password' => Hash::make('123456')
        ]);

        Listing::factory(100)->create([
            'user_id' => $employer->id
        ]);
    }
}
