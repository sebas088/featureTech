import { useRef } from 'react';
import { motion, useInView } from "framer-motion";
import './TechImage.css';

// Define las props que recibe este componento: una sola imagen (src)
interface TechImageProps {
    src: string;
}

const TechImage: React.FC<TechImageProps> = ({ src }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="imgTechContainer"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <img
        src={isInView ? src : ''}
        className="imgTech"
        loading='lazy'
        alt='Tecnology'
      />
    </motion.div>
  )
}

export default TechImage
