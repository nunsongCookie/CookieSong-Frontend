import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Button from "../components/Button";
import styles from "./SolveQuizResult.module.css";

interface Result {
  questionId: number;
  selectedChoiceId: number;
  correctAnswer: number;
  correct: boolean;
}

interface Report {
  userName: string;
  score: number;
  examNumber: string;
  grade: string;
}

const SolveQuizResult = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const responseId = state?.responseId;
  const shareKey = state?.shareKey;
  const userId = state?.userId;

  const [results, setResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [creatorName, setCreatorName] = useState<string>("");
  const [report, setReport] = useState<Report | null>(null);

  // API 호출로 결과 가져오기
  useEffect(() => {
    const fetchResults = async () => {
      if (!responseId) {
        console.error("responseId가 없습니다.");
        return;
      }

      try {
        const response = await fetch(
          `/api/responses/${responseId}/results`
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

  // API 호출로 성적 통지표 가져오기
  useEffect(() => {
    const fetchReport = async () => {
      if (!responseId) {
        console.error("responseId가 없습니다.");
        return;
      }

      try {
        const response = await fetch(
          `/api/responses/${responseId}/submit`
        );

        if (!response.ok) {
          throw new Error("성적 통지표를 가져오는 데 실패했습니다.");
        }

        const data: Report = await response.json();
        setReport(data);
      } catch (error) {
        console.error("Error fetching report:", error);
      }
    };

    fetchReport();
  }, [responseId]);

  const fetchCreatorName = async () => {
    if (!shareKey) {
      console.error("shareKey가 없습니다.");
      return;
    }

    try {
      const response = await fetch(`/api/quizzes/${shareKey}/creator`);
      if (!response.ok) {
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
  }, [shareKey]);

  const handleViewRank = () => {
    navigate(`/solve-quiz-rank/${shareKey}`, {
      state: { responseId: responseId, shareKey: shareKey, userId: userId},
    });
  };

  const handleViewWrong = () => {
    navigate(`/solve-quiz-wrong/${responseId}`, {
      state: { responseId: responseId, shareKey: shareKey, userId: userId},
    });
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <p>결과를 불러오는 중입니다...</p>
      </div>
    );
  }

  // 결과를 반으로 나누기
  const firstHalf = results.slice(0, 5);
  const secondHalf = results.slice(5, 10);

  const modThreePlusOne = (value: number) => {
    const remainder = value % 3;
    return remainder + 1;
  };

  return (
    <div className={styles.container}>
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
                  {modThreePlusOne(result.selectedChoiceId)}
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
                  {modThreePlusOne(result.selectedChoiceId)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Report Title */}
      <div className={styles.reportTitle}>
        2025학년도 우정기억능력시험<br />
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
              <td>{report?.examNumber || "N/A"}</td>
              <td>{report?.userName || "N/A"}</td>
              <td>{report?.score || "0"}</td>
              <td>{report?.grade || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Button */}
      <section className={styles.buttonWrapper}>
        <Button text="등수 확인" onClick={handleViewRank} />
        <Button text="오답 노트" onClick={handleViewWrong} />
      </section>
    </div>
  );
};

export default SolveQuizResult;
