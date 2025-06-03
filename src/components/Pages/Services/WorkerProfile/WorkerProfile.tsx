import { Worker } from "../../../../interface/Worker";
import '../WorkerProfile/WorkerProfile.css';

interface Props {
    worker: Worker;
}

const WorkerProfile: React.FC<Props> = ({ worker }) => {
  return (
    <div className="workerProfile">
        <h2>{worker.name}</h2>
        <h4>{worker.role}</h4>
        <p>{worker.description}</p>
        <a href={worker.linkedin} target="_blank" rel="noopener noreferrer">
            Ver perfil en LinkedIn
        </a>
      
    </div>
  );
}
export default WorkerProfile
