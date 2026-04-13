import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NextLectureList from '../components/common/course/NextLectureList';
import api from '../api';

const CourseDetailPage = () => {
  const { courseId, lectureId } = useParams();
  const [lecture, setLecture] = useState(null);
  const [allLectures, setAllLectures] = useState([]);

  useEffect(() => {
    api.get(`/api/lectures/${lectureId}`).then((res) => {
      setLecture(res.data);
    }).catch((err) => {
      console.error('강의 상세 조회 실패:', err);
    });

    api.get(`/api/courses/${courseId}`).then((res) => {
      setAllLectures(res.data.lectures || []);
    }).catch((err) => {
      console.error('강의 목록 조회 실패:', err);
    });
  }, [courseId, lectureId]);

  if (!lecture) return null;

  const nextLectures = allLectures.filter((l) => l.id !== lectureId);

  return (
    <div className="flex justify-between px-8 py-8">
      <div className="w-140 flex flex-col gap-4">
        <video
          src={lecture.video_url}
          alt={lecture.title}
          className="w-140 h-84 rounded-md object-cover"
          controls
        />
        <div>
          <h2>{lecture.title}</h2>
          <small className="text-base-200">{lecture.instructor_id}</small>
          <p className="text-xl text-base-100 mt-2">{lecture.description}</p>
        </div>
      </div>

      <div className="w-40">
        <NextLectureList
          lectures={nextLectures}
          activeId={nextLectures[0]?.id}
        />
      </div>
    </div>
  );
};

export default CourseDetailPage;
