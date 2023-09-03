"use client";
import RoomDetailCard, {
  RoomDetailCardItem,
} from "@/assets/DataCard/templates/RoomDetailCard/RoomDetailCard";
import styles from "./page.module.scss";
import {
  ROOM,
  getReservationEditState,
  getEditModalVisible,
  setInvisible,
} from "@/redux/featrues/reservationEditSlice";
import CardContainer, { Grid } from "@/assets/CardContainer/CardContainer";
import DataCard, { EmptyBox } from "@/assets/DataCard/DataCard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { requsetWithJWT } from "@/util/request";
import { useState, useEffect, useMemo } from "react";

import useSWR from "swr";
import Provider from "@/redux/Provider";
import { ReservationPatchProps } from "@/app/api/reservation/admin/route";
const RoomSelectWrapper = () => {
  const reservationEditState = useAppSelector(getReservationEditState);
  const isVisible = useAppSelector(getEditModalVisible);
  const dispatch = useAppDispatch();
  const [jwt, setJwt] = useState<string>(undefined);
  useEffect(() => {
    const storedJwt = window.localStorage.getItem("jwt");
    setJwt(storedJwt);
  }, []);
  const dataSWR = useSWR(`/api/room/admin`, (url: string) =>
    requsetWithJWT(jwt)
      .get(url)
      .then((res) => res.data)
  );

  const Cards = useMemo(() => {
    if (!dataSWR || !dataSWR.data || dataSWR?.data?.length === 0) {
      return [
        <DataCard
          key={0}
          hasHoverEvent={false}>
          <EmptyBox>{"등록된 방이 없습니다"}</EmptyBox>
        </DataCard>,
      ];
    }

    return dataSWR.data.map((item: RoomDetailCardItem, index: number) => {
      return (
        <RoomDetailCard
          key={index}
          item={item}
          onHoverButtons={[
            {
              text: "선택",
              onClick: () => {
                const data: ReservationPatchProps = {
                  roomId: item.roomId,
                  userId: null,
                  cardId: null,
                };
                requsetWithJWT(jwt)
                  .patch(
                    `/api/reservation/admin?id=${reservationEditState.selectedReservationId}`,
                    data
                  )
                  .then(() => {
                    dispatch(setInvisible());
                  });
              },
            },
          ]}
        />
      );
    });
  }, [dataSWR, dataSWR.data]);

  return (
    <div
      className={
        reservationEditState.type === ROOM && isVisible === true
          ? styles.container
          : styles.hidden
      }>
      <CardContainer
        title={"변경할 방을 선택하세요"}
        buttons={[]}>
        <Grid grid={3}>{Cards}</Grid>
      </CardContainer>
    </div>
  );
};
const RoomSelect = () => {
  return (
    <Provider>
      <RoomSelectWrapper />
    </Provider>
  );
};
export default RoomSelect;
