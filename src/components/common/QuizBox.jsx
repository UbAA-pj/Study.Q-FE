const OptionBadge = ({ number, isAnswer }) => (
  <span
    className={`inline-flex items-center justify-center w-[18px] h-[18px] rounded-[4px] text-xs mr-2 ${
      isAnswer ? 'bg-primary/80 text-white' : 'bg-base-300 text-white'
    }`}
  >
    {number}
  </span>
);

const QuizItem = ({ quiz, index, showStats }) => (
  <div>
    <div className="flex justify-between items-start">
      <p>{index + 1}. {quiz.question}</p>
      {showStats && (
        <span className="text-xs text-primary/80 ml-4 shrink-0">{quiz.correctRate}</span>
      )}
    </div>
    <ul className="mt-1 flex flex-col gap-1">
      {quiz.choices.map((choice, i) => (
        <li key={i} className="flex items-center text-sm">
          <OptionBadge number={i + 1} isAnswer={i === quiz.answer} />
          {choice}
        </li>
      ))}
    </ul>
    <div className="mt-2 px-3 py-[12px] bg-base-300/30 rounded-[10px] text-xs text-base-200">
      {quiz.explanation}
    </div>
  </div>
);

const QuizBox = ({ lectureName, quizzes, showStats = false }) => (
  <div className="border border-base-300 rounded-[5px] p-5">
    <p className="text-base-300 text-base font-semibold mb-3">{lectureName}</p>
    {showStats && (
      <div className="flex justify-between text-xs text-base-100 mb-2">
        <span>문제</span>
        <span>정답률</span>
      </div>
    )}
    <div className="flex flex-col gap-2">
      {quizzes.map((quiz, index) => (
        <QuizItem key={quiz.id} quiz={quiz} index={index} showStats={showStats} />
      ))}
    </div>
    {showStats && (
      <div className="flex justify-between items-center mt-3 pt-3 border-t border-base-300">
        <h4 className="text-primary/80">평균</h4>
        <h3 className="font-semibold text-primary">
          {(quizzes.reduce((sum, q) => sum + parseFloat(q.correctRate), 0) / quizzes.length).toFixed(1)}%
        </h3>
      </div>
    )}
  </div>
);

export default QuizBox;
