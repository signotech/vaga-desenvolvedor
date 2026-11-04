/**
 * OrderFlow — Página do Painel
 */

if (!Auth.requireAuth()) throw new Error('Redirect');

Components.renderSidebar('dashboard');

let chartStatus = null;
let chartMonthly = null;
let chartTop = null;

async function loadDashboard() {
  try {
    const res = await Api.get('/dashboard');
    const data = res.data;

    renderStats(data);
    renderCharts(data);
    renderLowStock(data.lowStockProducts || []);

    document.getElementById('lastUpdated').textContent =
      'Atualizado: ' + Components.formatDateTime(new Date());
  } catch (error) {
    Components.toast('Erro ao carregar dashboard: ' + error.message, 'error');
  }
}

function renderStats(data) {
  const revenue = Number(data.revenue?.total_revenue) || 0;
  const paidOrders = Number(data.orders?.paid_orders) || 0;
  const averageOrder = paidOrders ? revenue / paidOrders : 0;

  document.getElementById('statsGrid').innerHTML = `
    <article class="dashboard-metric">
      <div class="dashboard-metric-top"><span>Receita de pedidos pagos</span><i class="material-icons" title="Soma dos pedidos pagos, após descontos">info_outline</i></div>
      <strong>${Components.formatCurrency(revenue)}</strong>
      <span class="dashboard-metric-note">Total após descontos</span>
    </article>
    <article class="dashboard-metric">
      <div class="dashboard-metric-top"><span>Ticket médio</span><i class="material-icons" title="Receita total dividida pela quantidade de pedidos pagos">info_outline</i></div>
      <strong>${Components.formatCurrency(averageOrder)}</strong>
      <span class="dashboard-metric-note">Em ${paidOrders} pedido(s) pago(s)</span>
    </article>`;

  document.getElementById('dashboardSummary').innerHTML = `
    <div><span>Total de pedidos</span><strong>${Number(data.orders?.total_orders) || 0}</strong></div>
    <div><span>Em aberto</span><strong>${Number(data.orders?.open_orders) || 0}</strong></div>
    <div><span>Pagos</span><strong>${paidOrders}</strong></div>
    <div><span>Cancelados</span><strong>${Number(data.orders?.cancelled_orders) || 0}</strong></div>
    <div><span>Clientes ativos</span><strong>${Number(data.clients?.total) || 0}</strong></div>
    <div><span>Produtos ativos</span><strong>${Number(data.products?.total) || 0}</strong></div>`;
}

function renderCharts(data) {
  const statusCtx = document.getElementById('chartStatus').getContext('2d');
  if (chartStatus) chartStatus.destroy();
  chartStatus = new Chart(statusCtx, {
    type: 'doughnut',
    data: {
      labels: ['Em Aberto', 'Pago', 'Cancelado'],
      datasets: [{
        data: [
          Number(data.orders?.open_orders) || 0,
          Number(data.orders?.paid_orders) || 0,
          Number(data.orders?.cancelled_orders) || 0,
        ],
        backgroundColor: ['#f5a623', '#27ae60', '#e35d6a'],
        borderColor: '#fff',
        borderWidth: 3,
        hoverOffset: 5,
      }],
    },
    options: {
      maintainAspectRatio: false,
      cutout: '68%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { usePointStyle: true, pointStyle: 'circle', padding: 18 },
        },
      },
    },
  });

  const monthlyOrders = data.ordersByMonth || [];
  const monthLabels = monthlyOrders.map((month) =>
    new Date(`${month.month}-01T12:00:00`).toLocaleDateString('pt-BR', { month: 'short' })
  );
  const monthRevenue = monthlyOrders.map((month) => Number(month.revenue) || 0);

  const monthCtx = document.getElementById('chartMonthly').getContext('2d');
  if (chartMonthly) chartMonthly.destroy();
  chartMonthly = new Chart(monthCtx, {
    type: 'bar',
    data: {
      labels: monthLabels,
      datasets: [{
        label: 'Receita',
        data: monthRevenue,
        backgroundColor: (context) => {
          const { chart } = context;
          const { ctx, chartArea } = chart;
          if (!chartArea) return '#48a9ed';
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, 'rgba(72, 169, 237, 0.35)');
          gradient.addColorStop(1, '#319bea');
          return gradient;
        },
        borderRadius: 5,
        maxBarThickness: 30,
      }],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: (context) => Components.formatCurrency(context.parsed.y) } },
      },
      scales: {
        x: { grid: { display: false }, border: { display: false } },
        y: {
          beginAtZero: true,
          border: { display: false, dash: [4, 4] },
          grid: { color: '#edf0f3' },
          ticks: {
            maxTicksLimit: 5,
            callback: (value) => new Intl.NumberFormat('pt-BR', {
              notation: 'compact',
              maximumFractionDigits: 1,
            }).format(value),
          },
        },
      },
    },
  });

  const topProducts = data.topProducts || [];
  const productNames = topProducts.map((product) =>
    product.title.length > 22 ? `${product.title.substring(0, 22)}…` : product.title
  );
  const productSales = topProducts.map((product) => Number(product.total_sold) || 0);

  const topCtx = document.getElementById('chartTopProducts').getContext('2d');
  if (chartTop) chartTop.destroy();
  chartTop = new Chart(topCtx, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: 'Unidades vendidas',
        data: productSales,
        backgroundColor: ['#2588d8', '#379ce4', '#52adeb', '#73bdec', '#94ccef'],
        borderRadius: 5,
        maxBarThickness: 22,
      }],
    },
    options: {
      indexAxis: 'y',
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { beginAtZero: true, grid: { color: '#edf0f3' }, border: { display: false } },
        y: { grid: { display: false }, border: { display: false } },
      },
    },
  });
}

