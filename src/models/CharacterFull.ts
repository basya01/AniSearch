import { Image } from './Image';
import { Anime } from './Anime';

export interface Seyu {
  id: number;
  image: Image;
  name: string;
  russian: string;
  url: string;
}

export interface CharacterFull {
  id: number;
  image: Image;
  russian: string;
  name: string;
  altname: string;
  japanese: string;
  seyu: Seyu[];
  animes: Anime[];
  description: string;
  url: string;
}
