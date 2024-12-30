import { FunctionComponent } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import styles from "./MakeQuizShare.module.css";

const MakeQuizShare: FunctionComponent = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const { state } = useLocation();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const createDate = state?.createDate;
  const creator = state?.creator;

  const handleDistributeExam = async () => {
    console.log("시험 배부하기 버튼 클릭됨!");

    try {
      const requestData = {
        quizId: quizId,
      };

      // 백엔드로 요청 보내기
      const response = await fetch(`/api/quizzes/share`, {
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

    } catch (error) {
      console.error("Error:", error);
      alert("시험 배부에 실패했습니다!");
    }
  };

  return (
    <div className={styles.shareContainer}>
      {/* Header */}
      <Header />

      {/* Envelope Image with Overlay Text */}
      <div className={styles.imageWrapper}>
        <img src="/봉투.png" alt="시험 봉투" className={styles.envelopeImage} />
        <p className={styles.textOverlay1}>{createDate?.slice(0, 10)}</p>
        <p className={styles.textOverlay2}>{creator}</p>
      </div>

      {/* Button */}
      <div className={styles.buttonWrapper}>
        <Button text="시험 배부하기" onClick={handleDistributeExam} />
      </div>
    </div>
  );
};

export default MakeQuizShare;
