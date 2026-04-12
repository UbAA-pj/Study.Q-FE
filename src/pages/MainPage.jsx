import { useEffect, useMemo, useState } from 'react';
import CourseCategoryTabs from '../components/common/course/CourseCategoryTabs';
import CourseCardList from '../components/common/course/CourseCardList';
import api from '../api';

const MainPage = () => {
  const [courses, setCourses] = useState([]);
  const [activeTab, setActiveTab] = useState('전체');

  useEffect(() => {
    api.get('/api/lectures/').then((res) => {
      setCourses(res.data.lectures || []);
    }).catch((err) => {
      console.error('강의 목록 조회 실패:', err);
    });
  }, []);

  const categories = useMemo(() => {
    const unique = [...new Set(courses.map((c) => c.category))];
    return [
      { id: 'all', name: '전체' },
      ...unique.map((name) => ({ id: name, name })),
    ];
  }, [courses]);

  const filteredCourses =
    activeTab === '전체'
      ? courses
      : courses.filter((c) => c.category === activeTab);

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

export default MainPage;
