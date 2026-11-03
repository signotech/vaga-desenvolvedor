import { Link } from 'react-router-dom';
import { DashboardChartsComponent } from '@/components/dashboard/dashboard-charts.component';
import { APP_ROUTES } from '@/constants/app/app.constants';

function PedidosIllustration() {
  return (
    <svg className="dest-art" viewBox="0 0 160 110" fill="none" aria-hidden>
      <rect className="dest-art-base" x="18" y="22" width="124" height="72" rx="10" />
      <rect className="dest-art-accent" x="30" y="36" width="48" height="8" rx="4" />
      <rect className="dest-art-line" x="30" y="52" width="100" height="6" rx="3" />
      <rect className="dest-art-line" x="30" y="66" width="78" height="6" rx="3" />
      <rect className="dest-art-line" x="30" y="80" width="90" height="6" rx="3" />
      <circle className="dest-art-orb dest-art-orb-a" cx="118" cy="40" r="14" />
      <path
        className="dest-art-mark"
        d="M112 40.5l3.2 3.2 7.2-7.2"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClientesIllustration() {
  return (
    <svg className="dest-art" viewBox="0 0 160 110" fill="none" aria-hidden>
      <circle className="dest-art-base" cx="58" cy="42" r="18" />
      <path className="dest-art-base" d="M28 88c0-16.5 13.4-30 30-30s30 13.5 30 30" />
      <circle className="dest-art-orb dest-art-orb-b" cx="108" cy="48" r="14" />
      <path className="dest-art-line" d="M86 88c2.8-12.4 13.2-22 26-22 8.2 0 15.5 3.8 20.4 9.8" />
      <rect className="dest-art-accent" x="96" y="28" width="24" height="6" rx="3" />
    </svg>
  );
}

function ProdutosIllustration() {
  return (
    <svg className="dest-art" viewBox="0 0 160 110" fill="none" aria-hidden>
      <path className="dest-art-base" d="M40 34h52l18 18v40H40V34z" />
      <path className="dest-art-accent" d="M92 34v18h18" />
      <rect className="dest-art-line" x="52" y="62" width="40" height="6" rx="3" />
      <rect className="dest-art-line" x="52" y="76" width="28" height="6" rx="3" />
      <circle className="dest-art-orb dest-art-orb-c" cx="122" cy="40" r="12" />
      <path
        className="dest-art-mark"
        d="M122 34v12M116 40h12"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

const destinations = [
  {
    to: APP_ROUTES.pedidos,
    title: 'Pedidos',
    description: 'Monte itens, aplique desconto e acompanhe o status.',
    cta: 'Abrir pedidos',
    featured: true,
    Illustration: PedidosIllustration,
  },
  {
    to: APP_ROUTES.clientes,
    title: 'Clientes',
    description: 'Cadastre e busque por nome, CPF ou e-mail.',
    cta: 'Ver clientes',
    featured: false,
    Illustration: ClientesIllustration,
  },
  {
    to: APP_ROUTES.produtos,
    title: 'Produtos',
    description: 'SKU, preço e estoque prontos para o pedido.',
    cta: 'Ver produtos',
    featured: false,
    Illustration: ProdutosIllustration,
  },
] as const;

export function HomePage() {
  return (
    <section className="fade-up home-page">
      <div className="hero-panel">
        <div className="hero-copy">
          <h1>Signo Pedidos</h1>
          <p>
            Cadastro operacional de clientes, produtos e pedidos de compra — com filtros,
            ordenação e paginação conectados à API.
          </p>
        </div>

        <div className="hero-actions dest-grid">
          {destinations.map(({ to, title, description, cta, featured, Illustration }, index) => (
            <Link
              key={to}
              to={to}
              className={`dest-card dest-enter${featured ? ' is-featured' : ''}`}
              style={{ animationDelay: `${0.08 + index * 0.08}s` }}
            >
              <div className="dest-visual">
                <Illustration />
              </div>
              <div className="dest-body">
                <h2>{title}</h2>
                <p>{description}</p>
                <span className="dest-cta">
                  {cta}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path
                      d="M3 7h8M8 3.5L11.5 7 8 10.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="meta-row">
          <span>Materialize + React</span>
          <span>API em /api</span>
          <span>Paginação padrão: 20</span>
        </div>
      </div>

      <DashboardChartsComponent />
    </section>
  );
}
