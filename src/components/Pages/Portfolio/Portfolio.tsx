import { Element } from "react-scroll";
import projectsDataRaw from '../../../data/projects.json';
import ProjectInfo from "./ProjectInfo/ProjectInfo";
import { Project } from "../../../interface/Project";
import '../Portfolio/Portfolio.css';

const projectsData = projectsDataRaw as Project[];

const Portfolio = () => {
  return (
    <Element name="portfolio">
      <div className="portfolioContainer">
        {projectsData.map(project => (
          <ProjectInfo key={project.id} project={project} />
        ))}
      </div>
    </Element>
  )
}

export default Portfolio








