<?php

namespace Tests\Feature\Api;

use App\Models\Cliente;
use App\Models\ItemPedido;
use App\Models\Pedido;
use App\Models\Produto;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PedidoApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        User::factory()->create(['email' => 'api@exemplo.com', 'password' => 'senha1234']);
        $this->withHeader('Authorization', 'Basic '.base64_encode('api@exemplo.com:senha1234'));
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

    public function test_lista_paginada_com_cliente_e_itens(): void
    {
        ItemPedido::factory()->create();
        Pedido::factory(24)->create();

        $this->getJson('/api/pedidos')->assertOk()
            ->assertJsonCount(20, 'data')
            ->assertJsonPath('meta.total', 25)
            ->assertJsonStructure(['data' => [['id', 'cliente' => ['id', 'nome'], 'itens', 'subtotal', 'desconto', 'total']]]);
        $this->getJson('/api/pedidos?por_pagina=100')->assertJsonCount(25, 'data');
    }

    public function test_filtra_por_id_cliente_data_e_status(): void
    {
        $joana = Cliente::factory()->create(['nome' => 'Joana']);
        $alvo = Pedido::factory()->create(['cliente_id' => $joana->id, 'status' => 'Pago', 'data_pedido' => '2026-05-10 09:00:00']);
        Pedido::factory()->create(['status' => 'Cancelado', 'data_pedido' => '2026-06-01 09:00:00']);

        $this->getJson('/api/pedidos?status=Pago')->assertJsonCount(1, 'data');
        $this->getJson('/api/pedidos?cliente=Joa')->assertJsonCount(1, 'data');
        $this->getJson('/api/pedidos?data_pedido=2026-05-10')->assertJsonPath('data.0.id', $alvo->id);
        $this->getJson("/api/pedidos?id={$alvo->id}")->assertJsonCount(1, 'data');
    }

    public function test_ordena_por_cliente(): void
    {
        Pedido::factory()->create(['cliente_id' => Cliente::factory()->create(['nome' => 'Bruno'])->id]);
        Pedido::factory()->create(['cliente_id' => Cliente::factory()->create(['nome' => 'Ana'])->id]);

        $this->getJson('/api/pedidos?ordem=cliente&direcao=asc')
            ->assertJsonPath('data.*.cliente.nome', ['Ana', 'Bruno']);
    }

    public function test_cria_pedido_com_itens_e_desconto(): void
    {
        $this->postJson('/api/pedidos', $this->dados(['desconto' => 20]))
            ->assertCreated()
            ->assertJsonPath('data.subtotal', 30)
            ->assertJsonPath('data.desconto', 20)
            ->assertJsonPath('data.total', 24)
            ->assertJsonPath('data.itens.0.preco_unitario', 10)
            ->assertJsonStructure(['data' => ['cliente' => ['nome'], 'itens' => [['produto' => ['titulo']]]]]);
    }

    public function test_valida_com_422(): void
    {
        $this->postJson('/api/pedidos', $this->dados(['itens' => [], 'status' => 'Qualquer', 'desconto' => 101]))
            ->assertStatus(422)
            ->assertJsonValidationErrors(['itens', 'status', 'desconto']);
        $this->assertDatabaseCount('pedidos', 0);
    }

    public function test_mostra_atualiza_e_exclui(): void
    {
        $pedido = Pedido::factory()->create();
        ItemPedido::factory()->create(['pedido_id' => $pedido->id]);

        $this->getJson("/api/pedidos/{$pedido->id}")->assertOk()->assertJsonPath('data.id', $pedido->id);

        $this->putJson("/api/pedidos/{$pedido->id}", $this->dados(['cliente_id' => $pedido->cliente_id, 'status' => 'Pago']))
            ->assertOk()
            ->assertJsonPath('data.status', 'Pago')
            ->assertJsonCount(1, 'data.itens');

        $this->deleteJson("/api/pedidos/{$pedido->id}")->assertNoContent();
        $this->getJson("/api/pedidos/{$pedido->id}")->assertNotFound();
    }

    public function test_exclusao_em_massa(): void
    {
        $pedidos = Pedido::factory(3)->create();

        $this->deleteJson('/api/pedidos', ['ids' => $pedidos->take(2)->pluck('id')->all()])
            ->assertOk()
            ->assertExactJson(['excluidos' => 2, 'ignorados' => 0]);

        $this->assertDatabaseCount('pedidos', 1);
    }

    public function test_filtro_de_id_e_exato(): void
    {
        Pedido::factory(21)->create();

        $this->getJson('/api/pedidos?id=1')->assertOk()
            ->assertJsonPath('data.*.id', [1]);
        $this->getJson('/api/pedidos?id=abc')->assertOk()->assertJsonCount(0, 'data');
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

        $this->getJson('/api/pedidos?desconto=10')->assertOk()
            ->assertJsonPath('data.*.id', [$a->id]);
        $this->getJson('/api/pedidos?desconto=abc')->assertOk()
            ->assertJsonCount(0, 'data');
    }

    public function test_filtra_por_total_exato_com_e_sem_desconto(): void
    {
        $sem = $this->pedidoComTotal(10, 3);
        $com = $this->pedidoComTotal(50, 2, 10);
        $this->pedidoComTotal(7, 1);

        $this->getJson('/api/pedidos?total=30')->assertOk()
            ->assertJsonPath('data.*.id', [$sem->id])->assertJsonPath('data.0.total', 30);
        $this->getJson('/api/pedidos?total=90.00')->assertOk()
            ->assertJsonPath('data.*.id', [$com->id])->assertJsonPath('data.0.total', 90);
        $this->getJson('/api/pedidos?total=abc')->assertOk()
            ->assertJsonCount(0, 'data');
    }

    public function test_ordena_por_total_e_por_desconto(): void
    {
        $a = $this->pedidoComTotal(10, 3, 0);
        $b = $this->pedidoComTotal(50, 2, 10);
        $c = $this->pedidoComTotal(7, 1, 50);

        $this->getJson('/api/pedidos?ordem=total&direcao=asc')
            ->assertJsonPath('data.*.id', [$c->id, $a->id, $b->id]);
        $this->getJson('/api/pedidos?ordem=total&direcao=desc')
            ->assertJsonPath('data.*.id', [$b->id, $a->id, $c->id]);
        $this->getJson('/api/pedidos?ordem=desconto&direcao=asc')
            ->assertJsonPath('data.*.id', [$a->id, $b->id, $c->id]);
        $this->getJson('/api/pedidos?ordem=desconto&direcao=desc')
            ->assertJsonPath('data.*.id', [$c->id, $b->id, $a->id]);
    }

    public function test_data_do_pedido_sai_com_offset_de_sao_paulo(): void
    {
        $this->postJson('/api/pedidos', $this->dados(['data_pedido' => '2026-11-02 23:30']))
            ->assertCreated()
            ->assertJsonPath('data.data_pedido', '2026-11-02T23:30:00-03:00');
    }
}
