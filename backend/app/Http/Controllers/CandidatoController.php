<?php

namespace App\Http\Controllers;

use App\Models\Candidato;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class CandidatoController extends Controller
{
    public function index(Request $r)
    {
        $q       = trim((string) $r->query('q', ''));
        $sort    = (string) $r->query('sort', 'id');
        $dir     = strtolower((string) $r->query('dir', 'asc')) === 'desc' ? 'desc' : 'asc';
        $perPage = (int) $r->query('per_page', 20);

        $allowed = ['id','nome','email','created_at'];
        if (!in_array($sort, $allowed, true)) $sort = 'id';
        if ($perPage <= 0 || $perPage > 200) $perPage = 20;

        $qbuilder = Candidato::with('vagas:id,titulo');

        if ($q !== '') {
            $qbuilder->where(function($w) use ($q) {
                $w->where('nome','like',"%{$q}%")
                  ->orWhere('email','like',"%{$q}%");
            });
        }

        return $qbuilder->orderBy($sort,$dir)->paginate($perPage);
    }

    public function store(Request $r)
    {
        $data = $r->validate([
            'nome'       => ['required','string','max:255'],
            'email'      => ['required','email','unique:candidatos,email'],
            'vaga_ids'   => ['required','array','min:1'],
            'vaga_ids.*' => [
                'integer',
                Rule::exists('vagas','id')->where(fn($q) => $q->where('status','ativa')),
            ],
        ]);

        return DB::transaction(function () use ($data) {
            $cand = Candidato::create([
                'nome'  => $data['nome'],
                'email' => $data['email'],
            ]);

            $cand->vagas()->sync($data['vaga_ids']);

            return response()->json($cand->load('vagas:id,titulo'), 201);
        });
    }

    public function show(Candidato $candidato)
    {
        return $candidato->load('vagas:id,titulo');
    }

    public function update(Request $r, Candidato $candidato)
    {
        $data = $r->validate([
            'nome'       => ['sometimes','required','string','max:255'],
            'email'      => ['sometimes','required','email','unique:candidatos,email,'.$candidato->id],
            'vaga_ids'   => ['sometimes','required','array','min:1'], // se vier, tem que ter pelo menos 1
            'vaga_ids.*' => [
                'integer',
                Rule::exists('vagas','id')->where(fn($q) => $q->where('status','ativa')),
            ],
        ]);

        return DB::transaction(function () use ($data, $candidato) {
            $candidato->update($data);

            if (array_key_exists('vaga_ids', $data)) {
                // Se veio vaga_ids, mantém sempre ≥ 1 ativa
                $candidato->vagas()->sync($data['vaga_ids']);
            }

            return $candidato->load('vagas:id,titulo');
        });
    }

    public function destroy(Candidato $candidato)
    {
        $candidato->delete();
        return response()->noContent();
    }
}
