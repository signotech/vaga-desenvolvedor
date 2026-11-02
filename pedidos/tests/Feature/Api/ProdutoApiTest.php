<?php

namespace Tests\Feature\Api;

use App\Models\ItemPedido;
use App\Models\Produto;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProdutoApiTest extends TestCase
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
        return array_merge(['sku' => 'SKU-1', 'titulo' => 'Caneta', 'preco' => 4.5, 'estoque' => 10], $extra);
    }

    public function test_lista_paginada_com_20_por_padrao(): void
    {
        Produto::factory(25)->create();

        $this->getJson('/api/produtos')->assertOk()
            ->assertJsonCount(20, 'data')
            ->assertJsonPath('meta.total', 25);
        $this->getJson('/api/produtos?por_pagina=50')->assertJsonCount(25, 'data');
    }

    public function test_filtra_e_ordena(): void
    {
        Produto::factory()->create(['titulo' => 'Bola']);
        Produto::factory()->create(['titulo' => 'Agulha']);
        Produto::factory()->create(['titulo' => 'Caderno']);

        $this->getJson('/api/produtos?ordem=titulo&direcao=desc')
            ->assertJsonPath('data.*.titulo', ['Caderno', 'Bola', 'Agulha']);
        $this->getJson('/api/produtos?titulo=gul')->assertJsonCount(1, 'data');
    }

    public function test_cria_produto(): void
    {
        $this->postJson('/api/produtos', $this->dados())
            ->assertCreated()
            ->assertJsonPath('data.sku', 'SKU-1')
            ->assertJsonPath('data.preco', 4.5);
    }

    public function test_valida_com_422(): void
    {
        $this->postJson('/api/produtos', [])->assertStatus(422)->assertJsonValidationErrors(['sku', 'titulo']);
    }

    public function test_mostra_atualiza_e_exclui(): void
    {
        $produto = Produto::factory()->create();

        $this->getJson("/api/produtos/{$produto->id}")->assertOk();
        $this->putJson("/api/produtos/{$produto->id}", $this->dados(['titulo' => 'Novo']))
            ->assertOk()->assertJsonPath('data.titulo', 'Novo');
        $this->deleteJson("/api/produtos/{$produto->id}")->assertNoContent();
        $this->getJson("/api/produtos/{$produto->id}")->assertNotFound();
    }

    public function test_nao_exclui_produto_em_pedidos(): void
    {
        $item = ItemPedido::factory()->create();

        $this->deleteJson("/api/produtos/{$item->produto_id}")
            ->assertStatus(409)
            ->assertJsonPath('message', 'Este produto está em pedidos e não pode ser excluído.');
    }

    public function test_exclusao_em_massa_informa_excluidos_e_ignorados(): void
    {
        $livres = Produto::factory(2)->create();
        $emPedido = ItemPedido::factory()->create()->produto_id;

        $this->deleteJson('/api/produtos', ['ids' => [...$livres->pluck('id'), $emPedido]])
            ->assertOk()
            ->assertExactJson(['excluidos' => 2, 'ignorados' => 1]);
    }

    public function test_filtro_de_id_e_exato(): void
    {
        Produto::factory(21)->create();

        $this->getJson('/api/produtos?id=1')->assertOk()
            ->assertJsonPath('data.*.id', [1]);
        $this->getJson('/api/produtos?id=abc')->assertOk()->assertJsonCount(0, 'data');
    }
}
