import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';

export default function Header() {
  const user = { role: 'student' };
  const role = user?.role;
  const linkStyle =
    'px-2 py-2 cursor-pointer hover:bg-base-300/40 rounded-full ';

  return (
    <div className="w-full flex justify-between py-6 px-4">
      <Link to="/">
        <h1 className="text-logo">Study.Q</h1>
      </Link>
      <nav className="flex items-center gap-2">
        {role === 'student' && (
          <>
            <Link to="/my-courses">
              <h4 className={linkStyle}>수강 목록</h4>
            </Link>
            <Link to="/mistake-notes">
              <h4 className={linkStyle}>오답 노트</h4>
            </Link>
          </>
        )}

        {role === 'instructor' && (
          <>
            <Link to="/create-course">
              <h4 className={linkStyle}>강의 생성</h4>
            </Link>
            <Link to="/my-courses">
              <h4 className={linkStyle}>강의 목록</h4>
            </Link>
            <Link to="/quiz-analytics">
              <h4 className={linkStyle}>퀴즈 통계</h4>
            </Link>
          </>
        )}
        <button className={linkStyle}>
          {/* 추후 설정창 추가 */}
          <Settings size={22} />
        </button>
      </nav>
    </div>
  );
}
