<?php

namespace Tests\Feature\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Vaga;

class VagaApiTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function api_pode_listar_vagas_com_paginacao(): void
    {
        Vaga::factory(25)->create(); //

        $response = $this->getJson('/api/vagas'); //

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                '*' => ['id', 'titulo', 'tipo', 'status']
            ],
            'links',
            'meta'
        ]);
        $response->assertJsonCount(20, 'data'); //
    }

    /** @test */
    public function api_pode_criar_uma_vaga(): void
    {
        $dadosVaga = [
            'titulo' => 'Api Dev',
            'tipo' => 'clt',
            'descricao' => 'Teste via API'
        ];

        $response = $this->postJson('/api/vagas', $dadosVaga); //

        $response->assertStatus(201); 
        $response->assertJsonFragment(['titulo' => 'Api Dev']);
        $this.assertDatabaseHas('vagas', ['titulo' => 'Api Dev']);
    }

    /** @test */
    public function api_retorna_erros_de_validacao_422(): void
    {
        $dadosVaga = ['tipo' => 'pj']; 

        $response = $this->postJson('/api/vagas', $dadosVaga); //

        $response->assertStatus(422); 
        $response->assertJsonValidationErrors(['titulo']); //
    }

    /** @test */
    public function api_pode_deletar_uma_vaga(): void
    {
        $vaga = Vaga::factory()->create();

        $response = $this->deleteJson('/api/vagas/' . $vaga->id); //

        $response->assertStatus(204); 
        $this.assertDatabaseMissing('vagas', ['id' => $vaga->id]);
    }
}