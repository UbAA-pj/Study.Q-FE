import { useEffect, useState } from 'react';
import QuizBox from '../components/common/QuizBox';
import api from '../api';

const QuizAnalyticsPage = () => {
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    api.get('/api/stats/analytics').then((res) => {
      setAnalytics(res.data.analytics || []);
    }).catch((err) => {
      console.error('퀴즈 통계 조회 실패:', err);
    });
  }, []);

  // 강의별로 그룹핑
  const groupedByLecture = analytics.reduce((acc, item) => {
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
            choices: q.choices || [],
            answer: q.correct_answer,
            correctRate: `${q.correct_rate}%`,
            explanation: q.explanation || '',
          }))}
          showStats
        />
      ))}
      {analytics.length === 0 && (
        <p className="text-base-200 text-center py-10">퀴즈 통계가 없습니다.</p>
      )}
    </div>
  );
};

export default QuizAnalyticsPage;
