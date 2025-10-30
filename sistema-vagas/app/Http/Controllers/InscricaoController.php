<?php

namespace App\Http\Controllers;

use App\Models\Candidato;
use App\Models\Vaga;
use Illuminate\Http\Request;

class InscricaoController extends Controller
{
    /**
     * Mostra o formulário para inscrever um candidato em vagas.
     *
     */
    public function create(Candidato $candidato)
    {
        $vagasAtivas = Vaga::where('status', 'ativa')->get();

        $vagasInscritasIds = $candidato->vagas->pluck('id')->toArray();

        return view('inscricao.create', compact('candidato', 'vagasAtivas', 'vagasInscritasIds'));
    }

    /**
     * Salva as inscrições (anexa o candidato às vagas) no banco de dados.
     *
     */
    public function store(Request $request, Candidato $candidato)
    {
        // Validação: Garante que 'vagas' seja um array e que cada ID exista na tabela 'vagas'
        $request->validate([
            'vagas' => 'nullable|array',
            'vagas.*' => 'exists:vagas,id',
        ]);

        // Pega os IDs das vagas do formulário. Se nada for enviado, usa um array vazio.
        $vagasIdsParaSincronizar = $request->input('vagas', []);

        // - Adiciona as vagas marcadas.
        // - Remove as vagas que foram desmarcadas.
        // - Mantém as que já estavam marcadas.
        $candidato->vagas()->sync($vagasIdsParaSincronizar);

        return redirect()->route('candidatos.index')->with('success', 'Inscrições do candidato atualizadas com sucesso.');
    }
}