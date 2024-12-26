import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import styles from "./MakeQuizShare.module.css";

const MakeQuizShare: FunctionComponent = () => {
  const navigate = useNavigate();

  const handleDistributeExam = () => {
    console.log("시험 배부하기 버튼 클릭됨!");
    // Add navigation or logic here if necessary
  };

  return (
    <div className={styles.shareContainer}>
      {/* Header */}
      <Header />

      {/* Envelope Image */}
      <div className={styles.imageWrapper}>
        <img src="/봉투.png" alt="시험 봉투" className={styles.envelopeImage} />
      </div>

      {/* Button */}
      <div className={styles.buttonWrapper}>
        <Button text="시험 배부하기" onClick={handleDistributeExam} />
      </div>
    </div>
  );
};

export default MakeQuizShare;
