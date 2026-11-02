<?php

namespace Tests\Unit;

use App\Models\ItemPedido;
use App\Models\Pedido;
use PHPUnit\Framework\TestCase;

class PedidoTotalTest extends TestCase
{
    private function pedidoComItens(float $desconto): Pedido
    {
        $pedido = new Pedido(['desconto' => $desconto]);
        $pedido->setRelation('itens', collect([
            new ItemPedido(['quantidade' => 2, 'preco_unitario' => 10]),
            new ItemPedido(['quantidade' => 1, 'preco_unitario' => 5]),
        ]));

        return $pedido;
    }

    public function test_subtotal_soma_quantidade_vezes_preco(): void
    {
        $this->assertSame(25.0, $this->pedidoComItens(0)->subtotal);
    }

    public function test_total_aplica_o_desconto_em_percentual(): void
    {
        $this->assertSame(20.0, $this->pedidoComItens(20)->total);
    }

    public function test_total_sem_desconto_e_igual_ao_subtotal(): void
    {
        $this->assertSame(25.0, $this->pedidoComItens(0)->total);
    }
}
