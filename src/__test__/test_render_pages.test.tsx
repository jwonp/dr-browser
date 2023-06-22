import "@testing-library/jest-dom";
import Reservation from "@/app/reservation/page";
import { screen } from "@testing-library/dom";
import { fireEvent, render } from "@testing-library/react";
import FormInputBar from "@/components/form/FormInputBar/FormInputBar";
import userEvent from "@testing-library/user-event";
test("test reservation page", () => {
  render(<Reservation />);
  screen.findByText("reservation");

  expect(screen.getByText("reservation"));
});

test("Form input bar", async () => {
  render(
    <FormInputBar
      label={"User ID"}
      inputProps={{
        id: "login-id",
        type: "text",
        required: true,
        autoFocus: true,
        placeholder: "User ID",
      }}
    />
  );
  const formInputBar = screen.getByLabelText("User ID") as HTMLInputElement;

  fireEvent.change(formInputBar, { target: { value: "AB" } });

  expect(formInputBar.value).toBe("AB");
});

test("input phone number keyDownEvent", async () => {
  render(
    <FormInputBar
      label="login-phone"
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
  );
  const LoginPhone: HTMLInputElement = screen.getByLabelText("login-phone");

  const user = userEvent.setup();

  await user.click(LoginPhone);

  await user.keyboard("0101");
  expect(LoginPhone).toHaveValue("010-1");

  await user.keyboard("234");
  expect(LoginPhone).toHaveValue("010-123-4");

  await user.keyboard("567");
  expect(LoginPhone).toHaveValue("010-123-4567");
  
  await user.keyboard("8");
  expect(LoginPhone).toHaveValue("010-1234-5678");
});
