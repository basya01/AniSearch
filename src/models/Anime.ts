import { Image } from "./Image";

export interface Anime {
  aired_on: string;
  episodes: number;
  episodes_aired: number;
  id: number;
  image: Image;
  kind: string;
  name: string;
  released_on: string | null;
  russian: string;
  score: string;
  status: string;
  url: string;
}