import { getDateDisplayText } from "@/util/conventDisplayText";
import DataCard, {
  BottomRightText,
  BottomRightTextBox,
  MiddleText,
  MiddleTextBox,
  TemplateCardProps,
  Title,
} from "../../DataCard";

export interface LostCardItem {
  cardId: string;
  userId: string;
  name: string;
  phone: string;
  address: string;
  lastTagged: string;
}
interface LostCardProps extends TemplateCardProps {
  item: LostCardItem;
}
const LostCard = ({ item }: LostCardProps) => {
  const onHoverButtons = [
    { text: "카드 삭제", onClick: () => {} },
    { text: "분실 신고 취소", onClick: () => {} },
  ];
  return (
    <DataCard
      hasHoverEvent={true}
      onHoverButtons={onHoverButtons}>
      <Title>{item.cardId}</Title>
      <MiddleTextBox>
        <MiddleText>{`${item.name}(${item.userId})`}</MiddleText>
        <MiddleText>{item.phone}</MiddleText>
      </MiddleTextBox>
      <BottomRightTextBox>
        <BottomRightText>{item.address}</BottomRightText>
        <BottomRightText>{`마지막 태그 ${getDateDisplayText(
          item.lastTagged
        )}`}</BottomRightText>
      </BottomRightTextBox>
    </DataCard>
  );
};
export default LostCard;
