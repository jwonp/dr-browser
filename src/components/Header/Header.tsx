"use client";
import Image from "next/image";
import styles from "./Header.module.scss";
import DrawerSwitchImageSource from "@public/drawer-switch-white.png";
import ReserveButtonImageSource from "@public/reserve-white.png";

import Provider from "@/redux/Provider";
import { useAppDispatch } from "@/redux/hooks";
import { turnOn } from "@/redux/featrues/drawerSwitchSlice";
import Link from "next/link";
const HeaderWrapper = () => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.container}>
      <div
        className={styles.buttonCard}
        onClick={() => {
          dispatch(turnOn());
        }}>
        <Image
          className={styles.buttonImage}
          src={DrawerSwitchImageSource}
          alt={""}
          priority={true}
        />
      </div>
      <div className={styles.logo}>
        <Link href={"/"}>DoorLock</Link>
      </div>
      <div className={styles.buttonCard}>
        <Link href={"/reservation"}>
          <Image
            src={ReserveButtonImageSource}
            className={styles.buttonImage}
            alt={""}
            priority={true}
          />
        </Link>
      </div>
    </div>
  );
};
const Header = () => {
  return (
    <Provider>
      <HeaderWrapper />
    </Provider>
  );
};
export default Header;
