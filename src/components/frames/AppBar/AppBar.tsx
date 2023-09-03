"use client";
import styles from "@/components/frames/AppBar/AppBar.module.scss";
import { UserNameFetcher, UserNameURL } from "@/swr/userNameSWR";
import Link from "next/link";
import useSWR from "swr";

const AppBar = () => {
  return (
    <div className={styles.wrapper}>
      <div>
        <Link href={"/"}>
          <div>username</div>
        </Link>
      </div>
      <div>
        <Link href={"/reservation"}>
          <div>Reservation</div>
        </Link>
      </div>
      <div>
        <Link href={"/admin"}>
          <div>Admin</div>
        </Link>
        <Link href={"/login"}>
          <div>Login</div>
        </Link>
        <Link href={"/signup"}>
          <div>Sign Up</div>
        </Link>
      </div>
    </div>
  );
};
export default AppBar;
