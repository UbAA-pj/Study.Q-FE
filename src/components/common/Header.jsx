import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { useState } from 'react';
import useAuth from '../../hook/useAuth';
import DeleteAccountModal from './DeleteAccountModal';
import { ROUTES } from '../../constants/routes';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { logout, deleteAccount } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const user = { role: 'student' };
  const role = user?.role;
  const linkStyle =
    'px-2 py-2 cursor-pointer hover:bg-base-300/40 rounded-full ';
  const openStyle = 'px-2 py-2 cursor-pointer bg-base-300/40 rounded-full ';

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    setErrorMsg('');
    try {
      await deleteAccount();
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message ||
          '회원 탈퇴에 실패했습니다. 다시 시도해주세요.'
      );
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="w-full flex justify-between py-6 px-4">
      <Link to="/">
        <h1 className="text-logo">Study.Q</h1>
      </Link>
      <nav className="flex items-center gap-2">
        {role === 'student' && (
          <>
            <Link to={ROUTES.MY_COURSES}>
              <h4 className={linkStyle}>수강 목록</h4>
            </Link>
            <Link to={ROUTES.MISTAKE_NOTES}>
              <h4 className={linkStyle}>오답 노트</h4>
            </Link>
          </>
        )}

        {role === 'instructor' && (
          <>
            <Link to={ROUTES.CREATE_COURSE}>
              <h4 className={linkStyle}>강의 생성</h4>
            </Link>
            <Link to={ROUTES.MY_COURSES}>
              <h4 className={linkStyle}>강의 목록</h4>
            </Link>
            <Link to={ROUTES.QUIZ_ANALYTICS}>
              <h4 className={linkStyle}>퀴즈 통계</h4>
            </Link>
          </>
        )}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={`relative ${open ? openStyle : linkStyle}`}
        >
          <Settings size={22} />
          {open && (
            <div className="absolute top-full right-0 mt-2 w-22 bg-white border border-base-300 rounded-md shadow-lg">
              <button
                onClick={logout}
                className="p-3 cursor-pointer hover:bg-base-300/30"
              >
                로그아웃
              </button>
              <button
                onClick={() => {
                  setErrorMsg('');
                  setIsModalOpen(true);
                }}
                className="text-red-400 p-3 cursor-pointer hover:bg-base-300/30"
              >
                회원 탈퇴
              </button>
            </div>
          )}
        </button>
      </nav>
      <DeleteAccountModal
        isOpen={isModalOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsModalOpen(false)}
        isLoading={isDeleting}
      />
    </div>
  );
}
