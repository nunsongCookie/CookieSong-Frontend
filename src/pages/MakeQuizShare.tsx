import { FunctionComponent, useEffect } from "react";
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

      if (window.Kakao && window.Kakao.isInitialized()) {
        window.Kakao.Share.sendDefault({
          objectType: "feed",
          content: {
            title: "2024학년도 우정기억능력시험",
            description: `${creator} 영역 풀어보기`,
            imageUrl: `https://examready2025.site/preview_square.png`,
            link: {
              mobileWebUrl: generatedShareUrl,
              webUrl: generatedShareUrl,
            },
          },
          buttons: [
            {
              title: "모의고사 풀기",
              link: {
                mobileWebUrl: generatedShareUrl,
                webUrl: generatedShareUrl,
              },
            },
          ],
          installTalk: true,
        });
      } else {
        console.error("Kakao SDK가 초기화되지 않았습니다.");
        alert("카카오톡 공유를 사용할 수 없습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("시험 배부에 실패했습니다!");
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      navigate("/make-quiz-main", { replace: true });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

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
