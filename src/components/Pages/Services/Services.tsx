import { Element } from "react-scroll"; // Permite navegacion con scroll suave a esta seccion
import workersData from '../../../data/workers.json'; // Datos estaticos de trabajadores
import WorkerProfile from "./WorkerProfile/WorkerProfile"; // Componente para mostrar perfil individual

import './Services.css';

const Services = () => {
  // Referencias para detectar si los bloques estan en viewport
  

  // Detecta si los elementos han entrado a la vista (solo una vez)
  
  

  return (
    // Ancla scroll para la seccion de servicios
    <Element name="services">
      <div className="servicesContainer">

        {/* Animacion de entrada para la seccion de perfiles de trabajadores */}
        
          {/* Render dinamico de todos los trabajadores */}
          {workersData.map(worker => (
            <WorkerProfile key={worker.id} worker={worker}/>
          ))}
        

        {/* Animacion de entrada para las tecnologias utilizadas */}
        

      </div>
    </Element>
  )
}

export default Services
