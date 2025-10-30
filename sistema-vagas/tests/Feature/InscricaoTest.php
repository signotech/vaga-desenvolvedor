<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Candidato;
use App\Models\Vaga;

class InscricaoTest extends TestCase
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
    public function pode_inscrever_um_candidato_em_vagas(): void
    {
        $candidato = Candidato::factory()->create();
        $vaga1 = Vaga::factory()->create(['status' => 'ativa']);
        $vaga2 = Vaga::factory()->create(['status' => 'ativa']);

        $response = $this->post(route('inscricao.store', $candidato), [
            'vagas' => [$vaga1->id, $vaga2->id]
        ]);

        $response->assertRedirect(route('candidatos.index'));
        $response->assertSessionHas('success');

        $this->assertCount(2, $candidato->vagas);
        $this.assertDatabaseHas('candidato_vaga', [
            'candidato_id' => $candidato->id,
            'vaga_id' => $vaga1->id,
        ]);
    }

    /** @test */
    public function pode_atualizar_sincronizar_inscricoes_de_um_candidato(): void
    {
        $candidato = Candidato::factory()->create();
        $vaga1 = Vaga::factory()->create();
        $vaga2 = Vaga::factory()->create();
        
        $candidato->vagas()->attach([$vaga1->id, $vaga2->id]);
        $this.assertCount(2, $candidato->fresh()->vagas);

        $response = $this->post(route('inscricao.store', $candidato), [
            'vagas' => [$vaga2->id]
        ]);

        $this.assertCount(1, $candidato->fresh()->vagas);
        $this.assertDatabaseMissing('candidato_vaga', [
            'candidato_id' => $candidato->id,
            'vaga_id' => $vaga1->id,
        ]);
    }
}