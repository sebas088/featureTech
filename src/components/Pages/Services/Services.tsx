import { motion, useInView } from "framer-motion"; // Para animaciones al entrar en viewport
import { useRef } from "react";
import { Element } from "react-scroll"; // Permite navegacion con scroll suave a esta seccion
import workersData from '../../../data/workers.json'; // Datos estaticos de trabajadores
import WorkerProfile from "./WorkerProfile/WorkerProfile"; // Componente para mostrar perfil individual
import TechImage from "./TechImage/TechImage"; // Componente para mostrar cada imagen de tecnologia
import imageMap from "../../../data/imageMap"; // Mapa con imagenes disponibles
import './Services.css';

// Claves de imagenes de tecnologias a mostrar (ordenadas y limitadas)
const techImageKeys = [
  'img04.png', 'img05.png', 'img06.png', 'img07.png',
  'img08.png', 'img09.png', 'img10.png', 'img11.png',
  'img12.png', 'img13.png' , 'img14.png', 'img15.png'
] as const;

const Services = () => {
  // Referencias para detectar si los bloques estan en viewport
  const workerRef = useRef(null);
  const techRef = useRef(null);

  // Detecta si los elementos han entrado a la vista (solo una vez)
  const isWorkerInView = useInView(workerRef, {once: true});
  const isTechInView = useInView(techRef, { once: true});

  return (
    // Ancla scroll para la seccion de servicios
    <Element name="services">
      <div className="servicesContainer">

        {/* Animacion de entrada para la seccion de perfiles de trabajadores */}
        <motion.div
          ref={workerRef}
          className="workerContainer"
          initial={{ opacity: 0, x: -100 }}
          animate={isWorkerInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration:0.8, ease: "easeOut" }}
        >
          {/* Render dinamico de todos los trabajadores */}
          {workersData.map(worker => (
            <WorkerProfile key={worker.id} worker={worker} />
          ))}
        </motion.div>

        {/* Animacion de entrada para las tecnologias utilizadas */}
        <motion.div
          ref={techRef}
          className="techContainer"
          initial={{ opacity: 0, x: 100 }}
          animate={isTechInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          {/* Render dinamico de imagenes de tecnologias desde imageMap */}
          {techImageKeys.map((key, index) => (
            <TechImage key={index} src={imageMap.tech[key]} />
          ))}
        </motion.div>

      </div>
    </Element>
  )
}

export default Services
