import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// ============================================================
// LIMPIEZA NUCLEAR DE SESIONES AL INICIAR
// Borra TODO lo relacionado con auth para evitar cuentas fantasma
// ============================================================
function nukeAllLegacySessions() {
  const keysToDelete: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;
    if (
      key.includes('user_session') ||
      key.includes('registered_demo') ||
      key.includes('supabase.auth') ||
      key.includes('sb-') ||
      key.includes('ecomerce-auth') ||
      key.includes('lorenz') ||
      key.includes('mock')
    ) {
      keysToDelete.push(key);
    }
  }
  keysToDelete.forEach((k) => localStorage.removeItem(k));

  // También limpiar sessionStorage
  sessionStorage.clear();
}

// Correr limpieza si es una versión nueva del app
const APP_VERSION = 'ecomerce-v3-clean';
if (localStorage.getItem('__app_version') !== APP_VERSION) {
  nukeAllLegacySessions();
  localStorage.setItem('__app_version', APP_VERSION);
  console.log('[Ecomerce] Sesiones legacy limpiadas ✅');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
