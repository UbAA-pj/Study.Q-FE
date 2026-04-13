import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NextLectureList from '../components/common/course/NextLectureList';
import LectureVideoPlayer from '../components/common/course/Lecturevideoplayer';
import api from '../api';

const MOCK_QUIZZES = [
  {
    id: 'quiz_01',
    trigger_time: 5,
    quiz_type: 'multiple',
    question: '다음 중 순서 없는 리스트 태그는?',
    choices: ['<ol>', '<ul>', '<li>'],
    answer: 1,
    explanation: '<ol>: 순서 있는 목록 / <ul>: 순서 없는 목록 / <li>: 각 항목',
  },
  {
    id: 'quiz_02',
    trigger_time: 10,
    quiz_type: 'multiple',
    question: '다음 중 줄바꿈 없이 한 줄에 표시되는 태그는?',
    choices: ['<div>', '<p>', '<span>', '<br>'],
    answer: 2,
    explanation: '<span>: 글자 일부만 묶을 때 사용하는 인라인 태그',
  },
];

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
  const rawQuizzes = lecture.quizzes && lecture.quizzes.length > 0 ? lecture.quizzes : MOCK_QUIZZES;
  const quizzes = rawQuizzes.map((q, i) => ({
    ...q,
    trigger_time: q.trigger_time != null ? q.trigger_time : (i + 1) * 5,
  }));
  const videoUrl = lecture.video_url?.startsWith('http')
    ? lecture.video_url
    : 'https://www.w3schools.com/html/mov_bbb.mp4';

  return (
    <div className="flex justify-between px-8 py-8">
      <div className="w-140 flex flex-col gap-4">
        <LectureVideoPlayer
          videoUrl={videoUrl}
          quizzes={quizzes}
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
