import { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import styles from './Header.module.scss';
import Search from './Search';

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const activePage = useAppSelector((state) => state.page.activePage);

  const NavItemsData = [
    { id: 0, value: 'Список аниме', link: '/' },
    { id: 1, value: 'Избранное', link: 'favorites/animes' },
  ];

  const NavItems = NavItemsData.map((item) => (
    <div className={styles.navItem} key={item.id}>
      <Link
        to={item.link}
        className={activePage === item.id ? styles.active : ''}>
        {item.value}
      </Link>
    </div>
  ));

  return (
    <>
      <header className={styles.header}>
        <div className="container container__header">
          <h1 className={styles.logo}>
            <span>Ani</span>Search
          </h1>
          <nav className={styles.nav}>{NavItems}</nav>
          <Search />
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
