<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;

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


    public function show($id)
    {
        return response()->json($this->service->find($id));
    }

    public function candidates()
    {
        $candidates = User::where('user_type', 1)->get();
        return response()->json($candidates);
    }

    public function employers()
    {
        $employers = User::where('user_type', 2)->get();
        return response()->json($employers);
    }

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

    public function destroy($id)
    {
        $this->service->delete($id);
        return response()->json(['message' => 'Usuário deletado com sucesso']);
    }
}
