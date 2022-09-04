import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AnimeInfo from '../../components/AnimeInfo';
import Button from '../../components/Button';
import styles from './Anime.module.scss';
import Stars from '../../components/Stars';
import DiagramItem from '../../components/Diagram';
import Characters from '../../components/Characters';
import Screens from '../../components/Screens';
import Videos from '../../components/Videos';
import Similar from '../../components/Similar';
import { addAnime, removeAnime } from '../../redux/slices/favorites';
import { AnimeFull } from '../../models/AnimeFull';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useFetch } from '../../hooks/useFetch';
import NotFound from '../NotFound';
import { Role } from '../../models/Character';
import { Screen } from '../../models/Filters';
import { Anime as AnimeI } from '../../models/Anime';

const Anime = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const isFavAnime = useAppSelector(
    (state) => !!state.favorites.animes.filter((item) => item.id === Number(id)).length,
  );

  const [anime, status] = useFetch<AnimeFull>(`https://shikimori.one/api/animes/${id}`, [id]);

  const [characters] = useFetch<Role[]>(
    `https://shikimori.one/api/animes/${id}/roles`,
    [id],
  );
  const mainCharacters = characters?.filter(
    (item: Role) => item.character && item.roles.includes('Main'),
  );

  const [screens] = useFetch<Screen[]>(
    `https://shikimori.one/api/animes/${id}/screenshots`,
    [id],
  );

  const [similar] = useFetch<AnimeI[]>(`https://shikimori.one/api/animes/${id}/similar`, []);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const buttonHandler = () => {
    if (!anime) {
      return;
    }

    const animePart = {
      aired_on: anime.aired_on,
      episodes: anime.episodes,
      episodes_aired: anime.episodes_aired,
      id: anime.id,
      image: anime.image,
      kind: anime.kind,
      name: anime.name,
      released_on: anime.released_on,
      russian: anime.russian,
      score: anime.score,
      status: anime.status,
      url: anime.url,
    };

    if (isFavAnime) {
      dispatch(removeAnime(animePart));
    } else {
      dispatch(addAnime(animePart));
    }
  };

  if (status === 'error') {
    return <NotFound />;
  }

  return (
    <section>
      <div className="container container__page">
        <div className="container__content">
          {status === 'success' && anime && (
            <div className={styles.anime}>
              <div className={styles.head}>
                <div className={styles.animeImg}>
                  <img src={`https://shikimori.one${anime.image.original}`} alt="anime_image" />
                  <Button active={isFavAnime} onClick={buttonHandler}>
                    {isFavAnime ? 'Убрать из избранного' : 'Добавить в избранное'}
                  </Button>
                </div>
                <div className={styles.info}>
                  <h2 className={styles.name}>
                    {anime.russian} ({anime.name})
                  </h2>
                  <div className={styles.mainInfo}>
                    <AnimeInfo anime={anime} />
                    <div className={styles.infoBlock}>
                      <div className={styles.rating}>
                        <p>Рейтинг:</p>
                        <Stars score={+anime.score} totalStars={5} maxScore={10} />
                      </div>
                      <div className={styles.studio}>
                        <p>Студии:</p>
                        {anime.studios.map((item) => (
                          <img src={`https://shikimori.one/${item.image}`} alt="" key={item.id} />
                        ))}
                      </div>
                    </div>
                    <div className={styles.stats}>
                      <p>Статистика оценок:</p>
                      <div className={styles.diagram}>
                        <DiagramItem stats={anime.rates_scores_stats} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {anime.description && (
                <div className={styles.description}>
                  <h2 className={styles.path}>Описание</h2>
                  <p>{anime.description}</p>
                </div>
              )}
              {!!mainCharacters?.length && (
                <div className={styles.characters}>
                  <h2 className={styles.path}>Главные персонажи</h2>
                  <Characters characters={mainCharacters} />
                </div>
              )}
              {!!screens?.length && <div className={styles.screenshots}>
                <h2 className={styles.path}>Скриншоты</h2>
                <Screens screens={screens} />
              </div>}
              {!!anime.videos.length && <div className={styles.videos}>
                <h2 className={styles.path}>Видеозаписи</h2>
                <Videos videos={anime.videos} />
              </div>}
              {!!similar?.length && <div className={styles.similar}>
                <h2 className={styles.path}>Похожие аниме</h2>
                <Similar similar={similar} />
              </div>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Anime;
