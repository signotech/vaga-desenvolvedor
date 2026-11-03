import { ClearableInputComponent } from '@/components/shared/clearable-input.component';
import { PEDIDO_STATUS, type PedidoStatus } from '@/models/pedidos/pedido.model';

type PedidoFiltersProps = {
  status: PedidoStatus | '';
  cliente: string;
  onChange: (field: 'status' | 'cliente', value: string) => void;
  onSearch: () => void;
};

export function PedidoFiltersComponent({
  status,
  cliente,
  onChange,
  onSearch,
}: PedidoFiltersProps) {
  return (
    <div className="toolbar-search" role="search">
      <label className="field">
        <span className="field-label">Status</span>
        <select
          className="browser-default field-control"
          value={status}
          onChange={(event) => onChange('status', event.target.value)}
        >
          <option value="">Todos</option>
          {PEDIDO_STATUS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label className="field field-grow">
        <span className="field-label">Cliente</span>
        <ClearableInputComponent
          value={cliente}
          placeholder="Nome ou ID do cliente"
          onChange={(value) => onChange('cliente', value)}
          onClear={onSearch}
          onKeyDown={(event) => {
            if (event.key === 'Enter') onSearch();
          }}
        />
      </label>

      <button type="button" className="btn waves-effect waves-light brand-btn toolbar-submit" onClick={onSearch}>
        <i className="material-icons left">search</i>
        Filtrar
      </button>
    </div>
  );
}
