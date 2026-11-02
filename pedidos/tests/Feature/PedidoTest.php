<?php

namespace Tests\Feature;

use App\Models\Cliente;
use App\Models\ItemPedido;
use App\Models\Pedido;
use App\Models\Produto;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PedidoTest extends TestCase
{
    use RefreshDatabase;

    private function dados(array $extra = []): array
    {
        $produto = Produto::factory()->create(['preco' => 10]);

        return array_merge([
            'cliente_id' => Cliente::factory()->create()->id,
            'data_pedido' => '2026-11-02T10:00',
            'status' => 'Em Aberto',
            'itens' => [['produto_id' => $produto->id, 'quantidade' => 3]],
        ], $extra);
    }

    public function test_lista_com_paginacao_de_20_itens(): void
    {
        Pedido::factory(25)->create();

        $this->get('/pedidos')->assertOk()->assertViewHas('pedidos', fn ($p) => $p->count() === 20);
    }

    public function test_filtra_por_status_e_por_cliente(): void
    {
        Pedido::factory()->create(['status' => 'Pago', 'cliente_id' => Cliente::factory()->create(['nome' => 'Joana'])->id]);
        Pedido::factory()->create(['status' => 'Cancelado']);

        $this->get('/pedidos?status=Pago')->assertViewHas('pedidos', fn ($p) => $p->count() === 1);
        $this->get('/pedidos?cliente=Joana')->assertViewHas('pedidos', fn ($p) => $p->count() === 1);
    }

    public function test_cria_pedido_com_itens_e_guarda_o_preco_do_produto(): void
    {
        $dados = $this->dados();

        $this->post('/pedidos', $dados)->assertRedirect('/pedidos');

        $pedido = Pedido::with('itens')->first();
        $this->assertSame(30.0, (float) $pedido->total);

        // mudar o preço depois não altera o pedido
        Produto::query()->update(['preco' => 99]);
        $this->assertSame(30.0, (float) $pedido->fresh('itens')->total);
    }

    public function test_exige_ao_menos_um_item_e_status_valido(): void
    {
        $this->post('/pedidos', $this->dados(['itens' => [], 'status' => 'Qualquer']))
            ->assertSessionHasErrors(['itens', 'status']);
    }

    public function test_atualiza_pedido_trocando_os_itens(): void
    {
        $pedido = Pedido::factory()->create();
        ItemPedido::factory()->create(['pedido_id' => $pedido->id]);

        $dados = $this->dados(['cliente_id' => $pedido->cliente_id, 'status' => 'Pago']);
        $this->put("/pedidos/{$pedido->id}", $dados)->assertRedirect('/pedidos');

        $pedido->refresh();
        $this->assertSame('Pago', $pedido->status);
        $this->assertCount(1, $pedido->itens);
    }

    public function test_exibe_detalhe_do_pedido(): void
    {
        $item = ItemPedido::factory()->create();

        $this->get("/pedidos/{$item->pedido_id}")->assertOk()->assertSee($item->produto->titulo);
    }

    public function test_exclui_pedido_e_seus_itens(): void
    {
        $item = ItemPedido::factory()->create();

        $this->delete("/pedidos/{$item->pedido_id}")->assertRedirect('/pedidos');

        $this->assertDatabaseMissing('pedidos', ['id' => $item->pedido_id]);
        $this->assertDatabaseMissing('item_pedidos', ['id' => $item->id]);
    }

    public function test_exclusao_em_massa(): void
    {
        $pedidos = Pedido::factory(3)->create();

        $this->delete('/pedidos', ['ids' => $pedidos->take(2)->pluck('id')->all()])->assertSessionHas('ok');

        $this->assertDatabaseCount('pedidos', 1);
    }
}
