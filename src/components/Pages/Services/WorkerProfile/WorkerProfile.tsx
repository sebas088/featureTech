import { useState, useRef, useEffect } from "react";
import { Worker } from "../../../../interface/Worker"; // Importa el tipo de datos de un trabajador
import '../WorkerProfile/WorkerProfile.css'; // Estilos especificos del componente

// Define las props esperadas: un objeto con info de un trabajador
interface Props {
  worker: Worker;
}

const WorkerProfile: React.FC<Props> = ({ worker }) => {

  const [isVisible, setIsVisible] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const [delayedVisible, setDelayedVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (profileRef.current) {
      observer.observe(profileRef.current);
    }

    return () => {
      if (profileRef.current) {
        observer.unobserve(profileRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if(isVisible) {
      const timer = setTimeout(() => {
        setDelayedVisible(true);
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div className="workerContainer">
      <div className="profileHeader">
        <h2>{worker.name}</h2>
        <p>{worker.role}</p>
      </div>
      <div ref={profileRef}
        className={`workerProfile ${delayedVisible ? 'expanded' : ''}`}
      >
        <p>{worker.description}</p>
        <a href={worker.linkedin} target="_blank" rel="noopener noreferrer">
          Ver perfil en LinkedIn
        </a>
      </div>
    </div>
  );
}
export default WorkerProfile
