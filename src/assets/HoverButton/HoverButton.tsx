"use client";
import styles from "./HoverButton.module.scss";
export type HoverButtonProps = {
  text: string;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};
const HoverButton = ({ text, onClick }: HoverButtonProps) => {
  return (
    <div
      className={styles.container}
      onClick={onClick}>
      <div className={styles.text}>{text}</div>
    </div>
  );
};

export default HoverButton;
