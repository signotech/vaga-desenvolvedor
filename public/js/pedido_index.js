$(document).ready(function() {

    $('#form-filtro-pedidos').submit(function(e){
        Swal.fire({
            title: 'Carregando...',
            text: 'Aguarde enquanto os pedidos são filtrados.',
            icon: 'info',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });
    });

    $('.form-excluir-pedido').submit(function(e){
        e.preventDefault();
        const form = this;

        Swal.fire({
            title: 'Confirmação',
            text: 'Deseja realmente excluir este pedido?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
        }).then((result) => {
            if(result.isConfirmed){
                Swal.fire({
                    title: 'Excluindo...',
                    text: 'Aguarde enquanto o pedido é excluído.',
                    icon: 'info',
                    allowOutsideClick: false,
                    didOpen: () => Swal.showLoading()
                });
                form.submit();
            }
        });
    });

});
