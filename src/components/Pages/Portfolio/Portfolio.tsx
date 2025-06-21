import { Element } from "react-scroll"; // Marca la seccion como "ancla" para scroll suave
import projectsDataRaw from '../../../data/projects.json'; // Datos de proyectos en formato JSON
import ProjectInfo from "./ProjectInfo/ProjectInfo"; // Componente que muestra cada proyecto
import { Project } from "../../../interface/Project"; // Tipado de los proyectos
import './Portfolio.css';

// Conversion explicita: asegura que el array de proyectos cumplecon la interfaz Project
const projectsData = projectsDataRaw as Project[];

const Portfolio = () => {
  return (
    // Ancla para scroll hacia la seccion Porffolio
    <Element name="portfolio">
      <div className="portfolioContainer">
        {/* Renderiza dinaicamente cada protecto usando el componente ProjectInfo */}
        {projectsData.map(project => (
          <ProjectInfo key={project.id} project={project} />
        ))}
      </div>
    </Element>
  )
}

export default Portfolio








