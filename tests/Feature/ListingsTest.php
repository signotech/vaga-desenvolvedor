<?php

namespace Tests\Feature;

use App\Models\Listing;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class ListingsTest extends TestCase
{
    use RefreshDatabase;

    public function testIndex()
    {
        $response = $this->get(route('listings.index'));

        $response->assertSee('Busca Empregos');
        $response->assertStatus(200);
        $response->assertViewIs('listings.index');
        $response->assertViewHas('listings');
    }

    public function testShow()
    {
        $employer = User::factory()->create([
            'name' => 'Empregador',
            'email' => 'empregador@mail.com',
            'role' => 'employer',
            'password' => Hash::make('123456')
        ]);
        $listing = Listing::factory()->create(
            ['user_id' => $employer->id]
        );

        $response = $this->get(route('listings.show', $listing));

        $response->assertStatus(200);
        $response->assertViewIs('listings.show');
        $response->assertViewHas('listing', $listing);
    }

    public function testStore()
    {
        $user = User::factory()->create(['role' => 'employer']);

        $response = $this->actingAs($user)->post(route('listings.store'), [
            'title' => 'test Listing',
            'company' => 'test Company',
            'location' => 'test Location',
            'website' => 'http://example.com/test',
            'email' => 'test@example.com',
            'tags' => 'test, test2',
            'description' => 'test Description',
            'type' => 'pj',
        ]);

        $response->assertStatus(302);
        $response->assertRedirect('/');
        $response->assertSessionHas('message', 'Vaga criada com sucesso');
    }

    public function testEdit()
    {
        $user = User::factory()->create([
            'role' => 'employer'
        ]);
        $listing = Listing::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->get(route('listings.edit', $listing));

        $response->assertStatus(200);
        $response->assertViewIs('listings.edit');
        $response->assertViewHas('listing', $listing);
    }

    public function testUpdate()
    {
        $user = User::factory()->create([
            'role' => 'employer'
        ]);
        $listing = Listing::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->put(route('listings.update', $listing), [
            'title' => 'Updated Listing',
            'company' => 'Updated Company',
            'location' => 'Updated Location',
            'website' => 'http://example.com/updated',
            'email' => 'updated@example.com',
            'tags' => 'updated',
            'description' => 'Updated Description',
            'paused' => true,
            'type' => 'pj'
        ]);

        $response->assertStatus(302);
        $response->assertRedirect('/');
        $response->assertSessionHas('message', 'Vaga atualizada com sucesso');
    }

    public function testDestroy()
    {
        // Cria um usuário com a role 'employer' e um listing associado a esse usuário
        $user = User::factory()->create(['role' => 'employer']);
        $listing = Listing::factory()->create(['user_id' => $user->id]);

        // Loga o usuário
        $this->actingAs($user);

        // Envia uma requisição DELETE para o método destroy do ListingController
        $response = $this->delete(route('listings.destroy', $listing));

        // Verifica se a resposta tem um status de redirecionamento (302)
        $response->assertStatus(302);

        // Verifica se o usuário foi redirecionado para a página inicial
        $response->assertRedirect('/');

        // Verifica se a mensagem de sessão 'message' está definida como 'Vaga excluída com sucesso'
        $response->assertSessionHas('message', 'Vaga excluida com sucesso');

        // Verifica se o listing foi excluído do banco de dados
        $this->assertDatabaseMissing('listings', ['id' => $listing->id]);
    }
}
