"use client";
import styles from "./page.module.scss";
import Button from "@/assets/Button/Button";
import CardContainer, { Grid } from "@/assets/CardContainer/CardContainer";
import { RoomSelectCardItem } from "@/assets/DataCard/templates/RoomSelectCard/RoomSelectCard";
import Text from "@/assets/Text/Text";
import Provider from "@/redux/Provider";
import { getSelectedRoom } from "@/redux/featrues/selectedRoomSlice";
import { useAppSelector } from "@/redux/hooks";
import { getDateDisplayText } from "@/util/conventDisplayText";
import { requsetWithJWT } from "@/util/request";
import { AxiosResponse } from "axios";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import useSWR from "swr";

export interface ReservationDetail {
  reservationId: number;
  createdTime: string;
  name: string;
  phone: string;
  address: string;
}
const ReservationWrapper = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedRoom = useAppSelector(getSelectedRoom);
  const [jwt, setJwt] = useState<string>(undefined);
  useEffect(() => {
    const storedJwt = window.localStorage.getItem("jwt");
    setJwt(storedJwt);
  }, []);

  const reservationSWR = useSWR(
    searchParams.get("id")
      ? `/api/reservation?id=${searchParams.get("id")}`
      : null,
    (url: string): Promise<ReservationDetail> =>
      requsetWithJWT(jwt)
        .get(url)
        .then((res) => res.data)
  );
  const roomListSWR = useSWR("/api/room/select", (url: string) =>
    requsetWithJWT(jwt)
      .get(url)
      .then((res) => res.data)
  );

  const reservationDetail: ReservationDetail = useMemo(() => {
    if (!reservationSWR || !reservationSWR.data) {
      return {
        reservationId: 0,
        createdTime: "",
        name: "",
        phone: "",
        address: "",
      };
    }
    console.log(reservationSWR.data);
    return {
      reservationId: reservationSWR.data.reservationId,
      createdTime: reservationSWR.data.createdTime,
      name: reservationSWR.data.name,
      phone: reservationSWR.data.phone,
      address: reservationSWR.data.address,
    };
  }, [reservationSWR, reservationSWR.data]);
  const reservationRoom = useMemo(() => {
    if (!roomListSWR || !roomListSWR.data) {
      return;
    }
    if (selectedRoom.roomId < 1) {
      return reservationDetail.address;
    }
    return selectedRoom.address;
  }, [selectedRoom, roomListSWR, roomListSWR.data]);
  const isDisabled = useMemo(() => {
    if (!reservationSWR || !reservationSWR.data) {
      return true;
    }
    if (selectedRoom.address.length === 0) {
      return true;
    }
    if (selectedRoom.address !== reservationSWR.data.address) {
      return false;
    }
    return true;
  }, [selectedRoom, reservationSWR, reservationSWR.data]);
  const isLoading = useMemo(() => {
    if (pathname.includes("select")) {
      return false;
    }
    return !reservationSWR.data || !roomListSWR.data;
  }, [reservationSWR, roomListSWR]);
  const requestChanges = () => {
    const data = {
      reservationId: reservationSWR.data.reservationId,
      roomId: selectedRoom.roomId,
    };
    requsetWithJWT(jwt)
      .post("/api/reservation/request", data)
      .then((res: AxiosResponse<boolean, any>) => {
        if (res.data) {
          router.push("/");
        }
      })
      .catch(() => {
        console.log("요청에 실패했습니다.");
      });
  };
  return (
    <div className={styles.container}>
      <div className={isLoading ? styles.loading : styles.hidden}>
        <div> {"정보를 불러오는 중입니다...."}</div>
      </div>
      <CardContainer
        tab={1}
        title={"예약정보"}
        buttons={
          <Grid>
            <Button
              disabled={isDisabled}
              onClick={requestChanges}>
              변경 요청
            </Button>
            <Button
              onClick={() => {
                router.push("/");
              }}>
              취소
            </Button>
          </Grid>
        }>
        <Grid>
          <Text
            label={"예약 번호"}>{`${reservationDetail.reservationId}`}</Text>
          <Text label={"예약 날짜"}>
            {getDateDisplayText(reservationDetail.createdTime)}
          </Text>
        </Grid>
        <Grid>
          <Text label={"이름"}>{reservationDetail.name}</Text>
          <Text label={"전화번호"}>{reservationDetail.phone}</Text>
        </Grid>
        <Link href={"/reservation/select"}>
          <Text
            label={"주소"}
            isButton>
            {reservationRoom}
          </Text>
        </Link>
      </CardContainer>
    </div>
  );
};

const Reservation = () => {
  return (
    <Provider>
      <ReservationWrapper />
    </Provider>
  );
};
export default Reservation;
