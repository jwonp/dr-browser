import Image from "next/image";
import styles from "./Header.module.scss";
import DrawerSwitchImageSource from "@public/drawer-switch-white.png";
import ReserveButtonImageSource from "@public/reserve-white.png";
const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.buttonCard}>
        <Image
          className={styles.buttonImage}
          src={DrawerSwitchImageSource}
          alt={""}
          priority={true}
        />
      </div>
      <div className={styles.logo}>DoorLock</div>
      <div className={styles.buttonCard}>
        <Image
          src={ReserveButtonImageSource}
          className={styles.buttonImage}
          alt={""}
          priority={true}
        />
      </div>
    </div>
  );
};

export default Header;
