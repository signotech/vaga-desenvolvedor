$(document).ready(() => {
    let sortBy = 'id';
    let sortOrder = 'desc';
    const csrfToken = $('meta[name="csrf-token"]').attr('content');

    const carregarProdutos = (page = 1) => {
        Swal.fire({
            title: 'Carregando...',
            text: 'Buscando produtos',
            icon: 'info',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });

        $.get("/produtos/json", {
            search: $("#search").val(),
            per_page: $("#per_page").val(),
            sort_by: sortBy,
            sort_order: sortOrder,
            page: page
        })
        .done((data) => {
            let tbody = "";
            data.data.forEach(p => {
                tbody += `
                    <tr>
                        <td>${p.id}</td>
                        <td>${p.titulo}</td>
                        <td>R$ ${parseFloat(p.preco).toFixed(2).replace('.', ',')}</td>
                        <td>${p.descricao ?? ''}</td>
                        <td>
                            <a href="/produtos/${p.id}/edit" class="btn btn-warning">Editar</a>
                            <button class="btn btn-danger btn-excluir" data-id="${p.id}">Excluir</button>
                        </td>
                    </tr>
                `;
            });
            $("#tabela-produtos tbody").html(tbody);

            let paginacao = "";
            for (let i = 1; i <= data.last_page; i++) {
                paginacao += `<a href="#" class="pagina" data-p="${i}" style="${i === data.current_page ? 'font-weight:bold;' : ''}; margin:0 5px;">${i}</a>`;
            }
            $("#paginacao").html(paginacao);

            Swal.close();
        })
        .fail(() => Swal.fire({ title: 'Erro!', text: 'Não foi possível carregar os produtos.', icon: 'error' }));
    };

    $("#btn-filtrar").on("click", () => carregarProdutos(1));

    $(document).on("click", "#tabela-produtos th[data-sort]", function () {
        const newSort = $(this).data("sort");
        sortOrder = (sortBy === newSort) ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';
        sortBy = newSort;
        carregarProdutos(1);
    });

    $(document).on("click", ".pagina", function(e) {
        e.preventDefault();
        carregarProdutos($(this).data("p"));
    });

    $(document).on("click", ".btn-excluir", function() {
        const id = $(this).data("id");

        Swal.fire({
            title: 'Confirmação',
            text: 'Deseja realmente excluir este produto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
        }).then(result => {
            if(result.isConfirmed){
                Swal.fire({ title: 'Excluindo...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

                const formData = new FormData();
                formData.append('_method', 'DELETE');
                formData.append('_token', csrfToken);

                fetch(`/produtos/${id}`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'Accept': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    Swal.fire({ title: 'Sucesso!', text: data.message, icon: 'success' });
                    carregarProdutos(1);
                })
                .catch(() => Swal.fire({ title: 'Erro!', text: 'Não foi possível excluir o produto.', icon: 'error' }));
            }
        });
    });

    carregarProdutos(1);
});
