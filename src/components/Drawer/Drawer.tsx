"use client";
import { getDrawerSwitch, turnOff } from "@/redux/featrues/drawerSwitchSlice";
import styles from "./Drawer.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Provider from "@/redux/Provider";
import Image, { StaticImageData } from "next/image";
import DrawerSwitchImageSource from "@public/drawer-switch-white.png";
import LoginImageSource from "@public/login-white.png";
import LogoutImageSource from "@public/logout-white.png";

import CardDetailImageSource from "@public/card-white.png";
import UserDetailImageSource from "@public/user-white.png";
import RoomDetailImageSource from "@public/room-white.png";
import ReservationImageSource from "@public/reservation-white.png";
import TagLogImageSource from "@public/log-white.png";

import { ID } from "@/app/admin/page";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getUsernameByJWT } from "@/util/JwtParser";

const DrawerWrapper = () => {
  const pathname = usePathname();
  const isDrawerOpened = useAppSelector(getDrawerSwitch);
  const dispatch = useAppDispatch();

  const admin: ItemButtonProps[] = [
    {
      href: `/admin#${ID.cardDetail}`,
      imageSrc: CardDetailImageSource,
      text: "카드",
    },
    {
      href: `/admin#${ID.userDetail}`,
      imageSrc: UserDetailImageSource,
      text: "유저",
    },
    {
      href: `/admin#${ID.roomDetail}`,
      imageSrc: RoomDetailImageSource,
      text: "방",
    },
    {
      href: `/admin#${ID.reservation}`,
      imageSrc: ReservationImageSource,
      text: "예약",
    },
    { href: `/admin#${ID.tagLog}`, imageSrc: TagLogImageSource, text: "로그" },
    {
      href: "/",
      imageSrc: LogoutImageSource,
      text: "로그아웃",
      onClick: (e) => {
        window.localStorage.removeItem("jwt");

        dispatch(turnOff());
      },
    },
  ];

  const DrawerButtons = admin.map((item, index) => (
    <ItemButton
      key={index}
      href={item.href}
      imageSrc={item.imageSrc}
      text={item.text}
      onClick={item.onClick}
    />
  ));

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


        {DrawerButtons}
      </div>
    </div>
  );
};
interface ItemButtonProps {
  href?: string;
  imageSrc: StaticImageData;
  text: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
const ItemButton = ({ href, imageSrc, text, onClick }: ItemButtonProps) => {
  const router = useRouter();
  return (
    <div
      className={styles.itemButton}
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
        if (href) {
          router.push(href);
        }
      }}>
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
