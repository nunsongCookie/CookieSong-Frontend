import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Header from "../components/Header";
import QuizButton from "../components/QuizButton";
import ErratumComponent from "../components/ErratumComponent";
import styles from "./SolveQuiz.module.css";

interface Question {
  questionId: number;
  questionText: string;
}

interface Choice {
  id: number;
  answer: string;
  correct: boolean;
}

interface QuestionChoices {
  questionId: number;
  choiceDtos: Choice[];
}

interface UserResponse {
  questionId: number;
  selectedChoiceId: number;
  correctAnswer: number;
  correct: boolean;
}

const SolveQuizWrong: FunctionComponent = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [choices, setChoices] = useState<QuestionChoices[]>([]);
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentChoices, setCurrentChoices] = useState<Choice[]>([]);
  const { state } = useLocation();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const quizId = state?.quizId;
  const responseId = state?.responseId;
  const userId = state?.userId;

  useEffect(() => {
    if (!responseId) {
      console.error("responseId가 전달되지 않았습니다.");
      navigate(`/quiz/${quizId}`);
    }
  }, [responseId, navigate, quizId]);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!quizId) {
        console.error("Quiz ID is null");
        return;
      }

      try {
        const response = await fetch(`/api/questions`);
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }

        const data: Question[] = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [quizId]);

  useEffect(() => {
    const fetchChoices = async () => {
      if (!quizId) {
        console.error("Quiz ID is null");
        return;
      }

      try {
        const response = await fetch(`/api/choices/${quizId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch choices");
        }

        const data: QuestionChoices[] = await response.json();
        setChoices(data);
      } catch (error) {
        console.error("Error fetching choices:", error);
      }
    };

    fetchChoices();
  }, [quizId]);

  useEffect(() => {
    const fetchResponses = async () => {
      if (!responseId) {
        console.error("Response ID is null");
        return;
      }

      try {
        const response = await fetch(`/api/responses/${responseId}/results`);
        if (!response.ok) {
          throw new Error("Failed to fetch user responses");
        }

        const data = await response.json();
        setResponses(data.results);
      } catch (error) {
        console.error("Error fetching user responses:", error);
      }
    };

    fetchResponses();
  }, [responseId]);

  useEffect(() => {
    if (questions.length === 0 || choices.length === 0) return;

    const currentQuestion = questions[currentQuestionIndex];
    const currentQuestionChoices = choices.find(
      (choiceSet) => choiceSet.questionId === currentQuestion.questionId
    );

    if (currentQuestionChoices) {
      setCurrentChoices(currentQuestionChoices.choiceDtos);
    }
  }, [currentQuestionIndex, questions, choices]);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handlePrevious = () => {
    if (currentQuestionIndex === 0) {
      navigate(`/solve-quiz-result/${responseId}`, {
        state: { responseId, quizId, userId },
      });
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex === questions.length - 1) {
      navigate(`/solve-quiz-result/${responseId}`, {
        state: { responseId, quizId, userId },
      });
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className={styles.div}>
      <Header />

      <div className={styles.progressBar}>
        <div className={styles.progress} style={{ width: `${progressPercentage}%` }} />
      </div>

      {currentQuestion ? (
        <div className={styles.questionContainer}>
          <h3 className={styles.questionNumber}>Q{currentQuestion.questionId}.</h3>
          <h3 className={styles.questionText}>{currentQuestion.questionText}</h3>
        </div>
      ) : (
        <p>Loading questions...</p>
      )}

      <section className={styles.optionSection}>
        {currentChoices.map((choice) => {
          const userResponse = responses.find(
            (response) => response.questionId === currentQuestion.questionId
          );

          return (
            <ErratumComponent
              key={choice.id}
              optionText={choice.answer}
              isSelected={userResponse?.selectedChoiceId === choice.id}
              isCorrect={choice.correct}
            />
          );
        })}
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

export default SolveQuizWrong;