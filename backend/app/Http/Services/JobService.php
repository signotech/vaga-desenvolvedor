<?php
namespace App\Services;

use App\Models\Job;

class JobService
{
    public function getAll()
    {
        return Job::all();
    }

    public function find($id)
    {
        return Job::findOrFail($id);
    }

    public function create(array $data)
    {
        return Job::create($data);
    }

    public function update($id, array $data)
    {
        $job = Job::findOrFail($id);
        $job->update($data);
        return $job;
    }

    public function delete($id)
    {
        $job = Job::findOrFail($id);
        $job->delete();
    }
}
