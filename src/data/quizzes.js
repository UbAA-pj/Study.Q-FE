export const DUMMY_QUIZZES = [
  {
    lectureId: 1,
    lectureName: '1강. HTML이란?',
    quizzes: [
      {
        id: 'quiz_01',
        trigger_time: 142,
        quiz_type: 'multiple',
        question: '다음 중 순서 없는 리스트 태그는?',
        choices: ['<ol>', '<ul>', '<li>'],
        answer: 1,
        correctRate: '91%',
        explanation: '<ol>: 순서 있는 목록 / <ul>: 순서 없는 목록 / <li>: 각 항목',
      },
      {
        id: 'quiz_02',
        trigger_time: 280,
        quiz_type: 'multiple',
        question: '다음 중 줄바꿈 없이 한 줄에 표시되는 태그는?',
        choices: ['<div>', '<p>', '<span>', '< br>'],
        answer: 2,
        correctRate: '86%',
        explanation: '<div>: 영역(박스)을 나눌 때 사용하는 태그 / <p>: 문단을 나타내는 태그 / <span>: 글자 일부만 묶을 때 사용하는 태그 (인라인) / <br>: 줄바꿈 하는 태그 (엔터 역할)',
      },
      {
        id: 'quiz_03',
        trigger_time: 420,
        quiz_type: 'multiple',
        question: '다음 중 닫는 태그가 없는 것은?',
        choices: ['<div>', '<span>', '<p>', '<img>'],
        answer: 3,
        correctRate: '95%',
        explanation: 'img는 내용을 감싸는 태그가 아니라, 이미지를 불러오는 "단일 태그"라서 닫는 태그가 없다.',
      },
    ],
  },
  {
    lectureId: 2,
    lectureName: '2강. CSS 기초',
    quizzes: [
      {
        id: 'quiz_04',
        trigger_time: 95,
        quiz_type: 'multiple',
        question: '다음 중 class 선택자는?',
        choices: ['.box', '#box', 'box'],
        answer: 0,
        correctRate: '88%',
        explanation: '.box: 클래스 선택자 / #box: id 선택자 / box: 태그 선택자',
      },
    ],
  },
];
