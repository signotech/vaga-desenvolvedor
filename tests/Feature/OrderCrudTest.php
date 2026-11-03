
<?php

use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('um pedido pode ser cadastrado com varios produtos', function () {
    $customer = Customer::create([
        'name' => 'João da Silva',
        'email' => 'joao@example.com',
        'phone' => '47999999999',
    ]);

    $product1 = Product::create([
        'name' => 'Notebook Dell',
        'description' => 'Notebook profissional',
        'price' => 3500.00,
    ]);

    $product2 = Product::create([
        'name' => 'Mouse Logitech',
        'description' => 'Mouse sem fio',
        'price' => 150.00,
    ]);

    $response = $this->post(route('orders.store'), [
        'customer_id' => $customer->id,
        'status' => 'open',
        'products' => [
            [
                'product_id' => $product1->id,
                'quantity' => 1,
            ],
            [
                'product_id' => $product2->id,
                'quantity' => 2,
            ],
        ],
    ]);

    $response->assertRedirect(route('orders.index'));

    $order = Order::first();

    $this->assertNotNull($order);

    $this->assertDatabaseHas('orders', [
        'id' => $order->id,
        'customer_id' => $customer->id,
        'status' => 'open',
    ]);

    $this->assertDatabaseHas('order_items', [
        'order_id' => $order->id,
        'product_id' => $product1->id,
        'quantity' => 1,
        'unit_price' => 3500.00,
    ]);

    $this->assertDatabaseHas('order_items', [
        'order_id' => $order->id,
        'product_id' => $product2->id,
        'quantity' => 2,
        'unit_price' => 150.00,
    ]);
});

test('um pedido pode ser atualizado', function () {
    $customer = Customer::create([
        'name' => 'João da Silva',
        'email' => 'joao@example.com',
        'phone' => '47999999999',
    ]);

    $newCustomer = Customer::create([
        'name' => 'Maria da Silva',
        'email' => 'maria@example.com',
        'phone' => '47988888888',
    ]);

    $product1 = Product::create([
        'name' => 'Notebook Dell',
        'description' => 'Notebook profissional',
        'price' => 3500.00,
    ]);

    $product2 = Product::create([
        'name' => 'Mouse Logitech',
        'description' => 'Mouse sem fio',
        'price' => 150.00,
    ]);

    $order = Order::create([
        'customer_id' => $customer->id,
        'status' => 'open',
    ]);

    OrderItem::create([
        'order_id' => $order->id,
        'product_id' => $product1->id,
        'quantity' => 1,
        'unit_price' => 3200.00,
    ]);

    $response = $this->put(route('orders.update', $order), [
        'customer_id' => $newCustomer->id,
        'status' => 'paid',
        'products' => [
            [
                'product_id' => $product1->id,
                'quantity' => 2,
            ],
            [
                'product_id' => $product2->id,
                'quantity' => 1,
            ],
        ],
    ]);

    $response->assertRedirect(route('orders.index'));

    $this->assertDatabaseHas('orders', [
        'id' => $order->id,
        'customer_id' => $newCustomer->id,
        'status' => 'paid',
    ]);

    // O preço histórico do produto existente deve ser preservado.
    $this->assertDatabaseHas('order_items', [
        'order_id' => $order->id,
        'product_id' => $product1->id,
        'quantity' => 2,
        'unit_price' => 3200.00,
    ]);

    // Um produto novo deve utilizar seu preço atual.
    $this->assertDatabaseHas('order_items', [
        'order_id' => $order->id,
        'product_id' => $product2->id,
        'quantity' => 1,
        'unit_price' => 150.00,
    ]);
});

test('um pedido nao aceita o mesmo produto duas vezes', function () {
    $customer = Customer::create([
        'name' => 'Carlos da Silva',
        'email' => 'carlos@example.com',
        'phone' => '47977777777',
    ]);

    $product = Product::create([
        'name' => 'Teclado Logitech',
        'description' => 'Teclado sem fio',
        'price' => 200.00,
    ]);

    $response = $this->post(route('orders.store'), [
        'customer_id' => $customer->id,
        'status' => 'open',
        'products' => [
            [
                'product_id' => $product->id,
                'quantity' => 1,
            ],
            [
                'product_id' => $product->id,
                'quantity' => 2,
            ],
        ],
    ]);

    $response->assertSessionHasErrors('products.1.product_id');

    $this->assertDatabaseCount('orders', 0);

    $this->assertDatabaseCount('order_items', 0);
});

test('um pedido pode ser excluido junto com seus itens', function () {
    $customer = Customer::create([
        'name' => 'Ana da Silva',
        'email' => 'ana@example.com',
        'phone' => '47966666666',
    ]);

    $product = Product::create([
        'name' => 'Monitor Dell',
        'description' => 'Monitor profissional',
        'price' => 1200.00,
    ]);

    $order = Order::create([
        'customer_id' => $customer->id,
        'status' => 'open',
    ]);

    OrderItem::create([
        'order_id' => $order->id,
        'product_id' => $product->id,
        'quantity' => 1,
        'unit_price' => 1200.00,
    ]);

    $response = $this->delete(route('orders.destroy', $order));

    $response->assertRedirect(route('orders.index'));

    $this->assertDatabaseMissing('orders', [
        'id' => $order->id,
    ]);

    $this->assertDatabaseMissing('order_items', [
        'order_id' => $order->id,
    ]);
});
