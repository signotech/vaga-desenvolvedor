<?php

namespace Tests\Feature;

use App\Models\Cliente;
use App\Models\ItemPedido;
use App\Models\Pedido;
use App\Models\Produto;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PedidoTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->actingAs(User::factory()->create());
    }

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

    public function test_aplica_desconto_no_total_do_pedido(): void
    {
        $this->post('/pedidos', $this->dados(['desconto' => 20]))->assertRedirect('/pedidos');

        $pedido = Pedido::with('itens')->first();
        $this->assertSame(30.0, $pedido->subtotal);
        $this->assertSame(24.0, $pedido->total);

        $this->get("/pedidos/{$pedido->id}")->assertOk()->assertSee('20,00%')->assertSee('24,00');
    }

    public function test_desconto_e_opcional_e_assume_zero(): void
    {
        $this->post('/pedidos', $this->dados())->assertRedirect('/pedidos');

        $this->assertSame(30.0, Pedido::with('itens')->first()->total);
    }

    public function test_rejeita_desconto_negativo_ou_acima_de_100(): void
    {
        $this->post('/pedidos', $this->dados(['desconto' => -1]))->assertSessionHasErrors('desconto');
        $this->post('/pedidos', $this->dados(['desconto' => 100.5]))->assertSessionHasErrors('desconto');
        $this->assertSame(0, Pedido::count());
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

    public function test_filtro_de_id_e_exato(): void
    {
        Pedido::factory(21)->create();

        $this->get('/pedidos?id=1')->assertOk()
            ->assertViewHas('pedidos', fn ($l) => $l->pluck('id')->all() === [1]);
        $this->get('/pedidos?id=abc')->assertOk()
            ->assertViewHas('pedidos', fn ($l) => $l->count() === 0);
    }

    private function pedidoComTotal(float $preco, int $quantidade, float $desconto = 0): Pedido
    {
        $pedido = Pedido::factory()->create(['desconto' => $desconto]);
        ItemPedido::factory()->create(['pedido_id' => $pedido->id, 'quantidade' => $quantidade, 'preco_unitario' => $preco]);

        return $pedido;
    }

    public function test_filtra_por_desconto_exato(): void
    {
        $a = $this->pedidoComTotal(10, 1, 10);
        $this->pedidoComTotal(10, 1, 5);

        $this->get('/pedidos?desconto=10')->assertOk()
            ->assertViewHas('pedidos', fn ($l) => $l->pluck('id')->all() === [$a->id]);
        $this->get('/pedidos?desconto=abc')->assertOk()
            ->assertViewHas('pedidos', fn ($l) => $l->count() === 0);
    }

    public function test_filtra_por_total_exato_com_e_sem_desconto(): void
    {
        $sem = $this->pedidoComTotal(10, 3);
        $com = $this->pedidoComTotal(50, 2, 10);
        $this->pedidoComTotal(7, 1);

        $this->get('/pedidos?total=30')->assertOk()
            ->assertViewHas('pedidos', fn ($l) => $l->pluck('id')->all() === [$sem->id] && $l->first()->total === 30.0);
        $this->get('/pedidos?total=90.00')->assertOk()
            ->assertViewHas('pedidos', fn ($l) => $l->pluck('id')->all() === [$com->id] && $l->first()->total === 90.0);
        $this->get('/pedidos?total=abc')->assertOk()
            ->assertViewHas('pedidos', fn ($l) => $l->count() === 0);
    }

    public function test_ordena_por_total_e_por_desconto(): void
    {
        $a = $this->pedidoComTotal(10, 3, 0);
        $b = $this->pedidoComTotal(50, 2, 10);
        $c = $this->pedidoComTotal(7, 1, 50);

        $this->get('/pedidos?ordem=total&direcao=asc')
            ->assertViewHas('pedidos', fn ($l) => $l->pluck('id')->all() === [$c->id, $a->id, $b->id]);
        $this->get('/pedidos?ordem=total&direcao=desc')
            ->assertViewHas('pedidos', fn ($l) => $l->pluck('id')->all() === [$b->id, $a->id, $c->id]);
        $this->get('/pedidos?ordem=desconto&direcao=asc')
            ->assertViewHas('pedidos', fn ($l) => $l->pluck('id')->all() === [$a->id, $b->id, $c->id]);
        $this->get('/pedidos?ordem=desconto&direcao=desc')
            ->assertViewHas('pedidos', fn ($l) => $l->pluck('id')->all() === [$c->id, $b->id, $a->id]);
    }

    public function test_fuso_padrao_e_sao_paulo(): void
    {
        $this->assertSame('America/Sao_Paulo', config('app.timezone'));
    }

    public function test_novo_pedido_sugere_a_hora_de_sao_paulo(): void
    {
        $this->travelTo(now()->setTimezone('America/Sao_Paulo')->setDate(2026, 11, 2)->setTime(23, 30));

        $this->get('/pedidos/create')->assertSee('value="2026-11-02T23:30"', false);
    }

    public function test_hora_do_pedido_nao_desloca_ao_salvar_e_reabrir(): void
    {
        $this->post('/pedidos', $this->dados(['data_pedido' => '2026-11-02 23:30']))->assertRedirect('/pedidos');
        $pedido = Pedido::first();

        $this->get('/pedidos')->assertSee('02/11/2026 23:30');
        $this->get("/pedidos/{$pedido->id}")->assertSee('02/11/2026 23:30');
        $this->get("/pedidos/{$pedido->id}/edit")->assertSee('value="2026-11-02T23:30"', false);
    }

    public function test_filtro_por_data_acha_pedido_perto_da_meia_noite(): void
    {
        $this->post('/pedidos', $this->dados(['data_pedido' => '2026-11-02 23:30']));

        $this->get('/pedidos?data_pedido=2026-11-02')->assertViewHas('pedidos', fn ($p) => $p->count() === 1);
        $this->get('/pedidos?data_pedido=2026-11-03')->assertViewHas('pedidos', fn ($p) => $p->count() === 0);
    }
}
