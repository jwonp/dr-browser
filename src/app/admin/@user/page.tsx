"use client";
import UserDetailCard, {
  UserDetailCardItem,
} from "@/assets/DataCard/templates/UserDetailCard/UserDetailCard";
import styles from "./page.module.scss";
import {
  USER,
  getReservationEditState,
  getEditModalVisible,
  setInvisible,
} from "@/redux/featrues/reservationEditSlice";
import Provider from "@/redux/Provider";
import CardContainer, { Grid } from "@/assets/CardContainer/CardContainer";
import DataCard, { EmptyBox } from "@/assets/DataCard/DataCard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { requsetWithJWT } from "@/util/request";
import { useState, useEffect, useMemo } from "react";
import useSWR from "swr";
import { ReservationPatchProps } from "@/app/api/reservation/admin/route";

const UserSelectWrapper = () => {
  const reservationEditState = useAppSelector(getReservationEditState);
  const isVisible = useAppSelector(getEditModalVisible);
  const dispatch = useAppDispatch();
  const [jwt, setJwt] = useState<string>(undefined);
  useEffect(() => {
    const storedJwt = window.localStorage.getItem("jwt");
    setJwt(storedJwt);
  }, []);
  const dataSWR = useSWR(`/api/user/admin`, (url: string) =>
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
          <EmptyBox>{"등록된 유저가 없습니다"}</EmptyBox>
        </DataCard>,
      ];
    }

    return dataSWR.data.map((item: UserDetailCardItem, index: number) => {
      return (
        <UserDetailCard
          key={index}
          item={item}
          onHoverButtons={[
            {
              text: "선택",
              onClick: () => {
                const data: ReservationPatchProps = {
                  userId: item.userId,
                  cardId: null,
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
        reservationEditState.type === USER && isVisible === true
          ? styles.container
          : styles.hidden
      }>
      <CardContainer
        title={"변경할 유저를 선택하세요"}
        buttons={[]}>
        <Grid grid={3}>{Cards}</Grid>
      </CardContainer>
    </div>
  );
};
const UserSelect = () => {
  return (
    <Provider>
      <UserSelectWrapper />
    </Provider>
  );
};
export default UserSelect;
