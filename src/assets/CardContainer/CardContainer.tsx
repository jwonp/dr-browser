import { CSSProperties } from "react";
import styles from "./CardContainer.module.scss";
interface CardContainerProps {
  title: string;
  isWrappeed?: boolean;
  tab?: number;
  children: JSX.Element | JSX.Element[];
  buttons: JSX.Element | JSX.Element[];
}
const CardContainer = ({
  isWrappeed,
  title,
  buttons,
  tab,
  children,
}: CardContainerProps) => {
  return (
    <div className={isWrappeed ? styles.wrapper : ""}>
      <div
        className={styles.container}
        style={{
          paddingLeft: `${tab * 5.3125}%`,
          paddingRight: `${tab * 5.3125}%`,
        }}>
        <div className={styles.title}>{title}</div>
        <div className={styles.main}>
          <div className={styles.mainContainer}>{children}</div>
        </div>
        <div className={styles.buttonContainer}>{buttons}</div>
      </div>
    </div>
  );
};

export const Grid = ({ children }: { children: JSX.Element[] }) => {
  const amount = children.length;
  const getGrid = () => {
    const fr = "1fr ";
    return fr.repeat(amount);
  };
  return (
    <div
      style={{ display: "grid", gridTemplateColumns: getGrid(), gap: "1em" }}>
      {children}
    </div>
  );
};

export default CardContainer;
