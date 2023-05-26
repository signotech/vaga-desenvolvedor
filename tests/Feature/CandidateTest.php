<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CandidateTest extends TestCase
{
    use RefreshDatabase;

    public function testShow()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $candidate = User::factory()->create(['role' => 'candidate']);

        $response = $this->actingAs($admin)->get(route('candidates.show', $candidate));

        $response->assertStatus(200);
        $response->assertViewIs('candidates.show');
        $response->assertViewHas('candidate', $candidate);
    }

    public function testEdit()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $candidate = User::factory()->create(['role' => 'candidate']);

        $response = $this->actingAs($admin)->get(route('candidates.edit', $candidate));

        $response->assertStatus(200);
        $response->assertViewIs('candidates.edit');
        $response->assertViewHas('candidate', $candidate);
    }

    public function testUpdate()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $candidate = User::factory()->create(['role' => 'candidate']);

        $response = $this->actingAs($admin)->put(route('candidates.update', $candidate), [
            'name' => 'John Doe',
            'email' => 'johndoe@example.com',
        ]);

        $response->assertStatus(302);
        $response->assertRedirect('/candidates');
        $response->assertSessionHas('message', 'Candidato atualizado com sucesso');

        $this->assertDatabaseHas('users', [
            'id' => $candidate->id,
            'name' => 'John Doe',
            'email' => 'johndoe@example.com',
        ]);
    }

    public function testDestroy()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $candidate = User::factory()->create(['role' => 'candidate']);

        $response = $this->actingAs($admin)->delete(route('candidates.destroy', $candidate));

        $response->assertStatus(302);
        $response->assertRedirect('/candidates');
        $response->assertSessionHas('message', 'Candidato excluido com sucesso');

        $this->assertDatabaseMissing('users', ['id' => $candidate->id]);
    }
}
