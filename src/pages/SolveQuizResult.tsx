import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import styles from "./SolveQuizResult.module.css";

interface Result {
  questionId: number;
  selectedChoiceId: number;
  correctAnswer: number;
  correct: boolean;
}

const SolveQuizResult = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const responseId = state?.responseId;
  const quizId = state?.quizId;

  const [results, setResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [creatorName, setCreatorName] = useState<string>("");

  // API 호출로 결과 가져오기
  useEffect(() => {
    const fetchResults = async () => {
      if (!responseId) {
        console.error("responseId가 없습니다.");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8080/api/responses/${responseId}/results`
        );

        if (!response.ok) {
          throw new Error("결과를 가져오는 데 실패했습니다.");
        }

        const data = await response.json();
        setResults(data.results);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching results:", error);
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [responseId]);

  const fetchCreatorName = async () => {
    if (!quizId) {
      console.error("quizId가 없습니다.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/quizzes/${quizId}/creator`);
      if (!response.ok) {
        console.log(quizId);
        throw new Error("사용자 이름을 가져오는 데 실패했습니다.");
      }

      const name = await response.text();
      setCreatorName(name);
    } catch (error) {
      console.error("Error fetching creator name:", error);
      setCreatorName("알 수 없음");
    }
  };

  useEffect(() => {
    fetchCreatorName();
  }, [quizId]);

  const handleViewRank = () => {
    navigate(`/solve-quiz-rank/${quizId}`, {
      state: { responseId: responseId, quizId: quizId },
    });
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Header />
        <p>결과를 불러오는 중입니다...</p>
      </div>
    );
  }

  // 결과를 반으로 나누기
  const firstHalf = results.slice(0, 5);
  const secondHalf = results.slice(5, 10);

  return (
    <div className={styles.container}>
      {/* Header */}
      <Header />

      {/* Section Title */}
      <div className={styles.sectionTitle}>1교시 {creatorName} 영역</div>

      {/* Answer Table */}
      <div className={styles.answerTableWrapper}>
        <table className={styles.answerTable}>
          <thead>
            <tr>
              {firstHalf.map((result, index) => (
                <th key={`correct1-${index}`}>
                  <div className={styles.imageWrapper}>
                    <img
                      src={
                        result.correct
                          ? "/quiz_true.png"
                          : "/quiz_false.png"
                      }
                      alt={result.correct ? "정답" : "오답"}
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
              {firstHalf.map((result, index) => (
                <td key={`answer1-${index}`}>
                  {result.selectedChoiceId}
                </td>
              ))}
            </tr>
          </tbody>
          <thead>
            <tr>
              {secondHalf.map((result, index) => (
                <th key={`correct2-${index}`}>
                  <div className={styles.imageWrapper}>
                    <img
                      src={
                        result.correct
                          ? "/quiz_true.png"
                          : "/quiz_false.png"
                      }
                      alt={result.correct ? "정답" : "오답"}
                      className={styles.resultImage}
                    />
                  </div>
                  {index + 6}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {secondHalf.map((result, index) => (
                <td key={`answer2-${index}`}>
                  {result.selectedChoiceId}
                </td>
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
              <td>{results.filter((r) => r.correct).length * 10}</td>
              <td>
                {Math.ceil(
                  (results.filter((r) => r.correct).length / results.length) *
                    5
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Button */}
      <section className={styles.buttonWrapper}>
        <Button text="등수 확인" onClick={handleViewRank} />
        <Button text="오답 노트" onClick={handleViewRank} />
      </section>
    </div>
  );
};

export default SolveQuizResult;
