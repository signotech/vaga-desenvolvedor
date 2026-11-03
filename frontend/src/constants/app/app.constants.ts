export const APP_NAME = 'Signo Pedidos';
export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;

export const APP_ROUTES = {
  home: '/',
  login: '/login',
  clientes: '/clientes',
  produtos: '/produtos',
  pedidos: '/pedidos',
} as const;

export const DEMO_CREDENTIALS = {
  email: 'admin@signotech.com',
  senha: 'admin123',
} as const;
