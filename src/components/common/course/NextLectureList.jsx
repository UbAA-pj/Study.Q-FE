const NextLectureItem = ({ lecture, isActive }) => {
  return (
    <li
      className={`w-[198px] h-[73px] p-2 rounded-[5px] border overflow-hidden cursor-pointer ${
        isActive ? 'border-primary' : 'border-base-300'
      }`}
    >
      <p className="truncate">{lecture.title}</p>
      <span className="block text-xs text-base-200 line-clamp-2">{lecture.description}</span>
    </li>
  );
};

const NextLectureList = ({ lectures, activeId }) => {
  return (
    <div>
      <span className="block text-xs text-base-100 mb-3">다음 강의</span>
      <ul className="flex flex-col gap-3">
        {lectures.map((lecture) => (
          <NextLectureItem key={lecture.id} lecture={lecture} isActive={lecture.id === activeId} />
        ))}
      </ul>
    </div>
  );
};

export default NextLectureList;
