
const API_URL = '/api/produtos';

const formProduto = document.getElementById('formProduto');
const produtoId = document.getElementById('produtoId');
const sku = document.getElementById('sku');
const titulo = document.getElementById('titulo');
const preco = document.getElementById('preco');
const estoque = document.getElementById('estoque');

const listaProdutos = document.getElementById('listaProdutos');
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

let paginaAtual = 1;
const limite = 20;
let totalPaginas = 1;

// Exibe mensagens para o usuário
function exibirMensagem(texto, erro = false) {
    mensagem.textContent = texto;
    mensagem.style.color = erro ? '#c0392b' : '#218838';
}

// Limpa o formulário
function limparFormulario() {
    formProduto.reset();
    produtoId.value = '';

    tituloFormulario.textContent = 'Cadastro de Produtos';
    btnSalvar.textContent = 'Salvar Produto';
    cancelarEdicao.hidden = true;
}

// Carrega os produtos cadastrados
async function carregarProdutos() {
    try {
        const parametros = new URLSearchParams({
            pagina: paginaAtual,
            limite: limite,
            busca: busca.value,
            ordenarPor: ordenarPor.value,
            ordem: ordem.value
        });

        const resposta = await fetch(`${API_URL}?${parametros}`);
        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.mensagem || 'Erro ao carregar produtos.');
        }

        listaProdutos.innerHTML = '';

        if (!dados.produtos || dados.produtos.length === 0) {
            listaProdutos.innerHTML = `
                <tr>
                    <td colspan="6">Nenhum produto encontrado.</td>
                </tr>
            `;
        } else {
            dados.produtos.forEach(produto => {
                const linha = document.createElement('tr');

                const precoFormatado = produto.preco !== null
                    ? Number(produto.preco).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })
                    : '-';

                linha.innerHTML = `
                    <td>${produto.id}</td>
                    <td></td>
                    <td></td>
                    <td>${precoFormatado}</td>
                    <td>${produto.estoque ?? '-'}</td>
                    <td></td>
                `;

                // Insere os dados como texto para evitar interpretar conteúdo como HTML
                linha.children[1].textContent = produto.sku || '-';
                linha.children[2].textContent = produto.titulo;

                const acoes = linha.children[5];

                const botaoEditar = document.createElement('button');
                botaoEditar.textContent = 'Editar';
                botaoEditar.className = 'botao botao-secundario';
                botaoEditar.addEventListener('click', () => editarProduto(produto));

                const botaoExcluir = document.createElement('button');
                botaoExcluir.textContent = 'Excluir';
                botaoExcluir.className = 'botao botao-perigo';
                botaoExcluir.addEventListener('click', () => excluirProduto(produto.id));

                acoes.appendChild(botaoEditar);
                acoes.appendChild(botaoExcluir);

                listaProdutos.appendChild(linha);
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

// Cadastra ou atualiza um produto
formProduto.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const dadosProduto = {
        sku: sku.value.trim() || null,
        titulo: titulo.value.trim(),
        preco: preco.value === '' ? null : Number(preco.value),
        estoque: estoque.value === '' ? null : Number(estoque.value)
    };

    const id = produtoId.value;
    const metodo = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/${id}` : API_URL;

    try {
        const resposta = await fetch(url, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosProduto)
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.mensagem || 'Não foi possível salvar o produto.');
        }

        exibirMensagem(
            id ? 'Produto atualizado com sucesso!' : 'Produto cadastrado com sucesso!'
        );

        limparFormulario();
        paginaAtual = 1;
        await carregarProdutos();

    } catch (erro) {
        exibirMensagem(erro.message, true);
    }
});

// Prepara o formulário para edição
function editarProduto(produto) {
    produtoId.value = produto.id;
    sku.value = produto.sku || '';
    titulo.value = produto.titulo;
    preco.value = produto.preco ?? '';
    estoque.value = produto.estoque ?? '';

    tituloFormulario.textContent = 'Editar Produto';
    btnSalvar.textContent = 'Atualizar Produto';
    cancelarEdicao.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Exclui um produto
async function excluirProduto(id) {
    const confirmar = confirm('Tem certeza de que deseja excluir este produto?');

    if (!confirmar) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.mensagem || 'Não foi possível excluir o produto.');
        }

        exibirMensagem('Produto excluído com sucesso!');

        await carregarProdutos();

    } catch (erro) {
        exibirMensagem(erro.message, true);
    }
}

// Botão para cancelar edição
cancelarEdicao.addEventListener('click', limparFormulario);

// Pesquisa e ordenação
document.getElementById('btnBuscar').addEventListener('click', () => {
    paginaAtual = 1;
    carregarProdutos();
});

// Pesquisa ao pressionar Enter
busca.addEventListener('keydown', (evento) => {
    if (evento.key === 'Enter') {
        paginaAtual = 1;
        carregarProdutos();
    }
});

// Paginação
paginaAnterior.addEventListener('click', () => {
    if (paginaAtual > 1) {
        paginaAtual--;
        carregarProdutos();
    }
});

proximaPagina.addEventListener('click', () => {
    if (paginaAtual < totalPaginas) {
        paginaAtual++;
        carregarProdutos();
    }
});

// Carrega os produtos ao abrir a página
carregarProdutos();
