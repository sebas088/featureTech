// Importamos el metodo para renderizar la app React en el DOM
import ReactDOM from 'react-dom/client';

// Importamos los estilos globales
import './index.css'

// Importamos estilos personalizados de Swiper (u otra libreria)
import '../src/assets/swiper.css';

// Importamos el componente de enrutamiento de React Router
import { BrowserRouter } from 'react-router-dom';

// Importamos el componente principal de la aplicacion
import App from './App.tsx'

// Renderizamos la aplicacion React dentro del elemnto con id="root"
// El signo de exclamacion (!) le dice a TypeScript que confie en que "root" si existe
ReactDOM.createRoot(document.getElementById('root')!).render(
  // Envolvemos App con BrowserRouter para habilitar navegacion entre paginas
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
