import { Worker } from "../../../../interface/Worker"; // Importa el tipo de datos de un trabajador
import '../WorkerProfile/WorkerProfile.css'; // Estilos especificos del componente

// Define las props esperadas: un objeto con info de un trabajador
interface Props {
    worker: Worker;
}

const WorkerProfile: React.FC<Props> = ({ worker }) => {
  return (
    // Contenedor del perfil de un trabajador
    <div className="workerProfile">
        {/* Nombre del trabajador */}
        <h2>{worker.name}</h2>

        {/* Cargo o rol del trabajador */}
        <h4>{worker.role}</h4>

        {/* Breve descripcion de experiencia o responsabilidades */}
        <p>{worker.description}</p>

        {/* Enlace externo a su perfil de LinkedIn (se abre en nueva pestaña de forma segura) */}
        <a href={worker.linkedin} target="_blank" rel="noopener noreferrer">
            Ver perfil en LinkedIn
        </a>
      
    </div>
  );
}
export default WorkerProfile
