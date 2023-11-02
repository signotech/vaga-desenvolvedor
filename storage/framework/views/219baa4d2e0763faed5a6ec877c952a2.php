

<?php $__env->startSection('content'); ?>

<div class="card" style="margin:20px">
    <div class="card-header">
        <h1 style="display: flex; justify-content:center; font-size:30px">Página do Pedido</h3>
    </div>
    <div class="card-body">
        <div class="class-body">
            <h3 style="font-size: 25px" class="card-title">Código do pedido: <?php echo e($pedidos->codigo_pedido); ?></h3><br>
            <p class="card-text">Status do pedido: <strong><?php echo e($pedidos->status); ?></strong></p>
            <p class="card-text">Data do pedido: <?php echo e($pedidos->data_pedido); ?></p>
            <p class="card-text">Id do produto: <?php echo e($pedidos->produto_id); ?></p>
            <p class="card-text">Id do cliente: <?php echo e($pedidos->cliente_id); ?></p><br>
            <form action="<?php echo e(route('pedidos.destroy', $pedidos->id)); ?>" method="POST">
                <?php echo method_field('DELETE'); ?>
                <?php echo csrf_field(); ?>
                <button class="btn btn-danger" style="width: 200px; font-size: 18px; color:black;" required type="submit">Deletar</button>
            </form>
        </div>
    </div>
</div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layout\app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH B:\xampp\htdocs\teste1\signo\resources\views/pedidos/show.blade.php ENDPATH**/ ?>