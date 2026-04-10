import LectureList from '../components/common/course/LectureList';
import { DUMMY_LECTURES } from '../data/lectures';

const CourseCatalogPage = () => {
  return <LectureList lectures={DUMMY_LECTURES} />;
};

export default CourseCatalogPage;
