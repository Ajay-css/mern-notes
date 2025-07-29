import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router"
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
    <Toaster />
  </BrowserRouter>,
)
