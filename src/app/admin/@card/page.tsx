"use client";
import Provider from "@/redux/Provider";
import {
  CARD,
  getReservationEditState,
  getEditModalVisible,
  setInvisible,
} from "@/redux/featrues/reservationEditSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import styles from "./page.module.scss";
import CardContainer, { Grid } from "@/assets/CardContainer/CardContainer";
import DataCard, { EmptyBox } from "@/assets/DataCard/DataCard";
import { requsetWithJWT } from "@/util/request";
import { useState, useEffect, useMemo } from "react";
import useSWR from "swr";
import CardDetailCard, {
  CardDetailCardItem,
} from "@/assets/DataCard/templates/CardDetailCard/CardDetailCard";
import { ReservationPatchProps } from "@/app/api/reservation/admin/route";

const CardSelectWrapper = () => {
  const reservationEditState = useAppSelector(getReservationEditState);
  const isVisible = useAppSelector(getEditModalVisible);
  const dispatch = useAppDispatch();
  const [jwt, setJwt] = useState<string>(undefined);
  useEffect(() => {
    const storedJwt = window.localStorage.getItem("jwt");
    setJwt(storedJwt);
  }, []);
  const dataSWR = useSWR(`/api/card/admin`, (url: string) =>
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
          <EmptyBox>{"등록된 카드가 없습니다"}</EmptyBox>
        </DataCard>,
      ];
    }

    return dataSWR.data
      .filter((item: CardDetailCardItem) => !item.reservation)
      .map((item: CardDetailCardItem, index: number) => {
        return (
          <CardDetailCard
            key={index}
            item={item}
            onHoverButtons={[
              {
                text: "선택",
                onClick: () => {
                  const data: ReservationPatchProps = {
                    cardId: item.cardId,
                    userId: null,
                    roomId: null,
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
        reservationEditState.type === CARD && isVisible === true
          ? styles.container
          : styles.hidden
      }>
      <CardContainer
        title={"변경할 카드를 선택하세요"}
        buttons={[]}>
        <Grid grid={3}>{Cards}</Grid>
      </CardContainer>
    </div>
  );
};
const CardSelect = () => {
  return (
    <Provider>
      <CardSelectWrapper />
    </Provider>
  );
};
export default CardSelect;
