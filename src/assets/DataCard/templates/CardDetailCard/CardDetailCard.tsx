import { getDateDisplayText } from "@/util/conventDisplayText";
import DataCard, {
  BottomRightText,
  BottomRightTextBox,
  MiddleText,
  MiddleTextBox,
  TemplateCardProps,
  Title,
} from "../../DataCard";
import { HoverButtonProps } from "@/assets/HoverButton/HoverButton";
interface ReservationDetail {
  reservationId: number;
  name: string;
  userId: string;
  phone: string;
  address: string;
}
export interface CardDetailCardItem {
  cardId: string;
  reservation?: ReservationDetail;
  lastTagged: string;
  lostTime?: string;
}
interface CardDetailCardProps extends TemplateCardProps {
  item: CardDetailCardItem;

  onHoverButtons?: HoverButtonProps[];
}

const CardDetailCard = ({ item, onHoverButtons }: CardDetailCardProps) => {
  const detail = item.reservation ? (
    <>
      <MiddleTextBox>
        <MiddleText>{`예약 번호 # ${item.reservation.reservationId}`}</MiddleText>
        <MiddleText>{`${item.reservation.name}(${item.reservation.userId})`}</MiddleText>
        <MiddleText>{item.reservation.phone}</MiddleText>
      </MiddleTextBox>
      <BottomRightTextBox>
        <BottomRightText>{item.reservation.address}</BottomRightText>
        <BottomRightText>{`마지막 태그 ${getDateDisplayText(
          item.lastTagged
        )}`}</BottomRightText>
      </BottomRightTextBox>
    </>
  ) : (
    <>
      <BottomRightTextBox>
        <BottomRightText>{`마지막 태그 ${getDateDisplayText(
          item.lastTagged
        )}`}</BottomRightText>
      </BottomRightTextBox>
    </>
  );
  return (
    <DataCard
      hasHoverEvent={onHoverButtons ? true : false}
      onHoverButtons={onHoverButtons}>
      <Title>{item.cardId}</Title>
      {detail}
    </DataCard>
  );
};
export default CardDetailCard;
