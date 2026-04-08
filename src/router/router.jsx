import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
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

export const Router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <MainPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignUpPage /> },
      { path: '/my-courses', element: <MyCoursesPage /> },
      { path: '/courses', element: <CourseCatalogPage /> },
      { path: '/courses/:id', element: <CourseDetailPage /> },
      { path: '/mistake-notes', element: <MistakeNotesPage /> },
      { path: '/create-course', element: <CreateCoursePage /> },
      { path: '/courses/:id/edit', element: <EditCoursePage /> },
      { path: '/quiz-analytics', element: <QuizAnalyticsPage /> },
    ],
  },
]);
