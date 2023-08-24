"use client";
import { getDrawerSwitch, turnOff } from "@/redux/featrues/drawerSwitchSlice";
import styles from "./Drawer.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Provider from "@/redux/Provider";
import Image, { StaticImageData } from "next/image";
import DrawerSwitchImageSource from "@public/drawer-switch-white.png";
import LoginImageSource from "@public/login-white.png";
import Link from "next/link";
const DrawerWrapper = () => {
  const isLoggedIn = false;
  const isDrawerOpened = useAppSelector(getDrawerSwitch);
  const dispatch = useAppDispatch();
  return (
    <div
      className={isDrawerOpened ? styles.wrapper : styles.hidden}
      onClick={(e) => {
        if ((e.target as HTMLDivElement).className === styles.wrapper) {
          dispatch(turnOff());
        }
      }}>
      <div className={styles.drawerContainer}>
        <div className={styles.header}>
          <div
            className={styles.buttonImageCard}
            onClick={() => {
              dispatch(turnOff());
            }}>
            <Image
              className={styles.buttonImage}
              src={DrawerSwitchImageSource}
              alt={""}
              priority={true}
            />
          </div>
        </div>
        <div className={isLoggedIn ? styles.idCard : styles.hidden}>
          UserName님 환영합니다
        </div>
        <Link href={"/login"}>
          <ItemButton
            imageSrc={LoginImageSource}
            text={"로그인"}
          />
        </Link>
      </div>
    </div>
  );
};
const ItemButton = ({
  imageSrc,
  text,
}: {
  imageSrc: StaticImageData;
  text: string;
}) => {
  return (
    <div className={styles.itemButton}>
      <div className={styles.imageBox}>
        <Image
          className={styles.image}
          src={imageSrc}
          alt={""}
          priority={true}
        />
      </div>
      <div className={styles.textBox}>
        <div className={styles.text}>{text}</div>
      </div>
    </div>
  );
};
const Drawer = () => {
  return (
    <Provider>
      <DrawerWrapper />
    </Provider>
  );
};

export default Drawer;
