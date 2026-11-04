<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Support\ListQuery;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CustomerController extends Controller
{
    use ListQuery;

    public function index(Request $request)
    {
        $query = $this->applyListQuery(Customer::query(), $request, ['name', 'cpf', 'email', 'phone']);
        $customers = $query->paginate($this->pageSize($request))->withQueryString();
        return view('customers.index', compact('customers'));
    }

    public function create() { return view('customers.form', ['customer' => new Customer]); }

    public function store(Request $request)
    {
        Customer::create($this->validated($request));
        return redirect()->route('clientes.index')->with('success', 'Cliente cadastrado.');
    }

    public function show(Customer $customer) { $customer->load('orders.status'); return view('customers.show', compact('customer')); }

    public function edit(Customer $customer) { return view('customers.form', compact('customer')); }

    public function update(Request $request, Customer $customer)
    {
        $customer->update($this->validated($request, $customer));
        return redirect()->route('clientes.index')->with('success', 'Cliente atualizado.');
    }

    public function destroy(Customer $customer)
    {
        if ($customer->orders()->exists()) {
            return back()->withErrors(['delete' => 'Não é possível excluir cliente que possui pedidos.']);
        }
        $customer->delete();
        return back()->with('success', 'Cliente excluído.');
    }

    public function bulkDestroy(Request $request)
    {
        $ids = $request->validate(['ids' => ['required', 'array'], 'ids.*' => ['integer', 'exists:customers,id']])['ids'];
        $customers = Customer::whereIn('id', $ids)->get();
        foreach ($customers as $customer) {
            if ($customer->orders()->exists()) {
                return back()->withErrors(['delete' => 'A seleção contém cliente com pedidos; nenhum registro foi excluído.']);
            }
        }
        Customer::whereIn('id', $ids)->delete();
        return back()->with('success', 'Clientes excluídos.');
    }

    private function validated(Request $request, ?Customer $customer = null): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'cpf' => ['nullable', 'string', 'size:11', 'regex:/^[0-9]{11}$/', Rule::unique('customers', 'cpf')->ignore($customer?->id)],
            'email' => ['required', 'email', 'max:255', Rule::unique('customers', 'email')->ignore($customer?->id)],
            'phone' => ['nullable', 'string', 'max:30'],
        ]);
    }
}
