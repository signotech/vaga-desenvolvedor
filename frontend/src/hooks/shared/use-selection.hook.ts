import { useEffect, useMemo, useState } from 'react';

export function useSelection(itemIds: number[]) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    setSelectedIds((current) => current.filter((id) => itemIds.includes(id)));
  }, [itemIds]);

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);
  const allSelected = itemIds.length > 0 && itemIds.every((id) => selectedSet.has(id));
  const someSelected = selectedIds.length > 0;

  return {
    selectedIds,
    selectedSet,
    allSelected,
    someSelected,
    clear: () => setSelectedIds([]),
    toggle: (id: number) => {
      setSelectedIds((current) =>
        current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
      );
    },
    toggleAll: () => {
      setSelectedIds(allSelected ? [] : itemIds);
    },
  };
}
