<?php

namespace Tests\Feature\Position;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CreatePositionTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_position()
    {
        $user = User::factory()->create(['role' => 'admin']);

        $data = [
            'title' => 'Developer',
            'contract' => 'CLT',
            'type' => 'Remoto',
            'description' => 'Vaga para dev PHP',
            'requirements' => 'PHP, Laravel',
            'status' => true,
        ];

        $response = $this->actingAs($user)->post(route('positions.store'), $data);

        $response->assertStatus(302);

        $this->assertDatabaseHas('positions', [
            'title' => 'Developer',
            'contract' => 'CLT',
            'type' => 'Remoto',
        ]);
    }
}
