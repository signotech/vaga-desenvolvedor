<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BasicPagesTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_is_redirected_to_login(): void
    {
        $this->get('/')->assertRedirect('/login');
    }

    public function test_authenticated_user_can_open_dashboard(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user)->get('/')->assertOk()->assertSee('Visão geral');
    }
}
