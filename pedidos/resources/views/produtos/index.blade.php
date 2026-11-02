@extends('layouts.app')
@section('titulo', 'Produtos')

@section('conteudo')
    <div class="topo">
        <h1>Produtos</h1>
        <a class="btn blue-grey darken-3" href="{{ route('produtos.create') }}">Novo produto</a>
    </div>
    <div class="card">
        <div class="card-content">
            @include('partials.barra', ['rota' => 'produtos.destroy-many', 'itens' => $produtos])
            <form method="GET" id="filtro"></form>
            <div class="tabela"><table class="striped">
                <thead>
                    <tr>
                        <th><label><input type="checkbox" onclick="document.querySelectorAll('input[form=massa]').forEach(c => c.checked = this.checked)"><span></span></label></th>
                        @include('partials.th', ['campo' => 'id', 'rotulo' => 'Código'])
                        @include('partials.th', ['campo' => 'sku', 'rotulo' => 'SKU'])
                        @include('partials.th', ['campo' => 'titulo', 'rotulo' => 'Título'])
                        @include('partials.th', ['campo' => 'preco', 'rotulo' => 'Preço'])
                        @include('partials.th', ['campo' => 'estoque', 'rotulo' => 'Estoque'])
                        <th>Ações</th>
                    </tr>
                    <tr class="filtros">
                        <th></th>
                        @foreach (['id', 'sku', 'titulo', 'preco', 'estoque'] as $campo)
                            <th><input form="filtro" name="{{ $campo }}" value="{{ request($campo) }}" placeholder="Filtrar"></th>
                        @endforeach
                        <th class="acoes">
                            <button form="filtro" class="btn-small blue-grey darken-3">Filtrar</button>
                            <a class="btn-small grey" href="{{ route('produtos.index') }}">Limpar</a>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($produtos as $produto)
                        <tr>
                            <td><label><input type="checkbox" form="massa" name="ids[]" value="{{ $produto->id }}"><span></span></label></td>
                            <td>{{ $produto->id }}</td>
                            <td>{{ $produto->sku }}</td>
                            <td>{{ $produto->titulo }}</td>
                            <td>R$ {{ number_format($produto->preco, 2, ',', '.') }}</td>
                            <td>{{ $produto->estoque }}</td>
                            <td class="acoes">
                                <a class="btn-small grey" href="{{ route('produtos.edit', $produto) }}">Editar</a>
                                @include('partials.excluir', ['url' => route('produtos.destroy', $produto)])
                            </td>
                        </tr>
                    @empty
                        <tr><td colspan="7">Nenhum produto encontrado.</td></tr>
                    @endforelse
                </tbody>
            </table></div>
            {{ $produtos->links() }}
        </div>
    </div>
@endsection
