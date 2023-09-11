import { getDateDisplayText } from "@/util/conventDisplayText";
import DataCard, {
  BottomRightText,
  BottomRightTextBox,
  MiddleText,
  MiddleTextBox,
  TemplateCardProps,
  Title,
} from "../../DataCard";
import { useState, useEffect } from "react";
import { requsetWithJWT } from "@/util/request";

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
  const lastTaggedDisplayText = getDateDisplayText(item.lastTagged);
  const onHoverButtons = [
    {
      text: "카드 삭제",
      onClick: () => {
        requsetWithJWT(window.localStorage.getItem("jwt")).delete(
          `/api/card/admin?id=${item.cardId}`
        );
      },
    },
    {
      text: "분실 신고 취소",
      onClick: () => {
        requsetWithJWT(window.localStorage.getItem("jwt")).delete(
          `/api/card/admin/lost?id=${item.cardId}`
        );
      },
    },
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
        <BottomRightText>
          {`마지막 태그 ${
            lastTaggedDisplayText ? lastTaggedDisplayText : "기록이 없습니다"
          }`}
        </BottomRightText>
      </BottomRightTextBox>
    </DataCard>
  );
};
export default LostCard;
