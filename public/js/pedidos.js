
const API_URL = '/api/pedidos';
const CLIENTES_URL = '/api/clientes';
const PRODUTOS_URL = '/api/produtos';

const formPedido = document.getElementById('formPedido');
const pedidoId = document.getElementById('pedidoId');
const codigoPedido = document.getElementById('codigoPedido');
const clienteId = document.getElementById('clienteId');
const dataPedido = document.getElementById('dataPedido');
const statusPedido = document.getElementById('statusPedido');

const listaItens = document.getElementById('listaItens');
const adicionarItem = document.getElementById('adicionarItem');
const listaPedidos = document.getElementById('listaPedidos');

const mensagem = document.getElementById('mensagem');
const tituloFormulario = document.getElementById('tituloFormulario');
const btnSalvar = document.getElementById('btnSalvar');
const cancelarEdicao = document.getElementById('cancelarEdicao');

const busca = document.getElementById('busca');
const ordenarPor = document.getElementById('ordenarPor');
const ordem = document.getElementById('ordem');

const paginaAnterior = document.getElementById('paginaAnterior');
const proximaPagina = document.getElementById('proximaPagina');
const informacaoPagina = document.getElementById('informacaoPagina');

let clientes = [];
let produtos = [];

let paginaAtual = 1;
const limite = 20;
let totalPaginas = 1;

// Exibe mensagens na tela
function exibirMensagem(texto, erro = false) {
    mensagem.textContent = texto;
    mensagem.style.color = erro ? '#c0392b' : '#218838';
}

// Consulta a API e verifica possíveis erros
async function buscarDados(url) {
    const resposta = await fetch(url);
    const dados = await resposta.json();

    if (!resposta.ok) {
        throw new Error(dados.mensagem || 'Erro ao consultar a API.');
    }

    return dados;
}

// Carrega todos os clientes, respeitando o limite de 100 registros por página
async function carregarClientes() {
    clientes = [];

    let pagina = 1;
    let totalPaginasClientes = 1;

    do {
        const dados = await buscarDados(
            `${CLIENTES_URL}?limite=100&pagina=${pagina}`
        );

        clientes.push(...(dados.clientes || []));

        totalPaginasClientes = dados.totalPaginas || 1;
        pagina++;

    } while (pagina <= totalPaginasClientes);

    clienteId.innerHTML = '';

    const opcaoInicial = document.createElement('option');
    opcaoInicial.value = '';
    opcaoInicial.textContent = 'Selecione um cliente';
    clienteId.appendChild(opcaoInicial);

    clientes.forEach(cliente => {
        const opcao = document.createElement('option');

        opcao.value = cliente.id;
        opcao.textContent = `${cliente.nome || 'Cliente'} - ${cliente.email}`;

        clienteId.appendChild(opcao);
    });
}

// Carrega todos os produtos, respeitando o limite de 100 registros por página
async function carregarProdutos() {
    produtos = [];

    let pagina = 1;
    let totalPaginasProdutos = 1;

    do {
        const dados = await buscarDados(
            `${PRODUTOS_URL}?limite=100&pagina=${pagina}`
        );

        produtos.push(...(dados.produtos || []));

        totalPaginasProdutos = dados.totalPaginas || 1;
        pagina++;

    } while (pagina <= totalPaginasProdutos);
}

// Cria uma linha para adicionar um produto ao pedido
function adicionarLinhaItem(produtoSelecionado = '', quantidade = 1) {
    const linha = document.createElement('div');
    linha.className = 'linha-item';

    const campoProduto = document.createElement('div');
    campoProduto.className = 'campo';

    const labelProduto = document.createElement('label');
    labelProduto.textContent = 'Produto:';

    const selectProduto = document.createElement('select');
    selectProduto.className = 'produto-item';
    selectProduto.required = true;

    const opcaoInicial = document.createElement('option');
    opcaoInicial.value = '';
    opcaoInicial.textContent = 'Selecione um produto';

    selectProduto.appendChild(opcaoInicial);

    produtos.forEach(produto => {
        const opcao = document.createElement('option');

        opcao.value = produto.id;
        opcao.textContent = `${produto.titulo} - R$ ${Number(produto.preco || 0).toFixed(2)}`;

        selectProduto.appendChild(opcao);
    });

    selectProduto.value = String(produtoSelecionado);

    campoProduto.appendChild(labelProduto);
    campoProduto.appendChild(selectProduto);

    const campoQuantidade = document.createElement('div');
    campoQuantidade.className = 'campo';

    const labelQuantidade = document.createElement('label');
    labelQuantidade.textContent = 'Quantidade:';

    const inputQuantidade = document.createElement('input');
    inputQuantidade.type = 'number';
    inputQuantidade.className = 'quantidade-item';
    inputQuantidade.min = '1';
    inputQuantidade.step = '1';
    inputQuantidade.value = quantidade;
    inputQuantidade.required = true;

    campoQuantidade.appendChild(labelQuantidade);
    campoQuantidade.appendChild(inputQuantidade);

    const botaoRemover = document.createElement('button');
    botaoRemover.type = 'button';
    botaoRemover.className = 'botao botao-perigo';
    botaoRemover.textContent = 'Remover';

    botaoRemover.addEventListener('click', () => {
        linha.remove();
    });

    linha.appendChild(campoProduto);
    linha.appendChild(campoQuantidade);
    linha.appendChild(botaoRemover);

    listaItens.appendChild(linha);
}

