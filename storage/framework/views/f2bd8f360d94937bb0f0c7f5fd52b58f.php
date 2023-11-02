

<?php $__env->startSection('title', 'Editar Usuário'); ?>

<?php $__env->startSection('content'); ?>
    <?php if($errors->any()): ?>
        <ul class="errors">
            <?php $__currentLoopData = $errors->all(); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $error): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <li class="errors"><?php echo e($error); ?></li>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        </ul>
    <?php endif; ?>

    <div class="card" style="margin:20px">
        <div class="card-header"><h3>Novo Cliente</h3></div>
        <div class="card-body">
    <form action="<?php echo e(route('clientes.update', $clientes->id)); ?>" method="post">
        <?php echo method_field('PUT'); ?>
        <?php echo csrf_field(); ?>
        <label>Nome:</label><br>
        <input class="form-control" required type="text" name="nome_cliente"  placeholder="Nome:" value="<?php echo e($clientes->nome_cliente); ?>"><br>
        <label>CPF:</label><br>
        <input class="form-control" required type="number" name="cpf_cliente" placeholder="" step="1" value="<?php echo e($clientes->cpf_cliente); ?>"><br>
        <label>E-mail:</label><br>
        <input class="form-control" required type="email" name="email_cliente" placeholder="E-mail:" value="<?php echo e($clientes->email_cliente); ?>"><br>
        <button class="btn btn-primary" style="width: 200px; font-size: 18px; color:black;" required type="submit">Submeter</button>
    </form>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('layout\app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH B:\xampp\htdocs\teste1\signo\resources\views/clientes/edit.blade.php ENDPATH**/ ?>