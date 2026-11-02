<?php

namespace Tests\Feature\Api;

use App\Models\Cliente;
use App\Models\Pedido;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ClienteApiTest extends TestCase
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
        return array_merge(['nome' => 'Ana', 'cpf' => '52998224725', 'email' => 'ana@exemplo.com'], $extra);
    }

    public function test_lista_paginada_com_20_por_padrao(): void
    {
        Cliente::factory(25)->create();

        $this->getJson('/api/clientes')->assertOk()
            ->assertJsonCount(20, 'data')
            ->assertJsonPath('meta.total', 25);
        $this->getJson('/api/clientes?por_pagina=10')->assertJsonCount(10, 'data');
        $this->getJson('/api/clientes?por_pagina=7')->assertJsonCount(20, 'data');
    }

    public function test_filtra_e_ordena(): void
    {
        Cliente::factory()->create(['nome' => 'Bruno']);
        Cliente::factory()->create(['nome' => 'Ana']);
        Cliente::factory()->create(['nome' => 'Carla']);

        $this->getJson('/api/clientes?ordem=nome&direcao=desc')
            ->assertJsonPath('data.*.nome', ['Carla', 'Bruno', 'Ana']);
        $this->getJson('/api/clientes?nome=run')->assertJsonCount(1, 'data');
    }

    public function test_cria_cliente(): void
    {
        $this->postJson('/api/clientes', $this->dados(['cpf' => '529.982.247-25']))
            ->assertCreated()
            ->assertJsonPath('data.cpf', '52998224725');

        $this->assertDatabaseCount('clientes', 1);
    }

    public function test_valida_com_422_mesmo_sem_cabecalho_accept(): void
    {
        $this->post('/api/clientes', ['nome' => ''])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['nome', 'cpf', 'email']);
    }

    public function test_mostra_atualiza_e_responde_404_em_json(): void
    {
        $cliente = Cliente::factory()->create();

        $this->getJson("/api/clientes/{$cliente->id}")->assertOk()->assertJsonPath('data.id', $cliente->id);
        $this->putJson("/api/clientes/{$cliente->id}", $this->dados(['nome' => 'Novo']))
            ->assertOk()->assertJsonPath('data.nome', 'Novo');
        $this->getJson('/api/clientes/9999')->assertNotFound()->assertJsonStructure(['message']);
    }

    public function test_exclui_com_204(): void
    {
        $cliente = Cliente::factory()->create();

        $this->deleteJson("/api/clientes/{$cliente->id}")->assertNoContent();

        $this->assertDatabaseMissing('clientes', ['id' => $cliente->id]);
    }

    public function test_nao_exclui_cliente_com_pedidos(): void
    {
        $pedido = Pedido::factory()->create();

        $this->deleteJson("/api/clientes/{$pedido->cliente_id}")
            ->assertStatus(409)
            ->assertJsonPath('message', 'Este cliente possui pedidos e não pode ser excluído.');
    }

    public function test_exclusao_em_massa_informa_excluidos_e_ignorados(): void
    {
        $livres = Cliente::factory(2)->create();
        $comPedido = Pedido::factory()->create()->cliente_id;

        $this->deleteJson('/api/clientes', ['ids' => [...$livres->pluck('id'), $comPedido]])
            ->assertOk()
            ->assertExactJson(['excluidos' => 2, 'ignorados' => 1]);

        $this->deleteJson('/api/clientes', [])->assertStatus(422);
    }
}
