import { useMemo, useState } from 'react';
import CourseCategoryTabs from '../components/common/course/CourseCategoryTabs';
import QuizBox from '../components/common/QuizBox';
import { DUMMY_QUIZZES } from '../data/quizzes';

const MistakeNotesPage = () => {
  const [activeTab, setActiveTab] = useState('전체');

  const categories = useMemo(() => {
    const unique = [...new Set(DUMMY_QUIZZES.map((q) => q.category))];
    return [
      { id: 'all', name: '전체' },
      ...unique.map((name) => ({ id: name, name })),
    ];
  }, []);

  const filteredQuizzes =
    activeTab === '전체'
      ? DUMMY_QUIZZES
      : DUMMY_QUIZZES.filter((q) => q.category === activeTab);

  return (
    <>
      <CourseCategoryTabs
        categories={categories}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="px-9 py-6 flex flex-col gap-4">
        {filteredQuizzes.map((item) => (
          <QuizBox
            key={item.lectureId}
            lectureName={item.lectureName}
            quizzes={item.quizzes}
          />
        ))}
      </div>
    </>
  );
};

export default MistakeNotesPage;
