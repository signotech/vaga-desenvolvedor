<?php

namespace Tests\Feature\Candidate;

use App\Models\Position;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApplyToPositionTest extends TestCase
{
    use RefreshDatabase;

    public function test_everyone_can_view_positions_list(): void
    {
        $position = Position::factory()->create();

        $response = $this->get('/positions');

        $response->assertStatus(200);
        $response->assertSee('Candidatar-se');
        $response->assertSee($position->title);
    }

    public function test_authenticated_user_sees_apply_form(): void
    {
        $user = User::factory()->create(['role' => 'user']);
        $position = Position::factory()->create();

        $response = $this->actingAs($user)->get('/positions');

        $response->assertStatus(200);
    }

    public function test_confirmation_applyed(): void
    {
        $user = User::factory()->create();
        $position = Position::factory()->create();

        $response = $this->actingAs($user)->post("/apply", [
          'position_id' => $position->id,
        ]);

        $response->assertSessionHas('status', 'application-sent');

        $this->assertDatabaseHas('applications', [
            'user_id' => $user->id,
            'position_id' => $position->id,
        ]);
    }

    public function test_guest_user_sees_login_link(): void
    {
        $position = Position::factory()->create();

        $response = $this->get('/positions');

        $response->assertStatus(200);
        $response->assertSee('login');
        $response->assertSee('Candidatar-se');
    }

    public function test_user_cannot_apply_twice_a_position(): void
  {
      $user = User::factory()->create();
      $position = Position::factory()->create();

      $this->actingAs($user)->post('/apply', [
          'position_id' => $position->id,
      ]);
      $this->actingAs($user)->post('/apply', [
          'position_id' => $position->id,
      ]);

      $this->assertDatabaseCount('applications', 1);
  }

}