function renderLowStock(products) {
  const element = document.getElementById('lowStockList');
  if (!products || products.length === 0) {
    element.innerHTML = '<p class="dashboard-empty">Nenhum produto com estoque baixo.</p>';
    return;
  }

  element.innerHTML = products.map((product) => {
    const percentage = Math.min(100, (product.stock / 20) * 100);
    const stockClass = product.stock <= 2 ? 'low' : product.stock <= 5 ? 'medium' : 'high';
    return `
      <a class="dashboard-stock-item" href="/pages/products.html?id=${Number(product.id)}">
        <span class="dashboard-stock-product">
          <strong>${Components.escapeHtml(product.title)}</strong>
          <small>${Components.escapeHtml(product.sku)}</small>
        </span>
        <span class="stock-indicator">
          <span class="stock-bar"><span class="stock-bar-fill ${stockClass}" style="width:${percentage}%"></span></span>
          <strong class="dashboard-stock-count ${stockClass}">${Number(product.stock)}</strong>
        </span>
      </a>`;
  }).join('');
}

function renderRecentOrders(orders) {
  const body = document.getElementById('recentOrdersBody');
  if (!orders.length) {
    body.innerHTML = '<tr><td colspan="5"><div class="dashboard-empty">Nenhum pedido encontrado.</div></td></tr>';
    return;
  }

  body.innerHTML = orders.map((order) => {
    const products = (order.items || []).map((item) => item.product?.title || `Produto #${item.product_id}`);
    const productSummary = products.slice(0, 2).map(Components.escapeHtml).join(', ');
    const extraProducts = products.length > 2 ? ` +${products.length - 2}` : '';
    const clientName = order.client?.name || 'Cliente removido';
    return `<tr>
      <td><a class="dashboard-order-link" href="/pages/order-details.html?id=${Number(order.id)}">#${Number(order.id)}</a><small>${Components.formatDate(order.order_date)}</small></td>
      <td><a class="dashboard-table-link" href="/pages/clients.html?id=${Number(order.client?.id) || ''}">${Components.escapeHtml(clientName)}</a></td>
      <td class="dashboard-products-cell">${productSummary || '—'}${extraProducts}</td>
      <td>${Components.statusBadge(order.status)}</td>
      <td class="dashboard-order-total">${Components.formatCurrency(order.total)}</td>
    </tr>`;
  }).join('');
}

async function loadRecentOrders() {
  const body = document.getElementById('recentOrdersBody');
  try {
    const response = await Api.getQuery('/orders', {
      page: 1,
      limit: 6,
      sortBy: 'order_date',
      sortOrder: 'DESC',
    });
    renderRecentOrders(response.data || []);
  } catch (error) {
    body.innerHTML = `<tr><td colspan="5"><div class="dashboard-empty dashboard-error">${Components.escapeHtml(error.message)}</div></td></tr>`;
    Components.toast('Erro ao carregar pedidos recentes: ' + error.message, 'error');
  }
}

function bindDashboardSearch() {
  document.getElementById('dashboardSearch').addEventListener('submit', (event) => {
    event.preventDefault();
    const query = document.getElementById('dashboardSearchInput').value.trim();
    if (query) window.location.href = `/pages/orders.html?search=${encodeURIComponent(query)}`;
  });
}

async function init() {
  bindDashboardSearch();
  await Promise.all([loadDashboard(), loadRecentOrders()]);

  try {
    const response = await Api.getQuery('/products', { lowStock: true, limit: 10 });
    renderLowStock(response.data || []);
  } catch (error) {
    Components.toast('Erro ao carregar produtos com estoque baixo: ' + error.message, 'error');
  }
}

init();
