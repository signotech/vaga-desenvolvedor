import type { KeyboardEvent } from 'react';

type ClearableInputProps = {
  id?: string;
  value: string;
  placeholder?: string;
  type?: 'text' | 'search';
  className?: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
};

export function ClearableInputComponent({
  id,
  value,
  placeholder,
  type = 'text',
  className = 'field-control',
  onChange,
  onClear,
  onKeyDown,
}: ClearableInputProps) {
  const hasValue = value.length > 0;

  return (
    <div className={`field-clearable${hasValue ? ' has-value' : ''}`}>
      <input
        id={id}
        className={className}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={onKeyDown}
      />
      {hasValue ? (
        <button
          type="button"
          className="field-clear-btn"
          aria-label="Limpar busca"
          title="Limpar"
          onClick={() => {
            onChange('');
            onClear?.();
          }}
        >
          <i className="material-icons" aria-hidden>
            close
          </i>
        </button>
      ) : null}
    </div>
  );
}
