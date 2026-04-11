import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';

const TABS = [
  { id: 'student', label: '학생으로 로그인' },
  { id: 'teacher', label: '강사로 로그인' },
];

const LoginPage = () => {
  const [tab, setTab] = useState('student');
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [showPw, setShowPw] = useState(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email))
      newErrors.email = '이메일 형식이 올바르지 않습니다';

    if (!form.password) newErrors.password = '비밀번호를 입력해주세요';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      // JWT 저장
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      // 로그인 후 이동
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center my-30">
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
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="이메일을 입력하세요."
            className="w-140 h-10 border-b border-base-300 focus:outline-none focus:ring-0"
          />
          {errors.email && <p className="text-red-400">{errors.email}</p>}
        </div>

        <div className="px-10 py-4">
          <p className="w-full text-base-100">pw</p>
          <div className="w-140 h-10 border-b border-base-300">
            <input
              name="password"
              type={showPw ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요."
              className="w-134 h-10 focus:outline-none focus:ring-0"
            />
            <button onClick={() => setShowPw((v) => !v)}>
              {showPw ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <p className="text-red-400">{errors.password}</p>}
        </div>

        <div className="flex justify-between items-end px-5 py-4">
          <Link to="/auth/signup" className="text-base-100 hover:underline">
            {`< 회원가입 페이지로 이동`}
          </Link>
          <Button variant="primary" onClick={handleSubmit}>
            로그인
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
