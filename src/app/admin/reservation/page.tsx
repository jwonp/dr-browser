"use client";
import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.scss";
import { requsetWithJWT } from "@/util/request";
import router from "next/router";
import useSWR from "swr";
import Provider from "@/redux/Provider";
import CardContainer from "@/assets/CardContainer/CardContainer";
import Button from "@/assets/Button/Button";
import ReservationCard from "@/assets/DataCard/templates/ReservationCard/ReservationCard";
import UserDetailCard, {
  UserDetailCardItem,
} from "@/assets/DataCard/templates/UserDetailCard/UserDetailCard";
import DataCard, { EmptyBox } from "@/assets/DataCard/DataCard";
import NewReservationCard, {
  NewReservationCardItem,
} from "@/assets/DataCard/templates/NewReservationCard/NewReservationCard";
import CardDetailCard, {
  CardDetailCardItem,
} from "@/assets/DataCard/templates/CardDetailCard/CardDetailCard";
import RoomDetailCard, {
  RoomDetailCardItem,
} from "@/assets/DataCard/templates/RoomDetailCard/RoomDetailCard";
import { useRouter } from "next/navigation";
type SelectedUser = {
  userId: string;
  name: string;
  phone: string;
};
type SelectedCard = {
  cardId: string;
};
type SelectedRoom = {
  roomId: number;
  address: string;
};
const initUser: SelectedUser = {
  userId: "",
  name: "",
  phone: "",
};
const initCard: SelectedCard = {
  cardId: "",
};
const initRoom: SelectedRoom = {
  roomId: 0,
  address: "",
};
interface NewReservation extends NewReservationCardItem {
  roomId: number;
}
const initNewReservation: NewReservation = {
  name: "",
  userId: "",
  phone: "",
  cardId: "",
  roomId: 0,
  address: "",
};
const USER = 0;
const CARD = 1;
const ROOM = 2;
const DONE = 3;

