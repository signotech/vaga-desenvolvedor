

<?php $__env->startSection('title', 'Criar Produto'); ?>

<?php $__env->startSection('content'); ?>
    <?php if($errors->any()): ?>
        <ul class="errors">
            <?php $__currentLoopData = $errors->all(); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $error): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <li class="errors"><?php echo e($error); ?></li>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        </ul>
    <?php endif; ?>

    <div class="card" style="margin:20px">
        <div class="card-header"><h3>Novo Produto</h3></div>
        <div class="card-body">
    <form action="<?php echo e(route('produtos.store')); ?>" method="post">
        <?php echo csrf_field(); ?>
        <label>SKU do produto:</label><br>
        <input class="form-control" required type="number" name="sku_produto"  placeholder="" value="<?php echo e(old('sku_produto')); ?>"><br>
        <label>Titulo do produto:</label><br>
        <input class="form-control" required type="text" name="titulo_produto" placeholder="" value="<?php echo e(old('titulo_produto')); ?>"><br>
        <label>Preço:</label><br>
        <input class="form-control" required type="number" step="0.01" name="preco"  placeholder="" value="<?php echo e(old('preco')); ?>"><br>
        <label>Em estoque:</label><br>
        <input class="form-control" required type="number" step="1" name="estoque"  placeholder="" value="<?php echo e(old('estoque')); ?>"><br>
        <button class="btn btn-primary" style="width: 200px; font-size: 18px; color:black;" required type="submit">Submeter</button>
    </form>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('layout\app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH B:\xampp\htdocs\teste1\signo\resources\views/produtos/create.blade.php ENDPATH**/ ?>