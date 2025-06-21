import { Swiper, SwiperSlide } from "swiper/react"; // Componente principal de carrusel
import { Navigation, Autoplay } from "swiper/modules"; // Modulos para navegacion y autoplay
import imageMap from "../../../../data/imageMap"; // Mapa de imagenes a usar en el slider
import './Slider.css';

// Claves de imagenes especificaciones a mostrar en este slider
const sliderImageKeys = ['img01.png', 'img02.png', 'img03.png'] as const;

const Slider = () => {
    return (
        <Swiper
            modules={[Navigation, Autoplay]} // Activa navegacion manual y autoplay
            navigation // Flechas de navegacion (izq/der)
            autoplay={{ delay: 3000 }} // Cambio automatico cada 3 segundos
            loop={true} // Repite el slider de forma infinita
            className="mySwiper"
        >
            {/* Render dinamico de las imagenes definidas en sliderImageKeys */}
            <div>
                {sliderImageKeys.map((key, index) => (
                    <SwiperSlide><img className="imgSlider" key={index} src={imageMap.slider[key]} alt={key}/></SwiperSlide>
                ))}
            </div>
            
        </Swiper>
    )
}

export default Slider
