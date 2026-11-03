import { useSearchParams } from 'react-router-dom';

export function useHighlight() {
  const [params] = useSearchParams();
  const value = Number(params.get('highlight'));
  return Number.isFinite(value) && value > 0 ? value : null;
}
