import { useMemo, useState } from 'react';
import CourseCard from './CourseCard';
import CourseCategoryTabs from './CourseCategoryTabs';

const CourseCardList = ({ courses }) => {
  const [activeTab, setActiveTab] = useState('전체');

  const dynamicCategories = useMemo(() => {
    const usedCategories = courses.map((course) => course.category);
    const uniqueCategories = [...new Set(usedCategories)];

    return [
      { id: 'all', name: '전체' },
      ...uniqueCategories.map((name) => ({
        id: name,
        name: name,
      })),
    ];
  }, [courses]);

  // 필터링 로직
  const filteredCourses =
    activeTab === '전체'
      ? courses
      : courses.filter((course) => course.category === activeTab);

  return (
    <>
      <CourseCategoryTabs
        categories={dynamicCategories}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9 p-9">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </>
  );
};

export default CourseCardList;
