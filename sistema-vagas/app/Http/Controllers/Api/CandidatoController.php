<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Candidato;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use OpenApi\Annotations as OA; // Importa o Swagger/OpenAPI

class CandidatoController extends Controller
{
    /**
     * @OA\Get(
     * path="/api/candidatos",
     * tags={"Candidatos"},
     * summary="Lista paginada de candidatos",
     * description="Retorna uma lista paginada de candidatos, com filtros de nome e email.",
     * @OA\Parameter(
     * name="nome",
     * in="query",
     * description="Filtra por nome do candidato",
     * required=false,
     * @OA\Schema(type="string")
     * ),
     * @OA\Parameter(
     * name="email",
     * in="query",
     * description="Filtra por email do candidato",
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
        $query = Candidato::query();

        // Filtros
        if ($request->filled('nome')) {
            $query->where('nome', 'like', '%' . $request->nome . '%');
        }
        if ($request->filled('email')) {
            $query->where('email', 'like', '%' . $request->email . '%');
        }

        // Paginação
        $candidatos = $query->paginate(20)->withQueryString();

        return $candidatos;
    }

    /**
     * @OA\Post(
     * path="/api/candidatos",
     * tags={"Candidatos"},
     * summary="Cria um novo candidato",
     * description="Cria um novo registro de candidato no banco de dados.",
     * @OA\RequestBody(
     * required=true,
     * description="Dados do candidato para criação",
     * @OA\JsonContent(
     * required={"nome", "email"},
     * @OA\Property(property="nome", type="string", example="Bruno Dvulhatka"),
     * @OA\Property(property="email", type="string", format="email", example="bruno@email.com"),
     * @OA\Property(property="telefone", type="string", example="(11) 99999-8888"),
     * )
     * ),
     * @OA\Response(
     * response=201,
     * description="Candidato criado com sucesso",
     * @OA\JsonContent(type="object")
     * ),
     * @OA\Response(
     * response=422,
     * description="Erro de validação (ex: email duplicado ou campos faltando)",
     * @OA\JsonContent(type="object")
     * )
     * )
     */
    public function store(Request $request)
    {
        // Validação de API
        $validator = Validator::make($request->all(), [
            'nome' => 'required|string|max:255',
            'email' => 'required|email|unique:candidatos,email', // Garante email único
            'telefone' => 'nullable|string|max:20',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $candidato = Candidato::create($validator->validated());

        return response()->json($candidato, 201);
    }

    /**
     * @OA\Get(
     * path="/api/candidatos/{candidato}",
     * tags={"Candidatos"},
     * summary="Exibe um candidato específico",
     * description="Retorna os dados de um candidato específico e as vagas às quais ele está inscrito.",
     * @OA\Parameter(
     * name="candidato",
     * in="path",
     * description="ID do candidato",
     * required=true,
     * @OA\Schema(type="integer")
     * ),
     * @OA\Response(
     * response=200,
     * description="Operação bem-sucedida"
     * ),
     * @OA\Response(
     * response=404,
     * description="Candidato não encontrado"
     * )
     * )
     */
    public function show(Candidato $candidato)
    {
        // Carrega o relacionamento com as vagas
        $candidato->load('vagas');
        return $candidato;
    }

    /**
     * @OA\Put(
     * path="/api/candidatos/{candidato}",
     * tags={"Candidatos"},
     * summary="Atualiza um candidato",
     * description="Atualiza os dados de um candidato existente.",
     * @OA\Parameter(
     * name="candidato",
     * in="path",
     * description="ID do candidato",
     * required=true,
     * @OA\Schema(type="integer")
     * ),
     * @OA\RequestBody(
     * required=true,
     * description="Dados do candidato para atualização",
     * @OA\JsonContent(
     * @OA\Property(property="nome", type="string", example="Bruno D."),
     * @OA\Property(property="email", type="string", format="email", example="bruno.novo@email.com"),
     * @OA\Property(property="telefone", type="string", example="(11) 91111-2222"),
     * )
     * ),
     * @OA\Response(
     * response=200,
     * description="Candidato atualizado com sucesso"
     * ),
     * @OA\Response(
     * response=422,
     * description="Erro de validação"
     * )
     * )
     */
    public function update(Request $request, Candidato $candidato)
    {
        $validator = Validator::make($request->all(), [
            'nome' => 'sometimes|required|string|max:255',
            // Ignora o email do próprio candidato na verificação de 'unique'
            'email' => 'sometimes|required|email|unique:candidatos,email,' . $candidato->id,
            'telefone' => 'nullable|string|max:20',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $candidato->update($validator->validated());

        return response()->json($candidato);
    }

    /**
     * @OA\Delete(
     * path="/api/candidatos/{candidato}",
     * tags={"Candidatos"},
     * summary="Exclui um candidato",
     * description="Remove o registro de um candidato do banco de dados.",
     * @OA\Parameter(
     * name="candidato",
     * in="path",
     * description="ID do candidato",
     * required=true,
     * @OA\Schema(type="integer")
     * ),
     * @OA\Response(
     * response=204,
     * description="Excluído com sucesso (No Content)"
     * )
     * )
     */
    public function destroy(Candidato $candidato)
    {
        $candidato->delete();

        return response()->noContent(); // Resposta 204
    }
}