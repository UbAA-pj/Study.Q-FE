import { useParams } from 'react-router-dom';
import NextLectureList from '../components/common/course/NextLectureList';
import { DUMMY_LECTURES } from '../data/lectures';

const CourseDetailPage = () => {
  const { id } = useParams();
  const currentIndex = DUMMY_LECTURES.findIndex((l) => l.id === Number(id));
  const nextLectures = currentIndex >= 0 ? DUMMY_LECTURES.slice(currentIndex + 1) : [];

  return (
    <div className="flex justify-end px-9 py-6">
      <NextLectureList lectures={nextLectures} activeId={nextLectures[0]?.id} />
    </div>
  );
};

export default CourseDetailPage;
