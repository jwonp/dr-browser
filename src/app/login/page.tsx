"use client";
import styles from "@/app/login/page.module.scss";
import FormInputBar from "@/components/form/FormInputBar/FormInputBar";
import { phoneNumberKeyEvent } from "@/components/form/FormInputBar/PhoneNumberEvent";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.container}`}>
        <div className={`${styles.form_wrapper}`}>
          <form className={`${styles.form}`}>
            <FormInputBar
              label="User ID"
              inputProps={{
                id: "login-id",
                type: "text",
                required: true,
                autoFocus: true,
                placeholder: "User ID",
              }}
            />
            <FormInputBar
              label="Phone"
              inputProps={{
                id: "login-phone",
                type: "tel",
                required: true,
                placeholder: "010-XXX(X)-XXXX",
                pattern: "[0-9]{3}-[0-9]{3,4}-[0-9]{4}",
                maxLength: 13,
                onKeyDown: (e) => {
                  phoneNumberKeyEvent(e);
                },
              }}
            />
            <FormInputBar
              inputProps={{
                type: "submit",
                value: "Login",
                onClick: (e) => {
                  e.preventDefault();
                  const userId = (
                    document.getElementById("login-id") as HTMLInputElement
                  ).value;
                  const userPhone = (
                    document.getElementById("login-phone") as HTMLInputElement
                  ).value;
                  console.log(`${userId} and ${userPhone}`);

                  router.push("/reservation");
                },
              }}
            />

            <div className={styles.register_link}>
              <Link href={"/signup"}>Click here to Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
