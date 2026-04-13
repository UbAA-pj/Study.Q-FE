import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import Button from '../components/common/Button';
import api from '../api';
import { ROUTES } from '../constants/routes';

const TABS = [
  { id: 'student', label: '학생으로 회원가입' },
  { id: 'instructor', label: '강사로 회원가입' },
];

const SignUpPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('student');
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    username: '',
    name: '',
  });
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

    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(form.password))
      newErrors.password = '8자 이상, 영문/숫자/특수문자 포함';

    const usernameRegex = /^[a-zA-Z0-9]{4,10}$/;
    if (!usernameRegex.test(form.username))
      newErrors.username = '영문, 숫자 4~10자';

    const nameRegex = /^[a-zA-Z0-9가-힣]{2,10}$/;
    if (!nameRegex.test(form.name)) newErrors.name = '2~10자 입력';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsLoading(true);
    setServerError('');

    try {
      // 1. Firebase SDK로 회원가입 → ID Token 자동 발급
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const idToken = await userCredential.user.getIdToken();

      // 2. 백엔드 회원가입 API 호출
      await api.post(`/api${ROUTES.SIGNUP}`, {
        token: idToken,
        username: form.username,
        name: form.name,
        role: tab,
      });

      // 3. 로그인 처리 + 메인으로 이동
      localStorage.setItem('token', idToken);
      localStorage.setItem('role', tab);
      navigate(ROUTES.MAIN);
    } catch (err) {
      // Firebase 에러
      if (err.code === 'auth/email-already-in-use') {
        setServerError('이미 사용 중인 이메일입니다.');
      } else if (err.code === 'auth/weak-password') {
        setServerError('비밀번호가 너무 약합니다.');
      } else {
        const message = err.response?.data?.message;
        if (err.response?.status === 409) {
          setServerError('이미 사용 중인 이메일 또는 아이디입니다.');
        } else {
          setServerError(
            message || '회원가입에 실패했습니다. 다시 시도해주세요.'
          );
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center my-15">
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
            placeholder="이메일을 입력해주세요."
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
              placeholder="비밀번호를 입력해주세요."
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

        {/* 유저 ID */}
        <div className="px-10 py-4">
          <p className="w-full text-base-100">user ID</p>
          <div className="w-140 h-10 border-b border-base-300">
            <input
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              placeholder="영문, 숫자 4~10자"
              className="w-full h-10 focus:outline-none focus:ring-0"
            />
          </div>
          {errors.username && (
            <p className="text-red-400 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        {/* 이름 */}
        <div className="px-10 py-4">
          <p className="w-full text-base-100">name</p>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="이름을 입력해주세요."
            className="w-140 h-10 border-b border-base-300 focus:outline-none focus:ring-0"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* 서버 에러 */}
        {serverError && (
          <p className="text-red-400 text-sm px-10">{serverError}</p>
        )}

        <div className="flex justify-between items-end px-5 py-4">
          <Link to={ROUTES.LOGIN} className="text-base-100 hover:underline">
            {'< 로그인 페이지로 이동'}
          </Link>
          <Button variant="primary" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? '처리 중...' : '회원가입'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
