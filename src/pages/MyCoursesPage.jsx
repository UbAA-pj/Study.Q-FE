import { useMemo, useState } from 'react';
import CourseCategoryTabs from '../components/common/course/CourseCategoryTabs';
import CourseCardList from '../components/common/course/CourseCardList';
import { DUMMY_COURSES } from '../data/courses';

const MyCoursesPage = () => {
  const [activeTab, setActiveTab] = useState('전체');

  const categories = useMemo(() => {
    const unique = [...new Set(DUMMY_COURSES.map((c) => c.category))];
    return [
      { id: 'all', name: '전체' },
      ...unique.map((name) => ({ id: name, name })),
    ];
  }, []);

  const filteredCourses =
    activeTab === '전체'
      ? DUMMY_COURSES
      : DUMMY_COURSES.filter((c) => c.category === activeTab);

  return (
    <>
      <CourseCategoryTabs
        categories={categories}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <CourseCardList courses={filteredCourses} />
    </>
  );
};

export default MyCoursesPage;
