$(document).ready(function () {

    $('.delete-form').on('submit', function (e) {
        e.preventDefault();
        const form = this;

        Swal.fire({
            title: 'Tem certeza?',
            text: "Esta ação não poderá ser desfeita!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, excluir',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Excluindo...',
                    allowOutsideClick: false,
                    didOpen: () => Swal.showLoading()
                });
                form.submit();
            }
        });
    });

});