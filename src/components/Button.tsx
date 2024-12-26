import { FunctionComponent } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button: FunctionComponent<ButtonProps> = ({ text, onClick }) => {
  return (
    <div className={styles.button} onClick={onClick}>
      <div className={styles.buttonTextWrapper}>
        <b className={styles.buttonText}>{text}</b>
      </div>
    </div>
  );
};

export default Button;