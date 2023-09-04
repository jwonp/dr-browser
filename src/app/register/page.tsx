"use client";
import Button from "@/assets/Button/Button";
import Text from "@/assets/Text/Text";
import CardContainer, { Grid } from "@/assets/CardContainer/CardContainer";
import styles from "./page.module.scss";
import Provider from "@/redux/Provider";
import { useState } from "react";
const RegisterWrapper = () => {
  const [isValidId, setValidId] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      <div>
        {isValidId ? (
          <RegistPassward
            onBack={() => {
              setValidId(false);
            }}
          />
        ) : (
          <RegistId
            onValid={() => {
              setValidId(true);
            }}
          />
        )}
      </div>
    </div>
  );
};
const RegistPassward = ({ onBack }: { onBack: () => void }) => {
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [notValidPassword, setNotValidPassword] = useState<string>("");
  const [notValidPasswordCheck, setNotValidPasswordCheck] =
    useState<string>("");
  const onSubmit = () => {
    let isNotValid = false;

    if (password.length < 8) {
      setNotValidPassword("비밀번호를 8자리 이상 입력해주세요");
      isNotValid = true;
    }
    if (password !== passwordCheck) {
      setNotValidPasswordCheck("비밀번호가 일치하지 않습니다");
      isNotValid = true;
    }

    if (isNotValid === false) {
      setNotValidPassword("");
      setNotValidPasswordCheck("");
    }
  };

  return (
    <CardContainer
      isWrappeed
      title={"회원가입"}
      tab={3}
      buttons={
        <Grid>
          <Button onClick={onSubmit}>다음</Button>
          <Button
            onClick={() => {
              onBack();
            }}>
            뒤로
          </Button>
        </Grid>
      }>
      <Text
        label={"비밀번호"}
        type="password"
        placeholder={"비빌번호는 8자리 이상입니다"}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        notValidText={notValidPassword}
        isEditable></Text>
      <Text
        label={"비밀번호 확인"}
        placeholder={"비밀번호를 한 번 더 입력해주세요"}
        notValidText={notValidPasswordCheck}
        type="password"
        onChange={(e) => {
          setPasswordCheck(e.target.value);
        }}
        isEditable></Text>
    </CardContainer>
  );
};
const RegistId = ({ onValid }: { onValid: () => void }) => {
  const [id, setId] = useState<string>("");
  const [notValidId, setNotValidId] = useState<string>("");
  const onSubmit = () => {
    let isNotValid = false;

    if (id.length === 0) {
      setNotValidId("아이디를 입력해주세요");
      isNotValid = true;
    }
    if (!id) {
      setNotValidId("이미 등록된 아이디입니다");
      isNotValid = true;
    }

    if (isNotValid === false) {
      setNotValidId("");
      onValid();
    }
  };
  return (
    <CardContainer
      isWrappeed
      title={"회원가입"}
      tab={3}
      buttons={<Button onClick={onSubmit}>다음</Button>}>
      <Text
        label={"아이디"}
        placeholder={"아이디를 입력하세요"}
        notValidText={notValidId}
        onChange={(e) => {
          setId(e.target.value);
        }}
        isEditable></Text>
    </CardContainer>
  );
};
const Register = () => {
  return (
    <Provider>
      <RegisterWrapper />
    </Provider>
  );
};
export default Register;
