import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import QuizButton from "../components/QuizButton";
import styles from "./MakeQuiz.module.css";

interface Question {
  questionId: number;
  questionText: string;
}

const MakeQuiz: FunctionComponent = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const {quizId} = useParams<{quizId: string}>();
  const navigate = useNavigate();

  /* 더미 데이터로 테스트 */
  // useEffect(() => {
  //   const dummyQuestions: Question[] = [
  //     { questionId: 1, questionText: "올해 내가 구매한 가장 비쌌던 물건은?" },
  //     { questionId: 2, questionText: "올해 내가 제일 열광했던 영화나 드라마 속 캐릭터는?" },
  //     { questionId: 3, questionText: "올해 가장 재밌게 본 영화나 드라마는?" },
  //     { questionId: 4, questionText: "올해 내가 겪은 가장 큰 행운은?" },
  //     { questionId: 5, questionText: "올해 가장 자주 들은 노래는?" },
  //     { questionId: 6, questionText: "올해 선정한 나만 알고 싶은 소울 맛집?" },
  //     { questionId: 7, questionText: "올해 내가 가장 민망했던 순간은?" },
  //     { questionId: 8, questionText: "올해 구매한 물건 중 가장 후회되는 것은?" },
  //     { questionId: 9, questionText: "올해 가장 자주 사용한 앱은?" },
  //     { questionId: 10, questionText: "올해 내가 가장 자주 시킨 배달 음식 종류는?" },
  //   ];
  //   setQuestions(dummyQuestions);
  // }, []);

  // 데이터 가져오기, 백엔드 연결하면 이걸로로
  // useEffect(() => {
  //   const fetchQuestions = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8080/api/quizzes/${quizId}");
  //       const data: Question[] = await response.json();
  //       setQuestions(data);
  //     } catch (error) {
  //       console.error("Failed to fetch questions:", error);
  //     }
  //   };

  //   fetchQuestions();
  // }, []);
  useEffect(()=> {
    const fetchQuizData = async() => {
      try{
        const response = await fetch(`http://localhost:8080/api/questions`);
        if(!response.ok){
          throw new Error("질문 데이터를 불러오는 데 실패했습니다.");
        }

        const data : Question[] = await response.json();
        setQuestions(data);
      } catch(error){
        console.error("질문 데이터를 불러오는 데 실패했습니다!", error);
      }
    };

    fetchQuizData();
  }, []);
  
  const currentQuestion = questions[currentQuestionIndex]; // 현재 질문
  const totalQuestions = questions.length; // 총 질문수 계산 

  // 이전 
  const handlePrevious = () => {
    if (currentQuestionIndex === 0) {
      navigate("/make-quiz-main");
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  // 다음 
  const handleNext = () => {
    if (currentQuestionIndex === totalQuestions - 1) {
      navigate("/make-quiz-share");
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  //const progressPercentage = (currentQuestionIndex + 1) / totalQuestions * 100;
  const progressPercentage = totalQuestions >0? ((currentQuestionIndex+1)/totalQuestions)*100:0;

  return (
    <div className={styles.div}>

      <Header />

      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {currentQuestion ? (
        <div className={styles.questionContainer}>
          <h3 className={styles.questionNumber}>
            Q{currentQuestion.questionId}.
          </h3>
          <h3 className={styles.questionText}>{currentQuestion.questionText}</h3>
        </div>
      ) : (
        <p>Loading questions...</p>
      )}

      <section className={styles.correctAnswerSection}>
        <h3 className={styles.correctAnswerTitle}>
          정답 보기를 입력해주세요
        </h3>
        <input
          className={styles.correctAnswerInput}
          type="text"
          placeholder="정답 보기"
        />
      </section>

      <section className={styles.answerSection}>
        <h3 className={styles.answerTitle}>오답 보기를 입력해주세요</h3>
        <div className={styles.inputGroup}>
          <input className={styles.input} type="text" placeholder="보기 1" />
          <input className={styles.input} type="text" placeholder="보기 2" />
        </div>
      </section>

      <div className={styles.buttonWrapper}>
        <QuizButton
          onPrevious={handlePrevious}
          onNext={handleNext}
          isPreviousDisabled={false}
          isNextDisabled={false}
        />
      </div>
    </div>
  );
};

export default MakeQuiz;
