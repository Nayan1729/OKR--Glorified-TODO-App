import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import OKRForm from './OKRForm.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OKRForm />
  </StrictMode>
);
