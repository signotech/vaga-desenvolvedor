<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Estes registros são fictícios e servem para deixar o sistema preenchido durante a demonstração.
        // Primeiro criamos clientes e produtos, pois os pedidos precisam estar ligados a eles.
        $clientes = Customer::factory(25)->create();
        $produtos = Product::factory(30)->create();

        // Depois criamos 30 pedidos com clientes e produtos aleatórios.
        for ($numero = 1; $numero <= 30; $numero++) {
            $pedido = Order::create([
                'customer_id' => $clientes->random()->id,
                'status' => fake()->randomElement([
                    'open',
                    'paid',
                    'cancelled',
                ]),
            ]);

            // Cada pedido recebe de 1 a 4 produtos diferentes, escolhidos aleatoriamente.
            $produtosDoPedido = $produtos->shuffle()->take(rand(1, 4));

            foreach ($produtosDoPedido as $produto) {
                $pedido->orderItems()->create([
                    'product_id' => $produto->id,
                    'quantity' => rand(1, 5),
                    // Guardamos também o preço atual para manter o valor da compra registrado no pedido.
                    'unit_price' => $produto->price,
                ]);
            }
        }
    }
}
