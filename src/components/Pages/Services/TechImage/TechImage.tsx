import './TechImage.css';

interface TechImageProps {
    src: string;
}

const TechImage: React.FC<TechImageProps> = ({ src }) => {
  return (
    <div className="imgTechContainer">
        <img src={src} className='imgTech' loading='lazy'></img>
    </div>
  )
}

export default TechImage
