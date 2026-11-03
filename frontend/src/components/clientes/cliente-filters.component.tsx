import { ClearableInputComponent } from '@/components/shared/clearable-input.component';

type ClienteFiltersProps = {
  q: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

export function ClienteFiltersComponent({ q, onChange, onSearch }: ClienteFiltersProps) {
  return (
    <div className="toolbar-search" role="search">
      <label className="field field-grow">
        <span className="field-label">Buscar</span>
        <ClearableInputComponent
          value={q}
          placeholder="Nome, CPF ou e-mail"
          onChange={onChange}
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
