"use client";
import styles from "@/app/signup/page.module.scss";
import FormInputBar from "@/components/form/FormInputBar/FormInputBar";
import { phoneNumberKeyEvent } from "@/components/form/FormInputBar/PhoneNumberEvent";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.container}`}>
        <div className={`${styles.form_wrapper}`}>
          <form className={`${styles.form}`}>
            <FormInputBar
              label="User ID"
              inputProps={{
                id: "user-id",
                type: "text",
                required: true,
                placeholder: "User ID",
              }}
            />
            <FormInputBar
              label="User Name"
              inputProps={{
                id: "user-name",
                type: "text",
                required: true,
                placeholder: "User Name",
              }}
            />
            <FormInputBar
              label="Phone"
              inputProps={{
                id: "user-phone",
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
                value: "Sign Up",
                onClick: (e) => {
                  e.preventDefault();
                  const userId = (
                    document.getElementById("user-id") as HTMLInputElement
                  ).value;
                  const userName = (
                    document.getElementById("user-name") as HTMLInputElement
                  ).value;
                  const userPhone = (
                    document.getElementById("user-phone") as HTMLInputElement
                  ).value;

                  console.log(`${userId} and ${userName} and ${userPhone}`);

                  router.push("/reservation");
                },
              }}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
