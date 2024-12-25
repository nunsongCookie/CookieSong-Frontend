import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import styles from "./SolveQuizResult.module.css";

const SolveQuizResult = () => {
  const navigate = useNavigate();

  const handleViewRank = () => {
    navigate("/solve-quiz-rank");
  };

  // 사용자의 응답과 정답
  const answersFirstHalf = ["응답1", "응답2", "응답3", "응답4", "응답5"];
  const answersSecondHalf = ["응답6", "응답7", "응답8", "응답9", "응답10"];
  const correctAnswersFirstHalf = ["응답1", "응답3", "응답3", "응답4", "응답5"];
  const correctAnswersSecondHalf = ["응답6", "응답7", "응답9", "응답9", "응답10"];

  return (
    <div className={styles.container}>
      {/* Header */}
      <Header />

      {/* Section Title */}
      <div className={styles.sectionTitle}>1교시 최은소 영역</div>

      {/* Answer Table */}
      <div className={styles.answerTableWrapper}>
        <table className={styles.answerTable}>
          <thead>
            <tr>
              {answersFirstHalf.map((answer, index) => (
                <th key={`correct1-${index}`}>
                  <div className={styles.imageWrapper}>
                    <img
                      src={
                        answer === correctAnswersFirstHalf[index]
                          ? "/quiz_true.png"
                          : "/quiz_false.png"
                      }
                      alt={answer === correctAnswersFirstHalf[index] ? "정답" : "오답"}
                      className={styles.resultImage}
                    />
                  </div>
                  {index + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {answersFirstHalf.map((answer, index) => (
                <td key={`answer1-${index}`}>{answer}</td>
              ))}
            </tr>
            <tr>
              {answersSecondHalf.map((answer, index) => (
                <th key={`correct2-${index}`}>
                  <div className={styles.imageWrapper}>
                    <img
                      src={
                        answer === correctAnswersSecondHalf[index]
                          ? "/quiz_true.png"
                          : "/quiz_false.png"
                      }
                      alt={answer === correctAnswersSecondHalf[index] ? "정답" : "오답"}
                      className={styles.resultImage}
                    />
                  </div>
                  {index + 6}
                </th>
              ))}
            </tr>
            <tr>
              {answersSecondHalf.map((answer, index) => (
                <td key={`answer2-${index}`}>{answer}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Report Title */}
      <div className={styles.reportTitle}>
        2024학년도 우정기억능력시험<br />
        성적 통지표
      </div>

      {/* Report Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>수험 번호</th>
              <th>이름</th>
              <th>원점수</th>
              <th>등급</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>02071345</td>
              <td>최은소</td>
              <td>70</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Button */}
      <section className={styles.buttonWrapper}>
        <Button text="등수 확인" onClick={handleViewRank} />
      </section>
    </div>
  );
};

export default SolveQuizResult;
