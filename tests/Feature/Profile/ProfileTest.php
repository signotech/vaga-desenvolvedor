<?php

namespace Tests\Feature\Profile;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProfileTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_see_edit_page()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get(route('profile.edit'));

        $response->assertStatus(200);
        $response->assertSee('Editar perfil');
    }

    public function test_authenticated_can_update_profile()
    {
        $user = User::factory()->create([
            'name' => 'Nome Antigo',
            'email' => 'emailantigo@example.com',
        ]);

        $newData = [
            'name' => 'Novo Nome',
            'email' => 'novoemail@example.com',
        ];

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'Nome Antigo',
            'email' => 'emailantigo@example.com',
        ]);

        $response = $this->actingAs($user)->patch(route('profile.update'), $newData);

        $response->assertRedirect(route('profile.edit'));
        $response->assertSessionHas('status', 'profile-updated');

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'Novo Nome',
            'email' => 'novoemail@example.com',
        ]);

        $this->assertDatabaseMissing('users', [
            'id' => $user->id,
            'name' => 'Nome Antigo',
            'email' => 'emailantigo@example.com',
        ]);
    }
}
