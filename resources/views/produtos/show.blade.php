@extends('layouts.main')

@section('content')

    <div class="container mt-5">
        <h3 class="text-center mb-4">Ver Produto</h3>

        <!-- Exibição dos detalhes do produto -->
        <div class="mb-3">
            <label for="titulo" class="form-label">Título</label>
            <input type="text" name="titulo" value="{{ old('titulo', $produto->titulo) }}" class="form-control" readonly>
        </div>

        <div class="mb-3">
            <label for="preco" class="form-label">Preço</label>
            <input type="text" name="preco" value="R$ {{ number_format($produto->preco, 2, ',', '.') }}" class="form-control" readonly>
        </div>

        <div class="mb-3">
            <label for="estoque" class="form-label">Estoque</label>
            <input type="text" name="estoque" value="{{ old('estoque', $produto->estoque) }}" class="form-control" readonly>
        </div>

        <div class="mb-3">
            <label for="codigo_sku" class="form-label">Código SKU</label>
            <input type="text" name="codigo_sku" value="{{ old('codigo_sku', $produto->codigo_sku) }}" class="form-control" readonly>
        </div>

        <div class="mb-3">
            <label for="created_at" class="form-label">Criado em</label>
            <input type="text" value="{{ \Carbon\Carbon::parse($produto->created_at)->format('d/m/Y H:i:s') }}" class="form-control" readonly>
        </div>

        <div class="mb-3">
            <label for="updated_at" class="form-label">Editado em</label>
            <input type="text" value="{{ \Carbon\Carbon::parse($produto->updated_at)->format('d/m/Y H:i:s') }}" class="form-control" readonly>
        </div>

        <div class="d-flex justify-content-center gap-2">
            <!-- Botão de Voltar -->
            <a href="{{ route('produtos.index') }}" class="btn btn-secondary">Voltar</a>
        
            <!-- Botão de Editar -->
            <a href="{{ route('produtos.edit', $produto->id) }}" class="btn btn-primary">Editar</a>
        
            <!-- Formulário de Excluir -->
            <form action="{{ route('produtos.destroy', $produto->id) }}" method="post" onsubmit="return confirmDelete(event);" style="display: inline;">
                @csrf
                @method('DELETE')
                <button type="submit" class="btn btn-danger">Excluir</button>
            </form>
        </div>

    <!-- Script de Confirmação de Exclusão -->
    <script>
        function confirmDelete(event) {
            event.preventDefault();

            if (confirm("Tem certeza que deseja excluir este produto?")) {
                event.target.submit();
            }
        }
    </script>

@endsection
