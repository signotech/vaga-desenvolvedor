<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;

/**
 * @OA\Info(
 *     version="1.0.0",
 *     title="API de Vagas",
 *     description="Documentação da API de Vagas usando Swagger",
 *     @OA\Contact(
 *         email="seuemail@exemplo.com"
 *     )
 * )
 */

class UserController extends Controller
{
    protected $service;

    public function __construct(UserService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
         $this->authorize('viewAny', User::class);
        return response()->json($this->service->all());
    }

    /**
 * @OA\Post(
 *     path="/api/users",
 *     summary="Cria um novo usuário",
 *     tags={"Usuários"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"name","email","password","password_confirmation","user_type"},
 *             @OA\Property(property="name", type="string", example="Mateus Silva"),
 *             @OA\Property(property="email", type="string", format="email", example="mateus@example.com"),
 *             @OA\Property(property="password", type="string", format="password", example="123456"),
 *             @OA\Property(property="password_confirmation", type="string", format="password", example="123456"),
 *             @OA\Property(property="user_type", type="integer", example=1),
 *         ),
 *     ),
 *     @OA\Response(
 *         response=201,
 *         description="Usuário criado com sucesso",
 *         @OA\JsonContent(
 *             @OA\Property(property="user", type="object"),
 *             @OA\Property(property="token", type="string")
 *         )
 *     ),
 *     @OA\Response(response=422, description="Erro de validação"),
 * )
 */
public function store(Request $request)
{
    $request->merge([
        'user_type' => $request->input('user_type', 1)
    ]);

    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|min:6|confirmed',
        'user_type' => 'in:1,2',
    ]);

    $user = $this->service->create($validated);

    $token = JWTAuth::fromUser($user);

    return response()->json([
        'user' => $user,
        'token' => $token,
    ], 201);
}

/**
 * @OA\Get(
 *     path="/api/users/{id}",
 *     summary="Mostra um usuário específico",
 *     tags={"Usuários"},
 *     security={{"bearerAuth":{}}},
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         description="ID do usuário",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Detalhes do usuário",
 *         @OA\JsonContent(ref="#/components/schemas/User")
 *     ),
 *     @OA\Response(response=404, description="Usuário não encontrado"),
 *     @OA\Response(response=401, description="Não autorizado"),
 * )
 */
    public function show($id)
    {
        return response()->json($this->service->find($id));
    }

    /**
 * @OA\Get(
 *     path="/api/candidates",
 *     summary="Lista todos os candidatos (user_type = 1)",
 *     tags={"Usuários"},
 *     security={{"bearerAuth":{}}},
 *     @OA\Response(
 *         response=200,
 *         description="Lista de candidatos",
 *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/User"))
 *     ),
 *     @OA\Response(response=401, description="Não autorizado"),
 * )
 */
    public function candidates()
    {
        $candidates = User::where('user_type', 1)->get();
        return response()->json($candidates);
    }


/**
 * @OA\Get(
 *     path="/api/employers",
 *     summary="Lista todos os empregadores (user_type = 2)",
 *     tags={"Usuários"},
 *     security={{"bearerAuth":{}}},
 *     @OA\Response(
 *         response=200,
 *         description="Lista de empregadores",
 *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/User"))
 *     ),
 *     @OA\Response(response=401, description="Não autorizado"),
 * )
 */
    public function employers()
    {
        $employers = User::where('user_type', 2)->get();
        return response()->json($employers);
    }


    /**
 * @OA\Put(
 *     path="/api/users/{id}",
 *     summary="Atualiza um usuário",
 *     tags={"Usuários"},
 *     security={{"bearerAuth":{}}},
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         description="ID do usuário a ser atualizado",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="name", type="string", example="Mateus Silva"),
 *             @OA\Property(property="email", type="string", format="email", example="mateus@example.com"),
 *             @OA\Property(property="password", type="string", format="password", example="123456"),
 *             @OA\Property(property="password_confirmation", type="string", format="password", example="123456"),
 *             @OA\Property(property="user_type", type="integer", example=1)
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Usuário atualizado com sucesso",
 *         @OA\JsonContent(
 *             @OA\Property(property="user", ref="#/components/schemas/User"),
 *             @OA\Property(property="message", type="string", example="Usuário atualizado com sucesso")
 *         )
 *     ),
 *     @OA\Response(response=422, description="Erro de validação"),
 *     @OA\Response(response=401, description="Não autorizado"),
 *     @OA\Response(response=404, description="Usuário não encontrado")
 * )
 */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => "sometimes|required|email|unique:users,email,$id",
            'password' => 'nullable|min:6|confirmed',
            'user_type' => 'sometimes|in:1,2',
        ]);

        $user = $this->service->update($id, $validated);

        return response()->json([
            'user' => $user,
            'message' => 'Usuário atualizado com sucesso'
        ]);
    }

    /**
 * @OA\Delete(
 *     path="/api/users/{id}",
 *     summary="Deleta um usuário",
 *     tags={"Usuários"},
 *     security={{"bearerAuth":{}}},
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         description="ID do usuário a ser deletado",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(response=200, description="Usuário deletado com sucesso"),
 *     @OA\Response(response=401, description="Não autorizado"),
 *     @OA\Response(response=404, description="Usuário não encontrado")
 * )
 */
    public function destroy($id)
    {
        $this->service->delete($id);
        return response()->json(['message' => 'Usuário deletado com sucesso']);
    }
}
