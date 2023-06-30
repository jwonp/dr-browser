// import Image from "next/image";
import Image from "next/image";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.image_container}`}>
        <div>Reserve My Room Now</div>
        <Image
          src={"/HomeBanner.jpg"}
          alt={"HomeBanner"}
          fill
          sizes="100vw"
          style={{ objectFit: "cover", opacity: 0.5 }}
          priority={true}
        />
      </div>
      <div></div>
    </div>
  ); // 3807 4759
}
