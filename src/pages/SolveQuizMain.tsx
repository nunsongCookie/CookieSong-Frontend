import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import styles from "./SolveQuizMain.module.css";

const Frame: FunctionComponent = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate("/solve-quiz");
  };

  return (
    <div className={styles.frameContainer}>
      <div className={styles.testContent}>
        <span>1교시</span>
      </div>

      <div className={styles.textContainer}>
        <p className={styles.title}>2024학년도 우정기억능력시험</p>
        <p className={styles.title}>연말 모의평가 문제지</p>
      </div>

      <div className={styles.titleContainer}>
        <h1 className={styles.h1}>최은소 영역</h1>
      </div>

      <div className={styles.testContainerInner}>
        <div className={styles.firstParagraph}>
          <p className={styles.text}>
            본 모의고사는 한 해를 돌아보는 목적으로 제작되었습니다.
          </p>
          <p className={styles.text}>
            최은소 님의 한 해가 어땠는지 기억을<br />
            되짚어 퀴즈를 풀어주세요!
          </p>
        </div>
      </div>

      <section className={styles.nameSection}>
        <h2 className={styles.nameLabel}>이름 :</h2>
        <textarea className={styles.textboxName} rows={3} cols={9} />
      </section>

      <section className={styles.buttonWrapper}>
        <Button text="연말 모의고사 풀어보기" onClick={handleStartQuiz} />
      </section>
    </div>
  );
};

export default Frame;
