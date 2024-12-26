import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import styles from "./SolveQuizRank.module.css";

const SolveQuizRank = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/solve-quiz-result");
  };

  const handleCreateQuiz = () => {
    navigate("/make-quiz-main");
  };

  // 더미 데이터
  const top3 = [
    { name: "조의신", score: 90 },
    { name: "안다인", score: 100 },
    { name: "김유리", score: 80 },
  ];

  const others = [
    { rank: 4, name: "김유리", score: 70 },
    { rank: 5, name: "최은소", score: 70 },
    { rank: 6, name: "한이", score: 70 },
  ];

  const myScore = { rank: 5, name: "최은소", score: 70 };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.rankHeader}>
        <button className={styles.backButton} onClick={handleBack}>
          &lt;
        </button>
        <h1 className={styles.title}>찐친고사 순위표</h1>
      </div>

      {/* Podium */}
      <div className={styles.podium}>
        {top3.map((user, index) => (
          <div
            key={index}
            className={`${styles.podiumColumn} ${
              index === 1
                ? styles.firstPlace
                : index === 0
                ? styles.secondPlace
                : styles.thirdPlace
            }`}
          >
            <div className={styles.podiumUser}>
              <p className={styles.userName}>{user.name}</p>
              <p className={styles.userScore}>{user.score}점</p>
            </div>
            <div className={styles.podiumNumber}>{index === 1 ? 1 : index === 0 ? 2 : 3}</div>
          </div>
        ))}
      </div>

      {/* Other Ranks */}
      <div className={styles.otherRanks}>
        {others.map((user) => (
          <div
            key={user.rank}
            className={`${styles.rankBox} ${
              user.name === myScore.name ? styles.myRank : ""
            }`}
          >
            <span>{user.rank}</span>
            <span>{user.name}</span>
            <span>{user.score}</span>
          </div>
        ))}
      </div>

      {/* My Score */}
      <div className={styles.myScore}>
        <h3>내 점수</h3>
        <div className={`${styles.rankBox} ${styles.myRank}`}>
          <span>{myScore.rank}</span>
          <span>{myScore.name}</span>
          <span>{myScore.score}</span>
        </div>
      </div>

      {/* Button */}
      <div className={styles.buttonWrapper}>
        <Button text="나만의 연말 모의고사 만들기" onClick={handleCreateQuiz} />
      </div>
    </div>
  );
};

export default SolveQuizRank;
