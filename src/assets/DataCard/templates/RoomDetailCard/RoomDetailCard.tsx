import DataCard, {
  BottomRightText,
  BottomRightTextBox,
  MiddleText,
  MiddleTextBox,
  ReservationText,
  ReservationTextBox,
  ReservationTextContainer,
  TemplateCardProps,
  Title,
} from "../../DataCard";
interface ReservationDetail {
  reservationId: number;
  name: string;
  userId: string;
  phone: string;
  cardId: string;
}
export interface RoomDetailCardItem {
  roomId: number;
  address: string;
  reservations: ReservationDetail[];
}
interface RoomDetailCardProps extends TemplateCardProps {
  item: RoomDetailCardItem;
}
const RoomDetailCard = ({ item }: RoomDetailCardProps) => {
  return (
    <DataCard hasHoverEvent={false}>
      <Title>{`# ${item.roomId}`}</Title>
      <MiddleTextBox>
        <MiddleText right>{item.address}</MiddleText>
      </MiddleTextBox>
      <ReservationTextContainer>
        {item.reservations.map((reservation, index) => (
          <ReservationTextBox key={index}>
            <ReservationText>{`예약 번호 # ${reservation.reservationId}`}</ReservationText>
            <ReservationText>{`${reservation.name}(${reservation.userId})`}</ReservationText>
            <ReservationText>{reservation.phone}</ReservationText>
            <ReservationText>{`카드 ID # ${reservation.cardId}`}</ReservationText>
          </ReservationTextBox>
        ))}
      </ReservationTextContainer>
    </DataCard>
  );
};

export default RoomDetailCard;
