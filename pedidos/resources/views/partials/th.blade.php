@php
    $atual = request('ordem') === $campo;
    $proxima = $atual && request('direcao') === 'asc' ? 'desc' : 'asc';
    $seta = $atual ? (request('direcao') === 'desc' ? ' ▼' : ' ▲') : '';
@endphp
<th><a class="blue-grey-text text-darken-3" href="{{ request()->fullUrlWithQuery(['ordem' => $campo, 'direcao' => $proxima, 'page' => null]) }}">{{ $rotulo }}{{ $seta }}</a></th>
