"use client";
import { HTMLInputTypeAttribute } from "react";
import styles from "./Text.module.scss";
interface TextProps {
  label: string;
  type?: HTMLInputTypeAttribute;
  notValidText?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  isEditable?: boolean;
  isButton?: boolean;
  children?: string;
}
const Text = ({
  isEditable,
  isButton,
  type,
  label,
  notValidText,
  onChange,
  children,
}: TextProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.label}>{label}</div>
      <div className={`${styles.textBox} ${isButton && styles.button}`}>
        <input
          className={`${styles.input} ${isButton && styles.pointer}`}
          type={type}
          maxLength={100}
          readOnly={!isEditable}
          defaultValue={children}
          onChange={onChange}
          required
        />
      </div>
      <div className={styles.notValid}>{notValidText}</div>
    </div>
  );
};

export default Text;
