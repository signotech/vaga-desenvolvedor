<?php

namespace Tests\Feature;

use App\Models\Cliente;
use App\Models\ItemPedido;
use App\Models\Pedido;
use App\Models\Produto;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SeederTest extends TestCase
{
    use RefreshDatabase;

    public function test_factory_do_item_usa_pedido_e_produto_informados(): void
    {
        $pedido = Pedido::factory()->create();
        $produto = Produto::factory()->create();

        $item = ItemPedido::factory()->create([
            'pedido_id' => $pedido->id,
            'produto_id' => $produto->id,
        ]);

        $this->assertSame(1, Produto::count());
        $this->assertSame(1, Pedido::count());
        $this->assertEquals($produto->preco, $item->preco_unitario);
    }

    public function test_seeder_popula_o_banco_conforme_o_enunciado(): void
    {
        $this->seed();

        $this->assertSame(1, User::count());
        $this->assertSame(30, Cliente::count());
        $this->assertSame(40, Produto::count());
        $this->assertSame(50, Pedido::count());

        foreach (Pedido::with('itens.produto')->get() as $pedido) {
            $ids = $pedido->itens->pluck('produto_id');

            $this->assertGreaterThanOrEqual(1, $ids->count());
            $this->assertLessThanOrEqual(4, $ids->count());
            $this->assertSame($ids->count(), $ids->unique()->count());

            foreach ($pedido->itens as $item) {
                $this->assertEquals($item->produto->preco, $item->preco_unitario);
            }
        }
    }
}
