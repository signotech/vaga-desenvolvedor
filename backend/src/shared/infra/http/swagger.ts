import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import type { Express } from "express"

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sistema de Gestão de Vagas - API",
      version: "1.0.0",
      description: "API completa para gerenciamento de vagas, candidatos e inscrições",
      contact: {
        name: "Equipe de Desenvolvimento",
        email: "dev@empresa.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor de Desenvolvimento",
      },
    ],
    components: {
      schemas: {
        Job: {
          type: "object",
          required: ["title", "description", "type"],
          properties: {
            id: {
              type: "integer",
              description: "ID único da vaga",
              example: 1,
            },
            title: {
              type: "string",
              description: "Título da vaga",
              example: "Desenvolvedor Frontend React",
            },
            description: {
              type: "string",
              description: "Descrição detalhada da vaga",
              example: "Desenvolvedor com experiência em React, TypeScript e Next.js",
            },
            type: {
              type: "string",
              enum: ["CLT", "PJ", "FREELANCER"],
              description: "Tipo de contratação",
              example: "CLT",
            },
            active: {
              type: "boolean",
              description: "Status da vaga (ativa/inativa)",
              example: true,
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Data de criação",
              example: "2024-01-15T10:30:00Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Data da última atualização",
              example: "2024-01-15T10:30:00Z",
            },
          },
        },
        CreateJobDTO: {
          type: "object",
          required: ["title", "description", "type"],
          properties: {
            title: {
              type: "string",
              description: "Título da vaga",
              example: "Desenvolvedor Frontend React",
            },
            description: {
              type: "string",
              description: "Descrição detalhada da vaga",
              example: "Desenvolvedor com experiência em React, TypeScript e Next.js",
            },
            type: {
              type: "string",
              enum: ["CLT", "PJ", "FREELANCER"],
              description: "Tipo de contratação",
              example: "CLT",
            },
          },
        },
        Candidate: {
          type: "object",
          required: ["name", "email"],
          properties: {
            id: {
              type: "integer",
              description: "ID único do candidato",
              example: 1,
            },
            name: {
              type: "string",
              description: "Nome completo do candidato",
              example: "João Silva Santos",
            },
            email: {
              type: "string",
              format: "email",
              description: "Email do candidato",
              example: "joao@email.com",
            },
            phone: {
              type: "string",
              description: "Telefone do candidato (opcional)",
              example: "(11) 99999-9999",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Data de criação",
              example: "2024-01-15T10:30:00Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Data da última atualização",
              example: "2024-01-15T10:30:00Z",
            },
          },
        },
        CreateCandidateDTO: {
          type: "object",
          required: ["name", "email"],
          properties: {
            name: {
              type: "string",
              description: "Nome completo do candidato",
              example: "João Silva Santos",
            },
            email: {
              type: "string",
              format: "email",
              description: "Email do candidato",
              example: "joao@email.com",
            },
            phone: {
              type: "string",
              description: "Telefone do candidato (opcional)",
              example: "(11) 99999-9999",
            },
          },
        },
        Application: {
          type: "object",
          required: ["candidateId", "jobId"],
          properties: {
            id: {
              type: "integer",
              description: "ID único da inscrição",
              example: 1,
            },
            candidateId: {
              type: "integer",
              description: "ID do candidato",
              example: 1,
            },
            jobId: {
              type: "integer",
              description: "ID da vaga",
              example: 1,
            },
            active: {
              type: "boolean",
              description: "Status da inscrição",
              example: true,
            },
            appliedAt: {
              type: "string",
              format: "date-time",
              description: "Data da inscrição",
              example: "2024-01-15T10:30:00Z",
            },
          },
        },
        CreateApplicationDTO: {
          type: "object",
          required: ["candidateId", "jobId"],
          properties: {
            candidateId: {
              type: "integer",
              description: "ID do candidato",
              example: 1,
            },
            jobId: {
              type: "integer",
              description: "ID da vaga",
              example: 1,
            },
            active: {
              type: "boolean",
              description: "Status da inscrição (opcional, padrão: true)",
              example: true,
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Mensagem de erro",
              example: "Recurso não encontrado",
            },
            code: {
              type: "string",
              description: "Código do erro (opcional)",
              example: "NOT_FOUND",
            },
          },
        },
      },
      responses: {
        NotFound: {
          description: "Recurso não encontrado",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        BadRequest: {
          description: "Dados inválidos",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        InternalError: {
          description: "Erro interno do servidor",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/modules/jobs/routes/*.ts", "./src/modules/jobs/controllers/*.ts"],
}

const specs = swaggerJsdoc(options)

export function setupSwagger(app: Express) {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      customCss: ".swagger-ui .topbar { display: none }",
      customSiteTitle: "API - Sistema de Gestão de Vagas",
    }),
  )

  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json")
    res.send(specs)
  })
}
