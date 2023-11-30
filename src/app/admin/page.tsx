"use client";
import CardContainer, { Grid } from "@/assets/CardContainer/CardContainer";
import CardDetailCard, {
  CardDetailCardItem,
} from "@/assets/DataCard/templates/CardDetailCard/CardDetailCard";
import LostCard, {
  LostCardItem,
} from "@/assets/DataCard/templates/LostCard/LostCard";
import ReservationCard, {
  ReservationCardItem,
} from "@/assets/DataCard/templates/ReservationCard/ReservationCard";
import ReserveRequestCard, {
  ReserveRequestCardItem,
} from "@/assets/DataCard/templates/ReserveRequestCard/ReserveRequestCard";
import RoomDetailCard, {
  RoomDetailCardItem,
} from "@/assets/DataCard/templates/RoomDetailCard/RoomDetailCard";
import TagLogCard, {
  TagLogItem,
} from "@/assets/DataCard/templates/TagLogCard/TagLogCard";
import UnauthorizedTagLogCard, {
  UnauthorizedTagLogCardItem,
} from "@/assets/DataCard/templates/UnauthorizedTagLogCard/UnauthorizedTagLogCard";
import UserDetailCard, {
  UserDetailCardItem,
} from "@/assets/DataCard/templates/UserDetailCard/UserDetailCard";
import styles from "./page.module.scss";
import useSWR from "swr";
import { requsetWithJWT } from "@/util/request";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import DataCard, { EmptyBox } from "@/assets/DataCard/DataCard";
import { useAppSelector } from "@/redux/hooks";
import {
  getEditModalVisible,
  getReservationEditState,
} from "@/redux/featrues/reservationEditSlice";
import Provider from "@/redux/Provider";
export const ID = {
  lost: "lost",
  reserveRequest: "reserve-request",
  unauthorizedTagLog: "unauthorized-tag-log",
  cardDetail: "card-detail",
  userDetail: "user-detail",
  roomDetail: "room-detail",
  reservation: "reservation",
  tagLog: "tag-log",
};
const AdminWrapper = ({ jwt }: { jwt: string }) => {
  const reservationEditState = useAppSelector(getReservationEditState);
  const isModalVisible = useAppSelector(getEditModalVisible);
  const lostCardSWR = useSWR(
    "/api/card/admin/lost",
    (url: string): Promise<LostCardItem[]> =>
      requsetWithJWT(jwt)
        .get(url)
        .then((res) => res.data)
  );
  const LostCards = useMemo(() => {
    if (!lostCardSWR || !lostCardSWR.data || lostCardSWR.data.length === 0) {
      return [
        <DataCard
          key={0}
          hasHoverEvent={false}>
          <EmptyBox>{"분실 신고된 카드가 없습니다"}</EmptyBox>
        </DataCard>,
      ];
    }
    return lostCardSWR.data.map((item, index) => {
      return (
        <LostCard
          key={index}
          item={item}
        />
      );
    });
  }, [lostCardSWR, lostCardSWR.data]);

  const requestSWR = useSWR(
    "/api/reservation/admin/reserved",
    (url: string): Promise<ReserveRequestCardItem[]> =>
      requsetWithJWT(jwt)
        .get(url)
        .then((res) => res.data)
  );
  const ReserveRequestCards = useMemo(() => {
    if (!requestSWR || !requestSWR.data || requestSWR.data.length === 0) {
      return [
        <DataCard
          key={0}
          hasHoverEvent={false}>
          <EmptyBox>{"예약 변경 요청이 없습니다"}</EmptyBox>
        </DataCard>,
      ];
    }
    return requestSWR.data.map((item, index) => {
      return (
        <ReserveRequestCard
          key={index}
          item={item}
        />
      );
    });
  }, [requestSWR, requestSWR.data]);

  const unauthorizedSWR = useSWR(
    "/api/log/admin/unauthorized",
    (url: string): Promise<UnauthorizedTagLogCardItem[]> =>
      requsetWithJWT(jwt)
        .get(url)
        .then((res) => res.data)
  );
  const UnauthorizedTagLogCards = useMemo(() => {
    if (
      !unauthorizedSWR ||
      !unauthorizedSWR.data ||
      unauthorizedSWR?.data?.length === 0
    ) {
      return [
        <DataCard
          key={0}
          hasHoverEvent={false}>
          <EmptyBox>{"인증 실패한 태그 로그가 없습니다"}</EmptyBox>
        </DataCard>,
      ];
    }
    return unauthorizedSWR.data.map((item, index) => {
      return (
        <UnauthorizedTagLogCard
          key={index}
          item={item}
        />
      );
    });
  }, [unauthorizedSWR, unauthorizedSWR.data]);

  const cardSWR = useSWR(
    "/api/card/admin",
    (url: string): Promise<CardDetailCardItem[]> =>
      requsetWithJWT(jwt)
        .get(url)
        .then((res) => res.data)
  );
  const CardDetailCards = useMemo(() => {
    if (!cardSWR || !cardSWR.data || cardSWR?.data?.length === 0) {
      return [
        <DataCard
          key={0}
          hasHoverEvent={false}>
          <EmptyBox>{"등록된 카드가 없습니다"}</EmptyBox>
        </DataCard>,
      ];
    }
    return cardSWR.data.map((item, index) => {
      return (
        <CardDetailCard
          key={index}
          item={item}
        />
      );
    });
  }, [cardSWR, cardSWR.data]);

  const userSWR = useSWR(
    "/api/user/admin",
    (url: string): Promise<UserDetailCardItem[]> =>
      requsetWithJWT(jwt)
        .get(url)
        .then((res) => res.data)
  );
  const UserDetailCards = useMemo(() => {
    if (!userSWR || !userSWR.data || userSWR?.data?.length === 0) {
      return [
        <DataCard
          key={0}
          hasHoverEvent={false}>
          <EmptyBox>{"등록된 유저가 없습니다"}</EmptyBox>
        </DataCard>,
      ];
    }
    return userSWR.data.map((item, index) => {
      return (
        <UserDetailCard
          key={index}
          item={item}
        />
      );
    });
  }, [userSWR, userSWR.data]);

  const roomSWR = useSWR(
    "/api/room/admin",
    (url: string): Promise<RoomDetailCardItem[]> =>
      requsetWithJWT(jwt)
        .get(url)
        .then((res) => res.data)
  );
  const RoomDetailCards = useMemo<JSX.Element[]>(() => {
    if (!roomSWR || !roomSWR.data || roomSWR?.data?.length === 0) {
      return [
        <DataCard
          key={0}
          hasHoverEvent={false}>
          <EmptyBox>{"등록된 방이 없습니다"}</EmptyBox>
        </DataCard>,
      ];
    }
    return roomSWR.data.map((item, index) => {
      return (
        <RoomDetailCard
          key={index}
          item={item}
        />
      );
    });
  }, [roomSWR, roomSWR.data]);

  const reservationSWR = useSWR(
    "/api/reservation/admin",
    (url: string): Promise<ReservationCardItem[]> =>
      requsetWithJWT(jwt)
        .get(url)
        .then((res) => res.data)
  );
  useEffect(() => {
    if (reservationEditState.selectedReservationId < 1) {
      reservationSWR.mutate();
    }
  }, [reservationEditState.selectedReservationId]);
  useEffect(() => {
    reservationSWR.mutate();
  }, [isModalVisible]);
  const ReservationCards = useMemo(() => {
    if (
      !reservationSWR ||
      !reservationSWR.data ||
      reservationSWR.data.length === 0
    ) {
      return [
        <DataCard
          key={0}
          hasHoverEvent={false}>
          <EmptyBox>{"등록된 예약이 없습니다"}</EmptyBox>
        </DataCard>,
      ];
    }
    return reservationSWR.data.map((item, index) => {
      return (
        <ReservationCard
          key={index}
          item={item}
        />
      );
    });
  }, [reservationSWR, reservationSWR.data]);

  const logSWR = useSWR(
    "/api/log/admin",
    (url: string): Promise<TagLogItem[]> =>
      requsetWithJWT(jwt)
        .get(url)
        .then((res) => res.data)
  );
  const TagLogCards = useMemo(() => {
    if (!logSWR || !logSWR.data || logSWR?.data?.length === 0) {
      return [
        <DataCard
          key={0}
          hasHoverEvent={false}>
          <EmptyBox>{"태그 기록이 없습니다"}</EmptyBox>
        </DataCard>,
      ];
    }
    return logSWR.data.map((item, index) => {
      return (
        <TagLogCard
          key={index}
          item={item}
        />
      );
    });
  }, [logSWR, logSWR.data]);

  return (
    <div className={styles.container}>
      <CardContainer
        id={ID.lost}
        title={"분실 신고된 카드 현황"}
        tab={1}
        buttons={[]}>
        <Grid grid={3}>{LostCards}</Grid>
      </CardContainer>
      <CardContainer
        id={ID.reserveRequest}
        title={"예약 변경"}
        tab={1}
        buttons={[]}>
        <Grid grid={3}>{ReserveRequestCards}</Grid>
      </CardContainer>
      <CardContainer
        id={ID.unauthorizedTagLog}
        title={"인증 실패 태그 로그"}
        tab={1}
        buttons={[]}>
        <Grid grid={3}>{UnauthorizedTagLogCards}</Grid>
      </CardContainer>
      <CardContainer
        id={ID.cardDetail}
        title={"카드"}
        tab={1}
        buttons={[]}>
        <Grid grid={3}>{CardDetailCards}</Grid>
      </CardContainer>
      <CardContainer
        id={ID.userDetail}
        title={"유저"}
        tab={1}
        buttons={[]}>
        <Grid grid={3}>{UserDetailCards}</Grid>
      </CardContainer>
      <CardContainer
        id={ID.roomDetail}
        title={"방"}
        tab={1}
        buttons={[]}>
        <Grid grid={3}>{RoomDetailCards}</Grid>
      </CardContainer>
      <CardContainer
        id={ID.reservation}
        title={"예약"}
        tab={1}
        buttons={[]}>
        <Grid grid={3}>{ReservationCards}</Grid>
      </CardContainer>
      <CardContainer
        id={ID.tagLog}
        title={"태그 로그"}
        tab={1}
        buttons={[]}>
        <Grid grid={3}>{TagLogCards}</Grid>
      </CardContainer>
    </div>
  );
};
const Admin = () => {
  const router = useRouter();
  const [jwt, setJwt] = useState<string>(undefined);
  useEffect(() => {
    const storedJwt = window.localStorage.getItem("jwt");
    setJwt(storedJwt);
  }, []);
  const isAdminSWR = useSWR(
    "/api/auth/admin",
    (url: string): Promise<{ result: boolean }> =>
      requsetWithJWT(jwt)
        .get(url)
        .then((res) => res.data)
  );
  useEffect(() => {
    if (isAdminSWR && isAdminSWR.data && isAdminSWR.data.result === false) {
      router.push("/");
    }
  }, [isAdminSWR, isAdminSWR.data]);
  if (isAdminSWR && isAdminSWR.data && isAdminSWR.data.result === true) {
    return (
      <Provider>
        <AdminWrapper jwt={jwt} />
      </Provider>
    );
  } else {
    return <></>;
  }
};
export default Admin;
