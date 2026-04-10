import LectureList from '../components/common/course/LectureList';
import { DUMMY_COURSES } from '../data/courses';

const CourseCatalogPage = () => {
  return <LectureList lectures={DUMMY_COURSES} />;
};

export default CourseCatalogPage;
