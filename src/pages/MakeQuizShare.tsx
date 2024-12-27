import { FunctionComponent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import styles from "./MakeQuizShare.module.css";

const MakeQuizShare: FunctionComponent = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();

  const handleDistributeExam = async () => {
    console.log("시험 배부하기 버튼 클릭됨!");

    try {
      const requestData = {
        quizId: quizId, // 동적으로 받아온 quizId 사용
      };

      // 백엔드로 요청 보내기
      const response = await fetch("http://localhost:8080/api/quizzes/share", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("시험 배부에 실패했습니다.");
      }

      const responseData = await response.json();
      const generatedShareUrl = responseData.shareUrl;

      console.log("공유 URL:", generatedShareUrl);

      // 클립보드에 링크 복사
      await navigator.clipboard.writeText(generatedShareUrl);

      // 사용자에게 알림
      alert(`시험 공유 링크가 생성되었습니다:\n${generatedShareUrl}`);
    } catch (error) {
      console.error("Error:", error);
      alert("시험 배부에 실패했습니다!");
    }
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
