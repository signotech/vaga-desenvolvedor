import { useEffect } from 'react';
import M from 'materialize-css';

export function useMaterialize() {
  useEffect(() => {
    M.AutoInit();
  }, []);
}

export function useToast() {
  const show = (message: string, classes = 'rounded') => {
    M.toast({ html: message, classes });
  };

  return { show };
}
