<?php

namespace Database\Seeders;

use App\Models\Produto;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProdutoSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        Produto::factory()->count(200)->create();
    }
}
