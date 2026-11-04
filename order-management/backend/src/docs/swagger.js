'use strict';

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'OrderFlow API',
      version: '1.0.0',
      description: `
# OrderFlow — Sistema de Gerenciamento de Pedidos de Compra

API REST para gerenciamento de clientes, produtos, pedidos e usuários administrativos.

## Autenticação

Use \`POST /api/auth/login\` para iniciar sessão. A API grava o JWT em um cookie HttpOnly, enviado automaticamente pelo navegador. O token não é retornado no corpo da resposta.

## Credenciais de Demonstração

| Perfil    | E-mail                    | Senha         |
|-----------|---------------------------|---------------|
| ADMIN     | admin@orderflow.dev       | Admin@123     |
| OPERATOR  | operator@orderflow.dev    | Operator@123  |
      `,
      contact: {
        name: 'Yasmin Brancaleone',
        email: 'yasmin@orderflow.dev',
      },
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:3000',
        description: 'Servidor de desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'authToken',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            role: { type: 'string', enum: ['ADMIN', 'OPERATOR'] },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        Client: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string', example: 'João da Silva' },
            cpf: { type: 'string', example: '12345678901', description: '11 digits, no formatting' },
            email: { type: 'string', format: 'email' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
        Product: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            sku: { type: 'string', example: 'SKU-ELE-ABC123' },
            title: { type: 'string', example: 'Notebook Dell Inspiron' },
            price: { type: 'number', format: 'decimal', example: 2999.99 },
            stock: { type: 'integer', example: 50 },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        Order: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            client_id: { type: 'integer' },
            user_id: { type: 'integer' },
            order_date: { type: 'string', format: 'date-time' },
            status: { type: 'string', enum: ['OPEN', 'PAID', 'CANCELLED'] },
            discount_percent: { type: 'number', example: 10 },
            subtotal: { type: 'string', example: '250.00' },
            discount_amount: { type: 'string', example: '25.00' },
            total: { type: 'string', example: '225.00' },
          },
        },
        PaginationMeta: {
          type: 'object',
          properties: {
            total: { type: 'integer' },
            page: { type: 'integer' },
            limit: { type: 'integer' },
            totalPages: { type: 'integer' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string' },
            code: { type: 'string' },
          },
        },
      },
    },
    security: [{ cookieAuth: [] }],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
