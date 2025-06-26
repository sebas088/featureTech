// Representa las claves validas de imagenes para el slider de proyectos.
// Esto asegura que solo se usen imagenes predefinas en imageMap.slider
export type SliderImageKey = `img01.png` | `img02.png` | `img03.png`;

// Model de datos para un protecto del portafolio.
// Util para garantizar consistencia entre JSON, componentes y tipado en general.
export interface Project {
    id: number;             // Identificador unico del proyecto
    name: string;           // Nombre del proyecto que se mostrara en la UI
    description: string;    // Descripcion breve del proposito y alcance del proyecto
    image: SliderImageKey;  // Clave de la imagen asociada al proyecto (controlado desde imageMap)
    link: string;           // URL externa al sitio o demo del proyecto
}