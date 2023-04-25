import React, { FC, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Character } from '../../models/Character';
import { addCharacter, removeCharacter } from '../../redux/slices/favorites';
import { AppDispatch,  } from '../../redux/store';
import FavoriteIcon from '../AnimeItem/FavoriteIcon';

import styles from './CharacterItem.module.scss';

export interface CharacterItemProps {
  character: Character;
  className?: string;
}

const CharacterItem: FC<CharacterItemProps> = ({ character, className }) => {
  const dispatch = useAppDispatch();
  
  const isFavCharacter = useAppSelector(
    (state) =>
      !!state.favorites.characters.filter((item) => item.id === Number(character.id)).length,
  );

  const favoriteHandler = (event: MouseEvent<HTMLDivElement>) => {
    if (isFavCharacter) {
      dispatch(removeCharacter(character));
    } else {
      dispatch(addCharacter(character));
    }
    event.preventDefault();
  };

  return (
    <Link to={`/character/${character.id}`} className={styles.root}>
      <div className={styles.item + `${className ? ' ' + className : ''}`}>
        <img src={`${process.env.REACT_APP_API_URL}${character.image.original}`} alt="" />
        <FavoriteIcon
          active={!!isFavCharacter}
          className={styles.favorite}
          onClick={(event: MouseEvent<HTMLDivElement>) => favoriteHandler(event)}
        />
        <h3 className={styles.title}>{character.russian}</h3>
      </div>
    </Link>
  );
};

export default CharacterItem;
