$(document).ready(function() {
    const form = $('form');

    form.submit(function(e){
        e.preventDefault();
        const submitForm = this;

        Swal.fire({
            title: 'Confirmação',
            text: 'Deseja realmente salvar este pedido?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
        }).then((result) => {
            if(result.isConfirmed){
                Swal.fire({
                    title: 'Salvando...',
                    text: 'Aguarde enquanto o pedido é salvo.',
                    icon: 'info',
                    allowOutsideClick: false,
                    didOpen: () => Swal.showLoading()
                });

                submitForm.submit();
            }
        });
    });
});
