import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setTheme } from '../../redux/slices/theme';
import styles from './ThemeToggler.module.scss';
import sunny from '../../assets/sunny.svg';
import moon from '../../assets/moon.svg';
import { FC } from 'react';

const ThemeToggler: FC<{ className?: string }> = ({ className }) => {
  const theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleChange = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    dispatch(setTheme(next));
  };

  return (
    <button className={styles.root + ' ' + className} onClick={handleChange}>
      <svg
        className={styles.circle + ' ' + (theme === 'dark' ? styles.dark : styles.light)}
        viewBox="0 0 50 50"
        width="25"
        height="25">
        <circle cx="25" cy="25" r="25" />
      </svg>
      <svg
        className={styles.icon}
        width="19"
        height="19"
        viewBox="0 0 19 19"
        xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_188_825)">
          <path d="M7.125 0.330113C7.24092 0.470966 7.31193 0.643342 7.32886 0.824971C7.3458 1.0066 7.30788 1.18913 7.22 1.34899C6.53346 2.60949 6.17492 4.0224 6.17738 5.45774C6.17738 10.2327 10.07 14.0992 14.8675 14.0992C15.4933 14.0992 16.1025 14.0339 16.6879 13.9092C16.8674 13.8703 17.0543 13.8852 17.2254 13.9519C17.3965 14.0187 17.5441 14.1343 17.6498 14.2844C17.7614 14.4405 17.8183 14.6291 17.8117 14.8209C17.805 15.0127 17.7352 15.1969 17.613 15.3449C16.6816 16.4889 15.5067 17.4108 14.1738 18.0431C12.8409 18.6754 11.3838 19.0023 9.9085 19C4.43412 19 0 14.5896 0 9.15561C0 5.06586 2.51038 1.55799 6.08475 0.0712383C6.2628 -0.00401142 6.46046 -0.0194561 6.64804 0.0272244C6.83562 0.0739048 7.00299 0.18019 7.125 0.330113V0.330113Z" />
          <path d="M12.8178 3.73824C12.8349 3.68682 12.8677 3.64207 12.9116 3.61035C12.9555 3.57863 13.0083 3.56156 13.0625 3.56156C13.1166 3.56156 13.1694 3.57863 13.2133 3.61035C13.2573 3.64207 13.2901 3.68682 13.3071 3.73824L13.7666 5.11812C13.9721 5.73324 14.4542 6.21537 15.0693 6.4208L16.4492 6.88037C16.5006 6.8974 16.5454 6.9302 16.5771 6.97411C16.6088 7.01803 16.6259 7.07082 16.6259 7.12499C16.6259 7.17916 16.6088 7.23196 16.5771 7.27587C16.5454 7.31979 16.5006 7.35259 16.4492 7.36962L15.0693 7.82918C14.766 7.93026 14.4903 8.1006 14.2642 8.32671C14.0381 8.55282 13.8677 8.82849 13.7666 9.13187L13.3071 10.5117C13.2901 10.5632 13.2573 10.6079 13.2133 10.6396C13.1694 10.6714 13.1166 10.6884 13.0625 10.6884C13.0083 10.6884 12.9555 10.6714 12.9116 10.6396C12.8677 10.6079 12.8349 10.5632 12.8178 10.5117L12.3583 9.13187C12.2572 8.82849 12.0869 8.55282 11.8607 8.32671C11.6346 8.1006 11.359 7.93026 11.0556 7.82918L9.67571 7.36962C9.62428 7.35259 9.57953 7.31979 9.54781 7.27587C9.5161 7.23196 9.49902 7.17916 9.49902 7.12499C9.49902 7.07082 9.5161 7.01803 9.54781 6.97411C9.57953 6.9302 9.62428 6.8974 9.67571 6.88037L11.0556 6.4208C11.359 6.31973 11.6346 6.14938 11.8607 5.92327C12.0869 5.69716 12.2572 5.42149 12.3583 5.11812L12.8178 3.73824V3.73824ZM16.4623 0.117554C16.474 0.0837419 16.496 0.0544221 16.5251 0.0336713C16.5543 0.0129205 16.5892 0.00177002 16.625 0.00177002C16.6607 0.00177002 16.6956 0.0129205 16.7248 0.0336713C16.754 0.0544221 16.7759 0.0837419 16.7876 0.117554L17.094 1.03668C17.2306 1.44755 17.5524 1.76937 17.9633 1.90593L18.8824 2.2123C18.9162 2.22403 18.9455 2.24599 18.9663 2.27515C18.987 2.30431 18.9982 2.3392 18.9982 2.37499C18.9982 2.41078 18.987 2.44568 18.9663 2.47483C18.9455 2.50399 18.9162 2.52596 18.8824 2.53768L17.9633 2.84405C17.7608 2.91141 17.5768 3.02505 17.4259 3.17594C17.275 3.32683 17.1614 3.51082 17.094 3.7133L16.7876 4.63243C16.7759 4.66624 16.754 4.69556 16.7248 4.71631C16.6956 4.73706 16.6607 4.74821 16.625 4.74821C16.5892 4.74821 16.5543 4.73706 16.5251 4.71631C16.496 4.69556 16.474 4.66624 16.4623 4.63243L16.1559 3.7133C16.0885 3.51082 15.9749 3.32683 15.824 3.17594C15.6731 3.02505 15.4891 2.91141 15.2866 2.84405L14.3675 2.53768C14.3337 2.52596 14.3044 2.50399 14.2836 2.47483C14.2629 2.44568 14.2517 2.41078 14.2517 2.37499C14.2517 2.3392 14.2629 2.30431 14.2836 2.27515C14.3044 2.24599 14.3337 2.22403 14.3675 2.2123L15.2866 1.90593C15.6975 1.76937 16.0193 1.44755 16.1559 1.03668L16.4623 0.118742V0.117554Z" />
        </g>
        <defs>
          <clipPath id="clip0_188_825">
            <rect width="19" height="19" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <svg
        className={styles.icon}
        width="19"
        height="19"
        viewBox="0 0 19 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M9.5 13.5714C8.42019 13.5714 7.38461 13.1425 6.62107 12.3789C5.85752 11.6154 5.42857 10.5798 5.42857 9.5C5.42857 8.42019 5.85752 7.38461 6.62107 6.62107C7.38461 5.85752 8.42019 5.42857 9.5 5.42857C10.5798 5.42857 11.6154 5.85752 12.3789 6.62107C13.1425 7.38461 13.5714 8.42019 13.5714 9.5C13.5714 10.5798 13.1425 11.6154 12.3789 12.3789C11.6154 13.1425 10.5798 13.5714 9.5 13.5714ZM9.5 14.9286C10.9397 14.9286 12.3205 14.3566 13.3386 13.3386C14.3566 12.3205 14.9286 10.9397 14.9286 9.5C14.9286 8.06025 14.3566 6.67947 13.3386 5.66142C12.3205 4.64337 10.9397 4.07143 9.5 4.07143C8.06025 4.07143 6.67948 4.64337 5.66142 5.66142C4.64337 6.67947 4.07143 8.06025 4.07143 9.5C4.07143 10.9397 4.64337 12.3205 5.66142 13.3386C6.67948 14.3566 8.06025 14.9286 9.5 14.9286ZM9.5 0C9.32003 0 9.14743 0.0714921 9.02018 0.198749C8.89292 0.326006 8.82143 0.498603 8.82143 0.678571V2.03571C8.82143 2.21568 8.89292 2.38828 9.02018 2.51554C9.14743 2.64279 9.32003 2.71429 9.5 2.71429C9.67997 2.71429 9.85257 2.64279 9.97982 2.51554C10.1071 2.38828 10.1786 2.21568 10.1786 2.03571V0.678571C10.1786 0.498603 10.1071 0.326006 9.97982 0.198749C9.85257 0.0714921 9.67997 0 9.5 0ZM9.5 16.2857C9.32003 16.2857 9.14743 16.3572 9.02018 16.4845C8.89292 16.6117 8.82143 16.7843 8.82143 16.9643V18.3214C8.82143 18.5014 8.89292 18.674 9.02018 18.8013C9.14743 18.9285 9.32003 19 9.5 19C9.67997 19 9.85257 18.9285 9.97982 18.8013C10.1071 18.674 10.1786 18.5014 10.1786 18.3214V16.9643C10.1786 16.7843 10.1071 16.6117 9.97982 16.4845C9.85257 16.3572 9.67997 16.2857 9.5 16.2857ZM16.2179 2.78214C16.0906 2.65493 15.918 2.58347 15.7381 2.58347C15.5582 2.58347 15.3856 2.65493 15.2584 2.78214L14.2989 3.74164C14.234 3.80424 14.1824 3.87912 14.1468 3.9619C14.1112 4.04469 14.0925 4.13373 14.0917 4.22383C14.0909 4.31394 14.1081 4.40329 14.1422 4.48668C14.1763 4.57008 14.2267 4.64584 14.2904 4.70955C14.3542 4.77327 14.4299 4.82365 14.5133 4.85777C14.5967 4.89189 14.6861 4.90906 14.7762 4.90828C14.8663 4.90749 14.9553 4.88877 15.0381 4.85321C15.1209 4.81765 15.1958 4.76595 15.2584 4.70114L16.2179 3.74164C16.3451 3.61439 16.4165 3.44183 16.4165 3.26189C16.4165 3.08196 16.3451 2.90939 16.2179 2.78214ZM4.70114 14.2989C4.57389 14.1716 4.40133 14.1002 4.22139 14.1002C4.04146 14.1002 3.86889 14.1716 3.74164 14.2989L2.78214 15.2584C2.65854 15.3863 2.59014 15.5577 2.59169 15.7357C2.59323 15.9136 2.6646 16.0838 2.79041 16.2096C2.91622 16.3354 3.08642 16.4068 3.26433 16.4083C3.44225 16.4099 3.61366 16.3415 3.74164 16.2179L4.70114 15.2584C4.82836 15.1311 4.89982 14.9585 4.89982 14.7786C4.89982 14.5987 4.82836 14.4261 4.70114 14.2989ZM19 9.5C19 9.32003 18.9285 9.14743 18.8013 9.02018C18.674 8.89292 18.5014 8.82143 18.3214 8.82143H16.9643C16.7843 8.82143 16.6117 8.89292 16.4845 9.02018C16.3572 9.14743 16.2857 9.32003 16.2857 9.5C16.2857 9.67997 16.3572 9.85257 16.4845 9.97982C16.6117 10.1071 16.7843 10.1786 16.9643 10.1786H18.3214C18.5014 10.1786 18.674 10.1071 18.8013 9.97982C18.9285 9.85257 19 9.67997 19 9.5ZM2.71429 9.5C2.71429 9.32003 2.64279 9.14743 2.51554 9.02018C2.38828 8.89292 2.21568 8.82143 2.03572 8.82143H0.678572C0.498603 8.82143 0.326006 8.89292 0.19875 9.02018C0.0714927 9.14743 0 9.32003 0 9.5C0 9.67997 0.0714927 9.85257 0.19875 9.97982C0.326006 10.1071 0.498603 10.1786 0.678572 10.1786H2.03572C2.21568 10.1786 2.38828 10.1071 2.51554 9.97982C2.64279 9.85257 2.71429 9.67997 2.71429 9.5ZM16.2179 16.2179C16.3451 16.0906 16.4165 15.918 16.4165 15.7381C16.4165 15.5582 16.3451 15.3856 16.2179 15.2584L15.2584 14.2989C15.1304 14.1752 14.959 14.1069 14.781 14.1084C14.6031 14.1099 14.4329 14.1813 14.3071 14.3071C14.1813 14.4329 14.1099 14.6031 14.1084 14.781C14.1069 14.959 14.1752 15.1304 14.2989 15.2584L15.2584 16.2179C15.3856 16.3451 15.5582 16.4165 15.7381 16.4165C15.918 16.4165 16.0906 16.3451 16.2179 16.2179ZM4.70114 4.70114C4.82836 4.57389 4.89982 4.40133 4.89982 4.22139C4.89982 4.04146 4.82836 3.86889 4.70114 3.74164L3.74164 2.78214C3.61366 2.65854 3.44225 2.59014 3.26433 2.59169C3.08642 2.59323 2.91622 2.6646 2.79041 2.79041C2.6646 2.91622 2.59323 3.08642 2.59169 3.26433C2.59014 3.44225 2.65854 3.61366 2.78214 3.74164L3.74164 4.70114C3.86889 4.82836 4.04146 4.89982 4.22139 4.89982C4.40133 4.89982 4.57389 4.82836 4.70114 4.70114Z" />
      </svg>
    </button>
  );
};

export default ThemeToggler;