import { useRef, useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from './components/Header/Header';
import Home from './components/Pages/Home/Home';
import Services from './components/Pages/Services/Services';
import Portfolio from './components/Pages/Portfolio/Portfolio';
import Contact from './components/Pages/Contact/Contact';
import './App.css'

function App() {
  
  const headerRef = useRef<HTMLElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.getBoundingClientRect().height;
        setHeaderHeight(height);
      }
    };

    const observer = new ResizeObserver(updateHeaderHeight);
    if (headerRef.current) {
      observer.observe(headerRef.current);
      updateHeaderHeight();
    }

    window.addEventListener("scroll", updateHeaderHeight);
    window.addEventListener("resize", updateHeaderHeight);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header innerRef={headerRef}/>
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
