import React, { FC, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addCharacter, removeCharacter } from '../../redux/slices/favorites';
import { AppDispatch, RootState } from '../../redux/store';
import FavoriteIcon from '../AnimeItem/FavoriteIcon';
import { Character } from '../Characters';

import styles from './CharacterItem.module.scss';

export interface CharacterItemProps {
  character: Character;
  className?: string;
}

const CharacterItem: FC<CharacterItemProps> = ({ character, className }) => {
  const dispatch = useDispatch<AppDispatch>();
  
  const isFavCharacter = useSelector(
    (state: RootState) =>
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
        <img src={`https://shikimori.one${character.image.original}`} alt="" />
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
