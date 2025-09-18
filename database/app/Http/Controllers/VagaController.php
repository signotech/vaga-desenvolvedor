<?php

namespace App\Http\Controllers;

use App\Models\Vaga;
use Illuminate\Http\Request;

class VagaController extends Controller
{
    public function index(Request $request)
    {
        $query = Vaga::query();

        // Filtros
        if ($request->filled('titulo')) {
            $query->where('titulo', 'like', "%{$request->titulo}%");
        }
        if ($request->filled('tipo')) {
            $query->where('tipo', $request->tipo);
        }
        if ($request->filled('ativa')) {
            $query->where('ativa', $request->ativa);
        }

        // Ordenação
        $sort = $request->get('sort', 'id');
        $order = $request->get('order', 'desc');
        $query->orderBy($sort, $order);

        $vagas = $query->paginate(20)->withQueryString();

        return view('vagas.index', compact('vagas'));
    }

    public function create()
    {
        return view('vagas.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'titulo' => 'required|string|max:255',
            'descricao' => 'nullable|string',
            'tipo' => 'required|in:CLT,PJ,Freelancer',
            'ativa' => 'nullable|boolean'
        ]);

        Vaga::create($data);
        return redirect()->route('vagas.index')->with('success', 'Vaga criada!');
    }

    public function edit(Vaga $vaga)
    {
        return view('vagas.edit', compact('vaga'));
    }

    public function update(Request $request, Vaga $vaga)
    {
        $data = $request->validate([
            'titulo' => 'required|string|max:255',
            'descricao' => 'nullable|string',
            'tipo' => 'required|in:CLT,PJ,Freelancer',
            'ativa' => 'nullable|boolean'
        ]);

        $vaga->update($data);
        return redirect()->route('vagas.index')->with('success', 'Vaga atualizada!');
    }

    public function toggle(Vaga $vaga)
    {
        $vaga->ativa = !$vaga->ativa;
        $vaga->save();
        return redirect()->route('vagas.index')->with('success', 'Vaga atualizada!');
    }

    public function destroy(Vaga $vaga)
    {
        $vaga->delete();
        return redirect()->route('vagas.index')->with('success', 'Vaga excluída!');
    }
}
