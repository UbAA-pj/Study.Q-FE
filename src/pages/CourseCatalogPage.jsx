import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LectureList from '../components/common/course/LectureList';
import api from '../api';

const CourseCatalogPage = () => {
  const { id } = useParams();
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    api.get(`/api/courses/${id}`).then((res) => {
      setLectures(res.data.lectures || []);
    }).catch((err) => {
      console.error('강좌 강의 목록 조회 실패:', err);
    });
  }, [id]);

  return <LectureList lectures={lectures} courseId={id} />;
};

export default CourseCatalogPage;
