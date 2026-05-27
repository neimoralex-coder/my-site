import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { AdminProvider } from './context/AdminContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <AdminProvider>
        <App />
      </AdminProvider>
    </HashRouter>
  </StrictMode>
);
