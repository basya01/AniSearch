import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { setActivePage } from '../../redux/slices/page';
import { AppDispatch, RootState } from '../../redux/store';
import styles from './Header.module.scss';
import Search from './Search';

const Header: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activePage = useSelector((state: RootState) => state.page.activePage);

  const NavItemsData = [
    { id: 0, value: 'Список аниме', link: '/' },
    { id: 1, value: 'Избранное', link: 'favorite' },
  ];

  const pageHandler = (id: number) => {
    dispatch(setActivePage(id));
  };

  const NavItems = NavItemsData.map((item) => (
    <div className={styles.navItem} key={item.id}>
      <Link
        to={item.link}
        onClick={() => pageHandler(item.id)}
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
