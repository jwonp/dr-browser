export const phoneNumberKeyEvent = (
  e: React.KeyboardEvent<HTMLInputElement>
) => {
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
  if (phoneNumber.length === 12 && e.key !== "-" && phoneNumber[7] === "-") {
    const newPhoneNumber = `${phoneNumber.substring(0, 7)}${phoneNumber[8]}${
      phoneNumber[7]
    }${phoneNumber.substring(9)}`;
    e.currentTarget.value = newPhoneNumber;
  }
};
