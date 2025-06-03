import imageMap from "../../../../data/imageMap";
import './ProjectInfo.css';
import { Project } from '../../../../interface/Project';

interface Props {
    project: Project;
}

const ProjectInfo: React.FC<Props> = ({ project }: { project:Project}) => {
    return (
        <div className="project" data-aos="fade-left">
            <img src={imageMap.slider[project.image]} alt={project.name} className="image" />
            <div className="dataProject">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <a href={project.link} target="_blank"></a>
            </div>
        </div>
    )
}

export default ProjectInfo
