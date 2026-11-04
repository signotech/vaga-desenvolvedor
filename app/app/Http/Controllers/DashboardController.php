<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderStatus;
use App\Models\Product;

class DashboardController extends Controller
{
    public function __invoke()
    {
        return view('dashboard', [
            'customers' => Customer::count(),
            'products' => Product::count(),
            'orders' => Order::count(),
            'openOrders' => Order::whereHas('status', fn ($q) => $q->where('slug', 'open'))->count(),
            'recentOrders' => Order::with(['customer', 'status'])->latest()->take(8)->get(),
        ]);
    }
}
