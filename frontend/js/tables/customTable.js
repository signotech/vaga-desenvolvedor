export function renderTable(tableId){
    $(document).ready(function () {
    $(tableId).DataTable({
        language: {
        search: "Buscar:",
        lengthMenu: "Mostrar _MENU_ registros por página",
        info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
        paginate: {
            first: "Primeiro",
            last: "Último",
            next: "Próximo",
            previous: "Anterior"
        },
        zeroRecords: "Nenhum registro encontrado",
        },
        order: [[0, 'asc']]
    });
});

}