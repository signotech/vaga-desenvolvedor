<?php

namespace Database\Seeders;

use App\Models\Cliente;
use App\Models\ItemPedido;
use App\Models\Pedido;
use App\Models\Produto;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $clientes = Cliente::factory(30)->create();
        $produtos = Produto::factory(40)->create();

        foreach (range(1, 50) as $i) {
            $pedido = Pedido::factory()->create(['cliente_id' => $clientes->random()->id]);

            foreach ($produtos->random(rand(1, 4)) as $produto) {
                ItemPedido::create([
                    'pedido_id' => $pedido->id,
                    'produto_id' => $produto->id,
                    'quantidade' => rand(1, 5),
                    'preco_unitario' => $produto->preco,
                ]);
            }
        }
    }
}
