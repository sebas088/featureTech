import { Element } from "react-scroll";
import workersData from '../../../data/workers.json';
import WorkerProfile from "./WorkerProfile/WorkerProfile";
import TechImage from "./TechImage/TechImage";
import imageMap from "../../../data/imageMap";
import './Services.css';

const techImageKeys = ['img4.png', 'img5.png', 'img6.png', 'img7.png', 'img8.png', 'img9.png'] as const;


const Services = () => {
  return (
    <Element name="services">
      <div className="servicesContainer">
        <div className="workerContainer">
          {workersData.map(worker => (
            <WorkerProfile key={worker.id} worker={worker} />
          ))}
        </div>
        <div className="techContainer">
          {techImageKeys.map((key, index) => (
            <TechImage key={index} src={imageMap.tech[key]} />
          ))}
        </div>
      </div>
    </Element>
  )
}

export default Services
