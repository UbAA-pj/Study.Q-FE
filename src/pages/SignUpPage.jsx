import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';

const TABS = [
  { id: 'student', label: '학생으로 회원가입' },
  { id: 'teacher', label: '강사로 회원가입' },
];

const SignUpPage = () => {
  const [tab, setTab] = useState('student');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="flex flex-col items-center my-15">
      <div className="flex w-160">
        {TABS.map(({ id, label }) => {
          const isActive = tab === id;
          return (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`w-80 relative px-5 py-2 flex items-center justify-center border-b-3 ${isActive ? 'border-primary' : 'border-transparent'}`}
            >
              <span
                className={`px-3 py-1 rounded-full transition-colors text-base-100 ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-base-content/70 hover:bg-primary/5'
                }`}
              >
                <h2>{label}</h2>
              </span>
            </button>
          );
        })}
      </div>
      <div className="border border-base-300 rounded-sm py-10">
        <div className="px-10 py-4">
          <p className="w-full text-base-100">e-mail</p>
          <input
            type="email"
            className="w-140 h-10 border-b border-base-300 focus:outline-none focus:ring-0"
          />
        </div>

        <div className="px-10 py-4">
          <p className="w-full text-base-100">pw</p>
          <div className="w-140 h-10 border-b border-base-300">
            <input
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-134 h-10 focus:outline-none focus:ring-0"
            />
            <button onClick={() => setShowPw((v) => !v)}>
              {showPw ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="px-10 py-4">
          <p className="w-full text-base-100">user ID</p>
          <input
            type="text"
            className="w-140 h-10 border-b border-base-300 focus:outline-none focus:ring-0"
          />
        </div>

        <div className="px-10 py-4">
          <p className="w-full text-base-100">Nickname</p>
          <input
            type="text"
            className="w-140 h-10 border-b border-base-300 focus:outline-none focus:ring-0"
          />
        </div>

        <div className="flex justify-between items-end px-5 py-4">
          <Link to="/auth/login" className="text-base-100 hover:underline">
            {`< 로그인 페이지로 이동`}
          </Link>
          <Button variant="primary">로그인</Button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
