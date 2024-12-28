import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Header from "../components/Header";
import QuizButton from "../components/QuizButton";
import OptionComponent from "../components/OptionComponent";
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

interface Answer {
  questionId: number;
  selectedChoiceId: number;
}

const SolveQuiz: FunctionComponent = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [choices, setChoices] = useState<QuestionChoices[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null); // 선택된 선택지 ID
  const [currentChoices, setCurrentChoices] = useState<Choice[]>([]);
  const [answers, setAnswers] = useState<
    { questionId: number; selectedChoiceId: number }[]
  >([]);
  const { quizId } = useParams<{ quizId: string }>();
  const { state } = useLocation();
  const navigate = useNavigate();

  const responseId = state?.userId;

  useEffect(() => {
    if (!responseId) {
      console.error("responseId가 전달되지 않았습니다.");
      navigate(`/quiz/${quizId}`);
    }
  }, [responseId, navigate, quizId]);

  // 문제를 가져오기
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!quizId) {
        console.error("Quiz ID is null");
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/questions`);
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

  // 선택지 가져오기
  useEffect(() => {
    const fetchChoices = async () => {
      if (!quizId) {
        console.error("Quiz ID is null");
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/choices/${quizId}`);
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

  // 현재 질문에 해당하는 선택지 필터링
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
      navigate(`/quiz/${quizId}`);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      setSelectedOption(null);
    }
  };

  const handleNext = async () => {
    if (selectedOption === null) {
      alert("옵션을 선택해주세요.");
      return;
    }
  
    setAnswers((prevAnswers) => [
      ...prevAnswers,
      { questionId: questions[currentQuestionIndex].questionId, selectedChoiceId: selectedOption },
    ]);
  
    if (currentQuestionIndex === questions.length - 1) {
      try {
        const submissionData = {
          responseId,
          quizId: Number(quizId),
          answers: [
            ...answers,
            { questionId: questions[currentQuestionIndex].questionId, selectedChoiceId: selectedOption },
          ],
        };
        console.log("Submission Data:", submissionData);
  
        const response = await fetch("http://localhost:8080/api/answers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Server Response:", errorText);
          throw new Error("응답 제출에 실패했습니다.");
        }
  
        console.log("Answers submitted successfully");
        alert("퀴즈가 완료되었습니다!");
        navigate(`/solve-quiz-result/${responseId}`);
      } catch (error) {
        console.error("Error submitting answers:", error);
        alert("응답 제출 중 문제가 발생했습니다.");
      }
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
    }
  };

  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleOptionSelect = (optionId: number) => {
    setSelectedOption(optionId);
  };

  return (
    <div className={styles.div}>
      <Header />

      {/* Progress Bar */}
      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{ width: `${progressPercentage}%` }}
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

      {/* Option Selection Section */}
      <section className={styles.optionSection}>
        {currentChoices.map((choice) => (
          <OptionComponent
            key={choice.id}
            optionText={choice.answer}
            isSelected={selectedOption === choice.id}
            onSelect={() => handleOptionSelect(choice.id)}
          />
        ))}
      </section>

      {/* Navigation Buttons */}
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
