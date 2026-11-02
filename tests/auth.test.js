'use strict';

const {
  app,
  request,
  sequelize,
  resetDatabase,
  authenticatedAgent,
} = require('./helpers');

describe('Autenticação', () => {
  beforeEach(resetDatabase);

  afterAll(() => sequelize.close());

  it('redireciona rotas protegidas para o login', async () => {
    const response = await request(app).get('/clients');

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe('/login');
  });

  it('renderiza o formulário de login', async () => {
    const response = await request(app).get('/login');

    expect(response.status).toBe(200);
    expect(response.text).toContain('Entrar');
    expect(response.text).toContain('name="email"');
    expect(response.text).toContain('name="password"');
  });

  it('valida campos vazios com 422', async () => {
    const response = await request(app)
      .post('/login')
      .type('form')
      .send({ email: '', password: '' });

    expect(response.status).toBe(422);
    expect(response.text).toContain('Informe o e-mail');
    expect(response.text).toContain('Informe a senha');
  });

  it('rejeita credenciais inválidas com 401', async () => {
    const response = await request(app)
      .post('/login')
      .type('form')
      .send({ email: 'admin@teste.com', password: 'errada' });

    expect(response.status).toBe(401);
    expect(response.text).toContain('E-mail ou senha inválidos');
  });

  it('autentica e volta para a URL original', async () => {
    const agent = request.agent(app);

    await agent.get('/orders?page=2');

    const response = await agent
      .post('/login')
      .type('form')
      .send({ email: 'ADMIN@teste.com', password: 'admin123' });

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe('/orders?page=2');

    const home = await agent.get('/');
    expect(home.status).toBe(200);
    expect(home.text).toContain('Administrador');
    expect(home.text).toContain('action="/logout"');
  });

  it('redireciona usuário autenticado que acessa /login', async () => {
    const agent = await authenticatedAgent();
    const response = await agent.get('/login');

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe('/');
  });

  it('encerra a sessão no logout', async () => {
    const agent = await authenticatedAgent();

    const logout = await agent.post('/logout');
    expect(logout.status).toBe(302);
    expect(logout.headers.location).toBe('/login');

    const protectedRoute = await agent.get('/clients');
    expect(protectedRoute.status).toBe(302);
    expect(protectedRoute.headers.location).toBe('/login');
  });
});
