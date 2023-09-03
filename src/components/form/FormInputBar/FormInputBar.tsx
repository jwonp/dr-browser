import { DetailedHTMLProps, InputHTMLAttributes } from "react";

import styles from "@/components/form/FormInputBar/FormInputBar.module.scss";
const FormInputBar = ({
  label,
  inputProps,
}: {
  label?: string;
  inputProps: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}) => {
  return (
    <div className={`${styles.input_container}`}>
      <label htmlFor={inputProps.id}>{label}</label>
      <input
        role={inputProps.id}
        {...inputProps}
      />
    </div>
  );
};

export default FormInputBar;
