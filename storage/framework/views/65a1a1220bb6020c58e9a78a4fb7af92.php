

<?php $__env->startSection('title', 'Clientes'); ?>

<?php $__env->startSection('content'); ?>
    <div class="container" >
        <div class="row" style="margin: 20px"> 
            <div class="col-12">
                <div class="card" style="margin-top:20px;border: 1px solid black;">
                    <div class="card-header" style="padding-top:12px">
                        <h2 style="display: flex; justify-content:center; font-size:42px">Página dos Clientes</h2>
                    </div>
                    <div class="card-body"">
                        <a href="<?php echo e(route('clientes.create')); ?>" class="btn btn-success btn-sm" title="Adicionar Novo Cliente">
                            Novo Cliente
                        </a>
                        <br><br/>
                        <div style="display: flex; justify-content:center;">
                            <form action="<?php echo e(route('clientes.index')); ?>" method="get">
                                <input style="width: 500px" class="form-control" type="text" name="search" placeholder="Pesquisar:">
                                    <br>
                            </form>
                        </div>
                        <div class="table-responsive">
                            <table class="table  table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nome</th>
                                        <th>CPF</th>
                                        <th>E-mail</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php $__currentLoopData = $clientes; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $item): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                    <tr>
                                        <td><?php echo e($item->id); ?></td>
                                        <td><?php echo e($item->nome_cliente); ?></td>
                                        <td><?php echo e($item->cpf_cliente); ?></td>
                                        <td><?php echo e($item->email_cliente); ?></td>
                                        <td>
                                            <a href="<?php echo e(route('clientes.show', $item->id)); ?>" title="View Student"><button class="btn btn-info btn-sm" aria-hidden="true">Detalhes</button></a>
                                            <a href="<?php echo e(route('clientes.edit', $item->id)); ?>" title="Edit Student"><button class="btn btn-success btn-sm" aria-hidden="true">Editar</button></a>
                                        </td>
                                    </tr>
                                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?> 
                                </tbody>
                            </table>
                            <div>
                                <?php echo e($clientes->appends([
                                    'search' => request()->get('search', '')
                                  ])->links()); ?>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>  
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layout\app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH B:\xampp\htdocs\teste1\signo\resources\views/clientes/index.blade.php ENDPATH**/ ?>