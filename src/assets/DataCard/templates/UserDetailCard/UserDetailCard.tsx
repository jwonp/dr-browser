import DataCard, {
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
  cardId: string;
  address: string;
}
export interface UserDetailCardItem {
  userId: string;
  name: string;
  phone: string;
  reservations: ReservationDetail[];
}
interface UserDetailCardProps extends TemplateCardProps {
  item: UserDetailCardItem;
}
const UserDetailCard = ({ item }: UserDetailCardProps) => {
  return (
    <DataCard hasHoverEvent={false}>
      <Title>{item.userId}</Title>
      <MiddleTextBox>
        <MiddleText>{item.name}</MiddleText>
        <MiddleText>{item.phone}</MiddleText>
      </MiddleTextBox>
      <ReservationTextContainer>
        {item.reservations.map((reservation, index) => (
          <ReservationTextBox key={index}>
            <ReservationText>{`예약 번호 # ${reservation.reservationId}`}</ReservationText>
            <ReservationText>{`카드 ID # ${reservation.cardId}`}</ReservationText>
            <ReservationText right>{reservation.address}</ReservationText>
          </ReservationTextBox>
        ))}
      </ReservationTextContainer>
    </DataCard>
  );
};
export default UserDetailCard;
