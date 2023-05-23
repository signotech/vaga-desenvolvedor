import { prismaClient } from "./client"

interface IClient {
    nome: string
    email: string
    cpf: string
}

interface IProduct {
    titulo: string
    preco: number
    estoque: number
    sku: string
}

const seedClients = async () => {

    //Insira os dados do cliente nesse array
    const clientsData: IClient[] = [
        { nome: "João Silva", email: "joao@gmail.com", cpf: "12345678901" },
        { nome: "Maria Antônia", email: "maria@gmail.com", cpf: "98765432109" },
        { nome: "Pedro Rodrigues", email: "pedro@gmail.com", cpf: "83828399324" },
        { nome: "Fabio Fernandes", email: "fabio@gmail.com", cpf: "43566923149" },
        { nome: "Paulo Xavier", email: "paulo@gmail.com", cpf: "05439212332" },
        { nome: "Raquel Ferreira", email: "raquel@gmail.com", cpf: "24681357902" },
        { nome: "Mario Da Silva", email: "mario@gmail.com", cpf: "86420975301" },
        { nome: "Juliano Neves", email: "juliano@gmail.com", cpf: "75319864207" },
        { nome: "Pedro Freitas", email: "pedrof@gmail.com", cpf: "10293847506" },
        { nome: "Leidiane Fonseca", email: "leidiane@gmail.com", cpf: "50817492603" },
        { nome: "Luiza Verona", email: "luiza@gmail.com", cpf: "31572968404" },
    ]

    try {
        clientsData.forEach(async (client) => {
            await prismaClient.client.upsert({
                where: { email: client.email },
                update: {},
                create: {
                    nome: client.nome,
                    email: client.email,
                    cpf: client.cpf
                }
            })
        })
    } catch (err) {
        console.log("Ocorreu um erro ao popular a tabela 'client': ", err)
    } finally {
        await prismaClient.$disconnect()
    }
}

const seedProducts = async () => {

    const productsData: IProduct[] = [
        {
            titulo: 'Arroz - 5kg',
            preco: 19.99,
            estoque: 100,
            sku: 'SKU123456789',
        },
        {
            titulo: 'Feijão - 1kg',
            preco: 5.99,
            estoque: 80,
            sku: 'SKU987654321',
        },
        {
            titulo: 'Macarrão - 500g',
            preco: 3.49,
            estoque: 120,
            sku: 'SKUABCDEF01',
        },
        {
            titulo: 'Açúcar - 1kg',
            preco: 4.99,
            estoque: 90,
            sku: 'SKU012345678',
        },
        {
            titulo: 'Café em pó - 250g',
            preco: 8.99,
            estoque: 70,
            sku: 'SKUZYXWVUTSR',
        },
        {
            titulo: 'Óleo de soja - 900ml',
            preco: 6.49,
            estoque: 85,
            sku: 'SKU456789123',
        },
        {
            titulo: 'Sal refinado - 1kg',
            preco: 2.99,
            estoque: 100,
            sku: 'SKUDEF456789',
        },
        {
            titulo: 'Leite integral - 1L',
            preco: 3.99,
            estoque: 75,
            sku: 'SKU789456123',
        },
        {
            titulo: 'Pão de forma - 500g',
            preco: 3.49,
            estoque: 60,
            sku: 'SKU1A2B3C4D5',
        },
        {
            titulo: 'Biscoito recheado - 200g',
            preco: 2.49,
            estoque: 120,
            sku: 'SKU5D4C3B2A1',
        },
        {
            titulo: 'Manteiga - 200g',
            preco: 5.99,
            estoque: 50,
            sku: 'SKUXYZ123456',
        },
        {
            titulo: 'Refrigerante - 2L',
            preco: 7.99,
            estoque: 40,
            sku: 'SKUA1B2C3D4E',
        },
        {
            titulo: 'Sabonete - 90g',
            preco: 1.99,
            estoque: 150,
            sku: 'SKU654321098',
        },
        {
            titulo: 'Shampoo - 350ml',
            preco: 9.99,
            estoque: 60,
            sku: 'SKU9876543210',
        },
        {
            titulo: 'Condicionador - 350ml',
            preco: 9.99,
            estoque: 55,
            sku: 'SKUABC123DEF',
        },
        {
            titulo: 'Detergente líquido - 500ml',
            preco: 4.49,
            estoque: 80,
            sku: 'SKU7890XYZ123',
        }
    ]

    try {

        productsData.map(async (product) => {

            await prismaClient.product.upsert({
                where: {
                    sku: product.sku
                },
                update: {},
                create: product
            })

        })
    } catch (err) {
        console.log("Ocorreu um erro ao popular a tabela 'products': ", err)
    } finally {
        await prismaClient.$disconnect()
    }

}


seedProducts()
seedClients()