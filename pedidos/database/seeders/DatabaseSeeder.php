<?php

namespace Database\Seeders;

use App\Models\Cliente;
use App\Models\ItemPedido;
use App\Models\Pedido;
use App\Models\Produto;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Administrador',
            'email' => 'admin@exemplo.com',
            'password' => 'senha1234',
        ]);

        $clientes = Cliente::factory(30)->create();
        $produtos = Produto::factory(40)->create();

        foreach (range(1, 50) as $i) {
            $pedido = Pedido::factory()->create(['cliente_id' => $clientes->random()->id]);

            foreach ($produtos->random(rand(1, 4)) as $produto) {
                ItemPedido::factory()->create([
                    'pedido_id' => $pedido->id,
                    'produto_id' => $produto->id,
                ]);
            }
        }
    }
}
