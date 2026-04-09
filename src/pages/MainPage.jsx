import CourseCardList from '../components/CourseCardList';
import { DUMMY_COURSES } from '../data/courses';

const MainPage = () => {
  return <CourseCardList courses={DUMMY_COURSES} />;
};

export default MainPage;
