import { Element } from "react-scroll";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Slider from "./Slider/Slider";
import './Home.css';

const Home = () => {
  const introRef = useRef(null);
  const isInView = useInView(introRef, { once: true });

  return (
    <Element name="home">
      <div>
        <Slider />
        <motion.div
          ref={introRef}
          className="introText"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}        
        >
          <p>
            En Feature Tech creamos soluciones de software escalables, eficientes y alineadas con los objetivos de negocio de nuestros clientes. Desarrollamos aplicaciones robustas potenciadas por Inteligencia Artificial, siendo una de nuestras principales especialidades los agentes conversacionales generativos. Nuestra meta es impulsar la transformación digital con tecnología útil, flexible y pensada para el crecimiento.
          </p>
        </motion.div>
      </div>
    </Element>
  )
}

export default Home
