"use client";
import styles from "./Button.module.scss";
interface ButtonProps {
  children: string;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <div
      className={styles.container}
      onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;
