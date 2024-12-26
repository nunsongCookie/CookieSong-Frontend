// import axios from "axios";

// // Question 타입 정의
// export interface Question {
//   questionId: number;
//   questionText: string;
// }

// // 질문 리스트 가져오기
// export const fetchQuestions = async (): Promise<Question[]> => {
//   try {
//     const response = await axios.get("/api/questions");
//     return response.data;
//   } catch (error) {
//     console.error("질문 가져오기 실패:", error);
//     throw error;
//   }
// };