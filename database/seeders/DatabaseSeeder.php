<?php

namespace Database\Seeders;

use App\Models\Cliente;
use App\Models\Produto;
use App\Models\Pedido;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        // Cria clientes
        Cliente::factory(50)->create();

        // Cria produtos
        Produto::factory(50)->create();

        // Cria pedidos e associa produtos
        Pedido::factory(100)->create()->each(function($pedido) {
            // Pega entre 1 e 5 produtos aleatórios
            $produtos = Produto::inRandomOrder()->take(rand(1,5))->get();

            $sync = [];
            foreach($produtos as $produto) {
                $sync[$produto->id] = [
                    'quantidade' => rand(1,5),
                    'preco_unitario' => $produto->preco
                ];
            }

            $pedido->produtos()->attach($sync);
        });
    }
}
