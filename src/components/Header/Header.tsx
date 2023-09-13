"use client";
import Image from "next/image";
import styles from "./Header.module.scss";
import DrawerSwitchImageSource from "@public/drawer-switch-white.png";
import ReservationImageSource from "@public/reserve-white.png";
import LoginImageSource from "@public/login-white.svg";
import LogoutImageSource from "@public/logout-white.svg";
import useSWR from "swr";
import Provider from "@/redux/Provider";
import { useAppDispatch } from "@/redux/hooks";
import { turnOn } from "@/redux/featrues/drawerSwitchSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { requsetWithJWT } from "@/util/request";
import { getUserIdByJWT, getUsernameByJWT } from "@/util/JwtParser";
import { usePathname, useRouter } from "next/navigation";
const HeaderWrapper = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [jwt, setJwt] = useState<string>(undefined);
  const [username, setUsername] = useState<string>("");
  const tokenSWR = useSWR(jwt ? "/api/auth/token/valid" : null, (url: string) =>
    requsetWithJWT(jwt)
      .get(url)
      .then((res) => res.data)
  );
  useEffect(() => {
    const jwt = window.localStorage.getItem("jwt");
    if (jwt) {
      setJwt(jwt);
    }
  }, [pathname]);
  useEffect(() => {
    setUsername(getUsernameByJWT(jwt));
  }, [jwt]);
  useEffect(() => {
    if (!tokenSWR || !tokenSWR.data) {
      return;
    }
    if (tokenSWR.data.result === "NOT VALID") {
      window.localStorage.removeItem("jwt");
    }
  }, [tokenSWR]);
  const logout = () => {
    window.localStorage.removeItem("jwt");
    setJwt(undefined);
    router.push("/");
  };
  return (
    <div className={styles.container}>
      {getUserIdByJWT(jwt) === process.env.NEXT_PUBLIC_ADMIN ? (
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
      ) : (
        <div className={styles.buttonCard}>
          <div className={styles.name}>{username}</div>
        </div>
      )}
      <div className={styles.logo}>
        <Link href={"/"}>DoorLock</Link>
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.buttonCard}>
          <Link href={"/admin/reservation"}>
            <Image
              className={styles.buttonImage}
              src={ReservationImageSource}
              alt={""}
              priority={true}
            />
          </Link>
        </div>
        <div className={styles.buttonCard}>
          {jwt ? (
            <div onClick={logout}>
              <Image
                className={styles.buttonImage}
                src={LogoutImageSource}
                alt={""}
                priority={true}
              />
            </div>
          ) : (
            <Link href={"/login"}>
              <Image
                className={styles.buttonImage}
                src={LoginImageSource}
                alt={""}
                priority={true}
              />
            </Link>
          )}
        </div>
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
