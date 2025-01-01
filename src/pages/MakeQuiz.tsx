import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Header from "../components/Header";
import QuizButton from "../components/QuizButton";
import styles from "./MakeQuiz.module.css";

interface Question {
  questionId: number;
  questionText: string;
}

interface Choice {
  questionId: number;
  correctAnswer: string;
  wrongAnswers: string[];
}

const MakeQuiz: FunctionComponent = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [choices, setChoices] = useState<Choice[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [wrongAnswers, setWrongAnswers] = useState<string[]>(["", ""]);
  const { quizId } = useParams<{ quizId: string }>();
  const { state } = useLocation();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const createDate = state?.createDate;
  const creator = state?.creator;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`/api/questions`);
        if (!response.ok) {
          throw new Error("질문 데이터를 불러오는 데 실패했습니다.");
        }

        const data: Question[] = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("질문 데이터를 불러오는 데 실패했습니다!", error);
      }
    };

    fetchQuestions();
  }, []);

  const saveChoice = () => {
    const currentQuestionId = questions[currentQuestionIndex]?.questionId;
    if (!currentQuestionId) return;

    const updatedChoices = [
      ...choices.filter((choice) => choice.questionId !== currentQuestionId),
      { questionId: currentQuestionId, correctAnswer, wrongAnswers },
    ];

    setChoices(updatedChoices);
  };

  useEffect(() => {
    if (choices.length === questions.length) {
      submitChoices();
    }
  }, [choices]);

  const handleNext = () => {
    if (!correctAnswer.trim() || wrongAnswers.some((answer) => !answer.trim())) {
      alert("모든 보기를 입력해주세요.");
      return;
    }

    saveChoice();

    if (currentQuestionIndex === questions.length - 1) {
      setTimeout(() => {
        navigate(`/make-quiz-share/${quizId}`, {
          state: { createDate: createDate, creator: creator },
          replace: true,
        });
      }, 0);
      return;
    }

    setCorrectAnswer("");
    setWrongAnswers(["", ""]);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const submitChoices = async () => {
    if (!quizId) {
      console.error("Quiz Id is null");
      alert("퀴즈 ID가 없습니다.");
      return;
    }
    console.log("Submitting choices:", choices);

    try {
      const response = await fetch(`/api/choices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizId: Number(quizId),
          choices,
        }),
      });

      if (!response.ok) {
        throw new Error("보기 저장에 실패했습니다.");
      }

      console.log("보기 저장 완료");
    } catch (error) {
      console.error("보기 저장 중 오류 발생 : ", error);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className={styles.div}>
      <Header />

      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{
            width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      {/* Question Section */}
      {currentQuestion ? (
        <div className={styles.questionContainer}>
          <h3 className={styles.questionNumber}>Q{currentQuestion.questionId}.</h3>
          <h3 className={styles.questionText}>{currentQuestion.questionText}</h3>
        </div>
      ) : (
        <p>Loading questions...</p>
      )}

      {/* Correct Answer Section */}
      <section className={styles.correctAnswerSection}>
        <h3 className={styles.correctAnswerTitle}>정답 보기를 입력해주세요</h3>
        <input
          className={styles.correctAnswerInput}
          type="text"
          placeholder="정답 보기"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
        />
      </section>

      {/* Wrong Answers Section */}
      <section className={styles.answerSection}>
        <h3 className={styles.answerTitle}>오답 보기를 입력해주세요</h3>
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="text"
            placeholder="보기 1"
            value={wrongAnswers[0]}
            onChange={(e) => {
              const newAnswers = [...wrongAnswers];
              newAnswers[0] = e.target.value;
              setWrongAnswers(newAnswers);
            }}
          />
          <input
            className={styles.input}
            type="text"
            placeholder="보기 2"
            value={wrongAnswers[1]}
            onChange={(e) => {
              const newAnswers = [...wrongAnswers];
              newAnswers[1] = e.target.value;
              setWrongAnswers(newAnswers);
            }}
          />
        </div>
      </section>

      {/* Navigation Buttons */}
      <div className={styles.buttonWrapper}>
        <QuizButton
          onPrevious={() => {
            if (currentQuestionIndex > 0) {
              setChoices((prevChoices) => {
                const updatedChoices = [...prevChoices];
                const currentQuestionId = questions[currentQuestionIndex]?.questionId;

                return updatedChoices.filter((choice) => choice.questionId !== currentQuestionId);
              });

              setCorrectAnswer("");
              setWrongAnswers(["", ""]);
              setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
            } else {
              navigate("/make-quiz-main");
            }
          }}
          onNext={handleNext}
          isPreviousDisabled={false}
          isNextDisabled={false}
        />
      </div>
    </div>
  );
};

export default MakeQuiz;