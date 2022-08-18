import { Image } from './Image';

export interface Character {
  id: number;
  name: string;
  russian: string;
  image: Image;
  url: string;
}

export interface Role {
  roles: string[];
  roles_russian: string[];
  character: Character;
  person: string;
}