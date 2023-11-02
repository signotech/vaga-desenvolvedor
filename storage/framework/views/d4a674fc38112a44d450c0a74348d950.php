

<?php $__env->startSection('content'); ?>

<div class="card" style="margin:20px">
    <div class="card-header">
        <h1 style="display: flex; justify-content:center; font-size:30px">Página do cliente</h1>
    </div>
    <div class="card-body">
        <div class="class-body">
            <h3 style="font-size: 25px" class="card-title">Nome: <?php echo e($clientes->nome_cliente); ?></h3><br>
            <p class="card-text">E-mail: <?php echo e($clientes->email_cliente); ?></p>
            <p class="card-text">CPF: <?php echo e($clientes->cpf_cliente); ?></p><br>
            <form action="<?php echo e(route('clientes.destroy', $clientes->id)); ?>" method="POST">
                <?php echo method_field('DELETE'); ?>
                <?php echo csrf_field(); ?>
                <button onclick="confirm('Tem certeza que deseja deletar esse registro?')" class="btn btn-danger" style="width: 200px; font-size: 18px; color:black;" required type="submit">Deletar</button>
            </form>      
        </div>
    </div>
</div>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('layout\app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH B:\xampp\htdocs\teste1\signo\resources\views/clientes/show.blade.php ENDPATH**/ ?>