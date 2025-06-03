import imgCardDeerAle from '../assets/img1.png';
import imgCardMrT from '../assets/img2.png';
import imgCardCraftCol from '../assets/img3.png';
import imgHtml from '../assets/techHTML.png';
import imgCss from '../assets/techCSS.png';
import imgJs from '../assets/techJS.png';
import imgReact from '../assets/techReact.png';
import imgMySql from '../assets/techMySQL.png';
import imgPython from '../assets/techPython.png';

type SliderImageKey = 'img1.png' | 'img2.png' | 'img3.png';
type TechImageKey = 'img4.png' | 'img5.png' | 'img6.png' | 'img7.png' | 'img8.png' | 'img9.png';

type SliderImages = Record<SliderImageKey, string>;
type TechImages = Record<TechImageKey, string>;

type ImageMap = {
    slider: SliderImages;
    tech: TechImages;
}

const imageMap: ImageMap = {
    slider: {
        'img1.png': imgCardDeerAle,
        'img2.png': imgCardMrT,
        'img3.png': imgCardCraftCol,
    },
    tech: {
        'img4.png': imgHtml,
        'img5.png': imgCss,
        'img6.png': imgJs,
        'img7.png': imgReact,
        'img8.png': imgMySql,
        'img9.png': imgPython,
    },
    
};

export default imageMap;