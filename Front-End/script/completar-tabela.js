$(document).ready(function() {
    function getClientes() {
        $.ajax({
            url: "http://localhost:8080/dadosClientes",
            type: "POST",
            success: function(response) {
                $("#tabelaClientes").empty();

                response.clientes.forEach(function(cliente) {
                    var row = $("<tr></tr>");

                    var idCell = $("<td></td>").text(cliente.ID)
                    var nomeCell = $("<td></td>").text(cliente.nome);
                    var emailCell = $("<td></td>").text(cliente.email);
                    var telefoneCell = $("<td></td>").text(cliente.telefone);
                    var cpfCell = $("<td></td>").text(cliente.cpf);
                    var editCell = $(`<td class='td-botoes'>
                    <a href='/editClientes?clienteId=${cliente.ID}'><button class='botao-editar' id='editar-cliente'>✏️</button></a>
                    <form action='/Clientes' method='post' class='form-invisivel'>    
                        <input type='hidden' name='idExcluir' id='idExcluir' value='${cliente.ID}'>
                        <button type='button' class='botao-excluir'>🗑️</button>
                    </form>
                    </td>`);

                    row.append(idCell, nomeCell, emailCell, telefoneCell, cpfCell, editCell);
                    $("#tabelaClientes").append(row);
                });

                $('#clientesTable').DataTable({
                    language: {
                        "url": "//cdn.datatables.net/plug-ins/1.13.5/i18n/pt-BR.json"
                    }
                });
                
                $.getScript("/Front-End/script/index.js");
            },
            error: function() {
                console.log("Erro ao recuperar os dados dos clientes.");
            }
        });
    };

    getClientes();
});

$(document).ready(function() {
    function getProdutos() {
        $.ajax({
            url: "http://localhost:8080/dadosProdutos",
            type: "POST",
            success: function(response) {
                $("#tabelaProdutos").empty();

                response.produtos.forEach(function(produto) {
                    var row = $("<tr></tr>");

                    var idCell = $("<td></td>").text(produto.ID)
                    var tituloCell = $("<td></td>").text(produto.titulo);
                    var estoqueCell = $("<td></td>").text(produto.estoque);
                    var precoCell = $("<td></td>").text(produto.preco);
                    var skuCell = $("<td></td>").text(produto.sku);
                    var editCell = $(`<td>
                    <a href='/editProdutos?produtoId=${produto.ID}'><button class='botao-editar' id='editar-produto'>✏️</button></a>
                    <form action='/Produtos' method='post' class='form-invisivel'>    
                        <input type='hidden' name='idExcluir' id='idExcluir' value='${produto.ID}'>
                        <button type='button' class='botao-excluir'>🗑️</button>
                    </td>`);

                    row.append(idCell, tituloCell, estoqueCell, precoCell, skuCell, editCell);
                    $("#tabelaProdutos").append(row);
                });

                $('#produtosTable').DataTable({
                    language: {
                        "url": "//cdn.datatables.net/plug-ins/1.13.5/i18n/pt-BR.json"
                    }
                });

                $.getScript("/Front-End/script/index.js");
            },
            error: function() {
            console.log("Erro ao recuperar os dados dos produtos.");
        }
      });
    }
    getProdutos();
});

$(document).ready(function() {
    function getPedidos() {
        $.ajax({
            url: "http://localhost:8080/dadosPedidos",
            type: "POST",
            success: function(response) {
                $("#tabelaPedidos").empty();

                response.pedidos.forEach(function(pedido) {
                    var row = $("<tr></tr>");

                    var idCell = $("<td></td>").text(pedido.ID);
                    var clienteCell = $("<td></td>").text(pedido.cliente);
                    var produtoCell = $("<td></td>").text(pedido.produto);
                    var quantidadeCell = $("<td></td>").text(pedido.quantidade);
                    var valorCell = $("<td></td>").text(pedido.valor);
                    var statusCell = $("<td></td>").text(pedido.status);
                    var dataCell = $("<td></td>").text(pedido.data);
                    var editCell = $(`<td class="td-botoes">
                    <a href="/editPedidos?pedidoId=${pedido.ID}"><button class="botao-editar" id="editar-pedido">✏️</button></a>
                    <form action="/Pedidos" method="post" class="form-invisivel">
                        <input type="hidden" name="idExcluir" value="${pedido.ID}">
                        <button type="button" class="botao-excluir" data-id="${pedido.ID}">🗑️</button>
                    </form>
                    </td>`);
                

                    row.append(idCell, clienteCell, produtoCell, quantidadeCell, valorCell, statusCell, dataCell, editCell);
                    $("#tabelaPedidos").append(row);
                });

                $('#pedidosTable').DataTable({
                    language: {
                        "url": "//cdn.datatables.net/plug-ins/1.13.5/i18n/pt-BR.json"
                    }
                });
                
                $.getScript("/Front-End/script/index.js");
            },
            error: function() {
                console.log("Erro ao recuperar os dados dos pedidos.");
            }
        });
    };

    getPedidos();
});
