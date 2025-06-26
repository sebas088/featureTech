import './TechImage.css';

// Define las props que recibe este componento: una sola imagen (src)
interface TechImageProps {
    src: string;
}

const TechImage: React.FC<TechImageProps> = ({ src }) => {
  return (
    // Contenedor para mantener el estilo de cada imagen tecnologica
    <div className="imgTechContainer">
        {/* Carga de la imagen: se hace de forma perezosa para optimizar rendimiento */}
        <img src={src} className='imgTech' loading='lazy'></img>
    </div>
  )
}

export default TechImage
