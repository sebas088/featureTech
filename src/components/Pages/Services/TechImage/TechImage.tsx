import './TechImage.css';

interface TechImageProps {
    src: string;
}

const TechImage: React.FC<TechImageProps> = ({ src }) => {
  return (
    <div className="imgTechContainer">
        <img src={src} className='imgTech'></img>
    </div>
  )
}

export default TechImage
