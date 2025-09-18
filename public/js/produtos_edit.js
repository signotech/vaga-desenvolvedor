$(document).ready(function() {
    const form = $('#form-editar-produto');

    form.submit(function(e) {
        e.preventDefault();

        Swal.fire({
            title: 'Confirmação',
            text: 'Deseja realmente atualizar este produto?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Atualizando...',
                    text: 'Aguarde enquanto o produto é atualizado.',
                    icon: 'info',
                    allowOutsideClick: false,
                    didOpen: () => Swal.showLoading()
                });

                fetch(form.attr('action'), {
                    method: 'POST',
                    body: new FormData(form[0]),
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                })
                .then(response => {
                    if(response.redirected) {
                        window.location.href = response.url;
                    } else {
                        return response.text();
                    }
                })
                .then(data => {
                    Swal.close();
                })
                .catch(() => {
                    Swal.fire({
                        title: 'Erro!',
                        text: 'Não foi possível atualizar o produto.',
                        icon: 'error'
                    });
                });
            }
        });
    });
});