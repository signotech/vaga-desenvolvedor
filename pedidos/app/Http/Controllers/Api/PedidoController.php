<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PedidoRequest;
use App\Http\Resources\PedidoResource;
use App\Models\Pedido;
use App\Services\PedidoService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PedidoController extends Controller
{
    public function __construct(private PedidoService $pedidos)
    {
    }

    public function index(Request $request)
    {
        $pedidos = $this->paginar(Pedido::listar($request), $request);
        $pedidos->getCollection()->load('cliente', 'itens.produto');

        return PedidoResource::collection($pedidos);
    }

    public function store(PedidoRequest $request)
    {
        $pedido = $this->pedidos->criar($request->validated());

        return (new PedidoResource($this->completo($pedido)))
            ->response()->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(Pedido $pedido)
    {
        return new PedidoResource($this->completo($pedido));
    }

    public function update(PedidoRequest $request, Pedido $pedido)
    {
        $this->pedidos->atualizar($pedido, $request->validated());

        return new PedidoResource($this->completo($pedido));
    }

    public function destroy(Pedido $pedido)
    {
        $pedido->delete();

        return response()->noContent();
    }

    public function destroyMany(Request $request): JsonResponse
    {
        $excluidos = Pedido::whereIn('id', $this->idsSelecionados($request))->delete();

        return response()->json(['excluidos' => $excluidos, 'ignorados' => 0]);
    }

    private function completo(Pedido $pedido): Pedido
    {
        return $pedido->fresh(['cliente', 'itens.produto']);
    }
}
