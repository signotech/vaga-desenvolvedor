<?php

namespace Database\Seeders;

use App\Models\Pedido;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PedidoSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        Pedido::factory()->count(40)->create();
    }
}