// Adiciona uma nova linha de produto
adicionarItem.addEventListener('click', () => {
    adicionarLinhaItem();
});

// Obtém os produtos e quantidades informados no formulário
function obterItensFormulario() {
    const linhas = listaItens.querySelectorAll('.linha-item');

    return Array.from(linhas).map(linha => {
        const produto = linha.querySelector('.produto-item').value;
        const quantidade = linha.querySelector('.quantidade-item').value;

        return {
            produto_id: Number(produto),
            quantidade: Number(quantidade)
        };
    });
}

// Limpa o formulário
function limparFormulario() {
    formPedido.reset();
    pedidoId.value = '';
    listaItens.innerHTML = '';

    tituloFormulario.textContent = 'Cadastro de Pedidos';
    btnSalvar.textContent = 'Salvar Pedido';
    cancelarEdicao.hidden = true;

    statusPedido.value = 'Em Aberto';
}

// Carrega os pedidos cadastrados
async function carregarPedidos() {
    try {
        const parametros = new URLSearchParams({
            pagina: paginaAtual,
            limite: limite,
            busca: busca.value,
            ordenarPor: ordenarPor.value,
            ordem: ordem.value
        });

        const dados = await buscarDados(`${API_URL}?${parametros}`);

        listaPedidos.innerHTML = '';

        if (!dados.pedidos || dados.pedidos.length === 0) {
            const linha = document.createElement('tr');
            const coluna = document.createElement('td');

            coluna.colSpan = 6;
            coluna.textContent = 'Nenhum pedido encontrado.';

            linha.appendChild(coluna);
            listaPedidos.appendChild(linha);

        } else {
            dados.pedidos.forEach(pedido => {
                const linha = document.createElement('tr');

                const cliente = pedido.cliente || pedido.Cliente;

                const valores = [
                    pedido.id,
                    pedido.codigo_pedido,
                    cliente?.nome || `Cliente #${pedido.cliente_id}`,
                    pedido.data_pedido
                        ? String(pedido.data_pedido).substring(0, 10)
                        : '-',
                    pedido.status
                ];

                valores.forEach(valor => {
                    const coluna = document.createElement('td');
                    coluna.textContent = valor ?? '-';
                    linha.appendChild(coluna);
                });

                const colunaAcoes = document.createElement('td');

                const botaoEditar = document.createElement('button');
                botaoEditar.type = 'button';
                botaoEditar.textContent = 'Editar';
                botaoEditar.className = 'botao botao-secundario';

                botaoEditar.addEventListener('click', () => {
                    editarPedido(pedido.id);
                });

                const botaoExcluir = document.createElement('button');
                botaoExcluir.type = 'button';
                botaoExcluir.textContent = 'Excluir';
                botaoExcluir.className = 'botao botao-perigo';

                botaoExcluir.addEventListener('click', () => {
                    excluirPedido(pedido.id);
                });

                colunaAcoes.appendChild(botaoEditar);
                colunaAcoes.appendChild(botaoExcluir);

                linha.appendChild(colunaAcoes);
                listaPedidos.appendChild(linha);
            });
        }

        totalPaginas = dados.totalPaginas || 1;

        informacaoPagina.textContent =
            `Página ${dados.pagina || paginaAtual} de ${totalPaginas}`;

        paginaAnterior.disabled = paginaAtual <= 1;
        proximaPagina.disabled = paginaAtual >= totalPaginas;

    } catch (erro) {
        console.error(erro);
        exibirMensagem(erro.message, true);
    }
}

