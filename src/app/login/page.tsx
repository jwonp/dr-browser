"use client";
import styles from "@/app/login/page.module.scss";
import FormInputBar from "@/components/form/FormInputBar/FormInputBar";
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
              inputProps={{
                id: "login-phone",
                type: "tel",
                required: true,
                placeholder: "010-1234-5678",
                pattern: "[0-9]{3}-[0-9]{3,4}-[0-9]{4}",
                maxLength: 13,
                onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Backspace") {
                    return;
                  }
                  const phoneNumber = e.currentTarget.value;
                  if (phoneNumber.length === 3 && e.key !== "-") {
                    const before = phoneNumber.substring(0, 3);
                    const after = phoneNumber.substring(3);
                    const newPhoneNumber = `${before}-${after}`;
                    e.currentTarget.value = newPhoneNumber;
                  }
                  if (phoneNumber.length === 7 && e.key !== "-") {
                    const before = phoneNumber.substring(0, 7);
                    const after = phoneNumber.substring(7);
                    const newPhoneNumber = `${before}-${after}`;
                    e.currentTarget.value = newPhoneNumber;
                  }
                  if (
                    phoneNumber.length === 12 &&
                    e.key !== "-" &&
                    phoneNumber[7] === "-"
                  ) {
                    const newPhoneNumber = `${phoneNumber.substring(0, 7)}${
                      phoneNumber[8]
                    }${phoneNumber[7]}${phoneNumber.substring(9)}`;
                    e.currentTarget.value = newPhoneNumber;
                  }
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
