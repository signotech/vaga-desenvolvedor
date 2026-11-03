
const API_URL = '/api/clientes';

let paginaAtual = 1;
const limite = 20;

// ELEMENTOS DA PÁGINA
const formulario = document.getElementById('formCliente');
const campoId = document.getElementById('clienteId');
const campoNome = document.getElementById('nome');
const campoCpf = document.getElementById('cpf');
const campoEmail = document.getElementById('email');

const listaClientes = document.getElementById('listaClientes');
const mensagem = document.getElementById('mensagem');

const campoBusca = document.getElementById('busca');
const campoOrdenacao = document.getElementById('ordenarPor');
const campoOrdem = document.getElementById('ordem');

const informacaoPagina = document.getElementById('informacaoPagina');

const botaoBuscar = document.getElementById('btnBuscar');
const botaoAnterior = document.getElementById('paginaAnterior');
const botaoProximo = document.getElementById('proximaPagina');
const botaoCancelar = document.getElementById('cancelarEdicao');

// EXIBIR MENSAGENS
function exibirMensagem(texto, erro = false) {
    mensagem.textContent = texto;
    mensagem.style.color = erro ? '#c0392b' : '#218838';
}

// FORMATAR CPF
function formatarCpf(cpf) {
    if (!cpf) return '-';

    return cpf.replace(
        /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
        '$1.$2.$3-$4'
    );
}

// CRIAR CÉLULA DA TABELA COM SEGURANÇA
function criarCelula(texto) {
    const celula = document.createElement('td');
    celula.textContent = texto ?? '-';
    return celula;
}

// LISTAR CLIENTES
async function carregarClientes() {
    try {
        listaClientes.innerHTML = `
            <tr>
                <td colspan="5">Carregando clientes...</td>
            </tr>
        `;

        const parametros = new URLSearchParams({
            pagina: paginaAtual,
            limite,
            busca: campoBusca.value.trim(),
            ordenarPor: campoOrdenacao.value,
            ordem: campoOrdem.value
        });

        const resposta = await fetch(`${API_URL}?${parametros}`);
        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.mensagem || 'Erro ao consultar clientes.');
        }

        listaClientes.innerHTML = '';

        if (dados.clientes.length === 0) {
            listaClientes.innerHTML = `
                <tr>
                    <td colspan="5">Nenhum cliente encontrado.</td>
                </tr>
            `;
        }

        dados.clientes.forEach(cliente => {
            const linha = document.createElement('tr');

            linha.appendChild(criarCelula(cliente.id));
            linha.appendChild(criarCelula(cliente.nome));
            linha.appendChild(criarCelula(formatarCpf(cliente.cpf)));
            linha.appendChild(criarCelula(cliente.email));

            const celulaAcoes = document.createElement('td');

            const botaoEditar = document.createElement('button');
            botaoEditar.type = 'button';
            botaoEditar.textContent = 'Editar';
            botaoEditar.className = 'botao botao-secundario';

            botaoEditar.addEventListener('click', () => {
                editarCliente(cliente.id);
            });

            const botaoExcluir = document.createElement('button');
            botaoExcluir.type = 'button';
            botaoExcluir.textContent = 'Excluir';
            botaoExcluir.className = 'botao botao-perigo';

            botaoExcluir.addEventListener('click', () => {
                excluirCliente(cliente.id);
            });

            celulaAcoes.append(botaoEditar, botaoExcluir);
            linha.appendChild(celulaAcoes);

            listaClientes.appendChild(linha);
        });

        informacaoPagina.textContent =
            `Página ${dados.pagina} de ${dados.totalPaginas}`;

        botaoAnterior.disabled = dados.pagina <= 1;

        botaoProximo.disabled =
            dados.totalPaginas === 0 ||
            dados.pagina >= dados.totalPaginas;

    } catch (error) {
        console.error('Erro ao carregar clientes:', error);

        listaClientes.innerHTML = `
            <tr>
                <td colspan="5">Não foi possível carregar os clientes.</td>
            </tr>
        `;

        exibirMensagem(error.message, true);
    }
}

// CADASTRAR OU ATUALIZAR CLIENTE
formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const clienteId = campoId.value;

    const cpf = campoCpf.value.replace(/\D/g, '');

    const cliente = {
        nome: campoNome.value.trim() || null,
        cpf: cpf || null,
        email: campoEmail.value.trim()
    };

    const metodo = clienteId ? 'PUT' : 'POST';

    const url = clienteId
        ? `${API_URL}/${clienteId}`
        : API_URL;

    try {
        const resposta = await fetch(url, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.mensagem || 'Erro ao salvar cliente.');
        }

        exibirMensagem(dados.mensagem);

        formulario.reset();
        campoId.value = '';

        botaoCancelar.hidden = true;

        paginaAtual = 1;

        await carregarClientes();

    } catch (error) {
        console.error('Erro ao salvar cliente:', error);
        exibirMensagem(error.message, true);
    }
});

// EDITAR CLIENTE
async function editarCliente(id) {
    try {
        const resposta = await fetch(`${API_URL}/${id}`);
        const cliente = await resposta.json();

        if (!resposta.ok) {
            throw new Error(cliente.mensagem || 'Cliente não encontrado.');
        }

        campoId.value = cliente.id;
        campoNome.value = cliente.nome || '';
        campoCpf.value = cliente.cpf || '';
        campoEmail.value = cliente.email;

        botaoCancelar.hidden = false;

        exibirMensagem(`Editando cliente ${cliente.id}.`);

        formulario.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

    } catch (error) {
        exibirMensagem(error.message, true);
    }
}

// EXCLUIR CLIENTE
async function excluirCliente(id) {
    const confirmar = window.confirm(
        `Tem certeza que deseja excluir o cliente ${id}?`
    );

    if (!confirmar) return;

    try {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.mensagem || 'Erro ao excluir cliente.');
        }

        exibirMensagem(dados.mensagem);

        await carregarClientes();

    } catch (error) {
        exibirMensagem(error.message, true);
    }
}

// CANCELAR EDIÇÃO
botaoCancelar.addEventListener('click', () => {
    formulario.reset();
    campoId.value = '';

    botaoCancelar.hidden = true;

    exibirMensagem('Edição cancelada.');
});

// BUSCAR CLIENTES
botaoBuscar.addEventListener('click', () => {
    paginaAtual = 1;
    carregarClientes();
});

// PERMITIR BUSCA COM ENTER
campoBusca.addEventListener('keydown', (evento) => {
    if (evento.key === 'Enter') {
        evento.preventDefault();
        paginaAtual = 1;
        carregarClientes();
    }
});

// ALTERAR ORDENAÇÃO
campoOrdenacao.addEventListener('change', () => {
    paginaAtual = 1;
    carregarClientes();
});

campoOrdem.addEventListener('change', () => {
    paginaAtual = 1;
    carregarClientes();
});

// PAGINAÇÃO
botaoAnterior.addEventListener('click', () => {
    if (paginaAtual > 1) {
        paginaAtual--;
        carregarClientes();
    }
});

botaoProximo.addEventListener('click', () => {
    paginaAtual++;
    carregarClientes();
});

// CARREGAMENTO INICIAL
carregarClientes();
