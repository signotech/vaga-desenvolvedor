<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ProductApiController extends Controller
{
    public function index(Request $request) { return Product::query()->when($request->q, fn($q, $v) => $q->where('title', 'like', "%{$v}%")->orWhere('sku', 'like', "%{$v}%"))->paginate(20); }
    public function store(Request $request) { return response()->json(Product::create($this->validateData($request)), 201); }
    public function show(Product $product) { return $product->load('orderItems.order'); }
    public function update(Request $request, Product $product) { $product->update($this->validateData($request, $product)); return $product->fresh(); }
    public function destroy(Product $product) { if ($product->orderItems()->exists()) return response()->json(['message'=>'Produto utilizado em pedidos.'],409); $product->delete(); return response()->noContent(); }
    private function validateData(Request $request, ?Product $product = null): array { return $request->validate(['sku'=>['required','string','max:100',Rule::unique('products')->ignore($product?->id)],'title'=>['required','string','max:150'],'description'=>['nullable','string'],'price'=>['required','numeric','min:0'],'stock'=>['required','integer','min:0']]); }
}
