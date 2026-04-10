const CourseCard = ({ course }) => {
  const imageUrl = `https://picsum.photos/seed/${course.id}/280/200`;
  return (
    <div className="w-30% max-w-80 h-68 flex flex-col gap-2 cursor-pointer">
      <img
        src={imageUrl}
        alt={course.title}
        className="w-30% h-42.5 object-cover rounded-md"
      />
      <div>
        <h3>{course.title}</h3>
        <small>{course.instructor_id}</small>
      </div>
    </div>
  );
};

export default CourseCard;
