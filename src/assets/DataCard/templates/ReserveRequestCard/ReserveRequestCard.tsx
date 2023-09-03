import DataCard, {
  BottomRightText,
  BottomRightTextBox,
  MiddleText,
  MiddleTextBox,
  TemplateCardProps,
  Title,
} from "../../DataCard";

export interface ReserveRequestCardItem {
  reservationId: number;
  name: string;
  userId: string;
  phone: string;
  address: string;
}
interface ReserveRequestCardProps extends TemplateCardProps {
  item: ReserveRequestCardItem;
}
const ReserveRequestCard = ({ item }: ReserveRequestCardProps) => {
  const onHoverButtons = [
    { text: "예약 확정", onClick: () => {} },
    { text: "예약 취소", onClick: () => {} },
  ];
  return (
    <DataCard
      hasHoverEvent={true}
      onHoverButtons={onHoverButtons}>
      <Title>{`예약 ID # ${item.reservationId}`}</Title>
      <MiddleTextBox>
        <MiddleText>{`${item.name}(${item.userId})`}</MiddleText>
        <MiddleText>{item.phone}</MiddleText>
      </MiddleTextBox>
      <BottomRightTextBox>
        <BottomRightText>{item.address}</BottomRightText>
      </BottomRightTextBox>
    </DataCard>
  );
};

export default ReserveRequestCard;
