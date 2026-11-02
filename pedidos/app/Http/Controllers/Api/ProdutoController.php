<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProdutoRequest;
use App\Http\Resources\ProdutoResource;
use App\Models\Produto;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProdutoController extends Controller
{

    public function index(Request $request)
    {
        return ProdutoResource::collection(
            $this->paginar(Produto::listar($request), $request)
        );
    }

    public function store(ProdutoRequest $request)
    {
        return (new ProdutoResource(Produto::create($request->validated())))
            ->response()->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(Produto $produto)
    {
        return new ProdutoResource($produto);
    }

    public function update(ProdutoRequest $request, Produto $produto)
    {
        $produto->update($request->validated());

        return new ProdutoResource($produto);
    }

    public function destroy(Produto $produto)
    {
        if ($produto->temVinculos()) {
            return response()->json(['message' => 'Este produto está em pedidos e não pode ser excluído.'], Response::HTTP_CONFLICT);
        }

        $produto->delete();

        return response()->noContent();
    }

    public function destroyMany(Request $request): JsonResponse
    {
        [$excluidos, $ignorados] = Produto::excluirSemVinculos($this->idsSelecionados($request));

        return response()->json(['excluidos' => $excluidos, 'ignorados' => $ignorados]);
    }
}
