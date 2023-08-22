const Port = 8080

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { get } = require("prompt");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
    console.log("Sucesso na conexão com db");
});
                                                    // data do servidor
const data = new Date();
const dataAtual = (`${String(data.getDate()).padStart(2, '0')}/${String(data.getMonth() + 1).padStart(2, '0')}/${data.getFullYear()}`);

                                                    // database

const insClientes = `INSERT INTO clientes(nome, email, telefone, cpf) VALUES(?, ?, ?, ?)`; 
const selClientes = `SELECT * FROM clientes`;

const insProdutos = `INSERT INTO produtos(titulo, estoque, preco, sku) VALUES(?, ?, ?, ?)`;
const selProdutos = `SELECT * FROM produtos`;

const insPedidos = `INSERT INTO pedidos(cliente, produto, quantidade, desconto, valor, status, data) VALUES(?, ?, ?, ?, ?, ?, ?)`;
const selPedidos = `SELECT * FROM pedidos`;
                                                    // config

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

                                                    // FE

app.use('/Front-end/Fontes', express.static(__dirname + "/Front-end/Fontes"));
app.use('/Front-end/style', express.static(__dirname + "/Front-end/style"));
app.use('/Front-end/script', express.static(__dirname + "/Front-end/script"));
app.use('/Imagens', express.static(__dirname + "/Imagens"));


                                                    // Main

app.get("/Main", function(req, res) {
    res.sendFile(__dirname + "/Front-end/Index.html");
});

                                                    // Clientes

app.get("/Clientes", function(req, res) {
    res.sendFile(__dirname + "/Front-end/Clientes.html");
});

// Excluir Cliente

app.post("/Clientes", function(req, res) {
    var id = req.body.idExcluir;

    db.run(`DELETE FROM clientes WHERE id = '${id}'`, (err) => {
        if (err) {
            console.log(err.message);
        };
    });

    res.redirect("/Clientes");
});

// Cadastrar Cliente

app.get("/cadClientes", function(req, res) {
    res.sendFile(__dirname + "/Front-end/cadClientes.html");
});

app.post("/rotaClientes", function(req, res) {
    var nome = req.body.nome;
    var email = req.body.email;
    var telefone = req.body.telefone;
    var cpf = req.body.cpf;

    if (nome !== undefined) {
        nomes = nome.toLowerCase().split(" ")
        for (let i = 0; i < nomes.length; i++) {
            nomes[i] = nomes[i][0].toUpperCase() + nomes[i].substr(1);
        }
        nome = nomes.join(" ")
    }

    //Inserir no banco de dados
    if (nome && email && telefone && cpf != null) {
        db.run(insClientes, [nome, email, telefone, cpf]);
    };

    res.redirect("/Clientes");
});

// Editar Cliente

app.get("/editClientes", function(req, res) {
    res.sendFile(__dirname + "/Front-end/editClientes.html");
});

app.post("/editClientes", function(req, res) {
    var id = req.body.id;
    var { nome, email, telefone, cpf} = req.body;

    // tratar string nome
    nomes = nome.toLowerCase().split(" ")
    for (let i = 0; i < nomes.length; i++) {
        nomes[i] = nomes[i][0].toUpperCase() + nomes[i].substr(1);
    }
    nome = nomes.join(" ")

    const query = "UPDATE clientes SET nome = ?, email = ?, telefone = ?, cpf = ? WHERE id = ?";

    db.run(query, [nome, email, telefone, cpf, id], function(err) {
        if (err) {
            console.log("Erro ao atualizar o cliente:", err.message);
            res.redirect("/Clientes");
        } else {
            console.log("Cliente atualizado com sucesso!");
            res.redirect("/Clientes");
        }
    });
});

app.post("/dadosClientes", function(req, res) {
    db.all(selClientes, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send("Erro ao recuperar os clientes do banco de dados.");
        } else {
            var clientesData = {clientes: rows};
            res.send(clientesData); 
        };
    });
});

