@extends('layouts.main')

@section('content')

    <div class="container mt-5">
        <h3 class="text-center mb-4">Ver Pedido</h3>

        <!-- Exibição dos detalhes do pedido -->
        <form>
            <div class="mb-3">
                <label for="cliente" class="form-label">Cliente</label>
                <input type="text" name="cliente" value="{{ $pedido->cliente->nome }}" class="form-control" readonly>
                <a href="{{ route('clientes.show', $pedido->cliente->id) }}" class="btn btn-link mt-2">Ver Cliente</a>
            </div>

            <div class="mb-3">
                <label for="status" class="form-label">Status</label>
                <input type="text" name="status" value="{{ $pedido->status }}" class="form-control" readonly>
            </div>

            <div class="mb-3">
                <label for="produtos" class="form-label">Produtos</label>
                <ul>
                    @foreach($pedido->produtos as $produto)
                        <li>
                            <input type="text" class="form-control" value="{{ $produto->id }} - {{ $produto->titulo }} - Quantidade: {{ $produto->pivot->quantidade_produto }} - R$ {{ number_format($produto->pivot->valor_produto, 2, ',', '.') }}" readonly>
                            <a href="{{ route('produtos.show', $produto->id) }}" class="btn btn-link mt-2">Ver Produto</a>
                        </li>
                    @endforeach
                </ul>
            </div>

            <div class="mb-3">
                <label for="valor_total" class="form-label">Valor Total</label>
                <input type="text" name="valor_total" value="R$ {{ number_format($pedido->valor_total, 2, ',', '.') }}" class="form-control" readonly>
            </div>

            <div class="mb-3">
                <label for="created_at" class="form-label">Criado em</label>
                <input type="text" name="created_at" value="{{ \Carbon\Carbon::parse($pedido->created_at)->format('d/m/Y H:i:s') }}" class="form-control" readonly>
            </div>

            <div class="mb-3">
                <label for="updated_at" class="form-label">Atualizado em</label>
                <input type="text" name="updated_at" value="{{ \Carbon\Carbon::parse($pedido->updated_at)->format('d/m/Y H:i:s') }}" class="form-control" readonly>
            </div>

            <div class="d-flex justify-content-center gap-2">
                <!-- Botão de Voltar -->
                <a href="{{ route('pedidos.index') }}" class="btn btn-secondary">Voltar</a>
            
                <!-- Botão de Editar -->
                <a href="{{ route('pedidos.edit', $pedido->id) }}" class="btn btn-primary">Editar</a>
            
                <!-- Formulário de Excluir -->
                <form action="{{ route('pedidos.destroy', $pedido->id) }}" method="post" onsubmit="return confirmDelete(event);" style="display: inline;">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="btn btn-danger">Excluir</button>
                </form>
            </div>
        </form>
    </div>

    <!-- Script de Confirmação de Exclusão -->
    <script>
        function confirmDelete(event) {
            event.preventDefault();

            if (confirm("Tem certeza que deseja excluir este pedido?")) {
                event.target.submit();
            }
        }
    </script>

@endsection
