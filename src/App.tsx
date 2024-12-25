import { Routes, Route } from "react-router-dom";
import MakeQuizMain from "./pages/MakeQuizMain";
import MakeQuiz from "./pages/MakeQuiz";
import MakeQuizShare from "./pages/MakeQuizShare";
import SolveQuizMain from "./pages/SolveQuizMain";
import SolveQuiz from "./pages/SolveQuiz";
import SolveQuizResult from "./pages/SolveQuizResult";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MakeQuizMain />} />
      <Route path="/make-quiz-main" element={<MakeQuizMain />} />
      <Route path="/make-quiz" element={<MakeQuiz />} />
      <Route path="/make-quiz-share" element={<MakeQuizShare />} />
      <Route path="/solve-quiz-main" element={<SolveQuizMain />} />
      <Route path="/solve-quiz" element={<SolveQuiz />} />
      <Route path="/solve-quiz-result" element={<SolveQuizResult />} />
    </Routes>
  );
}

export default App;