const AdminReservationWrapper = () => {
  const router = useRouter();
  const [jwt, setJwt] = useState<string>(undefined);
  const [selectIndex, setSelectIndex] = useState<number>(0);
  const [user, setUser] = useState<SelectedUser>(initUser);
  const [card, setCard] = useState<SelectedCard>(initCard);
  const [room, setRoom] = useState<SelectedRoom>(initRoom);
  const [reservation, setReservation] =
    useState<NewReservation>(initNewReservation);

  const roomSWR = useSWR(`/api/room/admin`, (url: string) =>
    requsetWithJWT(jwt)
      .get(url)
      .then((res) => res.data)
  );
  const userSWR = useSWR(`/api/user/admin`, (url: string) =>
    requsetWithJWT(jwt)
      .get(url)
      .then((res) => res.data)
  );
  const cardSWR = useSWR(`/api/card/admin`, (url: string) =>
    requsetWithJWT(jwt)
      .get(url)
      .then((res) => res.data)
  );
  useEffect(() => {
    const storedJwt = window.localStorage.getItem("jwt");
    setJwt(storedJwt);
  }, []);
  useEffect(() => {
    setReservation(() => {
      return {
        ...reservation,
        userId: user.userId,
        phone: user.phone,
        name: user.name,
      };
    });
  }, [user]);
  useEffect(() => {
    setReservation(() => {
      return {
        ...reservation,
        cardId: card.cardId,
      };
    });
  }, [card]);
  useEffect(() => {
    setReservation(() => {
      return {
        ...reservation,
        roomId: room.roomId,
        address: room.address,
      };
    });
  }, [room]);

  const UserList = useMemo(() => {
    const isExistUser = userSWR && userSWR.data && userSWR.data.length > 0;
    console.log(userSWR.data);
    if (!isExistUser) {
      return (
        <DataCard hasHoverEvent={false}>
          <EmptyBox>{"등록된 유저가 없습니다"}</EmptyBox>
        </DataCard>
      );
    }
    return userSWR.data.map((item: UserDetailCardItem, index: number) => (
      <div
        className={styles.selectCard}
        key={index}
        onClick={() => {
          const user: SelectedUser = {
            userId: item.userId,
            name: item.name,
            phone: item.phone,
          };
          setUser(user);
          setSelectIndex(CARD);
        }}>
        <UserDetailCard
          key={index}
          item={item}
        />
      </div>
    ));
  }, [userSWR, userSWR.data]);

  const CardList = useMemo(() => {
    const isExistCard = cardSWR && cardSWR.data && cardSWR.data.length > 0;
    if (!isExistCard) {
      return (
        <DataCard hasHoverEvent={false}>
          <EmptyBox>{"등록된 카드가 없습니다"}</EmptyBox>
        </DataCard>
      );
    }
    return cardSWR.data
      .filter((item: CardDetailCardItem) => !item.reservation)
      .map((item: CardDetailCardItem, index: number) => (
        <div
          className={styles.selectCard}
          key={index}
          onClick={() => {
            const card: SelectedCard = {
              cardId: item.cardId,
            };
            setCard(card);
            setSelectIndex(ROOM);
          }}>
          <CardDetailCard
            key={index}
            item={item}
          />
        </div>
      ));
  }, [cardSWR, cardSWR.data]);

  const RoomList = useMemo(() => {
    const isExistRoom = roomSWR && roomSWR.data && roomSWR.data.length > 0;
    if (!isExistRoom) {
      return (
        <DataCard hasHoverEvent={false}>
          <EmptyBox>{"등록된 방이 없습니다"}</EmptyBox>
        </DataCard>
      );
    }
    return roomSWR.data.map((item: RoomDetailCardItem, index: number) => (
      <div
        className={styles.selectCard}
        key={index}
        onClick={() => {
          const room: SelectedRoom = {
            roomId: item.roomId,
            address: item.address,
          };
          setRoom(room);
          setSelectIndex(DONE);
        }}>
        <RoomDetailCard
          key={index}
          item={item}
        />
      </div>
    ));
  }, [roomSWR, roomSWR.data]);

  const SelectList = useMemo(() => {
    if (selectIndex === USER) {
      return UserList;
    }
    if (selectIndex === CARD) {
      return CardList;
    }
    if (selectIndex === ROOM || selectIndex === DONE) {
      return RoomList;
    }
    return <></>;
  }, [selectIndex, UserList, CardList, RoomList]);

  const onSubmit = () => {
    console.log(reservation.roomId);
    requsetWithJWT(jwt)
      .post("/api/reservation/admin", {
        userId: reservation.userId,
        cardId: reservation.cardId,
        roomId: reservation.roomId,
      })
      .then((res) => {
        if (res.data.result) {
          router.push("/admin");
        }
        setSelectIndex(USER);
        setReservation(initNewReservation);
        44;
      })
      .catch(() => {
        setSelectIndex(USER);
        setReservation(initNewReservation);
      });
  };

  const Buttons = useMemo(() => {
    if (selectIndex === USER) {
      return [<div key={0}></div>];
    }
    if (selectIndex === CARD || selectIndex === ROOM) {
      return [
        <Button
          key={0}
          onClick={() => {
            setSelectIndex(selectIndex - 1);
          }}>
          이전
        </Button>,
      ];
    }

    if (selectIndex === DONE) {
      return [
        <Button
          key={0}
          onClick={onSubmit}>
          예약 추가
        </Button>,
        <Button
          key={1}
          onClick={() => {
            setSelectIndex(selectIndex - 1);
          }}>
          이전
        </Button>,
        ,
      ];
    }
    return [<div key={0}></div>];
  }, [selectIndex, reservation]);

  return (
    <CardContainer
      tab={1}
      isButtonsParallel
      buttons={[...Buttons]}
      title="새로운 예약"
      isWrappeed>
      <div className={styles.main}>
        <div className={styles.gridBox}>
          <div className={styles.resultBox}>
            <div>
              <div className={styles.text}>
                우측에서 예약 정보를 선택해주세요
              </div>
              <NewReservationCard item={reservation} />
            </div>
          </div>
        </div>
        <div className={styles.gridBox}>
          <div className={styles.selectBox}>{SelectList}</div>
        </div>
      </div>
    </CardContainer>
  );
};
const AdminReservation = () => {
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
  return (
    <Provider>
      <AdminReservationWrapper />
    </Provider>
  );
};

export default AdminReservation;
