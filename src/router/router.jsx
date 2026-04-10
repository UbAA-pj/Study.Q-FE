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
    handle: { breadcrumb: 'Study.Q' },
    children: [
      { path: '/', element: <MainPage />, handle: { hideBreadcrumb: true } },
      { path: '/login', element: <LoginPage />, handle: { hideBreadcrumb: true } },
      { path: '/signup', element: <SignUpPage />, handle: { hideBreadcrumb: true } },
      { path: '/my-courses', element: <MyCoursesPage />, handle: { breadcrumb: '수강 목록' } },
      { path: '/courses', element: <CourseCatalogPage />, handle: { breadcrumb: '강의 목록' } },
      { path: '/courses/:id', element: <CourseDetailPage />, handle: { breadcrumb: '강의 상세' } },
      { path: '/mistake-notes', element: <MistakeNotesPage />, handle: { breadcrumb: '오답 노트' } },
      { path: '/create-course', element: <CreateCoursePage />, handle: { breadcrumb: '강의 추가' } },
      { path: '/courses/:id/edit', element: <EditCoursePage />, handle: { breadcrumb: '강의 수정' } },
      { path: '/quiz-analytics', element: <QuizAnalyticsPage />, handle: { breadcrumb: '퀴즈 통계' } },
    ],
  },
]);
