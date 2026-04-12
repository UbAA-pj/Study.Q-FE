import { useEffect, useState } from 'react';
import QuizBox from '../components/common/QuizBox';
import api from '../api';

const MistakeNotesPage = () => {
  const [wrongAnswers, setWrongAnswers] = useState([]);

  useEffect(() => {
    api.get('/api/stats/wrong-answers').then((res) => {
      setWrongAnswers(res.data.wrong_answers || []);
    }).catch((err) => {
      console.error('오답노트 조회 실패:', err);
    });
  }, []);

  // 강의별로 그룹핑
  const groupedByLecture = wrongAnswers.reduce((acc, item) => {
    const key = item.lecture_id || 'unknown';
    if (!acc[key]) acc[key] = { lectureName: item.lecture_title || key, quizzes: [] };
    acc[key].quizzes.push(item);
    return acc;
  }, {});

  return (
    <div className="px-9 py-6 flex flex-col gap-4">
      {Object.entries(groupedByLecture).map(([lectureId, data]) => (
        <QuizBox
          key={lectureId}
          lectureName={data.lectureName}
          quizzes={data.quizzes.map((q) => ({
            id: q.quiz_id,
            question: q.question,
            choices: q.choices,
            answer: q.correct_answer,
            explanation: q.explanation,
          }))}
        />
      ))}
      {wrongAnswers.length === 0 && (
        <p className="text-base-200 text-center py-10">오답 기록이 없습니다.</p>
      )}
    </div>
  );
};

export default MistakeNotesPage;
