@extends('layouts.main')

@section('content')
    <h1>Editar Pedido</h1>

    <form action="{{ route('pedidos.update', $pedido->id) }}" method="POST">
        @csrf
        @method('PUT')  <!-- Método PUT para atualização -->

        <label for="cliente_id">Cliente:</label>
        <select name="cliente_id" id="cliente_id">
            <option value="">Selecione um Cliente</option>
            @foreach($clientes as $cliente)
                <option value="{{ $cliente->id }}" {{ $cliente->id == $pedido->cliente_id ? 'selected' : '' }}>
                    {{ $cliente->nome }}
                </option>
            @endforeach
        </select>
        @error('cliente_id')
            <p style="color: red;">{{ $message }}</p>
        @enderror

        <br><br>

        <label for="status">Status:</label>
        <select name="status" id="status">
            <option value="Em Aberto" {{ $pedido->status == 'Em Aberto' ? 'selected' : '' }}>Em Aberto</option>
            <option value="Pago" {{ $pedido->status == 'Pago' ? 'selected' : '' }}>Pago</option>
            <option value="Cancelado" {{ $pedido->status == 'Cancelado' ? 'selected' : '' }}>Cancelado</option>
        </select>
        @error('status')
            <p style="color: red;">{{ $message }}</p>
        @enderror

        <br><br>

        <label>Produtos:</label>
        <div id="produtos-container">
            @foreach($pedido->produtos as $index => $produto)
                <div class="produto-item">
                    <select name="produtos[]">
                        <option value="">Selecione um Produto</option>
                        @foreach($produtos as $produtoOp)
                            <option value="{{ $produtoOp->id }}" {{ $produtoOp->id == $produto->id ? 'selected' : '' }}>
                                {{ $produtoOp->titulo }} - R$ {{ number_format($produtoOp->preco, 2, ',', '.') }}
                            </option>
                        @endforeach
                    </select>
                    @error('produtos.*')
                        <p style="color: red;">{{ $message }}</p>
                    @enderror

                    <input type="number" name="quantidades[]" placeholder="Quantidade" min="1" value="{{ $pedido->produtos[$index]->pivot->quantidade_produto }}">
                    @error('quantidades.*')
                        <p style="color: red;">{{ $message }}</p>
                    @enderror

                    <button type="button" class="remove-produto" onclick="removerProduto(this)">X</button>
                </div>
            @endforeach
        </div>

        <br>
        <button type="button" id="add-produto">Adicionar Produto</button>

        <br><br>

        <button type="submit">Atualizar Pedido</button>
    </form>

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
            const produtos = document.querySelectorAll(".produto-item");
            if (produtos.length > 1) {
                botao.parentElement.remove();
            }
        }
    </script>

@endsection
