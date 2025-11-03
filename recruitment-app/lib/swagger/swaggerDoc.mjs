export const swaggerSpec = {
  openapi: "3.0.3",
  info: {
    title: "Recruitment API",
    version: "1.0.0",
    description:
      "Documentacao dos endpoints disponiveis para gerenciamento de vagas.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Ambiente local de desenvolvimento",
    },
  ],
  tags: [
    {
      name: "Jobs",
      description: "Operacoes para gerenciar vagas de emprego",
    },
  ],
  components: {
    schemas: {
      Job: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          title: {
            type: "string",
            example: "Desenvolvedor Full Stack",
          },
          type: {
            type: "string",
            enum: ["CLT", "PJ", "FREELANCE"],
            example: "CLT",
          },
          description: {
            type: "string",
            example: "Responsavel pelo desenvolvimento de novas features.",
          },
          requirements: {
            type: "string",
            nullable: true,
            example: "Experiencia com React e Node.js.",
          },
          location: {
            type: "string",
            nullable: true,
            example: "Sao Paulo - SP",
          },
          salaryRange: {
            type: "string",
            nullable: true,
            example: "R$ 8.000 - R$ 10.000",
          },
          status: {
            type: "string",
            enum: ["IN_PROGRESS", "PAUSED", "FINISHED", "CANCELLED"],
            example: "IN_PROGRESS",
          },
          active: { type: "boolean", example: true },
          userId: { type: "integer", example: 42 },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2024-01-05T12:30:00.000Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2024-01-10T09:15:00.000Z",
          },
          applied: {
            type: "boolean",
            description:
              "Indica se um candidato especifico ja se candidatou para a vaga.",
            example: false,
          },
        },
        required: [
          "id",
          "title",
          "type",
          "description",
          "status",
          "active",
          "userId",
        ],
      },
      JobCreateInput: {
        type: "object",
        required: ["title", "type", "description", "userId"],
        properties: {
          title: { type: "string", minLength: 3, maxLength: 100 },
          type: {
            type: "string",
            enum: ["CLT", "PJ", "FREELANCE"],
          },
          description: { type: "string", minLength: 10, maxLength: 1000 },
          requirements: {
            type: "string",
            nullable: true,
            maxLength: 1000,
          },
          location: { type: "string", nullable: true },
          salaryRange: { type: "string", nullable: true },
          candidates: {
            type: "array",
            items: { type: "integer" },
            nullable: true,
          },
          status: {
            type: "string",
            enum: ["IN_PROGRESS", "PAUSED", "FINISHED", "CANCELLED"],
            default: "IN_PROGRESS",
          },
          active: { type: "boolean", default: true },
          userId: { type: "integer" },
        },
      },
      JobUpdateInput: {
        type: "object",
        description: "Campos opcionais para atualizacao parcial de uma vaga.",
        properties: {
          title: { type: "string", minLength: 3, maxLength: 100 },
          type: {
            type: "string",
            enum: ["CLT", "PJ", "FREELANCE"],
          },
          description: { type: "string", minLength: 10, maxLength: 1000 },
          requirements: {
            type: "string",
            nullable: true,
            maxLength: 1000,
          },
          location: { type: "string", nullable: true },
          salaryRange: { type: "string", nullable: true },
          status: {
            type: "string",
            enum: ["IN_PROGRESS", "PAUSED", "FINISHED", "CANCELLED"],
          },
          active: { type: "boolean" },
        },
        additionalProperties: false,
      },
      JobStatusUpdateInput: {
        type: "object",
        required: ["status"],
        properties: {
          status: {
            type: "string",
            enum: ["IN_PROGRESS", "PAUSED", "FINISHED", "CANCELLED"],
          },
        },
      },
      BulkDeleteInput: {
        type: "object",
        required: ["ids"],
        properties: {
          ids: {
            type: "array",
            items: { type: "integer" },
            minItems: 1,
            example: [1, 2, 3],
          },
        },
      },
      ErrorResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Erro ao criar vaga",
          },
        },
      },
      ValidationErrorResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Erro de validacao dos dados",
          },
          error: {
            type: "array",
            items: {
              type: "object",
              properties: {
                path: {
                  type: "array",
                  items: { type: "string" },
                  example: ["title"],
                },
                message: {
                  type: "string",
                  example: "Titulo deve ter pelo menos 3 caracteres",
                },
              },
            },
          },
        },
      },
    },
    responses: {
      NotFound: {
        description: "Recurso nao encontrado.",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
          },
        },
      },
      ServerError: {
        description: "Erro inesperado no servidor.",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
          },
        },
      },
      ValidationError: {
        description: "Erro de validacao dos dados enviados.",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ValidationErrorResponse" },
          },
        },
      },
    },
    parameters: {
      JobIdParam: {
        in: "path",
        name: "id",
        required: true,
        schema: { type: "integer" },
        description: "Identificador da vaga.",
      },
    },
  },
  paths: {
    "/api/jobs": {
      get: {
        tags: ["Jobs"],
        summary: "Lista vagas disponiveis",
        description:
          "Retorna vagas ativas. Quando userId e informado, adiciona o campo applied para indicar candidatura do usuario.",
        parameters: [
          {
            in: "query",
            name: "search",
            schema: { type: "string" },
            description: "Filtro por titulo da vaga.",
          },
          {
            in: "query",
            name: "page",
            schema: { type: "integer", default: 1, minimum: 1 },
            description: "Numero da pagina (1 baseado).",
          },
          {
            in: "query",
            name: "limit",
            schema: { type: "integer", default: 20, minimum: 1 },
            description: "Quantidade maxima de itens por pagina.",
          },
          {
            in: "query",
            name: "userId",
            schema: { type: "integer" },
            description:
              "Identificador de usuario utilizado para marcar vagas ja aplicadas.",
          },
        ],
        responses: {
          200: {
            description: "Vagas encontradas com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    jobs: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Job" },
                    },
                  },
                },
              },
            },
          },
          500: { $ref: "#/components/responses/ServerError" },
        },
      },
      post: {
        tags: ["Jobs"],
        summary: "Cria uma nova vaga",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/JobCreateInput" },
            },
          },
        },
        responses: {
          201: {
            description: "Vaga criada com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    job: { $ref: "#/components/schemas/Job" },
                  },
                },
              },
            },
          },
          400: { $ref: "#/components/responses/ValidationError" },
          500: { $ref: "#/components/responses/ServerError" },
        },
      },
      delete: {
        tags: ["Jobs"],
        summary: "Desativa vagas existentes",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/BulkDeleteInput" },
            },
          },
        },
        responses: {
          200: {
            description: "Vagas desativadas com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                  },
                },
              },
            },
          },
          400: {
            description: "Nenhuma vaga selecionada.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
          500: { $ref: "#/components/responses/ServerError" },
        },
      },
    },
    "/api/jobs/{id}": {
      get: {
        tags: ["Jobs"],
        summary: "Busca detalhes de uma vaga",
        parameters: [{ $ref: "#/components/parameters/JobIdParam" }],
        responses: {
          200: {
            description: "Vaga encontrada.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    job: { $ref: "#/components/schemas/Job" },
                  },
                },
              },
            },
          },
          404: { $ref: "#/components/responses/NotFound" },
          500: { $ref: "#/components/responses/ServerError" },
        },
      },
      patch: {
        tags: ["Jobs"],
        summary: "Atualiza parcialmente uma vaga",
        parameters: [{ $ref: "#/components/parameters/JobIdParam" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/JobUpdateInput" },
            },
          },
        },
        responses: {
          200: {
            description: "Vaga atualizada com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    job: { $ref: "#/components/schemas/Job" },
                  },
                },
              },
            },
          },
          404: { $ref: "#/components/responses/NotFound" },
          500: { $ref: "#/components/responses/ServerError" },
        },
      },
    },
    "/api/jobs/{id}/status": {
      patch: {
        tags: ["Jobs"],
        summary: "Altera o status de uma vaga",
        parameters: [{ $ref: "#/components/parameters/JobIdParam" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/JobStatusUpdateInput" },
            },
          },
        },
        responses: {
          200: {
            description: "Status atualizado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    job: { $ref: "#/components/schemas/Job" },
                  },
                },
              },
            },
          },
          404: { $ref: "#/components/responses/NotFound" },
          500: { $ref: "#/components/responses/ServerError" },
        },
      },
    },
  },
};

export default swaggerSpec;
