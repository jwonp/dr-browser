import { getDateDisplayText } from "@/util/conventDisplayText";
import DataCard, {
  BottomRightText,
  BottomRightTextBox,
  MiddleText,
  MiddleTextBox,
  TemplateCardProps,
  Title,
} from "../../DataCard";
export const ADMIN = "ADMIN";
export const AUTHORIZED = "AUTHORIZED";
export const UNAUTHORIZED = "UNAUTHORIZED";

export interface TagLogItem {
  logId: number;
  result: "ADMIN" | "AUTHORIZED" | "UNAUTHORIZED";
  cardId: string;
  address: string;
  taggedTime: string;
}
interface TagLogCardProps extends TemplateCardProps {
  item: TagLogItem;
}
const TagLogCard = ({ item }: TagLogCardProps) => {
  return (
    <DataCard hasHoverEvent={false}>
      <Title>{`로그 # ${item.logId}`}</Title>
      <MiddleTextBox>
        <MiddleText>{item.result}</MiddleText>
        <MiddleText>{`카드 ID # ${item.cardId}`}</MiddleText>
      </MiddleTextBox>
      <BottomRightTextBox>
        <BottomRightText>{`${item.address} 에서`}</BottomRightText>
        <BottomRightText>{`${getDateDisplayText(
          item.taggedTime
        )} 에 태그됨`}</BottomRightText>
      </BottomRightTextBox>
    </DataCard>
  );
};

export default TagLogCard;
