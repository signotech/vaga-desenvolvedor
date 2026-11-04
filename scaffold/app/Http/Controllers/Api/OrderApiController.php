<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderApiController extends Controller
{
    public function index() { return Order::with(['customer','status','items.product'])->paginate(20); }
    public function store(Request $request) { $data=$this->validateData($request); $order=DB::transaction(function() use($data){ $o=Order::create(collect($data)->except('items')->all()); foreach($data['items'] as $i){$p=\App\Models\Product::findOrFail($i['product_id']);$o->items()->create(['product_id'=>$p->id,'quantity'=>$i['quantity'],'unit_price'=>$p->price]);} return $o;}); return response()->json($order->load(['customer','status','items.product']),201); }
    public function show(Order $order) { return $order->load(['customer','status','items.product']); }
    public function update(Request $request, Order $order) { $data=$this->validateData($request); DB::transaction(function()use($data,$order){$order->update(collect($data)->except('items')->all());$order->items()->delete();foreach($data['items'] as $i){$p=\App\Models\Product::findOrFail($i['product_id']);$order->items()->create(['product_id'=>$p->id,'quantity'=>$i['quantity'],'unit_price'=>$p->price]);}}); return $order->fresh()->load(['customer','status','items.product']); }
    public function destroy(Order $order) { $order->delete(); return response()->noContent(); }
    private function validateData(Request $r):array{return $r->validate(['customer_id'=>['required','exists:customers,id'],'order_status_id'=>['required','exists:order_statuses,id'],'ordered_at'=>['required','date'],'discount'=>['nullable','numeric','min:0'],'items'=>['required','array','min:1'],'items.*.product_id'=>['required','distinct','exists:products,id'],'items.*.quantity'=>['required','integer','min:1']]);}
}
