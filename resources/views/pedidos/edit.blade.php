@extends('layouts.main')

@section('content')

    <div class="container mt-5">
        <h3 class="text-center mb-4">Editar Pedido</h3>

        <div class="card p-4 shadow-sm">
            <form action="{{ route('pedidos.update', $pedido->id) }}" method="POST">
                @csrf
                @method('PUT')

                @error('produtos.*')
                    <div class="alert alert-danger mt-2">{{ $message }}</div>
                @enderror
                @error('produtos')
                    <div class="alert alert-danger mt-2">{{ $message }}</div>
                @enderror
                @error('quantidades.*')
                    <div class="alert alert-danger mt-2">{{ $message }}</div>
                @enderror

                <!-- Cliente -->
                <div class="mb-3">
                    <label for="cliente_id" class="form-label">Cliente</label>
                    <select name="cliente_id" id="cliente_id" class="form-select">
                        <option value="">Selecione um Cliente</option>
                        @foreach($clientes as $cliente)
                            <option value="{{ $cliente->id }}" {{ old('cliente_id', $pedido->cliente_id) == $cliente->id ? 'selected' : '' }}>
                                {{ $cliente->nome }}
                            </option>
                        @endforeach
                    </select>
                    @error('cliente_id')
                        <div class="alert alert-danger mt-2">{{ $message }}</div>
                    @enderror
                </div>

                <!-- Status -->
                <div class="mb-3">
                    <label for="status" class="form-label">Status</label>
                    <select name="status" id="status" class="form-select">
                        <option value="Em Aberto" {{ old('status', $pedido->status) == 'Em Aberto' ? 'selected' : '' }}>Em Aberto</option>
                        <option value="Pago" {{ old('status', $pedido->status) == 'Pago' ? 'selected' : '' }}>Pago</option>
                        <option value="Cancelado" {{ old('status', $pedido->status) == 'Cancelado' ? 'selected' : '' }}>Cancelado</option>
                    </select>
                    @error('status')
                        <div class="alert alert-danger mt-2">{{ $message }}</div>
                    @enderror
                </div>

                <!-- Produtos -->
                <div class="mb-3">
                    <label for="produtos" class="form-label">Produtos</label>
                    <div id="produtos-container">
                        @foreach($pedido->produtos as $index => $produto)
                            <div class="produto-item d-flex align-items-center mt-2">
                                <!-- Produto Select -->
                                <div class="me-2" style="flex: 1;">
                                    <select name="produtos[]" class="form-select">
                                        <option value="">Selecione um Produto</option>
                                        @foreach($produtos as $produtoOp)
                                            <option value="{{ $produtoOp->id }}" {{ $produtoOp->id == $produto->id ? 'selected' : '' }}>
                                                {{ $produtoOp->id }} - 
                                                {{ $produtoOp->titulo }} - 
                                                R$ {{ number_format($produtoOp->preco, 2, ',', '.') }} -
                                                Quant. {{ $produtoOp->estoque }}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>

                                <!-- Quantidade Input -->
                                <div class="me-2" style="flex: 1;">
                                    <input type="number" name="quantidades[]" class="form-control" placeholder="Quantidade" min="1" value="{{ $pedido->produtos[$index]->pivot->quantidade_produto }}">
                                </div>

                                <!-- Remover Button -->
                                <div>
                                    <button type="button" class="remove-produto btn btn-danger" onclick="removerProduto(this)">Remover Produto</button>
                                </div>
                            </div>
                        @endforeach
                    </div>
                    <button type="button" id="add-produto" class="btn btn-primary mt-3">Adicionar Produto</button>
                </div>

                <div class="d-flex justify-content-between mt-4">
                    <a href="{{ route('pedidos.index') }}" class="btn btn-secondary">Voltar</a>
                    <button type="submit" class="btn btn-success">Editar</button>
                </div>
            </form>
        </div>
    </div>

    <script>
        document.addEventListener("DOMContentLoaded", function () {
            const produtosContainer = document.getElementById("produtos-container");
            const addProdutoBtn = document.getElementById("add-produto");

            addProdutoBtn.addEventListener("click", function () {
                const novoProduto = document.querySelector(".produto-item").cloneNode(true);
                novoProduto.querySelector("select").value = "";
                novoProduto.querySelector("input").value = "";
                produtosContainer.appendChild(novoProduto);
            });
        });

        function removerProduto(botao) {
            const produtoItem = botao.closest('.produto-item');
            const produtos = document.querySelectorAll(".produto-item");
            if (produtos.length > 1) {
                produtoItem.remove();
            }
        }
    </script>

@endsection
