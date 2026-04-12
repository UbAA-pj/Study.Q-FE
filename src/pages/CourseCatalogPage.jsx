import { useEffect, useState } from 'react';
import LectureList from '../components/common/course/LectureList';
import api from '../api';

const CourseCatalogPage = () => {
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    api.get('/api/lectures/').then((res) => {
      setLectures(res.data.lectures || []);
    }).catch((err) => {
      console.error('강의 목록 조회 실패:', err);
    });
  }, []);

  return <LectureList lectures={lectures} />;
};

export default CourseCatalogPage;
