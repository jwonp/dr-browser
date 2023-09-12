"use client";
import BannerImage from "@/assets/BannerImage/BannerImage";
import styles from "./page.module.scss";
import CardDetailCard, {
  CardDetailCardItem,
} from "@/assets/DataCard/templates/CardDetailCard/CardDetailCard";
import { Grid } from "@/assets/CardContainer/CardContainer";
import useSWR from "swr";
import { useEffect, useMemo, useState } from "react";
import DataCard, { EmptyBox } from "@/assets/DataCard/DataCard";
import { requsetWithJWT } from "@/util/request";
import { getUserIdByJWT } from "@/util/JwtParser";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [jwt, setJwt] = useState<string>(undefined);

  useEffect(() => {
    const jwt = window.localStorage.getItem("jwt");
    if (jwt) {
      setJwt(jwt);
    }
  }, []);
  useEffect(() => {
    const username = getUserIdByJWT(jwt);
    if (username === process.env.NEXT_PUBLIC_ADMIN) {
      router.push("/admin");
    }
  }, [jwt]);

  const CardOnIndexSWR = useSWR(
    jwt ? `/api/card/index?id=${getUserIdByJWT(jwt)}` : null,
    (url: string) =>
      requsetWithJWT(jwt)
        .get(url)
        .then((res) => res.data),
    { refreshInterval: 0, shouldRetryOnError: false }
  );

  const IndexCards = useMemo(() => {
    const isExistCardSWR =
      !CardOnIndexSWR ||
      !CardOnIndexSWR.data ||
      CardOnIndexSWR.data.length === 0;
    if (isExistCardSWR) {
      return (
        <DataCard hasHoverEvent={false}>
          <EmptyBox>예약되어 있는 카드가 없습니다</EmptyBox>
        </DataCard>
      );
    }
    return CardOnIndexSWR.data.map(
      (item: CardDetailCardItem, index: number) => (
        <CardDetailCard
          key={index}
          item={item}
          onHoverButtons={[
            {
              text: item.lostTime ? "분실 신고 취소" : "분실 신고",
              onClick: () => {
                const res = item.lostTime
                  ? requsetWithJWT(jwt).delete(
                      `/api/card/lost?id=${item.cardId}`
                    )
                  : requsetWithJWT(jwt).post("/api/card/lost", {
                      cardId: item.cardId,
                    });
                res.then(() => {
                  CardOnIndexSWR.mutate();
                });
              },
            },
            {
              text: "예약 정보",
              onClick: () => {
                router.push(
                  `/reservation?id=${item.reservation.reservationId}`
                );
              },
            },
          ]}
        />
      )
    );
  }, [CardOnIndexSWR, CardOnIndexSWR.data]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <BannerImage />
        <div className={styles.CardContainer}>
          <Grid grid={3}>{IndexCards}</Grid>
        </div>
      </div>
    </div>
  );
}
