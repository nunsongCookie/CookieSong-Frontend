import { Routes, Route } from "react-router-dom";
import MakeQuizMain from "./pages/MakeQuizMain";
import MakeQuiz from "./pages/MakeQuiz";
import MakeQuizShare from "./pages/MakeQuizShare";
import SolveQuizMain from "./pages/SolveQuizMain";
import SolveQuiz from "./pages/SolveQuiz";
import SolveQuizResult from "./pages/SolveQuizResult";
import SolveQuizRank from "./pages/SolveQuizRank";
import HealthCheck from "./pages/HealthCheck";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MakeQuizMain />} />
      <Route path="/health" element={<HealthCheck />} />
      <Route path="/make-quiz-main" element={<MakeQuizMain />} />
      <Route path="/make-quiz/:quizId" element={<MakeQuiz />} />
      <Route path="/make-quiz-share/:quizId" element={<MakeQuizShare />} />
      <Route path="/solve-quiz-main" element={<SolveQuizMain />} />
      <Route path="/solve-quiz" element={<SolveQuiz />} />
      <Route path="/solve-quiz-result" element={<SolveQuizResult />} />
      <Route path="/solve-quiz-rank" element={<SolveQuizRank />} />
    </Routes>
  );
}

export default App;
