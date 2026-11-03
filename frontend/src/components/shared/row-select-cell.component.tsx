type RowSelectHeaderProps = {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
  label?: string;
};

export function RowSelectHeaderComponent({
  checked,
  indeterminate = false,
  onChange,
  label = 'Selecionar todos',
}: RowSelectHeaderProps) {
  return (
    <th className="table-select">
      <label className="table-check">
        <input
          type="checkbox"
          checked={checked}
          ref={(node) => {
            if (node) node.indeterminate = indeterminate && !checked;
          }}
          onChange={onChange}
          aria-label={label}
        />
        <span />
      </label>
    </th>
  );
}

type RowSelectCellProps = {
  checked: boolean;
  onChange: () => void;
  label: string;
};

export function RowSelectCellComponent({ checked, onChange, label }: RowSelectCellProps) {
  return (
    <td data-label="Selecionar" className="table-select">
      <label className="table-check">
        <input type="checkbox" checked={checked} onChange={onChange} aria-label={label} />
        <span />
      </label>
    </td>
  );
}