app.get("/dadosClientes/:id", function (req, res) {
    const id = req.params.id;
    db.get("SELECT * FROM clientes WHERE id = ?", id, (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).send("Erro ao recuperar os dados do cliente do banco de dados.");
        } else {
            if (row) {
                res.send(row);
            } else {
                res.status(404).send("Cliente não encontrado.");
            }
        };
    });
});
                                                    // Produtos

app.get("/Produtos", function(req, res) {
    res.sendFile(__dirname + "/Front-end/Produtos.html");
});

app.post("/Produtos", function(req, res) {
    var id = req.body.idExcluir;

    db.run(`DELETE FROM produtos WHERE id = ${id}`, (err) => {
        if (err) {
            console.log(err.message);
        };
    });

    res.redirect("/Produtos");
});

// Cadastrar Produto

app.get("/cadProdutos", function(req, res) {
    res.sendFile(__dirname + "/Front-end/cadProdutos.html");
});

app.post("/rotaProdutos", function(req, res) {
    var titulo = req.body.titulo;
    var estoque = req.body.estoque;
    var preco = req.body.preco;
    var sku = req.body.sku;

    // tratar string titulo
    titulos = titulo.toLowerCase().split(" ")
    for (let i = 0; i < titulos.length; i++) {
        titulos[i] = titulos[i][0].toUpperCase() + titulos[i].substr(1);
    }
    titulo = titulos.join(" ");
    
    if (titulo && estoque && preco && sku != null) {
        db.run(insProdutos, [titulo, estoque, preco, sku]);
    };

    res.redirect("/Produtos");  
});

// Editar Produto

app.get("/editProdutos", function(req, res) {
    res.sendFile(__dirname + "/Front-end/editProdutos.html");
});

app.post("/editProdutos", function(req, res) {
    var id = req.body.id;
    var { titulo, estoque, preco, sku } = req.body;

    const query = "UPDATE produtos SET titulo = ?, estoque = ?, preco = ?, sku = ? WHERE id = ?";

    // tratar string titulo
    titulos = titulo.toLowerCase().split(" ")
    for (let i = 0; i < titulos.length; i++) {
        titulos[i] = titulos[i][0].toUpperCase() + titulos[i].substr(1);
    }
    titulo = titulos.join(" ");

    db.run(query, [titulo, estoque, preco, sku, id], function(err) {
        if (err) {
            console.log("Erro ao atualizar o produto:", err.message);
            res.redirect("/Produtos");
        } else {
            console.log("Produto atualizado com sucesso!");
            res.redirect("/Produtos");
        }
    });
});

app.post("/dadosProdutos", function(req, res) {
    db.all(selProdutos, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send("Erro ao recuperar os produtos do banco de dados.");
        } else {
            var produtosData = {produtos: rows};
            res.send(produtosData);
        };
    });
});

app.get("/dadosProdutos/:id", function (req, res) {
    const id = req.params.id;
    db.get("SELECT * FROM produtos WHERE id = ?", id, (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).send("Erro ao recuperar os dados do produto do banco de dados.");
        } else {
            if (row) {
                res.send(row);
            } else {
                res.status(404).send("Produto não encontrado.");
            }
        }
    });
});

                                                    // Pedidos

app.get("/Pedidos", function(req, res) {
    res.sendFile(__dirname + "/Front-end/Pedidos.html");
});

// Excluir Pedido

app.post("/Pedidos", function (req, res) {
    var id = req.body.idExcluir;
    db.get("SELECT produto, quantidade FROM pedidos WHERE id = ?", id, (err, row) => {
        if (err) {
            console.log(err.message);
            res.redirect("/Pedidos");
        } else {
            if (row) {
                const { produto, quantidade } = row;
                db.run(`DELETE FROM pedidos WHERE id = '${id}'`, (err) => {
                    if (err) {
                        console.log(err.message);
                    } else {
                        console.log("Pedido excluído com sucesso!");
                        const updateEstoqueQuery = "UPDATE produtos SET estoque = estoque + ? WHERE titulo = ?";

                        db.run(updateEstoqueQuery, [quantidade, produto], function (err) {
                            if (err) {
                                console.log("Erro ao atualizar o estoque do produto:", err.message);
                            } else {
                                console.log("Estoque do produto atualizado com sucesso!");
                            }
                        });
                    }
                });
            }
        }
    });

    res.redirect("/Pedidos");
});


