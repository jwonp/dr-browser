"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.scss";
import CardContainer, { Grid } from "@/assets/CardContainer/CardContainer";

import RoomSelectCard, {
  RoomSelectCardItem,
} from "@/assets/DataCard/templates/RoomSelectCard/RoomSelectCard";
import useSWR from "swr";
import { requsetWithJWT } from "@/util/request";
import { useEffect, useMemo, useState } from "react";
const SelectRoom = () => {
  const router = useRouter();
  const [jwt, setJwt] = useState<string>(undefined);
  useEffect(() => {
    const storedJwt = window.localStorage.getItem("jwt");
    setJwt(storedJwt);
  }, []);
  const roomListSWR = useSWR("/api/room/select", (url: string) =>
    requsetWithJWT(jwt)
      .get(url)
      .then((res) => res.data)
  );
  const RoomSelectCards = useMemo(() => {
    if (!roomListSWR || !roomListSWR.data) {
      return <></>;
    }

    return roomListSWR.data.map((item: RoomSelectCardItem, index: number) => (
      <RoomSelectCard
        key={index}
        item={item}
      />
    ));
  }, [roomListSWR, roomListSWR.data]);

  return (
    <div
      className={styles.container}
      onClick={(e) => {
        if ((e.target as HTMLDivElement).className === styles.container) {
          router.back();
        }
      }}>
      <div className={styles.modalContainer}>
        <CardContainer
          title={"Select"}
          tab={1}
          buttons={[]}>
          <Grid grid={2}>{RoomSelectCards}</Grid>
        </CardContainer>
      </div>
    </div>
  );
};

export default SelectRoom;
