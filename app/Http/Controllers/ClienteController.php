<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ClienteController extends Controller {
    
    public function index(): View {

        $clientes = Cliente::all();

        return view('clientes.index', compact('clientes'));
    }

    public function create(): View {
        return view('clientes.create');
    }

    public function store(Request $request): RedirectResponse {

        $request->validate(
            [
                'nome' => 'required|min:4|max:100',
                'email' => 'required|email|max:255',
                'cpf' => 'required|min:11|max:11'
            ],
            [
                'nome.required' => 'O nome é obrigatório.',
                'nome.min' => 'O nome deve ter no mínimo :min caracteres.',
                'nome.max' => 'O nome deve ter no máximo :max caracteres.',

                'email.required' => 'O e-mail é obrigatório.',
                'email.email' => 'O e-mail deve ser válido.',
                'email.max' => 'O e-mal deve ter no máximo :max caracteres.',

                'cpf.required' => 'O CPF é obrigatório.',
                'cpf.min' => 'O CPF deve ter no mínimo :min caracteres.',
                'cpf.max' => 'O CPF deve ter no máximo :max caracteres.',
            ]
        );

        $cliente = Cliente::create([
            'nome' => $request->nome,
            'email' => $request->email,
            'cpf' => $request->cpf,
        ]);

        return redirect()->route('clientes.index')->with('sucesso', 'Cliente criado com sucesso!');
    }

    public function show($id): View {

        $cliente = Cliente::findOrFail($id);

        return view('clientes.show', compact('cliente'));
    }

    public function edit($id): View {

        $cliente = Cliente::findOrFail($id);

        return view('clientes.edit', compact('cliente'));
    }

    public function update(Request $request, $id): RedirectResponse {
        
        $request->validate(
            [
                'nome' => 'required|min:4|max:100',
                'email' => 'required|email|max:255',
                'cpf' => 'required|min:11|max:11'
            ],
            [
                'nome.required' => 'O nome é obrigatório.',
                'nome.min' => 'O nome deve ter no mínimo :min caracteres.',
                'nome.max' => 'O nome deve ter no máximo :max caracteres.',

                'email.required' => 'O e-mail é obrigatório.',
                'email.email' => 'O e-mail deve ser válido.',
                'email.max' => 'O e-mal deve ter no máximo :max caracteres.',

                'cpf.required' => 'O CPF é obrigatório.',
                'cpf.min' => 'O CPF deve ter no mínimo :min caracteres.',
                'cpf.max' => 'O CPF deve ter no máximo :max caracteres.',
            ]
        );

        $cliente = Cliente::findOrFail($id);
        
        $cliente->update([
            'nome' => $request->nome,
            'email' => $request->email,
            'cpf' => $request->cpf,
        ]);

        return redirect()->route('clientes.index')->with('sucesso', 'Cliente editado com sucesso.');
    }
    
    public function destroy($id): RedirectResponse {
        return redirect()->route('clientes.index');
    }
}
