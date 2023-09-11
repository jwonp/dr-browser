import { requsetWithJWT } from "@/util/request";
import DataCard, {
  BottomRightText,
  BottomRightTextBox,
  MiddleText,
  MiddleTextBox,
  TemplateCardProps,
  Title,
} from "../../DataCard";
import { ReservationPatchProps } from "@/app/api/reservation/admin/route";

export interface ReserveRequestCardItem {
  requestId: number;
  reservationId: number;
  name: string;
  userId: string;
  phone: string;
  roomId: number;
  address: string;
}
interface ReserveRequestCardProps extends TemplateCardProps {
  item: ReserveRequestCardItem;
}
const ReserveRequestCard = ({ item }: ReserveRequestCardProps) => {
  const onHoverButtons = [
    {
      text: "예약 확정",
      onClick: () => {
        const patchData: ReservationPatchProps = {
          userId: item.userId,
          roomId: item.roomId,
        };
        requsetWithJWT(window.localStorage.getItem("jwt"))
          .patch(`/api/reservation/admin?id=${item.reservationId}`)
          .then(() => {});
      },
    },
    {
      text: "예약 취소",
      onClick: () => {
        requsetWithJWT(window.localStorage.getItem("jwt"))
          .delete(`/api/reservation/admin/reserved?id=${item.requestId}`)
          .then(() => {});
      },
    },
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