// Cadastrar Pedido

app.get("/cadPedidos", function(req, res) {
    res.sendFile(__dirname + "/Front-end/cadPedidos.html")
});

app.post("/rotaPedidos", function(req, res) {
    var {cliente, produto, quantidade, desconto, valor, status} = req.body;
    var data = dataAtual;

    const checarEstoqueQuery = "SELECT estoque FROM produtos WHERE titulo = ?";
    db.get(checarEstoqueQuery, [produto], function(err, row) {
        if (err) {
            console.log("Erro ao verificar o estoque do produto:", err.message);
            res.redirect("/Pedidos");
        } else {

            const EstoqueDisponível = row ? row.estoque : 0;
            if (quantidade <= EstoqueDisponível) {
                db.run(insPedidos, [cliente, produto, quantidade, desconto, valor, status, data], function(err) {
                    if (err) {
                        console.log("Erro ao cadastrar o pedido:", err.message);
                    } else {
                        console.log("Pedido cadastrado com sucesso!");

                        const updateEstoqueQuery = "UPDATE produtos SET estoque = estoque - ? WHERE titulo = ?";
                        db.run(updateEstoqueQuery, [quantidade, produto], function(err) {
                            if (err) {
                                console.log("Erro ao atualizar o estoque do produto:", err.message);
                            } else {
                                console.log("Estoque do produto atualizado com sucesso!");
                            }
                        });
                    }
                    res.redirect("/Pedidos");
                });
            } else {
                console.log("Quantidade solicitada excede o estoque disponível.");
                res.redirect("/Pedidos");
            }
        }
    });
});

// Editar Pedido
app.get("/editPedidos", function(req, res) {
    res.sendFile(__dirname + "/Front-end/editPedidos.html")
});

app.post("/editPedidos", function (req, res) {
    var id = req.body.id;
    var { cliente, produto, quantidade, desconto, valor, status } = req.body;

    db.get("SELECT quantidade FROM pedidos WHERE id = ?", id, (err, row) => {
        if (err) {
            console.error("Erro ao recuperar a quantidade do pedido:", err.message);
            res.redirect("/Pedidos");
        } else {
            const oldQuantity = row ? row.quantidade : 0;
            
            const query = "UPDATE pedidos SET cliente = ?, produto = ?, quantidade = ?, desconto = ?, valor = ?, status = ? WHERE id = ?";

            db.run(query, [cliente, produto, quantidade, desconto, valor, status, id], function (err) {
                if (err) {
                    console.error("Erro ao atualizar o pedido:", err.message);
                    res.redirect("/Pedidos");
                } else {
                    console.log("Pedido atualizado com sucesso!");

                    if (oldQuantity !== quantidade) {
                        const updateStockQuery = "UPDATE produtos SET estoque = estoque + ? WHERE titulo = ?";
                        const stockChange = oldQuantity - quantidade;

                        db.run(updateStockQuery, [stockChange, produto], function (err) {
                            if (err) {
                                console.error("Erro ao atualizar o estoque do produto:", err.message);
                            } else {
                                console.log("Estoque do produto atualizado com sucesso!");
                            }
                        });
                    }

                    res.redirect("/Pedidos");
                }
            });
        }
    });
});

// DADOS

app.post("/dadosPedidos", function(req, res) {
    db.all(selPedidos, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send("Erro ao recuperar os pedidos do banco de dados.");
        } else {
            var pedidosData = {pedidos: rows};
            res.send(pedidosData)
        };
    });
});

app.get("/dadosPedidos/:id", function(req, res) {
    const id = req.params.id;
    db.get("SELECT * FROM pedidos WHERE id = ?", id, (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).send("Erro ao recuperar os dados do pedido do banco de dados.");
        } else {
            if (row) {
                res.send(row);
            } else {
                res.status(404).send("Pedido não encontrado.")
            }
        };
    });
});
                                                    //app.listen
app.listen(Port, function() {
    console.log("Server status = ON\nPort = 8080");
});