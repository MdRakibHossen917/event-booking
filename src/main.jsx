import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './router/router.jsx';
import { RouterProvider } from 'react-router';
import AuthProvider from './Provider/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Toaster />
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
