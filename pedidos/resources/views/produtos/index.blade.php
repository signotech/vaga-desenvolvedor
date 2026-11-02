@extends('layouts.app')
@section('titulo', 'Produtos')

@section('conteudo')
    <div class="topo">
        <h1>Produtos</h1>
        <a class="btn" href="{{ route('produtos.create') }}">Novo produto</a>
    </div>
    <div class="card">
        <form method="GET" id="filtro"></form>
        <table>
            <thead>
                <tr>
                    @include('partials.th', ['campo' => 'id', 'rotulo' => 'Código'])
                    @include('partials.th', ['campo' => 'sku', 'rotulo' => 'SKU'])
                    @include('partials.th', ['campo' => 'titulo', 'rotulo' => 'Título'])
                    @include('partials.th', ['campo' => 'preco', 'rotulo' => 'Preço'])
                    @include('partials.th', ['campo' => 'estoque', 'rotulo' => 'Estoque'])
                    <th>Ações</th>
                </tr>
                <tr class="filtros">
                    @foreach (['id', 'sku', 'titulo', 'preco', 'estoque'] as $campo)
                        <th><input form="filtro" name="{{ $campo }}" value="{{ request($campo) }}" placeholder="Filtrar"></th>
                    @endforeach
                    <th class="acoes">
                        <button form="filtro" class="btn peq">Filtrar</button>
                        <a class="btn peq sec" href="{{ route('produtos.index') }}">Limpar</a>
                    </th>
                </tr>
            </thead>
            <tbody>
                @forelse ($produtos as $produto)
                    <tr>
                        <td>{{ $produto->id }}</td>
                        <td>{{ $produto->sku }}</td>
                        <td>{{ $produto->titulo }}</td>
                        <td>R$ {{ number_format($produto->preco, 2, ',', '.') }}</td>
                        <td>{{ $produto->estoque }}</td>
                        <td class="acoes">
                            <a class="btn peq sec" href="{{ route('produtos.edit', $produto) }}">Editar</a>
                            @include('partials.excluir', ['url' => route('produtos.destroy', $produto)])
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="6">Nenhum produto encontrado.</td></tr>
                @endforelse
            </tbody>
        </table>
        {{ $produtos->links() }}
    </div>
@endsection
