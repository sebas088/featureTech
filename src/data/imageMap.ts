import imgCardDeerAle from '../assets/img1.png';
import imgCardMrT from '../assets/img2.png';
import imgCardCraftCol from '../assets/img3.png';
import imgHtml from '../assets/techHTML.png';
import imgCss from '../assets/techCSS.png';
import imgJs from '../assets/techJS.png';
import imgReact from '../assets/techReact.png';
import imgMySql from '../assets/techMySQL.png';
import imgPython from '../assets/techPython.png';
import imgMongoDB from '../assets/techMongoDB.png';
import imgLangChain from '../assets/techLangChain.png';
import imgNodeJS from '../assets/techNodeJS.png';
import imgDocker from '../assets/techDocker.png';
import imgAWS from '../assets/techAWS.png';
import imgGoogleCloud from '../assets/techGoogleCloud.png';

type SliderImageKey = 'img01.png' | 'img02.png' | 'img03.png';
type TechImageKey = 'img04.png' | 'img05.png' | 'img06.png' | 'img07.png' | 'img08.png' | 'img09.png' | 'img10.png' | 'img11.png' | 'img12.png' | 'img13.png' | 'img14.png' | 'img15.png';

type SliderImages = Record<SliderImageKey, string>;
type TechImages = Record<TechImageKey, string>;

type ImageMap = {
    slider: SliderImages;
    tech: TechImages;
}

const imageMap: ImageMap = {
    slider: {
        'img01.png': imgCardDeerAle,
        'img02.png': imgCardMrT,
        'img03.png': imgCardCraftCol,
    },
    tech: {
        'img04.png': imgHtml,
        'img05.png': imgCss,
        'img06.png': imgJs,
        'img07.png': imgReact,
        'img08.png': imgMySql,
        'img09.png': imgPython,
        'img10.png': imgMongoDB,
        'img11.png': imgLangChain,
        'img12.png': imgNodeJS,
        'img13.png': imgDocker,
        'img14.png': imgAWS,
        'img15.png': imgGoogleCloud,
    },
    
};

export default imageMap;