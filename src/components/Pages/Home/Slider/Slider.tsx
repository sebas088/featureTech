import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import imageMap from "../../../../data/imageMap";
import './Slider.css';

const sliderImageKeys = ['img01.png', 'img02.png', 'img03.png'] as const;

const Slider = () => {
    return (
        <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 3000 }}
            loop={true}
            className="mySwiper"
        >
            <div>
                {sliderImageKeys.map((key, index) => (
                    <SwiperSlide><img className="imgSlider" key={index} src={imageMap.slider[key]} alt={key}/></SwiperSlide>
                ))}
            </div>
            
        </Swiper>
    )
}

export default Slider
