import { useState } from 'react';

const QuizModal = ({ quiz, onClose }) => {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = selected === quiz.answer;

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
  };

  const handleClose = () => {
    setSelected(null);
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 flex flex-col gap-6">
        {/* 헤더 */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded-full">
            퀴즈
          </span>
          <span className="text-xs text-gray-400">
            잠깐! 문제를 풀고 계속 시청하세요
          </span>
        </div>

        {/* 문제 */}
        <p className="text-base font-semibold text-gray-900 leading-relaxed">
          {quiz.question}
        </p>

        {/* 보기 */}
        <ul className="flex flex-col gap-2">
          {quiz.choices.map((choice, idx) => {
            let style =
              'w-full text-left px-4 py-3 rounded-xl border text-sm transition-all cursor-pointer ';

            if (!submitted) {
              style +=
                selected === idx
                  ? 'border-primary bg-primary/10 text-primary font-medium'
                  : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50 text-gray-700';
            } else {
              if (idx === quiz.answer) {
                style +=
                  'border-green-400 bg-green-50 text-green-700 font-medium';
              } else if (idx === selected && selected !== quiz.answer) {
                style += 'border-red-400 bg-red-50 text-red-600';
              } else {
                style += 'border-gray-200 text-gray-400';
              }
            }

            return (
              <button
                key={idx}
                className={style}
                onClick={() => !submitted && setSelected(idx)}
                disabled={submitted}
              >
                {choice}
              </button>
            );
          })}
        </ul>

        {/* 풀이 */}
        {submitted && (
          <div
            className={`rounded-xl px-4 py-3 text-sm ${
              isCorrect
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-600 border border-red-200'
            }`}
          >
            <p className="font-semibold mb-1">{isCorrect ? '정답!' : '오답'}</p>
            <p>{quiz.explanation}</p>
          </div>
        )}

        {/* 버튼 */}
        <div className="flex justify-end gap-2">
          {!submitted ? (
            <button
              className="px-5 py-2 rounded-xl bg-primary text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
              onClick={handleSubmit}
              disabled={selected === null}
            >
              제출
            </button>
          ) : (
            <button
              className="px-5 py-2 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
              onClick={handleClose}
            >
              계속 시청하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
