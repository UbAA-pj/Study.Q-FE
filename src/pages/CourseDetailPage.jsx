import { useParams } from 'react-router-dom';
import NextLectureList from '../components/common/course/NextLectureList';
import { DUMMY_LECTURES } from '../data/lectures';

const CourseDetailPage = () => {
  const { id } = useParams();
  const currentIndex = DUMMY_LECTURES.findIndex((l) => l.id === id);
  const lecture =
    currentIndex >= 0 ? DUMMY_LECTURES[currentIndex] : DUMMY_LECTURES[0];
  const nextLectures = DUMMY_LECTURES.slice(currentIndex + 1);

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
