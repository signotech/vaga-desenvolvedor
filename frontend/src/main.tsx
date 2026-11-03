import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'materialize-css/dist/css/materialize.min.css';
import '@/styles/globals.css';
import App from '@/App';
import { AppProvider } from '@/providers/app/app.provider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
);