// Cadastra ou atualiza um pedido
formPedido.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const itens = obterItensFormulario();

    if (!Number.isInteger(Number(codigoPedido.value)) || Number(codigoPedido.value) < 1) {
        exibirMensagem('Informe um código de pedido válido.', true);
        return;
    }

    if (!clienteId.value) {
        exibirMensagem('Selecione um cliente.', true);
        return;
    }

    if (itens.length === 0) {
        exibirMensagem('Adicione pelo menos um produto ao pedido.', true);
        return;
    }

    if (itens.some(item =>
        !Number.isInteger(item.produto_id) ||
        item.produto_id < 1 ||
        !Number.isInteger(item.quantidade) ||
        item.quantidade < 1
    )) {
        exibirMensagem('Verifique os produtos e as quantidades informadas.', true);
        return;
    }

    const produtosSelecionados = itens.map(item => item.produto_id);

    if (new Set(produtosSelecionados).size !== produtosSelecionados.length) {
        exibirMensagem(
            'Não adicione o mesmo produto mais de uma vez. Ajuste a quantidade na linha existente.',
            true
        );
        return;
    }

    const dadosPedido = {
        codigo_pedido: Number(codigoPedido.value),
        cliente_id: Number(clienteId.value),
        data_pedido: dataPedido.value || null,
        status: statusPedido.value,
        itens
    };

    const id = pedidoId.value;
    const metodo = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/${id}` : API_URL;

    try {
        const resposta = await fetch(url, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosPedido)
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.mensagem || 'Não foi possível salvar o pedido.');
        }

        exibirMensagem(
            id
                ? 'Pedido atualizado com sucesso!'
                : 'Pedido cadastrado com sucesso!'
        );

        limparFormulario();
        paginaAtual = 1;

        await carregarPedidos();

    } catch (erro) {
        exibirMensagem(erro.message, true);
    }
});

// Busca um pedido específico e prepara o formulário para edição
async function editarPedido(id) {
    try {
        const dados = await buscarDados(`${API_URL}/${id}`);
        const pedido = dados.pedido || dados;

        pedidoId.value = pedido.id;
        codigoPedido.value = pedido.codigo_pedido;
        clienteId.value = String(pedido.cliente_id);

        dataPedido.value = pedido.data_pedido
            ? String(pedido.data_pedido).substring(0, 10)
            : '';

        statusPedido.value = pedido.status;

        listaItens.innerHTML = '';

        const itensPedido = pedido.itens || pedido.ItemPedidos || [];

        itensPedido.forEach(item => {
            adicionarLinhaItem(
                item.produto_id,
                item.quantidade
            );
        });

        if (itensPedido.length === 0) {
            adicionarLinhaItem();
        }

        tituloFormulario.textContent = 'Editar Pedido';
        btnSalvar.textContent = 'Atualizar Pedido';
        cancelarEdicao.hidden = false;

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    } catch (erro) {
        exibirMensagem(erro.message, true);
    }
}

// Exclui um pedido
async function excluirPedido(id) {
    const confirmar = confirm(
        'Tem certeza de que deseja excluir este pedido?'
    );

    if (!confirmar) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.mensagem || 'Não foi possível excluir o pedido.');
        }

        exibirMensagem('Pedido excluído com sucesso!');

        await carregarPedidos();

    } catch (erro) {
        exibirMensagem(erro.message, true);
    }
}

// Cancela a edição
cancelarEdicao.addEventListener('click', limparFormulario);

// Pesquisa
document.getElementById('btnBuscar').addEventListener('click', () => {
    paginaAtual = 1;
    carregarPedidos();
});

// Pesquisa ao pressionar Enter
busca.addEventListener('keydown', (evento) => {
    if (evento.key === 'Enter') {
        paginaAtual = 1;
        carregarPedidos();
    }
});

// Paginação
paginaAnterior.addEventListener('click', () => {
    if (paginaAtual > 1) {
        paginaAtual--;
        carregarPedidos();
    }
});

proximaPagina.addEventListener('click', () => {
    if (paginaAtual < totalPaginas) {
        paginaAtual++;
        carregarPedidos();
    }
});

// Inicializa a página
async function inicializarPagina() {
    try {
        await Promise.all([
            carregarClientes(),
            carregarProdutos()
        ]);

        adicionarLinhaItem();

        await carregarPedidos();

    } catch (erro) {
        console.error(erro);

        exibirMensagem(
            'Não foi possível carregar clientes e produtos. Verifique a API posteriormente.',
            true
        );
    }
}

inicializarPagina();
