<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Job;
use App\Models\Application;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $jobs = Job::factory(10)->create();

        User::create([
            'name' => 'Admin Teste',
            'email' => 'adm@adm.com',
            'password' => Hash::make('123456'),
            'user_type' => 2,
        ]);

        $candidateFixed = User::create([
            'name' => 'Candidato Teste',
            'email' => 'candidate@email.com',
            'password' => Hash::make('123456'),
            'user_type' => 1,
        ]);

        $candidates = User::factory()->count(10)->create([
            'user_type' => 1,
        ]);

        User::factory()->count(2)->create([
            'user_type' => 2,
        ]);

        foreach ($candidates as $candidate) {
            $randomJobs = $jobs->random(rand(1, 3));

            foreach ($randomJobs as $job) {
                Application::factory()->create([
                    'user_id' => $candidate->id,
                    'job_id' => $job->id,
                ]);
            }
        }
    }
}
