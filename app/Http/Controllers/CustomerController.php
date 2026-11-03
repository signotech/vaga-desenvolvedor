<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    // Mostra os clientes cadastrados.
    public function index(Request $request)
    {
        // Começamos buscando os clientes no banco.
        $consulta = Customer::query();

        // Pegamos o campo e o texto que o usuário informou na pesquisa.
        $campoFiltro = $request->input('filter');
        $textoPesquisa = $request->input('search');

        // Pegamos as opções usadas para organizar a lista.
        $campoOrdenacao = $request->input('sort');
        $ordem = $request->input('direction');

        // Se não escolherem um campo, usamos o ID.
        if ($campoOrdenacao == null || $campoOrdenacao == '') {
            $campoOrdenacao = 'id';
        }

        // Por padrão, mostramos os registros mais recentes primeiro.
        if ($ordem == null || $ordem == '') {
            $ordem = 'desc';
        }

        // Limitamos os campos da pesquisa aos que existem na listagem.
        // Isso também evita que um nome de coluna enviado pela URL seja usado sem validação.
        if (
            $campoFiltro == 'id' ||
            $campoFiltro == 'name' ||
            $campoFiltro == 'email' ||
            $campoFiltro == 'phone'
        ) {
            // Só pesquisamos quando existe algum texto digitado.
            if ($textoPesquisa != null && $textoPesquisa != '') {
                $consulta->where($campoFiltro, 'like', '%' . $textoPesquisa . '%');
            }
        }

        // Só permitimos ordenar por colunas conhecidas do cadastro.
        // Se chegar outro valor pela URL, voltamos para o ID.
        if (
            $campoOrdenacao != 'id' &&
            $campoOrdenacao != 'name' &&
            $campoOrdenacao != 'email' &&
            $campoOrdenacao != 'phone' &&
            $campoOrdenacao != 'created_at'
        ) {
            $campoOrdenacao = 'id';
        }

        // Só aceitamos ordem crescente ou decrescente.
        if ($ordem != 'asc' && $ordem != 'desc') {
            $ordem = 'desc';
        }

        // Aplicamos a ordenação e depois dividimos a lista em páginas.
        $consulta->orderBy($campoOrdenacao, $ordem);
        $clientes = $consulta->paginate(20);

        // Mantemos a pesquisa quando o usuário muda de página.
        $clientes->withQueryString();

        return view('customers.index', compact('clientes'));
    }

    // Abre o formulário de cadastro.
    public function create()
    {
        return view('customers.create');
    }

    // Salva um cliente novo.
    public function store(Request $request)
    {
        // O Laravel verifica os campos antes de tentar gravar no banco.
        // O e-mail precisa ser único para não existir dois clientes com o mesmo endereço.
        $dados = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:customers,email',
            'phone' => 'nullable|string|max:30',
        ]);

        // Criamos o cliente com os dados que passaram pela validação.
        Customer::create($dados);

        return redirect()->route('customers.index')
            ->with('success', 'Cliente cadastrado com sucesso!');
    }

    // Procura um cliente e abre a tela de edição.
    public function edit(string $id)
    {
        $cliente = Customer::findOrFail($id);

        // Enviamos o cliente para o formulário.
        return view('customers.edit', compact('cliente'));
    }

    // Atualiza os dados de um cliente.
    public function update(Request $request, string $id)
    {
        $cliente = Customer::findOrFail($id);

        // O e-mail pode continuar igual, mas não pode ser usado por outro cliente.
        $dados = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:customers,email,' . $cliente->id,
            'phone' => 'nullable|string|max:30',
        ]);

        $cliente->update($dados);

        return redirect()->route('customers.index')
            ->with('success', 'Cliente atualizado com sucesso!');
    }

    // Exclui um cliente, desde que ele não tenha pedidos.
    public function destroy(string $id)
    {
        $cliente = Customer::findOrFail($id);

        // Não apagamos o cliente se houver pedidos ligados a ele,
        // porque esses pedidos precisam continuar apontando para um cliente válido.
        $possuiPedidos = $cliente->orders()->exists();

        if ($possuiPedidos == true) {
            return redirect()->route('customers.index')
                ->with('error', 'Não é possível excluir um cliente que possui pedidos.');
        }

        $cliente->delete();

        return redirect()->route('customers.index')
            ->with('success', 'Cliente excluído com sucesso!');
    }
}
