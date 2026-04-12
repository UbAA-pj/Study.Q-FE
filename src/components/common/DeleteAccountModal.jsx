const DeleteAccountModal = ({ isOpen, onConfirm, onCancel, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm flex flex-col gap-4">
        <h2>회원 탈퇴</h2>
        <p className="text-sm text-base-100">
          정말 탈퇴하시겠습니까?
          <br />
          탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.
        </p>
        <div className="flex justify-end gap-2 mt-2">
          <button
            className="px-4 py-2 rounded-lg text-sm bg-base-300/30 hover:bg-base-300/60 text-gray-700 cursor-pointer disabled:opacity-50"
            onClick={onCancel}
            disabled={isLoading}
          >
            취소
          </button>
          <button
            className="px-4 py-2 rounded-lg text-sm bg-red-500 hover:bg-red-600 text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? '처리 중...' : '탈퇴하기'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
