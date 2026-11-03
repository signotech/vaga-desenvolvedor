import type { LucideIcon } from 'lucide-react';
import {
  Home,
  LogOut,
  Menu,
  Package,
  PanelLeftClose,
  PanelLeftOpen,
  Receipt,
  Users,
  X,
} from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { APP_NAME, APP_ROUTES } from '@/constants/app/app.constants';
import { useAuthStore } from '@/stores/auth/auth.store';
import { useUiStore } from '@/stores/ui/ui.store';

const NAV_ITEMS: ReadonlyArray<{
  to: string;
  label: string;
  icon: LucideIcon;
  end: boolean;
}> = [
  { to: APP_ROUTES.home, label: 'Início', icon: Home, end: true },
  { to: APP_ROUTES.pedidos, label: 'Pedidos', icon: Receipt, end: false },
  { to: APP_ROUTES.clientes, label: 'Clientes', icon: Users, end: false },
  { to: APP_ROUTES.produtos, label: 'Produtos', icon: Package, end: false },
];

export function MainLayout() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const clearSession = useAuthStore((state) => state.clearSession);
  const sidebarExpanded = useUiStore((state) => state.sidebarExpanded);
  const mobileSidebarOpen = useUiStore((state) => state.mobileSidebarOpen);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const openMobileSidebar = useUiStore((state) => state.openMobileSidebar);
  const closeMobileSidebar = useUiStore((state) => state.closeMobileSidebar);

  return (
    <div
      className={`app-shell${sidebarExpanded ? ' is-expanded' : ' is-collapsed'}${
        mobileSidebarOpen ? ' is-mobile-open' : ''
      }`}
    >
      <div
        className="sidebar-backdrop"
        onClick={closeMobileSidebar}
        aria-hidden={!mobileSidebarOpen}
      />

      <aside className="app-sidebar">
        <div className="sidebar-top">
          <NavLink to={APP_ROUTES.home} className="sidebar-brand" end onClick={closeMobileSidebar}>
            <span className="sidebar-brand-mark" aria-hidden>
              S
            </span>
            <span className="sidebar-brand-text">{APP_NAME}</span>
          </NavLink>

          <button
            type="button"
            className="sidebar-toggle hide-on-med-and-down"
            onClick={toggleSidebar}
            aria-label={sidebarExpanded ? 'Recolher menu' : 'Expandir menu'}
            aria-expanded={sidebarExpanded}
          >
            {sidebarExpanded ? (
              <PanelLeftClose size={20} strokeWidth={1.75} aria-hidden />
            ) : (
              <PanelLeftOpen size={20} strokeWidth={1.75} aria-hidden />
            )}
          </button>

          <button
            type="button"
            className="sidebar-toggle hide-on-large-only"
            onClick={closeMobileSidebar}
            aria-label="Fechar menu"
          >
            <X size={20} strokeWidth={1.75} aria-hidden />
          </button>
        </div>

        <nav className="sidebar-nav" aria-label="Navegação principal">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `sidebar-link${isActive ? ' is-active' : ''}`}
                onClick={closeMobileSidebar}
                title={item.label}
                aria-label={item.label}
              >
                <Icon className="sidebar-link-icon" size={20} strokeWidth={1.75} aria-hidden />
                <span className="sidebar-link-label">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <span className="sidebar-footer-text">{user?.nome ?? 'Usuário'}</span>
            <span className="sidebar-user-email">{user?.email}</span>
          </div>
          <button
            type="button"
            className="sidebar-link sidebar-logout"
            onClick={() => {
              clearSession();
              closeMobileSidebar();
              navigate(APP_ROUTES.login, { replace: true });
            }}
            title="Sair"
            aria-label="Sair"
          >
            <LogOut className="sidebar-link-icon" size={20} strokeWidth={1.75} aria-hidden />
            <span className="sidebar-link-label">Sair</span>
          </button>
        </div>
      </aside>

      <div className="app-main">
        <header className="app-topbar hide-on-large-only">
          <button
            type="button"
            className="sidebar-toggle"
            onClick={openMobileSidebar}
            aria-label="Abrir menu"
          >
            <Menu size={20} strokeWidth={1.75} aria-hidden />
          </button>
          <NavLink to={APP_ROUTES.home} className="topbar-brand" end>
            {APP_NAME}
          </NavLink>
        </header>

        <main className="page-shell">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
