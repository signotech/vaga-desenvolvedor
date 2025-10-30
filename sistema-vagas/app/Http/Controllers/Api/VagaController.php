<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vaga;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator; // Validação na API
use OpenApi\Annotations as OA;

class VagaController extends Controller
{
    /**
     * @OA\Get(
     * path="/api/vagas",
     * tags={"Vagas"},
     * summary="Lista paginada de vagas",
     * description="Retorna uma lista paginada de vagas, com filtros de título e tipo.",
     * @OA\Parameter(
     * name="titulo",
     * in="query",
     * description="Filtra por título da vaga",
     * required=false,
     * @OA\Schema(type="string")
     * ),
     * @OA\Parameter(
     * name="tipo",
     * in="query",
     * description="Filtra por tipo (clt, pj, freelancer)",
     * required=false,
     * @OA\Schema(type="string")
     * ),
     * @OA\Response(
     * response=200,
     * description="Operação bem-sucedida",
     * @OA\JsonContent(type="object")
     * )
     * )
     */
    public function index(Request $request)
    {
        // Pega os mesmos filtros da web
        $query = Vaga::query();

        if ($request->filled('titulo')) {
            $query->where('titulo', 'like', '%' . $request->titulo . '%');
        }
        if ($request->filled('tipo')) {
            $query->where('tipo', $request->tipo);
        }
        
        // Paginação
        $vagas = $query->paginate(20)->withQueryString();

        // O Laravel converte isso para JSON automaticamente
        return $vagas;
    }

    /**
     * @OA\Post(
     * path="/api/vagas",
     * tags={"Vagas"},
     * summary="Cria uma nova vaga",
     * description="Cria um novo registro de vaga no banco de dados.",
     * @OA\RequestBody(
     * required=true,
     * description="Dados da vaga para criação",
     * @OA\JsonContent(
     * required={"titulo", "tipo"},
     * @OA\Property(property="titulo", type="string", example="Desenvolvedor PHP Pleno"),
     * @OA\Property(property="tipo", type="string", example="clt"),
     * @OA\Property(property="descricao", type="string", example="Descrição detalhada da vaga..."),
     * )
     * ),
     * @OA\Response(
     * response=201,
     * description="Vaga criada com sucesso",
     * @OA\JsonContent(type="object")
     * ),
     * @OA\Response(
     * response=422,
     * description="Erro de validação (Campos obrigatórios faltando, etc)",
     * @OA\JsonContent(type="object")
     * )
     * )
     */
    public function store(Request $request)
    {
        // Validação de API
        $validator = Validator::make($request->all(), [
            'titulo' => 'required|string|max:255',
            'descricao' => 'nullable|string',
            'tipo' => 'required|in:clt,pj,freelancer',
        ]);

        // Se a validação falhar, retorna os erros em JSON com status 422
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $vaga = Vaga::create($validator->validated());

        // Retorna a vaga criada com status 201 (Created)
        return response()->json($vaga, 201);
    }

    /**
     * @OA\Get(
     * path="/api/vagas/{vaga}",
     * tags={"Vagas"},
     * summary="Exibe uma vaga específica",
     * @OA\Parameter(
     * name="vaga",
     * in="path",
     * description="ID da vaga",
     * required=true,
     * @OA\Schema(type="integer")
     * ),
     * @OA\Response(
     * response=200,
     * description="Operação bem-sucedida"
     * ),
     * @OA\Response(
     * response=404,
     * description="Vaga não encontrada"
     * )
     * )
     */
    public function show(Vaga $vaga)
    {
        // O Laravel encontra a vaga pelo ID e retorna em JSON
        return $vaga;
    }

    /**
     * @OA\Patch(
     * path="/api/vagas/{vaga}",
     * tags={"Vagas"},
     * summary="Atualiza parcialmente uma vaga",
     * description="Atualiza os campos informados de uma vaga existente.",
     * @OA\Parameter(
     * name="vaga",
     * in="path",
     * description="ID da vaga",
     * required=true,
     * @OA\Schema(type="integer")
     * ),
     * @OA\RequestBody(
     * required=true,
     * description="Dados para atualização parcial da vaga",
     * @OA\JsonContent(
     * @OA\Property(property="titulo", type="string", example="Desenvolvedor PHP Sênior"),
     * @OA\Property(property="tipo", type="string", example="pj"),
     * @OA\Property(property="descricao", type="string", example="Atualização da descrição..."),
     * @OA\Property(property="status", type="string", example="ativa")
     * )
     * ),
     * @OA\Response(
     * response=200,
     * description="Vaga atualizada com sucesso",
     * @OA\JsonContent(type="object")
     * ),
     * @OA\Response(
     * response=422,
     * description="Erro de validação",
     * @OA\JsonContent(type="object")
     * ),
     * @OA\Response(
     * response=404,
     * description="Vaga não encontrada"
     * )
     * )
     */
    public function update(Request $request, Vaga $vaga)
    {
        $validator = Validator::make($request->all(), [
            'titulo' => 'sometimes|required|string|max:255',
            'descricao' => 'nullable|string',
            'tipo' => 'sometimes|required|in:clt,pj,freelancer',
            'status' => 'sometimes|required|in:ativa,pausada',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $vaga->update($validator->validated());

        return response()->json($vaga);
    }

    /**
     * @OA\Delete(
     * path="/api/vagas/{vaga}",
     * tags={"Vagas"},
     * summary="Remove uma vaga",
     * description="Exclui definitivamente uma vaga existente.",
     * @OA\Parameter(
     * name="vaga",
     * in="path",
     * description="ID da vaga",
     * required=true,
     * @OA\Schema(type="integer")
     * ),
     * @OA\Response(
     * response=204,
     * description="Vaga removida com sucesso (sem conteúdo)"
     * ),
     * @OA\Response(
     * response=404,
     * description="Vaga não encontrada"
     * )
     * )
     */
    public function destroy(Vaga $vaga)
    {
        $vaga->delete();

        // Retorna uma resposta vazia com status 204 (No Content)
        return response()->noContent();
    }
}