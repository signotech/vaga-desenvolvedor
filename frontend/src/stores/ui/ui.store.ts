import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UiState = {
  sidebarExpanded: boolean;
  mobileSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarExpanded: (expanded: boolean) => void;
  openMobileSidebar: () => void;
  closeMobileSidebar: () => void;
};

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      sidebarExpanded: true,
      mobileSidebarOpen: false,
      toggleSidebar: () => set((state) => ({ sidebarExpanded: !state.sidebarExpanded })),
      setSidebarExpanded: (sidebarExpanded) => set({ sidebarExpanded }),
      openMobileSidebar: () => set({ mobileSidebarOpen: true }),
      closeMobileSidebar: () => set({ mobileSidebarOpen: false }),
    }),
    {
      name: 'signo-ui',
      partialize: (state) => ({ sidebarExpanded: state.sidebarExpanded }),
    },
  ),
);
