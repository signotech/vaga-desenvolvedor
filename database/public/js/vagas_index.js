$(document).ready(function() {

    function showLoadingSwal(title = 'Aguarde...') {
        Swal.fire({
            title: title,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
    }

    $('.delete-form').on('submit', function(e) {
        e.preventDefault();
        const form = this;

        Swal.fire({
            title: 'Tem certeza?',
            text: "Você não poderá reverter isso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                showLoadingSwal('Excluindo...');
                form.submit();
            }
        });
    });

    $('.toggle-form').on('submit', function(e) {
        e.preventDefault();
        const form = this;
        const actionText = $(form).find('button').text();

        Swal.fire({
            title: `Deseja realmente ${actionText.toLowerCase()} esta vaga?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#aaa',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                showLoadingSwal(`${actionText}...`);
                form.submit();
            }
        });
    });

});
