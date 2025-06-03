import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Header from './components/Header/Header';
import Home from './components/Pages/Home/Home';
import Services from './components/Pages/Services/Services';
import Portfolio from './components/Pages/Portfolio/Portfolio';
import Contact from './components/Pages/Contact/Contact';
import './App.css'

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <>
      <Header/>
      <main>
        <Home />
        <Services />
        <Portfolio />
        <Contact />
      </main>
    </>
  )
}

export default App
