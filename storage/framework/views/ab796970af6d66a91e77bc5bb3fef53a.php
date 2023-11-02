

<?php $__env->startSection('title', 'Criar Pedido'); ?>

<?php $__env->startSection('content'); ?>
    <?php if($errors->any()): ?>
        <ul class="errors">
            <?php $__currentLoopData = $errors->all(); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $error): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <li class="errors"><?php echo e($error); ?></li>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        </ul>
    <?php endif; ?>

    <div class="card" style="margin:20px">
        <div class="card-header">Novo Pedidos</div>
        <div class="card-body">

    <form action="<?php echo e(route('pedidos.store')); ?>" method="post">
        <?php echo csrf_field(); ?>
        <label>Código do pedido:</label><br>
        <input class="form-control" type="number" name="codigo_pedido"  placeholder="" value="<?php echo e(old('codigo_pedido')); ?>"><br>
        <label>Id do cliente:</label><br>
        <input class="form-control" required type="number" name="cliente_id"  placeholder="" value="<?php echo e(old('cliente_id')); ?>"><br>
        <label>Id do produto:</label><br>
        <input class="form-control" required type="number" name="produto_id"  placeholder="" value="<?php echo e(old('produto_id')); ?>"><br>
        <label>Data do pedido:</label><br>
        <input class="form-control" required type="date" name="data_pedido" placeholder="Data do pedido:"><br>
        <label>Status do pedido:</label><br>
        <input class="form-control" required type="text" name="status" placeholder=""><br>
        <button class="btn btn-primary" style="width: 200px; font-size: 18px; color:black;" required type="submit">Submeter</button>
    </form>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layout\app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH B:\xampp\htdocs\teste1\signo\resources\views/pedidos/create.blade.php ENDPATH**/ ?>