import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import api from '../api';

const useAuth = () => {
  const navigate = useNavigate();

  const clearStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  // 로그아웃 - Firebase 로그아웃 + 토큰 삭제
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('로그아웃 실패:', err);
    } finally {
      clearStorage();
      navigate('/auth/login');
    }
  };

  // 회원 탈퇴
  const deleteAccount = async () => {
    try {
      await api.delete('/api/auth/me');
      await signOut(auth);
      clearStorage();
      navigate('/auth/login');
    } catch (err) {
      console.error('회원 탈퇴 실패:', err);
      throw err;
    }
  };

  return { logout, deleteAccount };
};

export default useAuth;
