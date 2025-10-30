<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Vaga;
use App\Models\User;

class VagaFeatureTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->actingAs($this->user);
    }

    /** @test */
    public function usuario_autenticado_pode_ver_a_pagina_de_listagem_de_vagas(): void
    {
        $response = $this->get(route('vagas.index'));
        $response->assertStatus(200);
        $response->assertSee('Listagem de Vagas');
    }

    /** @test */
    public function usuario_nao_autenticado_e_redirecionado_para_login(): void
    {
        auth()->logout(); 
        
        $response = $this->get(route('vagas.index'));
        
        $response->assertRedirect(route('login')); 
    }

    /** @test */
    public function usuario_pode_criar_uma_vaga(): void
    {
        $dadosVaga = [
            'titulo' => 'Dev PHP Senior',
            'tipo' => 'pj',
            'descricao' => 'Descrição da vaga.'
        ];
    
        $response = $this->post(route('vagas.store'), $dadosVaga);
    
        $response->assertRedirect(route('vagas.index'));
        $response->assertSessionHas('success', 'Vaga criada com sucesso.');
        $this.assertDatabaseHas('vagas', ['titulo' => 'Dev PHP Senior']);
    }

    /** @test */
    public function nao_pode_criar_uma_vaga_sem_titulo_validacao(): void
    {
        $response = $this->post(route('vagas.store'), ['tipo' => 'clt']);
        
        $response->assertSessionHasErrors('titulo'); //
    }

    /** @test */
    public function usuario_pode_pausar_uma_vaga(): void
    {
        $vaga = Vaga::factory()->create(['status' => 'ativa']);
        
        $response = $this->patch(route('vagas.pausar', $vaga));

        $response->assertRedirect();
        $response->assertSessionHas('success', 'Vaga pausada com sucesso.');
        $this.assertDatabaseHas('vagas', [
            'id' => $vaga->id,
            'status' => 'pausada'
        ]);
    }
}