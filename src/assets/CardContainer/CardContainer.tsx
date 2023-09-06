
import styles from "./CardContainer.module.scss";
interface CardContainerProps {
  id?: string;
  title: string;
  isWrappeed?: boolean;
  tab?: number;
  children: JSX.Element | JSX.Element[];
  buttons: JSX.Element | JSX.Element[];
}
const CardContainer = ({
  id,
  isWrappeed,
  title,
  buttons,
  tab,
  children,
}: CardContainerProps) => {
  return (
    <div
      id={id}
      className={isWrappeed ? styles.wrapper : ""}>
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

interface GridProps {
  grid?: number;
  children: JSX.Element[];
}
export const Grid = ({ grid, children }: GridProps) => {
  const amount = children.length;
  const getGrid = () => {
    const fr = "1fr ";
    return fr.repeat(grid ? grid : amount);
  };
  return (
    <div
      style={{ display: "grid", gridTemplateColumns: getGrid(), gap: "1em" }}>
      {children}
    </div>
  );
};

export default CardContainer;
