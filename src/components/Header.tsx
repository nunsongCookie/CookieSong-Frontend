import { FunctionComponent } from "react";
import styles from "./Header.module.css";

const Header: FunctionComponent = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>찐친고사</h1>
    </header>
  );
};

export default Header;
