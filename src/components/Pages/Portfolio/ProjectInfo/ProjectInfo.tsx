import imageMap from "../../../../data/imageMap"; // Mapa de imagenes referenciado por clave
import './ProjectInfo.css';
import { Project } from '../../../../interface/Project'; // Tipado de datos del proyecto

// Props esperadas: un solo proyecto con sus datos
interface Props {
    project: Project;
}

const ProjectInfo: React.FC<Props> = ({ project }: { project:Project}) => {
    return (
        <div className="project" data-aos="fade-left">
            {/* Imagen del proyecto, cargada dinamicamente segun su clave en el JSON */}
            <img 
                src={imageMap.slider[project.image]}
                alt={project.name}
                className="image"
            />

            {/* Informacion textual del proyecto */}
            <div className="dataProject">
                <h3>{project.name}</h3>
                <p>{project.description}</p>

                {/* Enlace al proyecto (abierto en una nueva pesteña) */}
                <a href={project.link} target="_blank"></a>
            </div>
        </div>
    )
}

export default ProjectInfo
