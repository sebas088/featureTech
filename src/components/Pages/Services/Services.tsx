import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Element } from "react-scroll";
import workersData from '../../../data/workers.json';
import WorkerProfile from "./WorkerProfile/WorkerProfile";
import TechImage from "./TechImage/TechImage";
import imageMap from "../../../data/imageMap";
import './Services.css';

const techImageKeys = ['img04.png', 'img05.png', 'img06.png', 'img07.png', 'img08.png', 'img09.png', 'img10.png', 'img11.png', 'img12.png', 'img13.png' , 'img14.png', 'img15.png'] as const;

const Services = () => {

  const workerRef = useRef(null);
  const techRef = useRef(null);

  const isWorkerInView = useInView(workerRef, {once: true});
  const isTechInView = useInView(techRef, { once: true});

  return (
    <Element name="services">
      <div className="servicesContainer">
        <motion.div
          ref={workerRef}
          className="workerContainer"
          initial={{ opacity: 0, x: -100 }}
          animate={isWorkerInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration:0.8, ease: "easeOut" }}
        >
          {workersData.map(worker => (
            <WorkerProfile key={worker.id} worker={worker} />
          ))}
        </motion.div>

        <motion.div
          ref={techRef}
          className="techContainer"
          initial={{ opacity: 0, x: 100 }}
          animate={isTechInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          {techImageKeys.map((key, index) => (
            <TechImage key={index} src={imageMap.tech[key]} />
          ))}
        </motion.div>

      </div>
    </Element>
  )
}

export default Services
