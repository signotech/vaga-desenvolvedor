import { ClearableInputComponent } from '@/components/shared/clearable-input.component';

type ProdutoFiltersProps = {
  sku: string;
  titulo: string;
  onChange: (field: 'sku' | 'titulo', value: string) => void;
  onSearch: () => void;
};

export function ProdutoFiltersComponent({ sku, titulo, onChange, onSearch }: ProdutoFiltersProps) {
  return (
    <div className="toolbar-search" role="search">
      <label className="field">
        <span className="field-label">SKU</span>
        <ClearableInputComponent
          value={sku}
          placeholder="Código SKU"
          onChange={(value) => onChange('sku', value)}
          onClear={onSearch}
          onKeyDown={(event) => {
            if (event.key === 'Enter') onSearch();
          }}
        />
      </label>

      <label className="field field-grow">
        <span className="field-label">Título</span>
        <ClearableInputComponent
          value={titulo}
          placeholder="Buscar por título"
          onChange={(value) => onChange('titulo', value)}
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
