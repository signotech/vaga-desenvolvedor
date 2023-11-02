

<?php $__env->startSection('title', 'Editar Pedido'); ?>

<?php $__env->startSection('content'); ?>
    <?php if($errors->any()): ?>
        <ul class="errors">
            <?php $__currentLoopData = $errors->all(); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $error): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <li class="errors"><?php echo e($error); ?></li>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        </ul>
    <?php endif; ?>

    <div class="card" style="margin:20px">
        <div class="card-header"><h3>Novo Pedidos</h3></div>
        <div class="card-body">
    <form action="<?php echo e(route('pedidos.update', $pedidos->id)); ?>" method="post">
        <?php echo method_field('PUT'); ?>
        <?php echo csrf_field(); ?>
        <label>Código do pedido:</label><br>
        <input class="form-control" required type="number" name="codigo_pedido"  placeholder="Código do Pedido:" value="<?php echo e($pedidos->codigo_pedido); ?>"><br>
        <label>Data do pedido:</label><br>
        <input class="form-control" required type="date" name="data_pedido" placeholder="Data do Pedido:" value="<?php echo e(old('data_pedido')); ?>"><br>
        <button class="btn btn-success" style="width: 200px; font-size: 18px" required type="submit">Submeter</button>
    </form>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('layout\app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH B:\xampp\htdocs\teste1\signo\resources\views/pedidos/edit.blade.php ENDPATH**/ ?>