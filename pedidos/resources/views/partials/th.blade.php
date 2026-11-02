@php
    $atual = request('ordem') === $campo;
    $proxima = $atual && request('direcao') === 'asc' ? 'desc' : 'asc';
    $seta = $atual ? (request('direcao') === 'desc' ? ' ▼' : ' ▲') : '';
@endphp
<th><a href="{{ request()->fullUrlWithQuery(['ordem' => $campo, 'direcao' => $proxima, 'page' => null]) }}">{{ $rotulo }}{{ $seta }}</a></th>
