import { Element } from "react-scroll";
import workersData from '../../../data/workers.json';
import WorkerProfile from "./WorkerProfile/WorkerProfile";
import TechImage from "./TechImage/TechImage";
import imageMap from "../../../data/imageMap";
import './Services.css';

const techImageKeys = ['img04.png', 'img05.png', 'img06.png', 'img07.png', 'img08.png', 'img09.png', 'img10.png', 'img11.png', 'img12.png', 'img13.png' , 'img14.png', 'img15.png'] as const;


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
