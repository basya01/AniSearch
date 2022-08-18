export interface Genre {
  id: number;
  name: string;
  russian: string;
  kind: string;
}

export interface Studio {
  filtered_name: string;
  id: number;
  image: string;
  name: string;
  real: boolean;
}

export interface Stats {
  name: number;
  value: number;
}

export interface Screen {
  original: string;
  preview: string;
}

export interface Video {
  id: number;
  url: string;
  image_url: string;
  player_url: string;
  name: string;
  kind: string;
  hosting: string;
}

export interface Filter {
  id: number;
  kind?: string;
  name: string;
  russian: string;
}

export interface FilterData {
  name: string;
  items: Filter[];
}