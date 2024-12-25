import { FunctionComponent } from "react";
import styles from "./QuizButton.module.css";

interface ButtonProps {
  onPrevious: () => void;
  onNext: () => void;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
}

const QuizButton: FunctionComponent<ButtonProps> = ({
  onPrevious,
  onNext,
  isPreviousDisabled,
  isNextDisabled,
}) => {
  return (
    <section className={styles.buttonContainer}>
      <button
        className={styles.previousButton}
        onClick={onPrevious}
        disabled={isPreviousDisabled}
      >
        이전
      </button>
      <button
        className={styles.nextButton}
        onClick={onNext}
        disabled={isNextDisabled}
      >
        다음
      </button>
    </section>
  );
};

export default QuizButton;
