<div class="barra">
    <form method="POST" id="massa" action="{{ route($rota) }}" onsubmit="return confirm('Tem certeza que deseja excluir os registros selecionados?')">
        @csrf
        @method('DELETE')
        <button class="btn peq perigo">Excluir selecionados</button>
    </form>

    <form method="GET">
        @foreach (request()->except(['por_pagina', 'page']) as $nome => $valor)
            <input type="hidden" name="{{ $nome }}" value="{{ $valor }}">
        @endforeach
        <label for="por_pagina">Itens por página</label>
        <select id="por_pagina" name="por_pagina" onchange="this.form.submit()">
            @foreach (App\Http\Controllers\Controller::POR_PAGINA as $opcao)
                <option value="{{ $opcao }}" @selected($itens->perPage() === $opcao)>{{ $opcao }}</option>
            @endforeach
        </select>
    </form>
</div>
