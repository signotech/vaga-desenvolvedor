<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderStatus;
use App\Models\Product;
use App\Support\ListQuery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class OrderController extends Controller
{
    use ListQuery;

    public function index(Request $request)
    {
        $query = Order::with(['customer', 'status', 'items']);
        if ($request->filled('customer')) $query->whereHas('customer', fn ($q) => $q->where('name', 'like', '%'.$request->customer.'%'));
        if ($request->filled('status')) $query->whereHas('status', fn ($q) => $q->where('name', 'like', '%'.$request->status.'%'));
        foreach (['id', 'ordered_at', 'discount', 'created_at'] as $field) {
            if ($request->filled($field)) $query->where($field, 'like', '%'.$request->query($field).'%');
        }
        $sort = in_array($request->query('sort'), ['id', 'ordered_at', 'discount', 'created_at'], true) ? $request->query('sort') : 'id';
        $direction = $request->query('direction') === 'asc' ? 'asc' : 'desc';
        $orders = $query->orderBy($sort, $direction)->paginate($this->pageSize($request))->withQueryString();
        return view('orders.index', compact('orders'));
    }

    public function create()
    {
        return view('orders.form', ['order' => new Order, 'customers' => Customer::orderBy('name')->get(), 'products' => Product::orderBy('title')->get(), 'statuses' => OrderStatus::all()]);
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);
        DB::transaction(function () use ($data) {
            $order = Order::create([
                'customer_id' => $data['customer_id'],
                'order_status_id' => $data['order_status_id'],
                'ordered_at' => $data['ordered_at'],
                'discount' => $data['discount'] ?? 0,
            ]);
            $this->syncItems($order, $data['items']);
        });
        return redirect()->route('pedidos.index')->with('success', 'Pedido cadastrado.');
    }

    public function show(Order $order)
    {
        $order->load(['customer', 'status', 'items.product']);
        return view('orders.show', compact('order'));
    }

    public function edit(Order $order)
    {
        $order->load('items');
        return view('orders.form', ['order' => $order, 'customers' => Customer::orderBy('name')->get(), 'products' => Product::orderBy('title')->get(), 'statuses' => OrderStatus::all()]);
    }

    public function update(Request $request, Order $order)
    {
        $data = $this->validated($request);
        DB::transaction(function () use ($data, $order) {
            $order->update([
                'customer_id' => $data['customer_id'],
                'order_status_id' => $data['order_status_id'],
                'ordered_at' => $data['ordered_at'],
                'discount' => $data['discount'] ?? 0,
            ]);
            $order->items()->delete();
            $this->syncItems($order, $data['items']);
        });
        return redirect()->route('pedidos.index')->with('success', 'Pedido atualizado.');
    }

    public function destroy(Order $order)
    {
        $order->delete();
        return back()->with('success', 'Pedido excluído.');
    }

    public function bulkDestroy(Request $request)
    {
        $ids = $request->validate(['ids' => ['required', 'array'], 'ids.*' => ['integer', 'exists:orders,id']])['ids'];
        Order::whereIn('id', $ids)->delete();
        return back()->with('success', 'Pedidos excluídos.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'customer_id' => ['required', 'exists:customers,id'],
            'order_status_id' => ['required', 'exists:order_statuses,id'],
            'ordered_at' => ['required', 'date'],
            'discount' => ['nullable', 'numeric', 'min:0', 'max:99999999.99'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.product_id' => ['required', 'distinct', 'exists:products,id'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
        ]);
    }

    private function syncItems(Order $order, array $items): void
    {
        foreach ($items as $item) {
            $product = Product::findOrFail($item['product_id']);
            if ($product->stock < (int) $item['quantity']) {
                throw ValidationException::withMessages(['items' => "Estoque insuficiente para {$product->title}."]);
            }
            $order->items()->create([
                'product_id' => $product->id,
                'quantity' => $item['quantity'],
                'unit_price' => $product->price,
            ]);
        }
    }
}
