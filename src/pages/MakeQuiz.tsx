import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import QuizButton from "../components/QuizButton";
import styles from "./MakeQuiz.module.css";

interface Question {
  questionId: number;
  questionText: string;
}

interface Choice{
  questionId: number;
  correctAnswer: string;
  wrongAnswers: string[];
}

const MakeQuiz: FunctionComponent = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [choices, setChoices] = useState<Choice[]>([]); //보기 저장 
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [wrongAnswers, setWrongAnswers] = useState<string[]>([]);
  const {quizId} = useParams<{quizId: string}>();
  const navigate = useNavigate();

  useEffect(()=> {
    const fetchQuestions = async() => {
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

    fetchQuestions();
  }, []);

  const saveChoice = () => {
    const currentQuestionId = questions[currentQuestionIndex]?.questionId;
    if (!currentQuestionId) return;

    // setChoices((prevChoices) => [
    //   ...prevChoices.filter((choice) => choice.questionId !== currentQuestionId),
    //   { questionId: currentQuestionId, correctAnswer, wrongAnswers },
    // ]);

    const updatedChoices = [
      ...choices.filter((choice)=>choice.questionId !== currentQuestionId),
      {questionId: currentQuestionId, correctAnswer, wrongAnswers},
    ];

    console.log("Saving choice for question: ", currentQuestionId);
    console.log("Updated Choices: ", updatedChoices);

    setChoices(updatedChoices);

  };
  
  //const currentQuestion = questions[currentQuestionIndex]; // 현재 질문
  //const totalQuestions = questions.length; // 총 질문수 계산 

  // 이전 
  const handlePrevious = () => {
    saveChoice(); //현재 보기 저장 
    console.log("Previous question index:", currentQuestionIndex);

    if (currentQuestionIndex === 0) {
      navigate("/make-quiz-main");
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  // 다음 
  const handleNext = () => {
    saveChoice();
    // 마지막 질문인 경우 
    if (currentQuestionIndex === questions.length - 1) {
      submitChoices();
      
    } else {
      //saveChoice();
      setCorrectAnswer("");
      setWrongAnswers([]);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const submitChoices = async() =>{
    if(!quizId){
      console.error("Quiz Id is null");
      alert("퀴즈 ID가 없습니다.");
      return;
    }
    console.log("Submitting choices: ", choices);
    console.log("Quiz ID being sent: ", quizId);

    try{
        const response = await fetch("http://localhost:8080/api/choices", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          quizId: Number(quizId),
          choices,
        }),
      });

      if(!response.ok){
        throw new Error("보기 저장에 실패했습니다.");
      }

      console.log("보기 저장 완료");
      navigate("/make-quiz/share");
    }
    catch(error){
      console.error("보기 저장 중 오류 발생 : ", error);
    }
  };

  const currentQuestion = questions[currentQuestionIndex]; // 현재 질문

  //const progressPercentage = (currentQuestionIndex + 1) / totalQuestions * 100;
  //const progressPercentage = totalQuestions >0? ((currentQuestionIndex+1)/totalQuestions)*100:0;

  return (
    <div className={styles.div}>

      <Header />

      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          //style={{ width: `${progressPercentage}%` }}
          style={{
            width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
          }}
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
          value={correctAnswer}
          onChange={(e)=>setCorrectAnswer(e.target.value)}
        />
      </section>

      {/* <section className={styles.answerSection}>
        <h3 className={styles.answerTitle}>오답 보기를 입력해주세요</h3>
        <div className={styles.inputGroup}>
          <input className={styles.input} type="text" placeholder="보기 1" />
          <input className={styles.input} type="text" placeholder="보기 2" />
        </div>
      </section> */}

      <section className={styles.answerSection}>
        <h3 className={styles.answerTitle}>오답 보기를 입력해주세요</h3>
        <div className={styles.inputGroup}>
        <input
          className={styles.input}
          type="text"
          placeholder="보기 1"
          value={wrongAnswers[0] || ""}
          onChange={(e) => {
            const newAnswers = [...wrongAnswers];
            newAnswers[0] = e.target.value;
            console.log("Updated wrongAnswers[0]:", newAnswers[0]); // 디버깅 로그
            setWrongAnswers(newAnswers);
          }}
        />
        <input
          className={styles.input}
          type="text"
          placeholder="보기 2"
          value={wrongAnswers[1] || ""}
          onChange={(e) => {
            const newAnswers = [...wrongAnswers];
            newAnswers[1] = e.target.value;
            console.log("Updated wrongAnswers[1]:", newAnswers[1]); // 디버깅 로그
            setWrongAnswers(newAnswers);
          }}
        />
        </div>
      </section>

      {/* <section className={styles.answerSection}>
        <h3 className={styles.answerTitle}>오답 보기를 입력해주세요</h3>
        <div className={styles.inputGroup}>
          <input className={styles.input} type="text" placeholder="보기 1" />
          <input className={styles.input} type="text" placeholder="보기 2" />
        </div>
      </section> */}

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
