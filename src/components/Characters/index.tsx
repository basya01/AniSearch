import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import styles from './Characters.module.scss';

export interface Character {
  id: number;
  name: string;
  russian: string;
  image: {
    original: string;
    preview: string;
    x96: string;
    x48: string;
  };
  url: string;
}

export interface CharacterInfo {
  roles: string[];
  roles_russian: string[];
  character: Character;
  person: string;
}

export type Characters = CharacterInfo[];

const Characters: FC<{ id: number }> = ({ id }) => {
  const [characters, setCharacters] = useState<Characters>();

  useEffect(() => {
    const fetchCharacters = async () => {
      const { data } = await axios.get(`https://shikimori.one/api/animes/${id}/roles`);
      setCharacters(
        data.filter((item: CharacterInfo) => item.character && item.roles.includes('Main')),
      );
    };
    fetchCharacters();
  }, []);

  return (
    <div className={styles.root}>
      {characters?.map(({ character }) => (
        <div>
          <img src={`https://shikimori.one/${character.image.preview}`} alt="" />
          <p>{character.russian}</p>
        </div>
      ))}
    </div>
  );
};

export default Characters;
