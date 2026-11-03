import type { PedidoStatus } from '@/models/pedidos/pedido.model';

type PedidoStatusChipProps = {
  status: PedidoStatus;
};

export function PedidoStatusChipComponent({ status }: PedidoStatusChipProps) {
  const className =
    status === 'Pago' ? 'paid' : status === 'Cancelado' ? 'canceled' : 'open';

  return <span className={`status-chip ${className}`}>{status}</span>;
}
