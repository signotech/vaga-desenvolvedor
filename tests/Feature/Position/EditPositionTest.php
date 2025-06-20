<?php

namespace Tests\Feature\Position;

use App\Models\Position;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EditPositionTest extends TestCase
{
    use RefreshDatabase;

    public function test_view_edit_page()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $position = Position::factory()->create();

        $response = $this->actingAs($admin)->get(route('positions.edit', $position->id));

        $response->assertStatus(200);
        $response->assertSee('Editar vaga');
        $response->assertSee($position->title);
    }

    public function test_edit_position()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $position = Position::factory()->create();

        $data = [
            'title' => 'Novo título',
            'contract' => 'PJ',
            'type' => 'Remoto',
            'description' => 'Descrição atualizada',
            'requirements' => 'Requisitos atualizados',
            'status' => true,
        ];

        $response = $this->actingAs($admin)->patch(route('positions.update', $position->id), $data);

        $response->assertRedirect(route('positions.index'));
        $response->assertSessionHas('status', 'updated');

        $this->assertDatabaseHas('positions', [
            'id' => $position->id,
            'title' => 'Novo título',
            'contract' => 'PJ',
            'type' => 'Remoto',
            'description' => 'Descrição atualizada',
            'requirements' => 'Requisitos atualizados',
            'status' => true,
        ]);
    }

    public function test_delete_position()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $position = Position::factory()->create();

        $response = $this->actingAs($admin)->delete(route('positions.destroy', $position->id));

        $response->assertRedirect(route('positions.index'));
        $response->assertSessionHas('status', 'deleted');

        $this->assertDatabaseMissing('positions', ['id' => $position->id]);
    }
}
