import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { APP_NAME, APP_ROUTES, DEMO_CREDENTIALS } from '@/constants/app/app.constants';
import { AuthService } from '@/services/auth/auth.service';
import { useAuthStore } from '@/stores/auth/auth.store';
import { getErrorMessage } from '@/utils/error.util';

export function LoginPage() {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const setSession = useAuthStore((state) => state.setSession);
  const [email, setEmail] = useState<string>(DEMO_CREDENTIALS.email);
  const [senha, setSenha] = useState<string>(DEMO_CREDENTIALS.senha);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (token) return <Navigate to={APP_ROUTES.home} replace />;

  return (
    <div className="login-shell">
      <form
        className="login-card surface-card fade-up"
        onSubmit={async (event) => {
          event.preventDefault();
          setSubmitting(true);
          setError(null);
          try {
            const session = await AuthService.login({ email, senha });
            setSession(session.token, session.user);
            navigate(APP_ROUTES.home, { replace: true });
          } catch (err) {
            setError(getErrorMessage(err, 'Falha ao entrar'));
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <div className="login-brand">
          <span className="sidebar-brand-mark" aria-hidden>
            S
          </span>
          <div>
            <p className="login-eyebrow">Signotech</p>
            <h1>{APP_NAME}</h1>
          </div>
        </div>

        <p className="login-copy">Entre para gerenciar clientes, produtos e pedidos.</p>

        <label className="field field-grow">
          <span className="field-label">E-mail</span>
          <input
            className="field-control"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label className="field field-grow">
          <span className="field-label">Senha</span>
          <input
            className="field-control"
            type="password"
            autoComplete="current-password"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            required
          />
        </label>

        {error ? <p className="red-text">{error}</p> : null}

        <button type="submit" className="btn waves-effect waves-light" disabled={submitting}>
          {submitting ? 'Entrando…' : 'Entrar'}
        </button>

        <p className="login-hint">
          Demo: {DEMO_CREDENTIALS.email} / {DEMO_CREDENTIALS.senha}
        </p>
      </form>
    </div>
  );
}
