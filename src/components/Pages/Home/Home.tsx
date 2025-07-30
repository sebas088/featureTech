import { Element } from "react-scroll"; // Marca la seccion como "ancla"
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Slider from "./Slider/Slider";
import TechImage from "./TechImage/TechImage"; // Componente para mostrar cada imagen de tecnologia
import imageMap from "../../../data/imageMap"; // Mapa con imagenes disponibles
import './Home.css';

// Claves de imagenes de tecnologias a mostrar (ordenadas y limitadas)
const techImageKeys = [
  'img04.png', 'img05.png', 'img06.png', 'img07.png',
  'img08.png', 'img09.png', 'img10.png', 'img11.png',
  'img12.png', 'img13.png', 'img14.png', 'img15.png'
] as const;

const Home = () => {
  // Ref para detectar cuando el texto de introduccion entra en la vista
  const introRef = useRef(null);
  const techRef = useRef(null);

  const isInView = useInView(introRef, { once: true });
  const isTechInView = useInView(techRef, { once: true })

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
            En Feature Tech creamos soluciones de software escalables, eficientes y alineadas con los objetivos de negocio de nuestros clientes.
          </p><br /><br />

          {/* Animacion de entrada para las tecnologias utilizadas */}
          <motion.div
            ref={techRef}
            className="techContainer"
            initial={{ opacity: 0, x: 100 }}
            animate={isTechInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}

          >
            <TechImage key={techImageKeys[0]} src={imageMap.tech[techImageKeys[0]]} />
            <TechImage key={techImageKeys[1]} src={imageMap.tech[techImageKeys[1]]} />
            <TechImage key={techImageKeys[2]} src={imageMap.tech[techImageKeys[2]]} />
          </motion.div>

          <p>
            Nos especializamos en el desarrollo de aplicaciones robustas, con un enfoque meticuloso en la experiencia de usuario web, una velocidad de respuesta impecable mediante microservicios y una infraestructura cloud moderna. Todo esto potenciado por Inteligencia Artificial, siendo una de nuestras principales fortalezas el desarrollo de agentes cognitivos.
          </p><br /><br />
          <motion.div
            ref={techRef}
            className="techContainer"
            initial={{ opacity: 0, x: 100 }}
            animate={isTechInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}

          >
            <TechImage key={techImageKeys[3]} src={imageMap.tech[techImageKeys[3]]} />
            <TechImage key={techImageKeys[4]} src={imageMap.tech[techImageKeys[4]]} />
            <TechImage key={techImageKeys[5]} src={imageMap.tech[techImageKeys[5]]} />
          </motion.div>
          <p>
            Nuestra meta es impulsar la transformación digital con tecnología útil, flexible y diseñada para el crecimiento de las personas.
          </p><br /><br />
          <motion.div
            ref={techRef}
            className="techContainer"
            initial={{ opacity: 0, x: 100 }}
            animate={isTechInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}

          >
            <TechImage key={techImageKeys[6]} src={imageMap.tech[techImageKeys[6]]} />
            <TechImage key={techImageKeys[7]} src={imageMap.tech[techImageKeys[7]]} />
            <TechImage key={techImageKeys[8]} src={imageMap.tech[techImageKeys[8]]} />
          </motion.div>
          <p>
            Queremos revolucionar el software en el mundo hispano y demostrar de qué estamos hechos a nivel mundial. Buscamos impactar positivamente la vida de las personas a través de soluciones de software e inteligencia artificial que sean accesibles, seguras y verdaderamente significativas.
          </p>
          <motion.div
            ref={techRef}
            className="techContainer"
            initial={{ opacity: 0, x: 100 }}
            animate={isTechInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}

          >
            <TechImage key={techImageKeys[9]} src={imageMap.tech[techImageKeys[9]]} />
            <TechImage key={techImageKeys[10]} src={imageMap.tech[techImageKeys[10]]} />
            <TechImage key={techImageKeys[11]} src={imageMap.tech[techImageKeys[11]]} />
          </motion.div>
        </motion.div>
      </div>
    </Element>
  )
}

export default Home;