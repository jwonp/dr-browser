"use client";
import Provider from "@/redux/Provider";
import DataCard, {
  BottomRightText,
  BottomRightTextBox,
  TemplateCardProps,
  Title,
} from "../../DataCard";
import { useAppDispatch } from "@/redux/hooks";
import { setRoom } from "@/redux/featrues/selectedRoomSlice";
import { useRouter } from "next/navigation";
export interface RoomSelectCardItem {
  roomId: number;
  address: string;
}

export interface RoomSelectCardProps extends TemplateCardProps {
  item: RoomSelectCardItem;
}
const RoomSelectCardWrapper = ({ item }: RoomSelectCardProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <DataCard
      hasHoverEvent={true}
      onHoverButtons={[
        {
          text: "선택",
          onClick: () => {
            dispatch(setRoom(item));
            router.back();
          },
        },
      ]}>
      <Title>{`Room # ${item.roomId}`}</Title>
      <BottomRightTextBox>
        <BottomRightText>{item.address}</BottomRightText>
      </BottomRightTextBox>
    </DataCard>
  );
};
const RoomSelectCard = ({ item }: RoomSelectCardProps) => {
  return (
    <Provider>
      <RoomSelectCardWrapper item={item} />
    </Provider>
  );
};
export default RoomSelectCard;
