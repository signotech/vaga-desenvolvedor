/**
 * OrderFlow — Página de Detalhes do Pedido
 */

if (!Auth.requireAuth()) throw new Error('Redirect');
Components.renderSidebar('orders');

const orderId = Number(new URLSearchParams(window.location.search).get('id'));
const detail = document.getElementById('orderDetail');

document.addEventListener('DOMContentLoaded', loadOrder);

async function loadOrder() {
  if (!Number.isInteger(orderId) || orderId < 1) {
    detail.innerHTML = '<div class="empty-state">Código de pedido inválido.</div>';
    return;
  }
  detail.innerHTML = '<div class="empty-state">Carregando pedido…</div>';
  try {
    const { data: order } = await Api.get(`/orders/${orderId}`);
    renderOrder(order);
  } catch (error) {
    detail.innerHTML = `<div class="empty-state">${Components.escapeHtml(error.message)}</div>`;
  }
}

function renderOrder(order) {
  const items = (order.items || []).map((item) => `
    <tr>
      <td><a class="blue-text" href="/pages/products.html?id=${Number(item.product_id)}">${Components.escapeHtml(item.product?.title || `Produto #${item.product_id}`)}</a>
        <div class="muted-text">${Components.escapeHtml(item.product?.sku || '')}</div></td>
      <td>${Number(item.quantity)}</td>
      <td>${Components.formatCurrency(item.unit_price)}</td>
      <td>${Components.formatCurrency(Number(item.unit_price) * Number(item.quantity))}</td>
    </tr>`).join('');
  const actions = [];
  if (order.status === 'OPEN') {
    actions.push('<button class="btn btn-success waves-effect" data-status="PAID"><i class="material-icons left">check</i>Marcar como pago</button>');
    actions.push('<button class="btn btn-danger waves-effect" data-status="CANCELLED"><i class="material-icons left">cancel</i>Cancelar pedido</button>');
    actions.push(`<a class="btn btn-outline waves-effect" href="/pages/orders.html?edit=${Number(order.id)}"><i class="material-icons left">edit</i>Editar</a>`);
  } else if (order.status === 'PAID') {
    actions.push('<button class="btn btn-danger waves-effect" data-status="CANCELLED"><i class="material-icons left">cancel</i>Cancelar e devolver estoque</button>');
  } else {
    actions.push('<button class="btn btn-outline waves-effect" data-status="OPEN"><i class="material-icons left">restart_alt</i>Reabrir pedido</button>');
  }

  detail.innerHTML = `
    <div class="card-header order-detail-header">
      <div><h2 class="card-title">Pedido #${Number(order.id)}</h2><div class="order-detail-subtitle">${Components.statusBadge(order.status)}</div></div>
      <div class="order-detail-actions">${actions.join('')}</div>
    </div>
    <div class="card-body">
      <div class="detail-grid order-meta">
        <div class="detail-item"><label>Cliente</label><div class="detail-value"><a class="blue-text" href="/pages/clients.html?id=${Number(order.client.id)}">${Components.escapeHtml(order.client.name)}</a></div></div>
        <div class="detail-item"><label>Responsável</label><div class="detail-value">${Components.escapeHtml(order.user?.name || '—')}</div></div>
        <div class="detail-item"><label>Data do pedido</label><div class="detail-value">${Components.formatDateTime(order.order_date)}</div></div>
        <div class="detail-item"><label>Desconto aplicado</label><div class="detail-value">${Number(order.discount_percent).toLocaleString('pt-BR')}%</div></div>
      </div>
      <div class="table-wrapper order-detail-table"><table class="data-table">
        <thead><tr><th>Produto</th><th>Quantidade</th><th>Preço histórico</th><th>Subtotal</th></tr></thead>
        <tbody>${items || '<tr><td colspan="4">Este pedido não possui itens.</td></tr>'}</tbody>
      </table></div>
      <div class="order-summary detail-summary">
        <div class="summary-row"><span>Subtotal</span><strong>${Components.formatCurrency(order.subtotal)}</strong></div>
        <div class="summary-row discount"><span>Desconto (${Number(order.discount_percent).toLocaleString('pt-BR')}%)</span><strong>− ${Components.formatCurrency(order.discount_amount)}</strong></div>
        <div class="summary-row total"><span>Total</span><strong>${Components.formatCurrency(order.total)}</strong></div>
      </div>
    </div>`;

  detail.querySelectorAll('[data-status]').forEach((button) => {
    button.addEventListener('click', () => changeStatus(button.dataset.status));
  });
}

async function changeStatus(status) {
  const labels = { PAID: 'marcar este pedido como pago', CANCELLED: 'cancelar este pedido', OPEN: 'reabrir este pedido' };
  if (!await Components.confirm('Alterar status?', `Confirma ${labels[status]}? A alteração também pode movimentar o estoque.`, 'warning')) return;
  try {
    await Api.patch(`/orders/${orderId}/status`, { status });
    Components.toast('Status do pedido atualizado.', 'success');
    await loadOrder();
  } catch (error) {
    Components.toast(`Não foi possível alterar o status: ${error.message}`, 'error');
  }
}
