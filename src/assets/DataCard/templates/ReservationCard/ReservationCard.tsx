import { useEffect, useState } from "react";
import DataCard, {
  BottomRightText,
  BottomRightTextBox,
  MiddleText,
  MiddleTextBox,
  TemplateCardProps,
  Title,
} from "../../DataCard";
import Provider from "@/redux/Provider";
import { useAppDispatch } from "@/redux/hooks";
import {
  CARD,
  ROOM,
  USER,
  setSelectReservationState,
} from "@/redux/featrues/reservationEditSlice";
import { requsetWithJWT } from "@/util/request";
import { getUsernameByJWT } from "@/util/JwtParser";

export interface ReservationCardItem {
  reservationId: number;
  name: string;
  userId: string;
  phone: string;
  cardId: string;
  address: string;
}
interface ReservationCardProps extends TemplateCardProps {
  item: ReservationCardItem;
}
const ReservationCardWrapper = ({ item }: ReservationCardProps) => {
  const dispatch = useAppDispatch();
  const [isClickedEdit, setClickedEdit] = useState<boolean>(false);
  const [jwt, setJwt] = useState<string>(undefined);
  useEffect(() => {
    const storedJwt = window.localStorage.getItem("jwt");
    setJwt(storedJwt);
  }, []);
  const editButtons = [
    {
      text: "카드 변경",
      onClick: () => {
        dispatch(
          setSelectReservationState({
            type: CARD,
            selectedReservationId: item.reservationId,
          })
        );
      },
    },
    {
      text: "방 변경",
      onClick: () => {
        dispatch(
          setSelectReservationState({
            type: ROOM,
            selectedReservationId: item.reservationId,
          })
        );
      },
    },
    {
      text: "유저 변경",
      onClick: () => {
        dispatch(
          setSelectReservationState({
            type: USER,
            selectedReservationId: item.reservationId,
          })
        );
      },
    },
  ];
  const onHoverButtons = [
    {
      text: "예약 변경",
      onClick: () => {
        setClickedEdit(true);
      },
    },
    {
      text: "예약 삭제",
      onClick: () => {
        requsetWithJWT(jwt).delete(
          `/api/reservation/admin?id=${item.reservationId}`
        );
      },
    },
  ];
  return (
    <DataCard
      hasHoverEvent={true}
      onHoverButtons={isClickedEdit ? editButtons : onHoverButtons}>
      <Title>{`예약 번호 # ${item.reservationId}`}</Title>
      <MiddleTextBox>
        <MiddleText>{`${item.name}(${item.userId})`}</MiddleText>
        <MiddleText>{item.phone}</MiddleText>
        <MiddleText>{`카드 ID # ${item.cardId}`}</MiddleText>
      </MiddleTextBox>
      <BottomRightTextBox>
        <BottomRightText>{item.address}</BottomRightText>
      </BottomRightTextBox>
    </DataCard>
  );
};

const ReservationCard = ({ item }: ReservationCardProps) => {
  return (
    <Provider>
      <ReservationCardWrapper item={item} />
    </Provider>
  );
};
export default ReservationCard;
