<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CustomerApiController extends Controller
{
    public function index(Request $request) { return Customer::query()->when($request->q, fn($q, $v) => $q->where('name', 'like', "%{$v}%"))->paginate(20); }
    public function store(Request $request) { return response()->json(Customer::create($this->validateData($request)), 201); }
    public function show(Customer $customer) { return $customer->load('orders.status'); }
    public function update(Request $request, Customer $customer) { $customer->update($this->validateData($request, $customer)); return $customer->fresh(); }
    public function destroy(Customer $customer) { if ($customer->orders()->exists()) return response()->json(['message' => 'Cliente possui pedidos.'], 409); $customer->delete(); return response()->noContent(); }
    private function validateData(Request $request, ?Customer $customer = null): array { return $request->validate(['name'=>['required','string','max:150'],'cpf'=>['nullable','digits:11',Rule::unique('customers')->ignore($customer?->id)],'email'=>['required','email',Rule::unique('customers')->ignore($customer?->id)],'phone'=>['nullable','string','max:30']]); }
}
