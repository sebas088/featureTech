import { motion, useInView } from "framer-motion"; // Para animaciones al entrar en viewport
import { useRef } from "react";
import { Element } from "react-scroll"; // Permite navegacion con scroll suave a esta seccion
import workersData from '../../../data/workers.json'; // Datos estaticos de trabajadores
import WorkerProfile from "./WorkerProfile/WorkerProfile"; // Componente para mostrar perfil individual

import './Services.css';

const Services = () => {
  // Referencias para detectar si los bloques estan en viewport
  const workerRef = useRef(null);

  // Detecta si los elementos han entrado a la vista (solo una vez)
  const isWorkerInView = useInView(workerRef, {once: true});
  

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
        

      </div>
    </Element>
  )
}

export default Services
