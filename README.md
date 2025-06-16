# 📚 Documentação da API - Sistema de Gestão de Vagas

## 🚀 Visão Geral

Esta API RESTful foi desenvolvida para gerenciar vagas de emprego, candidatos e suas inscrições. Construída com Node.js, Express, TypeScript e Prisma ORM.

## 🔗 Acesso à Documentação

### Swagger UI (Recomendado)
- **URL**: `http://localhost:3000/api-docs`
- **Descrição**: Interface interativa para testar todos os endpoints
- **Recursos**: Teste direto, exemplos de requisições e respostas

### JSON Specification
- **URL**: `http://localhost:3000/api-docs.json`
- **Descrição**: Especificação OpenAPI 3.0 em formato JSON

## 📋 Endpoints Principais

### 🏢 Jobs (Vagas)
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/jobs` | Listar todas as vagas |
| `POST` | `/jobs` | Criar nova vaga |
| `GET` | `/jobs/{id}` | Obter vaga por ID |
| `PUT` | `/jobs/{id}` | Atualizar vaga |
| `DELETE` | `/jobs/{id}` | Excluir vaga |

### 👥 Candidates (Candidatos)
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/candidates` | Listar todos os candidatos |
| `POST` | `/candidates` | Criar novo candidato |
| `GET` | `/candidates/{id}` | Obter candidato por ID |
| `PUT` | `/candidates/{id}` | Atualizar candidato |
| `DELETE` | `/candidates/{id}` | Excluir candidato |

### 📝 Applications (Inscrições)
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/applications` | Listar todas as inscrições |
| `POST` | `/applications` | Criar nova inscrição |
| `GET` | `/applications/{id}` | Obter inscrição por ID |
| `PUT` | `/applications/{id}` | Atualizar inscrição |
| `DELETE` | `/applications/{id}` | Excluir inscrição |
| `GET` | `/applications/check` | Verificar inscrição existente |

## 🔧 Como Usar

### 1. Iniciar o Servidor
\`\`\`bash
cd backend
npm install
npm run dev
\`\`\`

### 2. Acessar a Documentação
Abra seu navegador e vá para: `http://localhost:3000/api-docs`

### 3. Testar Endpoints
- Use a interface Swagger para testar diretamente
- Ou use ferramentas como Postman/Insomnia com os exemplos fornecidos

## 📊 Exemplos de Uso

### Criar uma Nova Vaga
\`\`\`bash
POST /jobs
Content-Type: application/json

{
  "title": "Desenvolvedor Frontend React",
  "description": "Desenvolvedor com experiência em React, TypeScript e Next.js",
  "type": "CLT"
}
\`\`\`

### Criar um Novo Candidato
\`\`\`bash
POST /candidates
Content-Type: application/json

{
  "name": "João Silva Santos",
  "email": "joao@email.com",
  "phone": "(11) 99999-9999"
}
\`\`\`

### Criar uma Inscrição
\`\`\`bash
POST /applications
Content-Type: application/json

{
  "candidateId": 1,
  "jobId": 1,
  "active": true
}
\`\`\`

### Verificar Inscrição Existente
\`\`\`bash
GET /applications/check?candidateId=1&jobId=1
\`\`\`

## 🎯 Códigos de Status

| Código | Descrição |
|--------|-----------|
| `200` | Sucesso |
| `201` | Criado com sucesso |
| `204` | Excluído com sucesso |
| `400` | Dados inválidos |
| `404` | Recurso não encontrado |
| `409` | Conflito (ex: inscrição duplicada) |
| `500` | Erro interno do servidor |

## 🔍 Recursos Especiais

### Validação de Duplicatas
- **Candidatos**: Email único
- **Vagas**: Título único
- **Inscrições**: Um candidato por vaga (candidateId + jobId único)

### Tratamento de Erros
- Mensagens de erro descritivas
- Códigos de erro específicos
- Validação de dados de entrada

### CORS Configurado
- Permite requisições do frontend (localhost:3001)
- Headers apropriados para desenvolvimento

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **TypeScript** - Tipagem estática
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados
- **Swagger** - Documentação da API
- **CORS** - Controle de acesso

## 📱 Integração com Frontend

O frontend Next.js consome esta API através dos services:
- `jobService.ts` - Gerenciamento de vagas
- `candidateService.ts` - Gerenciamento de candidatos
- `applicationService.ts` - Gerenciamento de inscrições

## 🔄 Próximos Passos

1. **Autenticação**: Implementar JWT para segurança
2. **Paginação**: Adicionar suporte a paginação nos endpoints
3. **Filtros**: Implementar filtros avançados
4. **Upload**: Suporte a upload de currículos
5. **Notificações**: Sistema de notificações por email

---

**📞 Suporte**: Para dúvidas ou problemas, consulte a documentação interativa em `/api-docs` ou entre em contato comigo!
