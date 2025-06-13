<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Services\JobService;
use App\Models\Job;
use Illuminate\Foundation\Testing\RefreshDatabase;

class JobServiceTest extends TestCase
{
    use RefreshDatabase;

    protected $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new JobService();
    }

    public function test_getAll_returns_all_jobs()
    {
        Job::factory()->count(3)->create();

        $jobs = $this->service->getAll();

        $this->assertCount(3, $jobs);
    }

    public function test_find_returns_job()
    {
        $job = Job::factory()->create();

        $foundJob = $this->service->find($job->id);

        $this->assertEquals($job->id, $foundJob->id);
    }

    public function test_create_creates_job()
    {
        $data = [
            'title' => 'Developer',
            'description' => 'Job description',
            'salary' => 5000,
            'company' => 'Tech Company',
            'type' => 'CLT',
            'paused' => false,
        ];

        $job = $this->service->create($data);

        $this->assertDatabaseHas('jobs', ['id' => $job->id, 'title' => 'Developer']);
    }

    public function test_update_updates_job()
    {
        $job = Job::factory()->create(['title' => 'Old Title']);

        $updated = $this->service->update($job->id, ['title' => 'New Title']);

        $this->assertEquals('New Title', $updated->title);
        $this->assertDatabaseHas('jobs', ['id' => $job->id, 'title' => 'New Title']);
    }

    public function test_delete_deletes_job()
    {
        $job = Job::factory()->create();

        $this->service->delete($job->id);

        $this->assertDatabaseMissing('jobs', ['id' => $job->id]);
    }
}
