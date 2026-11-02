'use strict';

// Executado pelo Jest antes de carregar a aplicação.
process.env.NODE_ENV = 'test';
process.env.DB_DIALECT = 'sqlite';
process.env.DB_STORAGE = ':memory:';
process.env.DB_LOGGING = 'false';
process.env.SESSION_SECRET = 'test-secret';
