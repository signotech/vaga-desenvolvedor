<?php

namespace App\Http\Controllers;

use App\Models\Candidato;
use Illuminate\Http\Request;
// Use os Form Requests que você já criou:
use App\Http\Requests\StoreCandidatoRequest;
use App\Http\Requests\UpdateCandidatoRequest;

class CandidatoController extends Controller
{
    public function index(Request $request)
    {
        $query = Candidato::query();

        // Filtros
        if ($request->filled('nome')) {
            $query->where('nome', 'like', '%' . $request->nome . '%');
        }
        if ($request->filled('email')) {
            $query->where('email', 'like', '%' . $request->email . '%');
        }

        // Ordenação
        $sort_by = $request->get('sort_by', 'created_at');
        $sort_dir = $request->get('sort_dir', 'desc');
        $query->orderBy($sort_by, $sort_dir);

        $perPage = $request->get('per_page', 20);
        
        // Paginação
        $candidatos = $query->paginate($perPage)->withQueryString();

        return view('candidatos.index', compact('candidatos'));
    }

    public function create()
    {
        return view('candidatos.create');
    }

    public function store(StoreCandidatoRequest $request)
    {
        Candidato::create($request->validated());
        return redirect()->route('candidatos.index')->with('success', 'Candidato criado com sucesso.');
    }

    public function edit(Candidato $candidato)
    {
        return view('candidatos.edit', compact('candidato'));
    }

    public function update(UpdateCandidatoRequest $request, Candidato $candidato)
    {
        $candidato->update($request->validated());
        return redirect()->route('candidatos.index')->with('success', 'Candidato atualizado com sucesso.');
    }

    public function destroy(Candidato $candidato)
    {
        $candidato->delete();
        return redirect()->route('candidatos.index')->with('success', 'Candidato excluído com sucesso.');
    }
}