import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import MainLayout from '../Layout/MainLayout';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import MyCoursesPage from '../pages/MyCoursesPage';
import CourseCatalogPage from '../pages/CourseCatalogPage';
import CourseDetailPage from '../pages/CourseDetailPage';
import MistakeNotesPage from '../pages/MistakeNotesPage';
import CreateCoursePage from '../pages/CreateCoursePage';
import QuizAnalyticsPage from '../pages/QuizAnalyticsPage';

// 로그인 여부 체크
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to={ROUTES.LOGIN} replace />;
};

// role 체크 (로그인 + 권한)
const RoleRoute = ({ role, children }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) return <Navigate to={ROUTES.LOGIN} replace />;
  if (userRole !== role) return <Navigate to={ROUTES.MAIN} replace />;
  return children;
};

export const Router = createBrowserRouter(
  [
    {
      element: <MainLayout />,
      handle: { breadcrumb: 'Study.Q' },
      children: [
        {
          path: ROUTES.MAIN,
          element: <MainPage />,
          handle: { hideBreadcrumb: true },
        },

        // 인증
        {
          path: ROUTES.LOGIN,
          element: <LoginPage />,
          handle: { hideBreadcrumb: true },
        },
        {
          path: ROUTES.SIGNUP,
          element: <SignUpPage />,
          handle: { hideBreadcrumb: true },
        },

        // 공통 (로그인 필요)
        {
          path: ROUTES.COURSES,
          element: (
            <PrivateRoute>
              <CourseDetailPage />
            </PrivateRoute>
          ),
          handle: { breadcrumb: '강의 목록' },
        },
        {
          path: ROUTES.COURSE_DETAIL(),
          element: (
            <PrivateRoute>
              <CourseDetailPage />
            </PrivateRoute>
          ),
          handle: { breadcrumb: '강의 상세' },
        },

        // 학생 전용
        {
          path: ROUTES.MY_COURSES,
          element: (
            <RoleRoute role="student">
              <MyCoursesPage />
            </RoleRoute>
          ),
          handle: { breadcrumb: '수강 목록' },
        },
        {
          path: ROUTES.MISTAKE_NOTES,
          element: (
            <RoleRoute role="student">
              <MistakeNotesPage />
            </RoleRoute>
          ),
          handle: { breadcrumb: '오답 노트' },
        },

        // 강사 전용
        {
          path: ROUTES.CREATE_COURSE,
          element: (
            <RoleRoute role="instructor">
              <CreateCoursePage />
            </RoleRoute>
          ),
          handle: { breadcrumb: '강의 추가' },
        },
        {
          path: ROUTES.QUIZ_ANALYTICS,
          element: (
            <RoleRoute role="instructor">
              <QuizAnalyticsPage />
            </RoleRoute>
          ),
          handle: { breadcrumb: '퀴즈 통계' },
        },
      ],
    },
  ],
  { basename: '/Study.Q-FE' }
);
