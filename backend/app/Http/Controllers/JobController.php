<?php

namespace App\Http\Controllers;

use App\Services\JobService;
use Illuminate\Http\Request;
use App\Models\Job;
use Illuminate\Support\Facades\DB;


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

        $job = $this->jobService->create($validated);

        return response()->json([
            'job' => $job
        ], 201);
    }


    public function show($id)
    {
        return response()->json($this->jobService->find($id));
    }

    public function update(Request $request, $id)
    {
        $job = Job::findOrFail($id);
        $this->authorize('update', $job);

        $validated = $request->validate([
            'title' => 'required|string',
            'salary' => 'required|numeric',
            'company' => 'required|string',
            'type' => 'required|in:CLT,PJ,Freelance',
            'paused' => 'boolean'
        ]);

        $job = $this->jobService->update($id, $validated);

        return response()->json([
            'job' => $job
        ]);
    }


    public function destroy($id)
    {
        $job = Job::findOrFail($id);
        $this->authorize('delete', $job);

        $this->jobService->delete($id);

        return response()->json(['message' => 'Job deleted.']);
    }

        public function applicationsCount()
    {
        $counts = DB::table('applications')
            ->select('job_id', DB::raw('COUNT(*) as applications_count'))
            ->groupBy('job_id')
            ->get()
            ->keyBy('job_id');

        $result = [];
        foreach ($counts as $job_id => $data) {
            $result[$job_id] = $data->applications_count;
        }

        return response()->json($result);
    }

    public function getApplicantsByJob($jobId)
{
        $job = Job::findOrFail($jobId);

        $applicants = DB::table('applications')
            ->join('users', 'applications.user_id', '=', 'users.id')
            ->where('applications.job_id', $jobId)
            ->select('users.name', 'users.email', 'applications.created_at')
            ->orderBy('applications.created_at', 'desc')
            ->get();

        return response()->json($applicants);
}


}
