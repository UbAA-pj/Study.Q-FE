import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const imageUrl = `https://picsum.photos/seed/${course.id}/280/200`;
  return (
    <Link to={`/courses/${course.id}`} className="w-30% max-w-80 h-68 flex flex-col gap-2 cursor-pointer">
      <img
        src={imageUrl}
        alt={course.course_name}
        className="w-30% h-42.5 object-cover rounded-md"
      />
      <div>
        <h3>{course.course_name}</h3>
        <small>{course.instructor_id}</small>
      </div>
    </Link>
  );
};

export default CourseCard;
