import { getDateDisplayText } from "@/util/conventDisplayText";
import DataCard, {
  BottomRightText,
  BottomRightTextBox,
  MiddleText,
  MiddleTextBox,
  TemplateCardProps,
  Title,
} from "../../DataCard";

export interface UnauthorizedTagLogCardItem {
  logId: number;
  cardId: string;
  address: string;
  lastTagged: string;
}
interface UnauthorizedTagLogCardProps extends TemplateCardProps {
  item: UnauthorizedTagLogCardItem;
}
const UnauthorizedTagLogCard = ({ item }: UnauthorizedTagLogCardProps) => {
  return (
    <DataCard hasHoverEvent={false}>
      <Title>{`Log # ${item.logId}`}</Title>
      <MiddleTextBox>
        <MiddleText>{`카드 ID ${item.cardId}`}</MiddleText>
      </MiddleTextBox>
      <BottomRightTextBox>
        <BottomRightText>{`${item.address} 에서`}</BottomRightText>
        <BottomRightText>{`${getDateDisplayText(
          item.lastTagged
        )} 에 태그됨`}</BottomRightText>
      </BottomRightTextBox>
    </DataCard>
  );
};
export default UnauthorizedTagLogCard;
