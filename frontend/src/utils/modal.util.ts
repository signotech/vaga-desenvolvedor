import M from 'materialize-css';

export function initModal(
  element: HTMLElement,
  options: Partial<M.ModalOptions> = {},
): M.Modal {
  return M.Modal.init(element, options);
}

export function openModal(id: string): void {
  window.setTimeout(() => {
    const element = document.getElementById(id);
    if (element) M.Modal.getInstance(element)?.open();
  }, 0);
}
