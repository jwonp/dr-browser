"use client";
import { useMemo, useRef, useState } from "react";
import HoverButton, { HoverButtonProps } from "../HoverButton/HoverButton";
import styles from "./DataCard.module.scss";
export interface TemplateCardProps {
  item: any;
}
type DataCardProps = {
  hasHoverEvent: boolean;
  onHoverButtons?: HoverButtonProps[];
  children: JSX.Element | JSX.Element[];
};
const DataCard = ({
  hasHoverEvent,
  onHoverButtons,
  children,
}: DataCardProps) => {
  const HoverButtons = onHoverButtons ? (
    onHoverButtons.map((item, index) => (
      <HoverButton
        key={index}
        text={item.text}
        onClick={item.onClick}
      />
    ))
  ) : (
    <></>
  );

  const [isMouseIn, setIsMouseIn] = useState<boolean>(false);

  const handleMoveEnter = () => {
    if (hasHoverEvent) {
      setIsMouseIn(true);
    }
  };
  const handleMoveLeave = () => {
    if (hasHoverEvent) {
      setIsMouseIn(false);
    }
  };
  return (
    <div
      className={styles.container}
      onMouseEnter={handleMoveEnter}
      onMouseLeave={handleMoveLeave}>
      <div className={isMouseIn ? styles.hoverContainer : styles.hidden}>
        <div className={styles.hoverCard}>{HoverButtons}</div>
      </div>

      <div className={styles.detailContainer}>
        <div className={isMouseIn ? styles.blur : undefined}>
          <div className={styles.detailBox}>{children}</div>
        </div>
      </div>
    </div>
  );
};

interface TitleProps {
  children: string;
}
export const Title = ({ children }: TitleProps) => {
  return <div className={styles.title}>{children}</div>;
};
interface ContainerProps {
  children: JSX.Element | JSX.Element[];
}
interface BoxProps extends ContainerProps {}
interface TextProps {
  right?: boolean;
  children: string;
}

export const EmptyBox = ({ children }: TextProps) => {
  return (
    <div className={styles.emptyBox}>
      <div>
        <div>{children}</div>
      </div>
    </div>
  );
};
export const MiddleTextBox = ({ children }: BoxProps) => {
  return <div className={styles.middleTextBox}>{children}</div>;
};

export const MiddleText = ({ right, children }: TextProps) => {
  return (
    <div className={`${styles.middleText} ${right ? styles.right : ""}`}>
      {children}
    </div>
  );
};

export const BottomRightTextBox = ({ children }: BoxProps) => {
  return <div className={styles.bottomRightTextBox}>{children}</div>;
};

export const BottomRightText = ({ children }: Omit<TextProps, "right">) => {
  return <div className={styles.bottomRightText}>{children}</div>;
};

export const ReservationTextContainer = ({ children }: ContainerProps) => {
  const isArray = Array.isArray(children);
  const reservations = isArray ? children : [children];
  const [index, setIndex] = useState<number>(0);
  const [isLeft, setLeft] = useState<boolean>(false);
  const [isRight, setRight] = useState<boolean>(false);
  const displayReservation = useMemo(() => reservations[index], [index]);
  return (
    <div className={styles.reservationTextContainer}>
      {reservations.length === 0 ? (
        <div className={styles.noContent}>
          <div>{"등록된 예약이 없습니다."}</div>
        </div>
      ) : (
        <div>
          <div
            className={`${styles.button} ${styles.left} ${
              isLeft ? styles.visible : styles.invisible
            }`}
            onMouseEnter={() => {
              setLeft(true);
            }}
            onMouseLeave={() => {
              setLeft(false);
            }}
            onClick={() => {
              setIndex(() => (index > 0 ? index - 1 : reservations.length - 1));
            }}>
            <div>{`${index + 1}/${reservations.length}`}</div>
          </div>
          <div>{displayReservation}</div>
          <div
            className={`${styles.button} ${styles.right} ${
              isRight ? styles.visible : styles.invisible
            }`}
            onMouseEnter={() => {
              setRight(true);
            }}
            onMouseLeave={() => {
              setRight(false);
            }}
            onClick={() => {
              setIndex(() => (index < reservations.length - 1 ? index + 1 : 0));
            }}>
            <div>{`${index + 1}/${reservations.length}`}</div>
          </div>
        </div>
      )}
    </div>
  );
};
export const ReservationTextBox = ({ children }: BoxProps) => {
  return <div className={styles.reservationTextBox}>{children}</div>;
};

export const ReservationText = ({ children, right }: TextProps) => {
  return (
    <div className={`${styles.reservationText} ${right ? styles.right : ""}`}>
      {children}
    </div>
  );
};
export default DataCard;
