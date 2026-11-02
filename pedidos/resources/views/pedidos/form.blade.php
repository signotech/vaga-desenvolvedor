@extends('layouts.app')
@section('titulo', $pedido->exists ? 'Editar pedido' : 'Novo pedido')

@php
    $itens = old('itens', $pedido->itens->map(fn ($i) => ['produto_id' => $i->produto_id, 'quantidade' => $i->quantidade])->all());
    if (! $itens) {
        $itens = [['produto_id' => '', 'quantidade' => 1]];
    }
@endphp

@section('conteudo')
    <div class="topo"><h1>{{ $pedido->exists ? 'Editar pedido #' . $pedido->id : 'Novo pedido' }}</h1></div>
    <div class="card">
        <form method="POST" class="card-content" action="{{ $pedido->exists ? route('pedidos.update', $pedido) : route('pedidos.store') }}">
            @csrf
            @if ($pedido->exists) @method('PUT') @endif

            <div class="input-field">
                <select id="cliente_id" name="cliente_id">
                    <option value="">Selecione</option>
                    @foreach ($clientes as $cliente)
                        <option value="{{ $cliente->id }}" @selected(old('cliente_id', $pedido->cliente_id) == $cliente->id)>{{ $cliente->nome }}</option>
                    @endforeach
                </select>
                <label for="cliente_id">Cliente</label>
                @error('cliente_id') <span class="helper-text red-text">{{ $message }}</span> @enderror
            </div>

            <div class="input-field">
                <input id="data_pedido" type="datetime-local" name="data_pedido"
                       value="{{ old('data_pedido', optional($pedido->data_pedido)->format('Y-m-d\TH:i')) }}">
                <label for="data_pedido" class="active">Data</label>
                @error('data_pedido') <span class="helper-text red-text">{{ $message }}</span> @enderror
            </div>

            <div class="input-field">
                <select id="status" name="status">
                    @foreach (App\Models\Pedido::STATUS as $status)
                        <option value="{{ $status }}" @selected(old('status', $pedido->status ?? 'Em Aberto') === $status)>{{ $status }}</option>
                    @endforeach
                </select>
                <label for="status">Status</label>
                @error('status') <span class="helper-text red-text">{{ $message }}</span> @enderror
            </div>

            <div class="input-field">
                <input id="desconto" type="number" step="0.01" min="0" max="100" name="desconto"
                       value="{{ old('desconto', $pedido->desconto ?? 0) }}">
                <label for="desconto">Desconto (%)</label>
                @error('desconto') <span class="helper-text red-text">{{ $message }}</span> @enderror
            </div>

            <h5>Produtos</h5>
            @error('itens') <span class="helper-text red-text">{{ $message }}</span> @enderror
            <div id="itens">
                @foreach ($itens as $i => $item)
                    <div class="item">
                        <div class="input-field produto">
                            <select name="itens[{{ $i }}][produto_id]">
                                <option value="">Produto</option>
                                @foreach ($produtos as $produto)
                                    <option value="{{ $produto->id }}" @selected($item['produto_id'] == $produto->id)>
                                        {{ $produto->sku }} - {{ $produto->titulo }} (R$ {{ number_format($produto->preco, 2, ',', '.') }})
                                    </option>
                                @endforeach
                            </select>
                            @error("itens.$i.produto_id") <span class="helper-text red-text">{{ $message }}</span> @enderror
                        </div>
                        <div class="input-field quantidade">
                            <input type="number" min="1" name="itens[{{ $i }}][quantidade]" value="{{ $item['quantidade'] }}" placeholder="Qtd">
                            @error("itens.$i.quantidade") <span class="helper-text red-text">{{ $message }}</span> @enderror
                        </div>
                        <button type="button" class="btn-small red darken-2" style="margin-top: 0.9rem" onclick="removerItem(this)">X</button>
                    </div>
                @endforeach
            </div>
            <p><button type="button" class="btn-small grey" onclick="adicionarItem()">+ Adicionar produto</button></p>

            <button class="btn blue-grey darken-3">Salvar</button>
            <a class="btn grey" href="{{ route('pedidos.index') }}">Cancelar</a>
        </form>
    </div>

    <script>
        let indice = {{ count($itens) }};

        function adicionarItem() {
            const container = document.getElementById('itens');
            const primeira = container.querySelector('.item');
            const linha = primeira.cloneNode(true);

            // desfaz o select do Materialize na copia e recria
            const campo = linha.querySelector('.produto');
            const select = campo.querySelector('select');
            campo.innerHTML = '';
            campo.appendChild(select);
            campo.querySelectorAll('.helper-text').forEach(e => e.remove());
            select.classList.remove('initialized');
            select.name = `itens[${indice}][produto_id]`;
            select.value = '';
            linha.querySelectorAll('.quantidade .helper-text').forEach(e => e.remove());
            linha.querySelector('.quantidade input').name = `itens[${indice}][quantidade]`;
            linha.querySelector('.quantidade input').value = 1;

            container.appendChild(linha);
            M.FormSelect.init(select);
            indice++;
        }

        function removerItem(botao) {
            if (document.querySelectorAll('#itens .item').length > 1) {
                botao.closest('.item').remove();
            }
        }
    </script>
@endsection
