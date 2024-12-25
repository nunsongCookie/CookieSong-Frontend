import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import QuizButton from "../components/QuizButton";
import OptionComponent from "../components/OptionComponent";
import styles from "./SolveQuiz.module.css";

interface Question {
  questionId: number;
  questionText: string;
}

const SolveQuiz: FunctionComponent = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const navigate = useNavigate();

  /* 더미 데이터로 테스트 */
    useEffect(() => {
      const dummyQuestions: Question[] = [
        { questionId: 1, questionText: "올해 내가 구매한 가장 비쌌던 물건은?" },
        { questionId: 2, questionText: "올해 내가 제일 열광했던 영화나 드라마 속 캐릭터는?" },
        { questionId: 3, questionText: "올해 가장 재밌게 본 영화나 드라마는?" },
        { questionId: 4, questionText: "올해 내가 겪은 가장 큰 행운은?" },
        { questionId: 5, questionText: "올해 가장 자주 들은 노래는?" },
        { questionId: 6, questionText: "올해 선정한 나만 알고 싶은 소울 맛집?" },
        { questionId: 7, questionText: "올해 내가 가장 민망했던 순간은?" },
        { questionId: 8, questionText: "올해 구매한 물건 중 가장 후회되는 것은?" },
        { questionId: 9, questionText: "올해 가장 자주 사용한 앱은?" },
        { questionId: 10, questionText: "올해 내가 가장 자주 시킨 배달 음식 종류는?" },
      ];
      setQuestions(dummyQuestions);
    }, []);
  
    /* 데이터 가져오기, 백엔드 연결하면 이걸로로
    useEffect(() => {
      const fetchQuestions = async () => {
        try {
          const response = await fetch("/api/questions");
          const data: Question[] = await response.json();
          setQuestions(data);
        } catch (error) {
          console.error("Failed to fetch questions:", error);
        }
      };
  
      fetchQuestions();
    }, []);
    */

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handlePrevious = () => {
    if (currentQuestionIndex === 0) {
      navigate("/solve-quiz-main");
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      setSelectedOption(null);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex === totalQuestions - 1) {
      navigate("/solve-quiz-result");
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
    }
  };

  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

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

      {/* 옵션 선택 영역 */}
      <section className={styles.optionSection}>
        <OptionComponent
          optionText="옵션 1"
          isSelected={selectedOption === "옵션 1"}
          onSelect={() => handleOptionSelect("옵션 1")}
        />
        <OptionComponent
          optionText="옵션 2"
          isSelected={selectedOption === "옵션 2"}
          onSelect={() => handleOptionSelect("옵션 2")}
        />
        <OptionComponent
          optionText="옵션 3"
          isSelected={selectedOption === "옵션 3"}
          onSelect={() => handleOptionSelect("옵션 3")}
        />
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

export default SolveQuiz;
