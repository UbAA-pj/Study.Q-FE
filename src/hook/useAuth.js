import { useNavigate } from 'react-router-dom';
import api from '../api';

const useAuth = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/auth/login');
  };

  const deleteAccount = async () => {
    try {
      await api.delete('/api/auth/me');
      localStorage.removeItem('token');
      navigate('/auth/login');
    } catch (err) {
      console.error('회원 탈퇴 실패:', err);
      throw err;
    }
  };

  return { logout, deleteAccount };
};

export default useAuth;
