import CourseCardList from '../components/common/course/CourseCardList';
import { DUMMY_COURSES } from '../data/courses';

const MyCoursesPage = () => {
  return <CourseCardList courses={DUMMY_COURSES} />;
};

export default MyCoursesPage;
