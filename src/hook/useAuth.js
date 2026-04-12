import { useNavigate } from 'react-router-dom';
import api from '../api';

const useAuth = () => {
  const navigate = useNavigate();

  const clearTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  // 로그아웃 - 백엔드 API 없음, 토큰만 제거
  const logout = () => {
    clearTokens();
    navigate('/auth/login');
  };

  // 회원 탈퇴
  const deleteAccount = async () => {
    try {
      await api.delete('/api/users/me');
      clearTokens();
      navigate('/auth/login');
    } catch (err) {
      console.error('회원 탈퇴 실패:', err);
      throw err;
    }
  };

  return { logout, deleteAccount };
};

export default useAuth;
