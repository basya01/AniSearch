import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { Character, Role } from '../../models/Character';
import CharacterItem from '../CharacterItem';
import styles from './Characters.module.scss';

const Characters: FC<{ id: number }> = ({ id }) => {
  const [characters, setCharacters] = useState<Role[]>();

  useEffect(() => {
    const fetchCharacters = async () => {
      const { data } = await axios.get(`https://shikimori.one/api/animes/${id}/roles`);
      setCharacters(
        data.filter((item: Role) => item.character && item.roles.includes('Main')),
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
