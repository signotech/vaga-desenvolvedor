import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { LoadingStateComponent } from '@/components/shared/loading-state.component';
import { useDashboard } from '@/hooks/dashboard/use-dashboard.hook';
import { formatCurrency } from '@/utils/currency.util';
import { CHART_COLORS } from '@/utils/dashboard.util';

type TooltipPayload = {
  name?: string;
  value?: number;
  payload?: Record<string, unknown>;
};

function ChartTooltip({
  active,
  payload,
  label,
  valueFormatter,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
  valueFormatter?: (value: number) => string;
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  const value = Number(item.value ?? 0);
  const title = label || String(item.name ?? '');

  return (
    <div className="chart-tooltip">
      <strong>{title}</strong>
      <span>{valueFormatter ? valueFormatter(value) : value}</span>
    </div>
  );
}

export function DashboardChartsComponent() {
  const { loading, error, kpis, statusChart, revenueChart, stockChart } = useDashboard();

  if (loading) {
    return (
      <section className="dashboard-section surface-card">
        <LoadingStateComponent />
      </section>
    );
  }

  if (error) {
    return (
      <section className="dashboard-section surface-card">
        <p className="page-subtitle">{error}</p>
      </section>
    );
  }

  const statusTotal = statusChart.reduce((sum, item) => sum + item.value, 0);

  return (
    <section className="dashboard-section fade-up" aria-label="Indicadores">
      <div className="dashboard-kpis">
        <article className="kpi-card">
          <span className="kpi-label">Clientes</span>
          <strong className="kpi-value">{kpis.clientes}</strong>
        </article>
        <article className="kpi-card">
          <span className="kpi-label">Produtos</span>
          <strong className="kpi-value">{kpis.produtos}</strong>
        </article>
        <article className="kpi-card">
          <span className="kpi-label">Pedidos</span>
          <strong className="kpi-value">{kpis.pedidos}</strong>
          <span className="kpi-hint">{kpis.abertos} em aberto</span>
        </article>
        <article className="kpi-card is-accent">
          <span className="kpi-label">Faturamento pago</span>
          <strong className="kpi-value">{formatCurrency(kpis.faturamento)}</strong>
        </article>
      </div>

      <div className="dashboard-charts">
        <article className="chart-card surface-card">
          <header className="chart-card-header">
            <h2>Pedidos por status</h2>
            <p>Distribuição atual da carteira</p>
          </header>
          <div className="chart-body chart-body-pie">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={statusChart}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={58}
                  outerRadius={88}
                  paddingAngle={3}
                  stroke="none"
                >
                  {statusChart.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <ul className="chart-legend">
              {statusChart.map((entry) => (
                <li key={entry.name}>
                  <span className="chart-legend-swatch" style={{ background: entry.fill }} />
                  <span>{entry.name}</span>
                  <strong>
                    {entry.value}
                    {statusTotal ? ` · ${Math.round((entry.value / statusTotal) * 100)}%` : ''}
                  </strong>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article className="chart-card surface-card">
          <header className="chart-card-header">
            <h2>Valor por status</h2>
            <p>Total líquido dos pedidos</p>
          </header>
          <div className="chart-body">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={revenueChart} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid stroke={CHART_COLORS.grid} vertical={false} strokeDasharray="4 4" />
                <XAxis
                  dataKey="status"
                  tick={{ fill: CHART_COLORS.muted, fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: CHART_COLORS.muted, fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  width={56}
                  tickFormatter={(value: number) =>
                    value >= 1000 ? `${Math.round(value / 1000)}k` : String(value)
                  }
                />
                <Tooltip content={<ChartTooltip valueFormatter={formatCurrency} />} />
                <Bar dataKey="valor" radius={[8, 8, 4, 4]} maxBarSize={48}>
                  {revenueChart.map((entry) => (
                    <Cell key={entry.status} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="chart-card surface-card chart-card-wide">
          <header className="chart-card-header">
            <h2>Estoque por produto</h2>
            <p>Unidades disponíveis no catálogo</p>
          </header>
          <div className="chart-body">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                data={stockChart}
                layout="vertical"
                margin={{ top: 4, right: 16, left: 8, bottom: 0 }}
              >
                <CartesianGrid stroke={CHART_COLORS.grid} horizontal={false} strokeDasharray="4 4" />
                <XAxis
                  type="number"
                  tick={{ fill: CHART_COLORS.muted, fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={112}
                  tick={{ fill: CHART_COLORS.ink, fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  content={
                    <ChartTooltip
                      valueFormatter={(value) => `${value} un.`}
                    />
                  }
                />
                <Bar dataKey="estoque" radius={[0, 8, 8, 0]} maxBarSize={22}>
                  {stockChart.map((entry) => (
                    <Cell key={entry.fullName} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>
      </div>
    </section>
  );
}
