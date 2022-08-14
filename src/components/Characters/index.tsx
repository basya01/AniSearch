import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { Image } from '../../pages/Character';
import CharacterItem from '../CharacterItem';
import styles from './Characters.module.scss';

export interface Character {
  id: number;
  name: string;
  russian: string;
  image: Image;
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
  }, [id]);

  return (
    <div className={styles.root}>
      {characters?.map(({ character }) => (
        <CharacterItem key={character.id} character={character} className={styles.character}/>
      ))}
    </div>
  );
};

export default Characters;
