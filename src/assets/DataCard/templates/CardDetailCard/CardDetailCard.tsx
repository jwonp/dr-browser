import { getLastTaggedDisplayText } from "@/util/conventDisplayText";
import DataCard, {
  BottomRightText,
  BottomRightTextBox,
  MiddleText,
  MiddleTextBox,
  TemplateCardProps,
  Title,
} from "../../DataCard";
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
}
interface CardDetailCardProps extends TemplateCardProps {
  item: CardDetailCardItem;
}

const CardDetailCard = ({ item }: CardDetailCardProps) => {
  const detail = item.reservation ? (
    <>
      <MiddleTextBox>
        <MiddleText>{`예약 번호 # ${item.reservation.reservationId}`}</MiddleText>
        <MiddleText>{`${item.reservation.name}(${item.reservation.userId})`}</MiddleText>
        <MiddleText>{item.reservation.phone}</MiddleText>
      </MiddleTextBox>
      <BottomRightTextBox>
        <BottomRightText>{item.reservation.address}</BottomRightText>
        <BottomRightText>{`마지막 태그 ${getLastTaggedDisplayText(
          item.lastTagged
        )}`}</BottomRightText>
      </BottomRightTextBox>
    </>
  ) : (
    <>
      <BottomRightTextBox>
        <BottomRightText>{`마지막 태그 ${getLastTaggedDisplayText(
          item.lastTagged
        )}`}</BottomRightText>
      </BottomRightTextBox>
    </>
  );
  return (
    <DataCard hasHoverEvent={false}>
      <Title>{item.cardId}</Title>
      {detail}
    </DataCard>
  );
};
export default CardDetailCard;
