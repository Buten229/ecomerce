import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Limpiar TODAS las sesiones mock/legacy al iniciar la app
// Esto soluciona cuentas aleatorias generadas por versiones anteriores
const CURRENT_SESSION_VERSION = 'v2';
const sessionVersion = localStorage.getItem('ecomerce_session_version');

if (sessionVersion !== CURRENT_SESSION_VERSION) {
  // Primera vez con esta versión — limpiar todo lo viejo
  localStorage.removeItem('user_session_profile');
  localStorage.removeItem('registered_demo_accounts');
  localStorage.setItem('ecomerce_session_version', CURRENT_SESSION_VERSION);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
