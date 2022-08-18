import { Image } from './Image';
import { Genre, Studio, Stats, Video } from './Filters';

export interface AnimeFull {
  aired_on: string;
  anons: boolean;
  description: string;
  description_html: string;
  description_source: string;
  duration: number;
  english: string[];
  episodes: number;
  episodes_aired: number;
  fandubbers: string[];
  fansubbers: string[];
  favoured: boolean;
  franchise: string;
  genres: Genre[];
  id: number;
  image: Image;
  japanese: string[];
  kind: 'tv' | 'movie' | 'ova' | 'ona' | 'special' | 'music' | 'tv_13' | 'tv_24' | 'tv_48';
  license_name_ru: string;
  licensors: string[];
  myanimelist_id: number;
  name: string;
  next_episode_at: string;
  ongoing: boolean;
  rates_scores_stats: { name: number; value: number }[];
  rates_statuses_stats: { name: number; value: number }[];
  rating: 'none' | 'g' | 'pg' | 'r' | 'r_plus' | 'rx';
  released_on: string;
  russian: string;
  score: string;
  screenshots: Screen[];
  status: 'anons' | 'ongoing' | 'released';
  studios: Studio[];
  synonyms: string[];
  thread_id: number;
  topic_id: number;
  updated_at: string;
  url: string;
  user_rate: string | null;
  videos: Video[];
}
