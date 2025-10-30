@extends('layout.app')

@section('content')
    <h1>Inscrever Candidato: {{ $candidato->nome }}</h1>
    <p>Email: {{ $candidato->email }}</p>

    <hr>

    <form action="{{ route('inscricao.store', $candidato) }}" method="POST">
        @csrf

        <div class="form-group">
            <label>Selecione as vagas (ativas) para este candidato:</label>
            
            @forelse ($vagasAtivas as $vaga)
                <div style="margin-bottom: 0.5rem;">
                    <input 
                        type="checkbox" 
                        name="vagas[]" 
                        value="{{ $vaga->id }}" 
                        id="vaga-{{ $vaga->id }}"
                        
                        {{-- Marca o checkbox se o candidato já estiver inscrito --}}
                        @if(in_array($vaga->id, $vagasInscritasIds))
                            checked 
                        @endif
                    >
                    <label for="vaga-{{ $vaga->id }}">
                        <strong>{{ $vaga->titulo }}</strong> ({{ $vaga->tipo }})
                    </label>
                </div>
            @empty
                <p>Nenhuma vaga ativa encontrada no sistema para inscrição.</p>
            @endforelse
        </div>

        <button type="submit" class="btn btn-primary">Salvar Inscrições</button>
        <a href="{{ route('candidatos.index') }}" class="btn btn-secondary">Cancelar</a>
    </form>
@endsection