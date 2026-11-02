<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ClienteRequest;
use App\Http\Resources\ClienteResource;
use App\Models\Cliente;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ClienteController extends Controller
{
    private const CAMPOS = ['id', 'nome', 'cpf', 'email'];

    public function index(Request $request)
    {
        return ClienteResource::collection(
            Cliente::listar($request, self::CAMPOS)->paginate($this->porPagina($request))->withQueryString()
        );
    }

    public function store(ClienteRequest $request)
    {
        return (new ClienteResource(Cliente::create($request->validated())))
            ->response()->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(Cliente $cliente)
    {
        return new ClienteResource($cliente);
    }

    public function update(ClienteRequest $request, Cliente $cliente)
    {
        $cliente->update($request->validated());

        return new ClienteResource($cliente);
    }

    public function destroy(Cliente $cliente)
    {
        if ($cliente->pedidos()->exists()) {
            return response()->json(['message' => 'Este cliente possui pedidos e não pode ser excluído.'], Response::HTTP_CONFLICT);
        }

        $cliente->delete();

        return response()->noContent();
    }

    public function destroyMany(Request $request): JsonResponse
    {
        [$excluidos, $ignorados] = Cliente::excluirSemVinculos($this->idsSelecionados($request));

        return response()->json(['excluidos' => $excluidos, 'ignorados' => $ignorados]);
    }
}
