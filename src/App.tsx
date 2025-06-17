// Importamos hooks y librerias necesatias
import { useRef, useEffect, useState } from 'react';
import AOS from 'aos'; // Libreria de animaciones on-Scroll
import 'aos/dist/aos.css';// Estilos AOS

// Importamos componentes principales de la app
import Header from './components/Header/Header';
import Home from './components/Pages/Home/Home';
import Services from './components/Pages/Services/Services';
import Portfolio from './components/Pages/Portfolio/Portfolio';
import Contact from './components/Pages/Contact/Contact';

import './App.css' // Estilos globales

function App() {
  // Referencia al elemento del Header (para medir su altura)
  const headerRef = useRef<HTMLElement | null>(null);

  //Estado para almacenar dinamicamente la altura del header
  const [headerHeight, setHeaderHeight] = useState(0);

  // Inicializamos las animaciones de scroll al cargar la pagina
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duracion de las animaciones
      once: false, // Las animaciones se repiten al hacer scroll
    });
  }, []);

  // Efecto que actualiza la altura del header dinamicamente
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.getBoundingClientRect().height;
        setHeaderHeight(height); // Guardamos la altura el header
      }
    };

    // Creamos un observer para detectar cambios de tamaño en el header
    const observer = new ResizeObserver(updateHeaderHeight);

    // Si el ref esta disponible, lo observamos u actualizamos altura inicial
    if (headerRef.current) {
      observer.observe(headerRef.current);
      updateHeaderHeight(); // altura inicial
    }

    // Tambien actualizamos altura al hacer scroll o redimensionar ventana
    window.addEventListener("scroll", updateHeaderHeight);
    window.addEventListener("resize", updateHeaderHeight);

    // Limpiamos observadores y listeners al desmontar el componente
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Header recibe la referencia para poder medirlo desde App */}
      <Header innerRef={headerRef}/>

      {/* Naib ajusta su padding-top dinamicamente para no quedar tapado por el header.
          Se suma 130px como compensacion visual extra por animaciones o contenido */}
      <main style={{ paddingTop: headerHeight + 130}}>
        <Home />
        <Services />
        <Portfolio />
        <Contact />
      </main>
    </>
  )
}

export default App
