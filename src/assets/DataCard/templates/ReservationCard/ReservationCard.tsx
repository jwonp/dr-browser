import { useState } from "react";
import DataCard, {
  BottomRightText,
  BottomRightTextBox,
  MiddleText,
  MiddleTextBox,
  TemplateCardProps,
  Title,
} from "../../DataCard";

interface ReservationCardItem {
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
const ReservationCard = ({ item }: ReservationCardProps) => {
  const [isClickedEdit, setClickedEdit] = useState<boolean>(false);
  const editButtons = [
    { text: "카드 변경", onClick: () => {} },
    { text: "방 변경", onClick: () => {} },
    { text: "유저 변경", onClick: () => {} },
  ];
  const onHoverButtons = [
    {
      text: "예약 변경",
      onClick: () => {
        setClickedEdit(true);
      },
    },
    { text: "예약 삭제", onClick: () => {} },
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
export default ReservationCard;
