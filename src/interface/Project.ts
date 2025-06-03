export type SliderImageKey = `img1.png` | `img2.png` | `img3.png`;

export interface Project {
    id: number;
    name: string;
    description: string;
    image: SliderImageKey;
    link: string;
}