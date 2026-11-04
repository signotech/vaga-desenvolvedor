<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderStatus;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        foreach ([['Em Aberto','open'], ['Pago','paid'], ['Cancelado','cancelled']] as [$name,$slug]) {
            OrderStatus::firstOrCreate(['slug'=>$slug], ['name'=>$name]);
        }

        User::firstOrCreate(['email'=>'admin@pedidos.local'], [
            'name'=>'Administrador', 'password'=>Hash::make('password'),
        ]);

        Customer::factory(30)->create();
        Product::factory(40)->create();

        Customer::query()->take(15)->get()->each(function ($customer) {
            $order = Order::create([
                'customer_id'=>$customer->id,
                'order_status_id'=>OrderStatus::where('slug','open')->value('id'),
                'ordered_at'=>now()->subDays(rand(0,90)),
                'discount'=>0,
            ]);
            Product::query()->inRandomOrder()->take(rand(1,3))->get()->each(function($product) use ($order) {
                $order->items()->create(['product_id'=>$product->id,'quantity'=>rand(1,3),'unit_price'=>$product->price]);
            });
        });
    }
}
