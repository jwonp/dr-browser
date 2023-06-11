import styles from "@/components/frames/AppBar/AppBar.module.scss";
import Link from "next/link";
const AppBar = () => {
  return (
    <div className={styles.wrapper}>
      <div>App Bar</div>
      <Link href={"/reservation"}>
        <div>Reservation</div>
      </Link>
      <Link href={"login"}>
        <div>Login</div>
      </Link>
      <Link href={"signup"}>
        <div>Sign Up</div>
      </Link>
    </div>
  );
};

export default AppBar;
