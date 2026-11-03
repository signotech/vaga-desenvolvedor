import { useEffect, useId, useMemo, useRef, useState } from 'react';

export type AutocompleteOption = {
  value: number;
  label: string;
  description?: string;
};

type AutocompleteProps = {
  id?: string;
  label: string;
  placeholder?: string;
  options: AutocompleteOption[];
  value: number;
  onChange: (value: number) => void;
  error?: string;
  emptyMessage?: string;
};

export function AutocompleteComponent({
  id,
  label,
  placeholder = 'Buscar…',
  options,
  value,
  onChange,
  error,
  emptyMessage = 'Nenhum resultado',
}: AutocompleteProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const listId = `${inputId}-list`;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlight, setHighlight] = useState(0);

  const selected = useMemo(
    () => options.find((option) => option.value === value) ?? null,
    [options, value],
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return options.slice(0, 8);
    return options
      .filter((option) => {
        const haystack = `${option.label} ${option.description ?? ''}`.toLowerCase();
        return haystack.includes(term);
      })
      .slice(0, 8);
  }, [options, query]);

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setQuery(selected?.label ?? '');
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open, selected]);

  useEffect(() => {
    setQuery(selected?.label ?? '');
  }, [selected]);

  useEffect(() => {
    setHighlight(0);
  }, [query, open]);

  const pick = (option: AutocompleteOption) => {
    onChange(option.value);
    setQuery(option.label);
    setOpen(false);
  };

  const clear = () => {
    onChange(0);
    setQuery('');
    setOpen(true);
  };

  return (
    <div className="field field-grow autocomplete" ref={rootRef}>
      <label className="field-label" htmlFor={inputId}>
        {label}
      </label>
      <div className={`autocomplete-control${open ? ' is-open' : ''}`}>
        <input
          id={inputId}
          className="field-control"
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          autoComplete="off"
          placeholder={placeholder}
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
            if (selected && event.target.value !== selected.label) {
              onChange(0);
            }
          }}
          onKeyDown={(event) => {
            if (!open && (event.key === 'ArrowDown' || event.key === 'Enter')) {
              setOpen(true);
              return;
            }
            if (event.key === 'Escape') {
              setOpen(false);
              setQuery(selected?.label ?? '');
              return;
            }
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              setHighlight((current) => Math.min(current + 1, Math.max(filtered.length - 1, 0)));
            }
            if (event.key === 'ArrowUp') {
              event.preventDefault();
              setHighlight((current) => Math.max(current - 1, 0));
            }
            if (event.key === 'Enter' && open && filtered[highlight]) {
              event.preventDefault();
              pick(filtered[highlight]);
            }
          }}
        />
        {value > 0 ? (
          <button type="button" className="autocomplete-clear" onClick={clear} aria-label="Limpar">
            <i className="material-icons" aria-hidden>
              close
            </i>
          </button>
        ) : (
          <span className="autocomplete-chevron" aria-hidden>
            <i className="material-icons">expand_more</i>
          </span>
        )}
      </div>

      {open ? (
        <ul id={listId} className="autocomplete-list" role="listbox">
          {filtered.length === 0 ? (
            <li className="autocomplete-empty">{emptyMessage}</li>
          ) : (
            filtered.map((option, index) => (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={option.value === value}
                  className={`autocomplete-option${index === highlight ? ' is-active' : ''}${
                    option.value === value ? ' is-selected' : ''
                  }`}
                  onMouseEnter={() => setHighlight(index)}
                  onClick={() => pick(option)}
                >
                  <span className="autocomplete-option-label">{option.label}</span>
                  {option.description ? (
                    <span className="autocomplete-option-desc">{option.description}</span>
                  ) : null}
                </button>
              </li>
            ))
          )}
        </ul>
      ) : null}

      {error ? <span className="red-text">{error}</span> : null}
    </div>
  );
}
