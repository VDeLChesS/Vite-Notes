import React from 'react'
import './index.css'
import App from './App.tsx';
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import { AuthSessionProvider } from "./auth/AuthSessionContext"



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthSessionProvider>
        <App />
      </AuthSessionProvider>
    </BrowserRouter>
  </React.StrictMode>
);
