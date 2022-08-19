import { FC, useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import Search from './Search';

const Header: FC = () => {
  const [activePage, setActivePage] = useState<number | null>();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/') {
      setActivePage(0);
    } else if (pathname.includes('/favorites/')) {
      setActivePage(1);
    } else {
      setActivePage(null);
    }
  }, [pathname]);

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
