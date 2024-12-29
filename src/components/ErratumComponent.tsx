import { FunctionComponent } from "react";
import styles from "./ErratumComponent.module.css";

interface ErratumComponentProps {
  optionText: string;
  isSelected: boolean;
  isCorrect?: boolean;
}

const ErratumComponent: FunctionComponent<ErratumComponentProps> = ({
  optionText,
  isSelected,
  isCorrect,
}) => {
  const getBorderClass = () => {
    if (isSelected && isCorrect) return styles.correctBorder;
    if (isSelected) return styles.selectedBorder;
    if (isCorrect) return styles.correctBorder;
    return "";
  };

  const getCircleClass = () => {
    if (isSelected && isCorrect) return styles.correctCircle;
    if (isSelected) return styles.selectedCircle;
    if (isCorrect) return styles.correctCircle;
    return "";
  };

  return (
    <div className={`${styles.optionContainer} ${getBorderClass()}`}>
      <div
        className={`${styles.circle}`}
      />
      <span className={styles.optionText}>{optionText}</span>
    </div>
  );
};

export default ErratumComponent;
