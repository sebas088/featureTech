import { Element } from "react-scroll"; // Marca la seccion como "ancla"
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Slider from "./Slider/Slider";
import './Home.css';

const Home = () => {
  // Ref para detectar cuando el texto de introduccion entra en la vista
  const introRef = useRef(null);
  const isInView = useInView(introRef, { once: true });

  return (
    // Define el "ancla" para el boton de navegacion que lleva a la seccion Home
    <Element name="home">
      <div>
        {/* Carrusel de imagenes o contenido destacado */}
        <Slider />

        {/* Animacion de aparicion del texto al hacer scroll */}
        <motion.div
          ref={introRef}
          className="introText"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}        
        >
          <p>
            En Feature Tech creamos soluciones de software escalables, eficientes y alineadas con los objetivos de negocio de nuestros clientes.<br /><br />
            Nos especializamos en el desarrollo de aplicaciones robustas, con un enfoque meticuloso en la experiencia de usuario web, una velocidad de respuesta impecable mediante microservicios y una infraestructura cloud moderna. Todo esto potenciado por Inteligencia Artificial, siendo una de nuestras principales fortalezas el desarrollo de agentes cognitivos.<br /><br />
            Nuestra meta es impulsar la transformación digital con tecnología útil, flexible y diseñada para el crecimiento de las personas.<br /><br />
            Queremos revolucionar el software en el mundo hispano y demostrar de qué estamos hechos a nivel mundial. Buscamos impactar positivamente la vida de las personas a través de soluciones de software e inteligencia artificial que sean accesibles, seguras y verdaderamente significativas.
          </p>
        </motion.div>
      </div>
    </Element>
  )
}

export default Home;