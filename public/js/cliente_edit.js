$(document).ready(function() {
    const form = $('#form-criar-editar-cliente');

    form.submit(function(e) {
        e.preventDefault();

        Swal.fire({
            title: 'Confirmação',
            text: 'Deseja realmente salvar este cliente?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Salvando...',
                    text: 'Aguarde enquanto o cliente é salvo.',
                    icon: 'info',
                    allowOutsideClick: false,
                    didOpen: () => Swal.showLoading()
                });

                fetch(form.attr('action'), {
                    method: form.find('input[name="_method"]').val() === 'PUT' ? 'POST' : 'POST',
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
                        text: 'Não foi possível salvar o cliente.',
                        icon: 'error'
                    });
                });
            }
        });
    });
});