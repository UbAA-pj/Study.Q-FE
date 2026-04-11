import NextLectureList from '../components/common/course/NextLectureList';
import { DUMMY_LECTURES } from '../data/lectures';

const CourseDetailPage = () => {
  return (
    <div className="flex justify-end px-9 py-6">
      <NextLectureList lectures={DUMMY_LECTURES} activeId={DUMMY_LECTURES[0]?.id} />
    </div>
  );
};

export default CourseDetailPage;
