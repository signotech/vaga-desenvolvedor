<?php

namespace Tests\Feature;

use App\Models\ItemPedido;
use App\Models\Produto;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProdutoTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->actingAs(User::factory()->create());
    }

    public function test_lista_com_paginacao_de_20_itens(): void
    {
        Produto::factory(25)->create();

        $this->get('/produtos')->assertOk()->assertViewHas('produtos', fn ($p) => $p->count() === 20);
    }

    public function test_permite_mudar_itens_por_pagina(): void
    {
        Produto::factory(25)->create();

        $this->get('/produtos?por_pagina=10')->assertViewHas('produtos', fn ($p) => $p->count() === 10);
        $this->get('/produtos?por_pagina=999')->assertViewHas('produtos', fn ($p) => $p->count() === 20);
    }

    public function test_ordena_por_preco(): void
    {
        Produto::factory()->create(['preco' => 30]);
        Produto::factory()->create(['preco' => 10]);

        $this->get('/produtos?ordem=preco&direcao=asc')
            ->assertViewHas('produtos', fn ($p) => (float) $p->first()->preco === 10.0);
    }

    public function test_cria_produto(): void
    {
        $this->post('/produtos', ['sku' => 'AB-1', 'titulo' => 'Caneta', 'preco' => '3.50', 'estoque' => 10])
            ->assertRedirect('/produtos');

        $this->assertDatabaseHas('produtos', ['sku' => 'AB-1', 'titulo' => 'Caneta']);
    }

    public function test_valida_sku_duplicado_e_valores_negativos(): void
    {
        Produto::factory()->create(['sku' => 'AB-1']);

        $this->post('/produtos', ['sku' => 'AB-1', 'titulo' => 'X', 'preco' => -1, 'estoque' => -5])
            ->assertSessionHasErrors(['sku', 'preco', 'estoque']);
    }

    public function test_atualiza_e_exclui_produto(): void
    {
        $produto = Produto::factory()->create();

        $this->put("/produtos/{$produto->id}", ['sku' => $produto->sku, 'titulo' => 'Outro', 'preco' => 5, 'estoque' => 1])
            ->assertRedirect('/produtos');
        $this->assertDatabaseHas('produtos', ['id' => $produto->id, 'titulo' => 'Outro']);

        $this->delete("/produtos/{$produto->id}")->assertRedirect('/produtos');
        $this->assertDatabaseMissing('produtos', ['id' => $produto->id]);
    }

    public function test_nao_exclui_produto_que_esta_em_pedido(): void
    {
        $item = ItemPedido::factory()->create();

        $this->delete("/produtos/{$item->produto_id}")->assertSessionHas('erro');

        $this->assertDatabaseHas('produtos', ['id' => $item->produto_id]);
    }
}
