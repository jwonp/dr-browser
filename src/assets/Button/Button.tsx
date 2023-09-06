"use client";
import styles from "./Button.module.scss";
interface ButtonProps {
  children: string;
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
const Button = ({ disabled, onClick, children }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={styles.container}
      onClick={onClick}>
      <div className={disabled ? styles.disabled : undefined}>{children}</div>
    </button>
  );
};

export default Button;
