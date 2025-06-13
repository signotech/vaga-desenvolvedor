<?php

namespace App\Http\Controllers;

use App\Services\JobService;
use Illuminate\Http\Request;
use App\Models\Job;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\Application;

/**
 * @OA\Tag(name="Jobs", description="Operações relacionadas a vagas de emprego")
 */
class JobController extends Controller
{
    protected $jobService;

    public function __construct(JobService $jobService)
    {
        $this->jobService = $jobService;
    }

    /**
     * @OA\Get(
     *     path="/api/jobs",
     *     summary="Lista todas as vagas",
     *     tags={"Jobs"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de vagas",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Job"))
     *     )
     * )
     */
    public function index()
    {
        return response()->json($this->jobService->getAll());
    }

    /**
     * @OA\Post(
     *     path="/api/jobs",
     *     summary="Cria uma nova vaga",
     *     tags={"Jobs"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"title", "salary", "company", "type"},
     *             @OA\Property(property="title", type="string", example="Desenvolvedor PHP"),
     *             @OA\Property(property="salary", type="number", format="float", example=3500.50),
     *             @OA\Property(property="company", type="string", example="Empresa X"),
     *             @OA\Property(property="type", type="string", enum={"CLT","PJ","Freelance"}, example="CLT"),
     *             @OA\Property(property="paused", type="boolean", example=false)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Vaga criada com sucesso",
     *         @OA\JsonContent(ref="#/components/schemas/Job")
     *     ),
     *     @OA\Response(response=403, description="Não autorizado"),
     *     @OA\Response(response=422, description="Erro de validação")
     * )
     */
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

    /**
     * @OA\Get(
     *     path="/api/jobs/{id}",
     *     summary="Exibe detalhes de uma vaga",
     *     tags={"Jobs"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID da vaga",
     *         required=true,
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Detalhes da vaga",
     *         @OA\JsonContent(ref="#/components/schemas/Job")
     *     ),
     *     @OA\Response(response=404, description="Vaga não encontrada")
     * )
     */
    public function show($id)
    {
        return response()->json($this->jobService->find($id));
    }

    /**
     * @OA\Put(
     *     path="/api/jobs/{id}",
     *     summary="Atualiza uma vaga",
     *     tags={"Jobs"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID da vaga a ser atualizada",
     *         required=true,
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"title", "salary", "company", "type"},
     *             @OA\Property(property="title", type="string", example="Desenvolvedor PHP Senior"),
     *             @OA\Property(property="salary", type="number", format="float", example=4500.75),
     *             @OA\Property(property="company", type="string", example="Empresa X"),
     *             @OA\Property(property="type", type="string", enum={"CLT","PJ","Freelance"}, example="CLT"),
     *             @OA\Property(property="paused", type="boolean", example=false)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Vaga atualizada",
     *         @OA\JsonContent(ref="#/components/schemas/Job")
     *     ),
     *     @OA\Response(response=403, description="Não autorizado"),
     *     @OA\Response(response=404, description="Vaga não encontrada"),
     *     @OA\Response(response=422, description="Erro de validação")
     * )
     */
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

    /**
     * @OA\Delete(
     *     path="/api/jobs/{id}",
     *     summary="Deleta uma vaga",
     *     tags={"Jobs"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID da vaga a ser deletada",
     *         required=true,
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Response(response=200, description="Vaga deletada com sucesso"),
     *     @OA\Response(response=403, description="Não autorizado"),
     *     @OA\Response(response=404, description="Vaga não encontrada")
     * )
     */
    public function destroy($id)
    {
        $job = Job::findOrFail($id);
        $this->authorize('delete', $job);

        $this->jobService->delete($id);

        return response()->json(['message' => 'Job deleted.']);
    }

    /**
     * @OA\Get(
     *     path="/api/applications-count",
     *     summary="Retorna a contagem de candidaturas por vaga",
     *     tags={"Jobs"},
     *     @OA\Response(
     *         response=200,
     *         description="Contagem de candidaturas",
     *         @OA\JsonContent(
     *             type="object",
     *             example={"1": 10, "2": 5}
     *         )
     *     )
     * )
     */
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

    /**
     * @OA\Get(
     *     path="/api/jobs/{jobId}/applicants",
     *     summary="Lista candidatos para uma vaga",
     *     tags={"Jobs"},
     *     @OA\Parameter(
     *         name="jobId",
     *         in="path",
     *         description="ID da vaga",
     *         required=true,
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lista de candidatos",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 type="object",
     *                 @OA\Property(property="name", type="string", example="Fulano da Silva"),
     *                 @OA\Property(property="email", type="string", example="fulano@example.com"),
     *                 @OA\Property(property="created_at", type="string", format="date-time", example="2025-06-13T12:00:00Z")
     *             )
     *         )
     *     )
     * )
     */
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

    /**
     * @OA\Post(
     *     path="/api/jobs/{jobId}/apply",
     *     summary="Candidatar-se a uma vaga",
     *     tags={"Jobs"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="jobId",
     *         in="path",
     *         description="ID da vaga para candidatura",
     *         required=true,
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Candidatura realizada com sucesso",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Candidatura realizada com sucesso!")
     *         )
     *     ),
     *     @OA\Response(
     *         response=409,
     *         description="Usuário já se candidatou",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Você já se candidatou a esta vaga.")
     *         )
     *     ),
     *     @OA\Response(response=403, description="Não autorizado")
     * )
     */
    public function applyToJob($jobId)
    {
        $job = Job::findOrFail($jobId);
        $user = Auth::user();

        $alreadyApplied = DB::table('applications')
            ->where('user_id', $user->id)
            ->where('job_id', $jobId)
            ->exists();

        if ($alreadyApplied) {
            return response()->json(['success' => false, 'message' => 'Você já se candidatou a esta vaga.'], 409);
        }

        Application::create([
            'user_id' => $user->id,
            'job_id' => $jobId,
        ]);

        return response()->json(['success' => true, 'message' => 'Candidatura realizada com sucesso!'], 201);
    }

    /**
     * @OA\Get(
     *     path="/api/jobs/applied/list",
     *     summary="Lista IDs das vagas em que o usuário se candidatou",
     *     tags={"Jobs"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de IDs de vagas",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(
     *                 property="job_ids",
     *                 type="array",
     *                 @OA\Items(type="integer", example=1)
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Usuário não autorizado para consultar candidaturas",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Apenas candidatos podem consultar suas candidaturas.")
     *         )
     *     )
     * )
     */
    public function getAppliedJobs()
    {
        $user = Auth::user();

        if ($user->user_type != 1) {
            return response()->json([
                'success' => false,
                'message' => 'Apenas candidatos podem consultar suas candidaturas.'
            ], 403);
        }

        $jobIds = DB::table('applications')
            ->where('user_id', $user->id)
            ->pluck('job_id');

        return response()->json([
            'success' => true,
            'job_ids' => $jobIds
        ]);
    }
}
