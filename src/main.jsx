import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

// Este archivo es el punto de entrada de la aplicación React. Renderiza el componente <App /> dentro del contenedor con id 'root' en index.html, y envuelve la aplicación en <BrowserRouter> para habilitar el enrutamiento con react-router-dom.
