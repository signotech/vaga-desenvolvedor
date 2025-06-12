<?php

namespace App\Http\Controllers;

use App\Services\JobService;
use Illuminate\Http\Request;

class JobController extends Controller
{
    protected $jobService;

    public function __construct(JobService $jobService)
    {
        $this->jobService = $jobService;
    }

    public function index()
    {
        return response()->json($this->jobService->getAll());
    }

    public function store(Request $request)
    {
        $this->authorize('create', Job::class);

        $validated = $request->validate([
            'title' => 'required|string',
            'salary' => 'required|numeric',
            'company' => 'required|string',
            'type' => 'required|in:CLT,PJ,Freelance',
            'paused' => 'boolean'
        ]);

        return response()->json($this->jobService->create($validated), 201);
    }

    public function show($id)
    {
        return response()->json($this->jobService->find($id));
    }

    public function update(Request $request, $id)
    {
        $this->authorize('update', $job);
        return response()->json($this->jobService->update($id, $request->all()));
    }

    public function destroy($id)
    {
        $this->authorize('delete', $job);
        $this->jobService->delete($id);
        return response()->json(['message' => 'Job deleted.']);
    }
}
