import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import styles from "./SolveQuizMain.module.css";

const Frame: FunctionComponent = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const { shareKey } = useParams<{ shareKey: string }>();
  const [creatorName, setCreatorName] = useState<string>("");
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  // 유저 이름 입력
  const handleUserNameChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserName(event.target.value);
  };

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
      state: { shareKey: shareKey },
    });
  };

  // 유저 생성
  const handleStartQuiz = async () => {
    if (!userName.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }
    
    try{
      const userResponse = await fetch(`/api/responses`, {
        method : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({shareKey: shareKey, userName: userName}),
      });

      if(!userResponse.ok){
        throw new Error("유저 생성에 실패했습니다.");
      }

      const userData = await userResponse.json();

      // 퀴즈 페이지 이동 
      navigate(`/solve-quiz/${shareKey}`, {
        state: { responseId: userData.id, userId: userData.responseUserId },
      });
    }
    catch(error){
      console.error("Error: ", error);
      alert("퀴즈 생성에 실패했습니다!");
    }
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
        <h1 className={styles.h1}>{creatorName} 영역</h1>
      </div>

      <div className={styles.testContainerInner}>
        <div className={styles.firstParagraph}>
          <p className={styles.text}>
            본 모의고사는 한 해를 돌아보는 목적으로 제작되었습니다.
          </p>
          <p className={styles.text}>
          {creatorName} 님의 한 해가 어땠는지 기억을 되짚어 퀴즈를 풀어주세요!
          </p>
          <p className={styles.text}>
            총 10 문항입니다.
          </p>
        </div>
      </div>

      <section className={styles.nameSection}>
        <h2 className={styles.nameLabel}>이름 :</h2>
        <textarea
          className={styles.textboxName}
          rows={3}
          cols={9}
          value={userName}
          onChange={handleUserNameChange}
        />
      </section>

      <section className={styles.buttonWrapper}>
        <Button text="모의고사 풀기" onClick={handleStartQuiz} />
        <Button text="등수 확인" onClick={handleViewRank} />
      </section>
    </div>
  );
};

export default Frame;