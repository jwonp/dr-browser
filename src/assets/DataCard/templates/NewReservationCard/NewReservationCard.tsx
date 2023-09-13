import DataCard, {
  BottomRightText,
  BottomRightTextBox,
  MiddleText,
  MiddleTextBox,
  TemplateCardProps,
  Title,
} from "../../DataCard";

import { ReservationCardItem } from "../ReservationCard/ReservationCard";

export interface NewReservationCardItem
  extends Omit<ReservationCardItem, "reservationId"> {}
interface ReservationCardProps extends TemplateCardProps {
  item: NewReservationCardItem;
}
const NewReservationCard = ({ item }: ReservationCardProps) => {
  return (
    <DataCard hasHoverEvent={false}>
      <Title>{`새로운 예약`}</Title>
      <MiddleTextBox>
        {item.userId.length > 0 ? (
          <MiddleText>{`${item.name}(${item.userId})`}</MiddleText>
        ) : (
          <MiddleText>{""}</MiddleText>
        )}

        <MiddleText>{item.phone}</MiddleText>
        {item.cardId.length > 0 ? (
          <MiddleText>{`카드 ID # ${item.cardId}`}</MiddleText>
        ) : (
          <MiddleText>{""}</MiddleText>
        )}
      </MiddleTextBox>
      <BottomRightTextBox>
        <BottomRightText>{item.address}</BottomRightText>
      </BottomRightTextBox>
    </DataCard>
  );
};

export default NewReservationCard;
