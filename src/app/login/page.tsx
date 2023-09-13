"use client";
import Button from "@/assets/Button/Button";
import styles from "./page.module.scss";
import CardContainer from "@/assets/CardContainer/CardContainer";
import Text from "@/assets/Text/Text";
import Link from "next/link";
import { useState } from "react";

import Provider from "@/redux/Provider";
import axios from "axios";

import { useRouter } from "next/navigation";
type LoginData = {
  username: string;
  password: string;
};
const LoginWrapper = () => {
  const router = useRouter();
  const initLoginData: LoginData = {
    username: "",
    password: "",
  };
  const [loginData, setLoginData] = useState<LoginData>(initLoginData);
  const onSubmit = async () => {
    let isNotValid = false;

    if (loginData.username.length === 0) {
      setNotValidId("아이디를 입력해주세요");
      isNotValid = true;
    }

    if (loginData.password.length < 8) {
      setNotValidPassword("비밀번호를 8자리 이상 입력해주세요");
      isNotValid = true;
    }

    if (isNotValid === false) {
      setNotValidId("");
      setNotValidPassword("");
    }

    await axios
      .post(`/api/auth/login`, loginData)
      .then((res) => {
        if (Object.keys(res.data).includes("jwt")) {
          window.localStorage.setItem("jwt", res.data.jwt);
          router.push("/");
          return;
        }
        setNotValidId("아이디 혹은 비밀번호가 올바르지 않습니다");
        setNotValidPassword("아이디 혹은 비밀번호가 올바르지 않습니다");
      })
      .catch(() => {
        setNotValidId("아이디 혹은 비밀번호가 올바르지 않습니다");
        setNotValidPassword("아이디 혹은 비밀번호가 올바르지 않습니다");
        isNotValid = true;
      });
  };
  const [notValidId, setNotValidId] = useState<string>();
  const [notValidPassword, setNotValidPassword] = useState<string>();
  return (
    <div className={styles.container}>
      <div>
        <CardContainer
          isWrappeed
          title={"로그인"}
          buttons={
            <>
              <Button onClick={onSubmit}>로그인</Button>
              <div className={styles.registerLink}>
                <Link href={"/register"}>{"회원가입"}</Link>
              </div>
            </>
          }
          tab={3}>
          <Text
            label={"아이디"}
            placeholder={"아이디를 입력하세요"}
            onChange={(e) => {
              setLoginData(() => {
                return {
                  username: e.target.value,
                  password: loginData.password,
                };
              });
            }}
            notValidText={notValidId}
            isEditable></Text>
          <Text
            label={"비밀번호"}
            type={"password"}
            placeholder={"비밀번호는 8자리 이상입니다"}
            onChange={(e) => {
              setLoginData(() => {
                return {
                  username: loginData.username,
                  password: e.target.value,
                };
              });
            }}
            notValidText={notValidPassword}
            isEditable></Text>
        </CardContainer>
      </div>
    </div>
  );
};

const Login = () => {
  return (
    <Provider>
      <LoginWrapper />
    </Provider>
  );
};
export default Login;
