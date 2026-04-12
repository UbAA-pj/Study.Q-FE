import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import api from '../api';

const TABS = [
  { id: 'student', label: '학생으로 로그인' },
  { id: 'teacher', label: '강사로 로그인' },
];

const LoginPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('student');
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setServerError('');
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
    setIsLoading(true);
    setServerError('');

    try {
      const { data } = await api.post('/api/auth/login', {
        ...form,
        role: tab, // student | teacher
      });

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      navigate('/');
    } catch (err) {
      const message = err.response?.data?.message;
      if (err.response?.status === 401) {
        setServerError('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else {
        setServerError(message || '로그인에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
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
              className={`w-80 relative px-5 py-2 flex items-center justify-center border-b-3 ${
                isActive ? 'border-primary' : 'border-transparent'
              }`}
            >
              <span
                className={`px-3 py-1 rounded-full transition-colors ${
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
        {/* 이메일 */}
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
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* 비밀번호 */}
        <div className="px-10 py-4">
          <p className="w-full text-base-100">pw</p>
          <div className="w-140 h-10 border-b border-base-300 flex items-center">
            <input
              name="password"
              type={showPw ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="비밀번호를 입력하세요."
              className="flex-1 h-10 focus:outline-none focus:ring-0"
            />
            <button type="button" onClick={() => setShowPw((v) => !v)}>
              {showPw ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* 서버 에러 */}
        {serverError && (
          <p className="text-red-400 text-sm px-10">{serverError}</p>
        )}

        <div className="flex justify-between items-end px-5 py-4">
          <Link to="/auth/signup" className="text-base-100 hover:underline">
            {'< 회원가입 페이지로 이동'}
          </Link>
          <Button variant="primary" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? '로그인 중...' : '로그인'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
