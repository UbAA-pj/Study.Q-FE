import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import MyCoursesPage from '../pages/MyCoursesPage';
import CourseCatalogPage from '../pages/CourseCatalogPage';
import CourseDetailPage from '../pages/CourseDetailPage';
import MistakeNotesPage from '../pages/MistakeNotesPage';
import CreateCoursePage from '../pages/CreateCoursePage';
import EditCoursePage from '../pages/EditCoursePage';
import QuizAnalyticsPage from '../pages/QuizAnalyticsPage';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/my-courses" element={<MyCoursesPage />} />
      <Route path="/courses" element={<CourseCatalogPage />} />
      <Route path="/courses/:id" element={<CourseDetailPage />} />
      <Route path="/mistake-notes" element={<MistakeNotesPage />} />
      <Route path="/create-course" element={<CreateCoursePage />} />
      <Route path="/courses/:id/edit" element={<EditCoursePage />} />
      <Route path="/quiz-analytics" element={<QuizAnalyticsPage />} />
    </Routes>
  );
};

export default Router;
