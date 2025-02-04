import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import styles from "./MakeQuizMain.module.css";

const Frame: FunctionComponent = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const handleUserNameChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserName(event.target.value);
  };

  const handleStartQuiz = async () => {
    try{
      const userResponse = await fetch(`/api/users`, {
        method : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name: userName}),
      });

      if(!userResponse.ok){
        throw new Error("유저 생성에 실패했습니다.");
      }

      const userData = await userResponse.json();
      const creatorUserId = userData.id;

      // 퀴즈 생성
      const quizResponse = await fetch(`/api/quizzes`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({creatorUserId: creatorUserId}),
      });

      if(!quizResponse.ok){
        throw new Error("퀴즈 생성에 실패했습니다.");
      }

      const quizData = await quizResponse.json();

      // 퀴즈 페이지 이동 
      navigate(`/make-quiz/${quizData.shareKey}`, {
        state: { createDate: userData.createdAt, creator: userData.name },
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
        <p className={styles.title}>2025학년도 우정기억능력시험</p>
        <p className={styles.title}>연초 모의평가 문제지</p>
      </div>

      <div className={styles.inputContainer}>
        <textarea
          className={styles.textboxName}
          rows={3}
          cols={9}
          value={userName}
          onChange={handleUserNameChange}
          placeholder="이름"
        />
        <div className={styles.titleContainer}>
          <h1 className={styles.h1}>영역</h1>
        </div>
      </div>

      <div className={styles.testContainerInner}>
        <div className={styles.firstParagraph}>
          <p className={styles.text}>
            본 모의고사는 한 해를 돌아보는 목적으로 제작되었습니다.
          </p>
          <p className={styles.text}>
            각 문항에 정답을 입력하고 친구들에게<br />
            공유해 우정 테스트를 진행해보세요!
          </p>
          <p className={styles.text}>
            총 10 문항입니다.
          </p>
        </div>
      </div>

      <section className={styles.buttonWrapper}>
        <Button text="연말 모의고사 만들기" onClick={handleStartQuiz} />
      </section>
    </div>
  );
};

export default Frame;