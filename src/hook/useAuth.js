import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { ROUTES } from '../constants/routes';
import api from '../api';

const useAuth = () => {
  const navigate = useNavigate();

  const clearStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  // 로그아웃
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('로그아웃 실패:', err);
    } finally {
      clearStorage();
      navigate(ROUTES.LOGIN);
    }
  };

  // 회원 탈퇴
  const deleteAccount = async () => {
    try {
      await api.delete('/api/auth/me');
      await signOut(auth);
      clearStorage();
      navigate(ROUTES.LOGIN);
    } catch (err) {
      console.error('회원 탈퇴 실패:', err);
      throw err;
    }
  };

  return { logout, deleteAccount };
};

export default useAuth;
