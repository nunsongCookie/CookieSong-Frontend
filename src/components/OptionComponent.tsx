import { FunctionComponent } from "react";
import styles from "./OptionComponent.module.css";

interface OptionComponentProps {
  optionText: string;
  isSelected: boolean;
  onSelect: () => void;
}

const OptionComponent: FunctionComponent<OptionComponentProps> = ({
  optionText,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      className={`${styles.optionContainer} ${isSelected ? styles.selected : ""}`}
      onClick={onSelect}
    >
      <div className={`${styles.circle} ${isSelected ? styles.selectedCircle : ""}`} />
      <span className={styles.optionText}>{optionText}</span>
    </div>
  );
};

export default OptionComponent;
