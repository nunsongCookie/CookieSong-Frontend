import { Routes, Route } from "react-router-dom";
import MakeQuizMain from "./pages/MakeQuizMain";
import MakeQuiz from "./pages/MakeQuiz";
import MakeQuizShare from "./pages/MakeQuizShare";
import SolveQuizMain from "./pages/SolveQuizMain";
import SolveQuiz from "./pages/SolveQuiz";
import SolveQuizResult from "./pages/SolveQuizResult";
import SolveQuizRank from "./pages/SolveQuizRank";
import SolveQuizWrong from "./pages/SolveQuizWrong";
import HealthCheck from "./pages/HealthCheck";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MakeQuizMain />} />
      <Route path="/health" element={<HealthCheck />} />
      <Route path="/make-quiz-main" element={<MakeQuizMain />} />
      <Route path="/make-quiz" element={<MakeQuiz />} />
      <Route path="/make-quiz-share/:shareKey" element={<MakeQuizShare />} />
      <Route path="/quiz/:shareKey" element={<SolveQuizMain />} />
      <Route path="/solve-quiz/:shareKey" element={<SolveQuiz />} />
      <Route path="/solve-quiz-result/:responseId" element={<SolveQuizResult />} />
      <Route path="/solve-quiz-rank/:shareKey" element={<SolveQuizRank />} />
      <Route path="/solve-quiz-wrong/:responseId" element={<SolveQuizWrong />} />
    </Routes>
  );
}

export default App;
