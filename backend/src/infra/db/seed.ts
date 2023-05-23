import { prismClient } from "./client"

interface ClientInterface {
    nome: string
    email: string
    cpf: string
}

const seedClients = async () => {

    //Insira os dados do cliente nesse array
    const clientsData: ClientInterface[] = [
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
        clientsData.forEach(async(client) => { 
            await prismClient.client.upsert({
                where: { email: client.email },
                update: {},
                create: {
                    nome: client.nome,
                    email: client.email,
                    cpf:client.cpf
                }
            })
        })
    }catch(err){
        console.log("Ocorreu um erro ao popular a tabela 'client': ", err)
    }finally{
        await prismClient.$disconnect()
    }
}

seedClients()