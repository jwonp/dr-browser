import Image from "next/image";
import styles from "./BannerImage.module.scss";
import BannerImageSource from "@public/HomeBanner.jpg";
const BannerImage = () => {
  const NoticeText = "카드 수령은 관리자에게 문의하세요";
  return (
    <div className={styles.container}>
      <div className={styles.coverCard}>
        <div className={styles.text}>{NoticeText}</div>
        <div className={styles.imageCover} />
      </div>
      <div className={styles.imageCard}>
        <Image
          src={BannerImageSource}
          alt={"No Image"}
          fill={true}
          priority={true}
        />
      </div>
    </div>
  );
};

export default BannerImage;
