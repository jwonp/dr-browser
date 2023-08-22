"use client";
import BannerImage from "@/assets/BannerImage/BannerImage";
import DataCard, {
  BottomRightText,
  BottomRightTextBox,
  MiddleText,
  MiddleTextBox,
  ReservationText,
  ReservationTextBox,
  ReservationTextContainer,
  Title,
} from "@/assets/DataCard/DataCard";
import { HoverButtonProps } from "@/assets/HoverButton/HoverButton";
import Header from "@/components/Header/Header";
import styles from "./page.module.scss";
export default function Home() {
  const mockHoverButtons: HoverButtonProps[] = [
    {
      text: "예약 확인",
      onClick: (e) => {
        console.log("예약 확인");
      },
    },
    {
      text: "예약 확인",
      onClick: (e) => {
        console.log("예약 확인");
      },
    },
    {
      text: "예약 취소",
      onClick: (e) => {
        console.log("예약 취소");
      },
    },
  ];
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.main}>
        <BannerImage />
        <div className={styles.CardContainer}>
          <DataCard
            hasHoverEvent={true}
            onHoverButtons={mockHoverButtons}>
            <Title>123AB45F123456</Title>
            <MiddleTextBox>
              <MiddleText>UserName</MiddleText>
              <MiddleText>010-1234-1234</MiddleText>
            </MiddleTextBox>
            <BottomRightTextBox>
              <BottomRightText>서울 마포구 연남로2길 224-11</BottomRightText>
            </BottomRightTextBox>
          </DataCard>
          <DataCard
            hasHoverEvent={true}
            onHoverButtons={mockHoverButtons}>
            <Title>123AB45F123456</Title>
            <MiddleTextBox>
              <MiddleText>UserName</MiddleText>
              <MiddleText>010-1234-1234</MiddleText>
            </MiddleTextBox>
            <BottomRightTextBox>
              <BottomRightText>서울 마포구 연남로2길 224-11</BottomRightText>
            </BottomRightTextBox>
          </DataCard>
          <DataCard
            hasHoverEvent={true}
            onHoverButtons={mockHoverButtons}>
            <Title>123AB45F123456</Title>
            <MiddleTextBox>
              <MiddleText>UserName</MiddleText>
              <MiddleText>010-1234-1234</MiddleText>
            </MiddleTextBox>
            <BottomRightTextBox>
              <BottomRightText>서울 마포구 연남로2길 224-11</BottomRightText>
            </BottomRightTextBox>
          </DataCard>
          <DataCard hasHoverEvent={false}>
            <Title>UserID1234</Title>
            <MiddleTextBox>
              <MiddleText>UserName</MiddleText>
              <MiddleText>010-1234-1234</MiddleText>
            </MiddleTextBox>
            <ReservationTextContainer>
              <ReservationTextBox>
                <ReservationText>예약번호 # 1</ReservationText>
                <ReservationText>카드 ID # 123AD54F123567</ReservationText>
                <ReservationText>UserName</ReservationText>
                <ReservationText>010-1234-4567</ReservationText>
              </ReservationTextBox>
              <ReservationTextBox>
                <ReservationText>예약번호 # 2</ReservationText>
                <ReservationText>카드 ID # 123AD54F123567</ReservationText>
                <ReservationText>UserName</ReservationText>
                <ReservationText>010-1234-4567</ReservationText>
              </ReservationTextBox>
              <ReservationTextBox>
                <ReservationText>예약번호 # 3</ReservationText>
                <ReservationText>카드 ID # 123AD54F123567</ReservationText>
                <ReservationText>UserName</ReservationText>
                <ReservationText right={true}>010-1234-4567</ReservationText>
              </ReservationTextBox>
            </ReservationTextContainer>
          </DataCard>
          <DataCard hasHoverEvent={false}>
            <Title>UserID1234</Title>
            <MiddleTextBox>
              <MiddleText>UserName</MiddleText>
              <MiddleText>010-1234-1234</MiddleText>
            </MiddleTextBox>
            <ReservationTextContainer>
              <ReservationTextBox>
                <ReservationText>예약번호 # 1</ReservationText>
                <ReservationText>카드 ID # 123AD54F123567</ReservationText>
                <ReservationText>UserName</ReservationText>
                <ReservationText>010-1234-4567</ReservationText>
              </ReservationTextBox>
              <ReservationTextBox>
                <ReservationText>예약번호 # 2</ReservationText>
                <ReservationText>카드 ID # 123AD54F123567</ReservationText>
                <ReservationText>UserName</ReservationText>
                <ReservationText>010-1234-4567</ReservationText>
              </ReservationTextBox>
              <ReservationTextBox>
                <ReservationText>예약번호 # 3</ReservationText>
                <ReservationText>카드 ID # 123AD54F123567</ReservationText>
                <ReservationText>UserName</ReservationText>
                <ReservationText right={true}>010-1234-4567</ReservationText>
              </ReservationTextBox>
              <ReservationTextBox>
                <ReservationText>예약번호 # 4</ReservationText>
                <ReservationText>카드 ID # 123AD54F123567</ReservationText>
                <ReservationText>UserName</ReservationText>
                <ReservationText right={true}>010-1234-4567</ReservationText>
              </ReservationTextBox>
            </ReservationTextContainer>
          </DataCard>
        </div>
      </div>
    </div>
  );
}
