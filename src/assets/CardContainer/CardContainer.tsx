import styles from "./CardContainer.module.scss";
interface CardContainerProps {
  id?: string;
  title: string;
  isWrappeed?: boolean;
  isButtonsParallel?: boolean;
  tab?: number;
  children: JSX.Element | JSX.Element[];
  buttons: JSX.Element | JSX.Element[];
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
const CardContainer = ({
  id,
  isWrappeed,
  title,
  buttons,
  isButtonsParallel,
  tab,
  children,
  onClick,
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
        }}
        onClick={onClick}>
        <div className={styles.title}>{title}</div>
        <div className={styles.main}>
          <div className={styles.mainContainer}>{children}</div>
        </div>
        <div className={isButtonsParallel ? styles.buttonContainer : undefined}>
          {buttons}
        </div>
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
      className={styles.grid}
      style={{ display: "grid", gridTemplateColumns: getGrid(), gap: "1em" }}>
      {children}
    </div>
  );
};

export default CardContainer;
