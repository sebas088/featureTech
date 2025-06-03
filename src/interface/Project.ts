export type SliderImageKey = `img01.png` | `img02.png` | `img03.png`;

export interface Project {
    id: number;
    name: string;
    description: string;
    image: SliderImageKey;
    link: string;
}