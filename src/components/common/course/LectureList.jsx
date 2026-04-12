import { Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const LectureItem = ({ lecture }) => {
  return (
    <li className="hover:bg-base-300/30 rounded-xl">
      <Link to={`/courses/${lecture.id}`} className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <video
            src={lecture.video_url}
            className="w-35 h-21 object-cover rounded-md"
            preload="metadata"
            muted
          />
          <div className="flex flex-col gap-1">
            <h4>{lecture.title}</h4>
            <small className="text-base-200">{lecture.date}</small>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full bg-base-300/30 flex items-center justify-center text-base-200 hover:bg-primary/30 hover:text-base-100">
            <Pencil size={16} />
          </button>
          <button className="w-8 h-8 rounded-full bg-base-300/30 flex items-center justify-center text-base-200 hover:bg-primary/30 hover:text-base-100">
            <Trash2 size={16} />
          </button>
        </div>
      </Link>
    </li>
  );
};

const LectureList = ({ lectures }) => {
  return (
    <ul className="px-5 py-5 flex flex-col gap-6">
      {lectures.map((lecture) => (
        <LectureItem key={lecture.id} lecture={lecture} />
      ))}
    </ul>
  );
};

export default LectureList;
