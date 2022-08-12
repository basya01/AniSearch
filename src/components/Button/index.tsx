import React, { FC, MouseEvent } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  onClick: () => void;
  active?: boolean;
  children: string;
}

const Button: FC<ButtonProps> = ({ active = false, children, ...props }) => {
  return (
    <button {...props} className={styles.root + `${active ? ' ' + styles.active : ''}`}>
      {children}
    </button>
  );
};

export default Button;
