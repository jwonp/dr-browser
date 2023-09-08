"use client";
import Button from "@/assets/Button/Button";
import Text from "@/assets/Text/Text";
import CardContainer, { Grid } from "@/assets/CardContainer/CardContainer";
import styles from "./page.module.scss";
import Provider from "@/redux/Provider";
import { SetStateAction, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  getRegister,
  setId,
  setName,
  setPassword,
  setPhone,
} from "@/redux/featrues/registerSlice";
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
  const router = useRouter();
  const dispatch = useAppDispatch();
  const registerState = useAppSelector(getRegister);
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [notValidPassword, setNotValidPassword] = useState<string>("");
  const [notValidPasswordCheck, setNotValidPasswordCheck] =
    useState<string>("");
  const onSubmit = async () => {
    let isNotValid = false;

    if (registerState.password.length < 8) {
      setNotValidPassword("비밀번호를 8자리 이상 입력해주세요");
      isNotValid = true;
    }
    if (registerState.password !== passwordCheck) {
      setNotValidPasswordCheck("비밀번호가 일치하지 않습니다");
      isNotValid = true;
    }

    if (isNotValid === false) {
      setNotValidPassword("");
      setNotValidPasswordCheck("");
    }
    await axios
      .post(`/api/auth/signup`, registerState)
      .then((res: AxiosResponse<{ result: string }, any>) => {
        if (res.data.result === "SUCCESS") {
          router.push("/login");
        } else {
          setNotValidPasswordCheck(
            "회원가입 도중 오류가 생겼습니다. 다시 시도해주세요."
          );
          setNotValidPassword(
            "회원가입 도중 오류가 생겼습니다. 다시 시도해주세요."
          );
          isNotValid = true;
        }
      });
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
          dispatch(setPassword(e.target.value));
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
  const dispatch = useAppDispatch();
  const registerState = useAppSelector(getRegister);
  const [notValidId, setNotValidId] = useState<string>("");
  const [notValidName, setNotValidName] = useState<string>("");
  const [notValidPhone, setNotValidPhone] = useState<string>("");
  const onSubmit = () => {
    let isNotValid = false;
    if (registerState.phone.length <= 11) {
      setNotValidPhone("전화번호를 입력해주세요");
      isNotValid = true;
    }
    if (registerState.name.length === 0) {
      setNotValidName("이름을 입력해주세요");
      isNotValid = true;
    }
    if (registerState.id.length === 0) {
      setNotValidId("아이디를 입력해주세요");
      isNotValid = true;
    }
    if (!registerState.id) {
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
          dispatch(setId(e.target.value));
        }}
        isEditable
      />
      <Text
        label={"이름"}
        placeholder={"이름을 입력하세요"}
        notValidText={notValidName}
        onChange={(e) => {
          dispatch(setName(e.target.value));
        }}
        isEditable
      />
      <Text
        label={"전화번호"}
        placeholder={"'-' 를 포함해서 입력하세요"}
        notValidText={notValidPhone}
        onChange={(e) => {
          dispatch(setPhone(e.target.value));
        }}
        isEditable
      />
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
