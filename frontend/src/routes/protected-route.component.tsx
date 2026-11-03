import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { APP_ROUTES } from '@/constants/app/app.constants';
import { useAuthStore } from '@/stores/auth/auth.store';

export function ProtectedRoute() {
  const token = useAuthStore((state) => state.token);
  const location = useLocation();

  if (!token) {
    return <Navigate to={APP_ROUTES.login} replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
