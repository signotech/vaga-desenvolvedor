@extends('layouts.app')
@section('titulo', $pedido->exists ? 'Editar pedido' : 'Novo pedido')

@php
    $itens = old('itens', $pedido->itens->map(fn ($i) => ['produto_id' => $i->produto_id, 'quantidade' => $i->quantidade])->all());
    if (! $itens) {
        $itens = [['produto_id' => '', 'quantidade' => 1]];
    }
@endphp

@section('conteudo')
    <h1>{{ $pedido->exists ? 'Editar pedido #' . $pedido->id : 'Novo pedido' }}</h1>
    <div class="card">
        <form method="POST" action="{{ $pedido->exists ? route('pedidos.update', $pedido) : route('pedidos.store') }}">
            @csrf
            @if ($pedido->exists) @method('PUT') @endif

            <div class="campo">
                <label for="cliente_id">Cliente</label>
                <select id="cliente_id" name="cliente_id">
                    <option value="">Selecione</option>
                    @foreach ($clientes as $cliente)
                        <option value="{{ $cliente->id }}" @selected(old('cliente_id', $pedido->cliente_id) == $cliente->id)>{{ $cliente->nome }}</option>
                    @endforeach
                </select>
                @error('cliente_id') <div class="invalido">{{ $message }}</div> @enderror
            </div>

            <div class="campo">
                <label for="data_pedido">Data</label>
                <input id="data_pedido" type="datetime-local" name="data_pedido"
                       value="{{ old('data_pedido', optional($pedido->data_pedido)->format('Y-m-d\TH:i')) }}">
                @error('data_pedido') <div class="invalido">{{ $message }}</div> @enderror
            </div>

            <div class="campo">
                <label for="status">Status</label>
                <select id="status" name="status">
                    @foreach (App\Models\Pedido::STATUS as $status)
                        <option value="{{ $status }}" @selected(old('status', $pedido->status ?? 'Em Aberto') === $status)>{{ $status }}</option>
                    @endforeach
                </select>
                @error('status') <div class="invalido">{{ $message }}</div> @enderror
            </div>

            <h3>Produtos</h3>
            @error('itens') <div class="invalido">{{ $message }}</div> @enderror
            <div id="itens">
                @foreach ($itens as $i => $item)
                    <div class="campo item" style="display:flex; gap:8px;">
                        <select name="itens[{{ $i }}][produto_id]">
                            <option value="">Produto</option>
                            @foreach ($produtos as $produto)
                                <option value="{{ $produto->id }}" @selected($item['produto_id'] == $produto->id)>
                                    {{ $produto->sku }} - {{ $produto->titulo }} (R$ {{ number_format($produto->preco, 2, ',', '.') }})
                                </option>
                            @endforeach
                        </select>
                        <input type="number" min="1" name="itens[{{ $i }}][quantidade]" value="{{ $item['quantidade'] }}" style="width:90px">
                        <button type="button" class="btn peq perigo" onclick="removerItem(this)">X</button>
                    </div>
                    @error("itens.$i.produto_id") <div class="invalido">{{ $message }}</div> @enderror
                    @error("itens.$i.quantidade") <div class="invalido">{{ $message }}</div> @enderror
                @endforeach
            </div>
            <p><button type="button" class="btn peq sec" onclick="adicionarItem()">+ Adicionar produto</button></p>

            <button class="btn">Salvar</button>
            <a class="btn sec" href="{{ route('pedidos.index') }}">Cancelar</a>
        </form>
    </div>

    <script>
        let indice = {{ count($itens) }};

        function adicionarItem() {
            const container = document.getElementById('itens');
            const linha = container.querySelector('.item').cloneNode(true);
            linha.querySelector('select').name = `itens[${indice}][produto_id]`;
            linha.querySelector('select').value = '';
            linha.querySelector('input').name = `itens[${indice}][quantidade]`;
            linha.querySelector('input').value = 1;
            container.appendChild(linha);
            indice++;
        }

        function removerItem(botao) {
            if (document.querySelectorAll('#itens .item').length > 1) {
                botao.closest('.item').remove();
            }
        }
    </script>
@endsection
