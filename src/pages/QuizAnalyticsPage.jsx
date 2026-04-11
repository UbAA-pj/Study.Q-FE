import QuizBox from '../components/common/QuizBox';
import { DUMMY_QUIZZES } from '../data/quizzes';

const QuizAnalyticsPage = () => {
  return (
    <div className="px-9 py-6 flex flex-col gap-4">
      {DUMMY_QUIZZES.map((item) => (
        <QuizBox key={item.lectureId} lectureName={item.lectureName} quizzes={item.quizzes} showStats />
      ))}
    </div>
  );
};

export default QuizAnalyticsPage;
