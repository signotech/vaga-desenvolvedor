<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Support\ListQuery;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ProductController extends Controller
{
    use ListQuery;

    public function index(Request $request)
    {
        $products = $this->applyListQuery(Product::query(), $request, ['sku', 'title', 'description', 'price', 'stock'])
            ->paginate($this->pageSize($request))->withQueryString();
        return view('products.index', compact('products'));
    }

    public function create() { return view('products.form', ['product' => new Product]); }

    public function store(Request $request)
    {
        Product::create($this->validated($request));
        return redirect()->route('produtos.index')->with('success', 'Produto cadastrado.');
    }

    public function show(Product $product) { $product->load('orderItems.order'); return view('products.show', compact('product')); }

    public function edit(Product $product) { return view('products.form', compact('product')); }

    public function update(Request $request, Product $product)
    {
        $product->update($this->validated($request, $product));
        return redirect()->route('produtos.index')->with('success', 'Produto atualizado.');
    }

    public function destroy(Product $product)
    {
        if ($product->orderItems()->exists()) return back()->withErrors(['delete' => 'Produto utilizado em pedidos não pode ser excluído.']);
        $product->delete();
        return back()->with('success', 'Produto excluído.');
    }

    public function bulkDestroy(Request $request)
    {
        $ids = $request->validate(['ids' => ['required', 'array'], 'ids.*' => ['integer', 'exists:products,id']])['ids'];
        if (Product::whereIn('id', $ids)->whereHas('orderItems')->exists()) {
            return back()->withErrors(['delete' => 'A seleção contém produto utilizado em pedidos; nenhum registro foi excluído.']);
        }
        Product::whereIn('id', $ids)->delete();
        return back()->with('success', 'Produtos excluídos.');
    }

    private function validated(Request $request, ?Product $product = null): array
    {
        return $request->validate([
            'sku' => ['required', 'string', 'max:100', Rule::unique('products', 'sku')->ignore($product?->id)],
            'title' => ['required', 'string', 'max:150'],
            'description' => ['nullable', 'string', 'max:2000'],
            'price' => ['required', 'numeric', 'min:0', 'max:99999999.99'],
            'stock' => ['required', 'integer', 'min:0'],
        ]);
    }
}
