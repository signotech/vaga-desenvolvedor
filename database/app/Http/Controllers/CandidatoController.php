<?php

namespace App\Http\Controllers;

use App\Models\Candidato;
use App\Models\Vaga;
use Illuminate\Http\Request;

class CandidatoController extends Controller
{
    public function index(Request $request)
    {
        $query = Candidato::query();

        if ($request->filled('nome')) {
            $query->where('nome', 'like', "%{$request->nome}%");
        }
        if ($request->filled('email')) {
            $query->where('email', 'like', "%{$request->email}%");
        }

        $sort = $request->get('sort', 'id');
        $order = $request->get('order', 'desc');
        $query->orderBy($sort, $order);

        $candidatos = $query->paginate(20)->withQueryString();

        return view('candidatos.index', compact('candidatos'));
    }

    public function create()
    {
        $vagas = Vaga::where('ativa', true)->get();
        return view('candidatos.create', compact('vagas'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'required|email|unique:candidatos,email',
            'telefone' => 'nullable|string|max:20',
            'vagas' => 'nullable|array'
        ]);

        $candidato = Candidato::create($data);
        $candidato->vagas()->sync($data['vagas'] ?? []);

        return redirect()->route('candidatos.index')->with('success', 'Candidato criado!');
    }

    public function edit(Candidato $candidato)
    {
        $vagas = Vaga::where('ativa', true)->get();
        return view('candidatos.edit', compact('candidato', 'vagas'));
    }

    public function update(Request $request, Candidato $candidato)
    {
        $data = $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'required|email|unique:candidatos,email,' . $candidato->id,
            'telefone' => 'nullable|string|max:20',
            'vagas' => 'nullable|array'
        ]);

        $candidato->update($data);
        $candidato->vagas()->sync($data['vagas'] ?? []);

        return redirect()->route('candidatos.index')->with('success', 'Candidato atualizado!');
    }

    public function destroy(Candidato $candidato)
    {
        $candidato->delete();
        return redirect()->route('candidatos.index')->with('success', 'Candidato excluído!');
    }
}
