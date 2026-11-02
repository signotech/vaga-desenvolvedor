<?php

namespace Tests\Feature;

use App\Models\Cliente;
use App\Models\Pedido;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ClienteTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->actingAs(User::factory()->create());
    }

    public function test_lista_com_paginacao_de_20_itens(): void
    {
        Cliente::factory(25)->create();

        $this->get('/clientes')->assertOk()->assertViewHas('clientes', fn ($c) => $c->count() === 20);
    }

    public function test_filtra_e_ordena_por_nome(): void
    {
        Cliente::factory()->create(['nome' => 'Bruno']);
        Cliente::factory()->create(['nome' => 'Ana']);
        Cliente::factory()->create(['nome' => 'Carla']);

        $resposta = $this->get('/clientes?ordem=nome&direcao=desc');
        $resposta->assertViewHas('clientes', fn ($c) => $c->pluck('nome')->all() === ['Carla', 'Bruno', 'Ana']);

        $this->get('/clientes?nome=run')->assertViewHas('clientes', fn ($c) => $c->count() === 1);
    }

    public function test_cria_cliente_removendo_mascara_do_cpf(): void
    {
        $this->post('/clientes', ['nome' => 'Maria', 'cpf' => '111.444.777-35', 'email' => 'maria@exemplo.com'])
            ->assertRedirect('/clientes');

        $this->assertDatabaseHas('clientes', ['nome' => 'Maria', 'cpf' => '11144477735']);
    }

    public function test_valida_campos_e_cpf_duplicado(): void
    {
        Cliente::factory()->create(['cpf' => '11144477735']);

        $this->post('/clientes', ['nome' => '', 'cpf' => '11144477735', 'email' => 'invalido'])
            ->assertSessionHasErrors(['nome', 'cpf', 'email']);
    }

    public function test_rejeita_cpf_com_digito_verificador_errado_e_sequencia_repetida(): void
    {
        foreach (['11122233344', '111.111.111-11'] as $cpf) {
            $this->post('/clientes', ['nome' => 'Maria', 'cpf' => $cpf, 'email' => 'maria@exemplo.com'])
                ->assertSessionHasErrors(['cpf' => 'O CPF informado é inválido.']);
        }

        $this->assertDatabaseCount('clientes', 0);
    }

    public function test_lista_cpf_formatado(): void
    {
        Cliente::factory()->create(['cpf' => '11144477735']);

        $this->get('/clientes')->assertSee('111.444.777-35');
    }

    public function test_formulario_de_edicao_mostra_cpf_formatado(): void
    {
        $cliente = Cliente::factory()->create(['cpf' => '11144477735']);

        $this->get("/clientes/{$cliente->id}/edit")->assertSee('value="111.444.777-35"', false);
    }

    public function test_filtra_por_cpf_com_e_sem_pontuacao(): void
    {
        Cliente::factory()->create(['cpf' => '11144477735']);
        Cliente::factory()->create(['cpf' => '52998224725']);

        foreach (['11144477735', '111.444.777-35', '444.777'] as $busca) {
            $this->get('/clientes?cpf='.urlencode($busca))
                ->assertViewHas('clientes', fn ($c) => $c->pluck('cpf')->all() === ['11144477735']);
        }
    }

    public function test_atualiza_cliente(): void
    {
        $cliente = Cliente::factory()->create();

        $this->put("/clientes/{$cliente->id}", ['nome' => 'Novo Nome', 'cpf' => $cliente->cpf, 'email' => $cliente->email])
            ->assertRedirect('/clientes');

        $this->assertDatabaseHas('clientes', ['id' => $cliente->id, 'nome' => 'Novo Nome']);
    }

    public function test_exclui_cliente_sem_pedidos(): void
    {
        $cliente = Cliente::factory()->create();

        $this->delete("/clientes/{$cliente->id}")->assertRedirect('/clientes');

        $this->assertDatabaseMissing('clientes', ['id' => $cliente->id]);
    }

    public function test_nao_exclui_cliente_com_pedidos(): void
    {
        $pedido = Pedido::factory()->create();

        $this->delete("/clientes/{$pedido->cliente_id}")->assertSessionHas('erro');

        $this->assertDatabaseHas('clientes', ['id' => $pedido->cliente_id]);
    }

    public function test_exclusao_em_massa_ignora_clientes_com_pedidos(): void
    {
        $livres = Cliente::factory(2)->create();
        $comPedido = Pedido::factory()->create()->cliente;

        $this->delete('/clientes', ['ids' => [...$livres->pluck('id'), $comPedido->id]])
            ->assertSessionHas('ok')
            ->assertSessionHas('erro');

        $this->assertDatabaseCount('clientes', 1);
    }

    public function test_filtro_de_id_e_exato(): void
    {
        Cliente::factory(21)->create();

        $this->get('/clientes?id=1')->assertOk()
            ->assertViewHas('clientes', fn ($l) => $l->pluck('id')->all() === [1]);
        $this->get('/clientes?id=abc')->assertOk()
            ->assertViewHas('clientes', fn ($l) => $l->count() === 0);
    }
}
