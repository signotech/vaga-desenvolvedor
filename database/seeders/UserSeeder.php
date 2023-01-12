<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Vaga;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory(10)->has(Vaga::factory()->count(3))->create();
        User::factory()->create(['email' => 'candidato@gmail.com']);
        User::factory()->create(['email' => 'empresa@gmail.com', 'role' => 'empresa']);
        User::factory()->create(['email' => 'admin@gmail.com', 'role' => 'admin']);
    }
}
