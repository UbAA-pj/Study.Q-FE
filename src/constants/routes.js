export const ROUTES = {
  // 인증
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',

  // 공통
  MAIN: '/',
  COURSES: '/courses',
  COURSE_DETAIL: (id = ':id') => `/courses/${id}`,

  // 학생 전용
  MY_COURSES: '/my-courses',
  MISTAKE_NOTES: '/mistake-notes',

  // 강사 전용
  CREATE_COURSE: '/create-course',
  EDIT_COURSE: (id = ':id') => `/courses/${id}/edit`,
  QUIZ_ANALYTICS: '/quiz-analytics',
};
