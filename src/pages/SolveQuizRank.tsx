import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import styles from "./SolveQuizRank.module.css";

interface User {
  name: string;
  score: number | string;
  rank?: number;
}

const SolveQuizRank = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const responseId = state?.responseId;
  const shareKey = state?.shareKey;
  const userId = state?.userId;

  const [top3, setTop3] = useState<User[]>([
    { name: "참여자 없음", score: "-", rank: 1 },
    { name: "참여자 없음", score: "-", rank: 2 },
    { name: "참여자 없음", score: "-", rank: 3 },
  ]);

  const [others, setOthers] = useState<User[]>([
    { rank: 4, name: "참여자 없음", score: "-" },
    { rank: 5, name: "참여자 없음", score: "-" },
    { rank: 6, name: "참여자 없음", score: "-" },
  ]);

  const [myScore, setMyScore] = useState<User | null>(null);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await fetch(`/api/result/${shareKey}`);
        const data = await response.json();

        if (data.rankings && data.rankings.length > 0) {
          const sortedRankings = data.rankings.sort((a: any, b: any) => a.rank - b.rank);
          const topRankers = Array(3)
            .fill(null)
            .map((_, index) =>
              sortedRankings[index]
                ? {
                    name: sortedRankings[index].userName,
                    score: sortedRankings[index].score,
                    rank: sortedRankings[index].rank,
                  }
                : { name: "참여자 없음", score: "-", rank: index + 1 }
            );

          const otherRankers = Array(3)
            .fill(null)
            .map((_, index) => {
              const rankingIndex = index + 3;
              return sortedRankings[rankingIndex]
                ? {
                    rank: sortedRankings[rankingIndex].rank,
                    name: sortedRankings[rankingIndex].userName,
                    score: sortedRankings[rankingIndex].score,
                  }
                : {
                    rank: rankingIndex + 1,
                    name: "참여자 없음",
                    score: "-",
                  };
            });

          const myData = sortedRankings.find((user: any) => user.userId === userId) || null;

          setTop3(topRankers);
          setOthers(otherRankers);
          setMyScore(
            myData
              ? {
                  rank: myData.rank,
                  name: myData.userName,
                  score: myData.score,
                }
              : null
          );
        }
      } catch (error) {
        console.error("Failed to fetch rankings:", error);
      }
    };

    fetchRankings();
  }, [shareKey, responseId, userId]);

  const handleBack = () => {
    navigate(`/quiz/${shareKey}`, {
      state: { shareKey: shareKey },
    });
  };

  const handleCreateQuiz = () => {
    navigate("/make-quiz-main");
  };

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
        {top3.map((user) => (
          <div
            key={user.rank}
            className={`${styles.podiumColumn} ${
              user.rank === 1
                ? styles.firstPlace
                : user.rank === 2
                ? styles.secondPlace
                : styles.thirdPlace
            }`}
          >
            <div className={styles.podiumUser}>
              <p className={styles.userName}>{user.name}</p>
              <p className={styles.userScore}>{user.score}점</p>
            </div>
            <div className={styles.podiumNumber}>{user.rank}</div>
          </div>
        ))}
      </div>

      {/* Other Ranks */}
      <div className={styles.otherRanks}>
        {others.map((user) => (
          <div
            key={user.rank}
            className={`${styles.rankBox} ${user.name === myScore?.name ? styles.myRank : ""}`}
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
        {myScore ? (
          <div className={`${styles.rankBox} ${styles.myRank}`}>
            <span>{myScore.rank ?? "-"}</span>
            <span>{myScore.name}</span>
            <span>{typeof myScore.score === "number" ? `${myScore.score}점` : myScore.score}</span>
          </div>
        ) : (
          <p>아직 퀴즈에 참여하지 않으셨습니다</p>
        )}
      </div>

      {/* Button */}
      <div className={styles.buttonWrapper}>
        <Button text="나만의 연말 모의고사 만들기" onClick={handleCreateQuiz} />
      </div>
    </div>
  );
};

export default SolveQuizRank;
