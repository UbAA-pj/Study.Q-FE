import CourseCard from './CourseCard';

const CourseCardList = ({ courses }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          image={course.image}
          title={course.title}
          author={course.author}
        />
      ))}
    </div>
  );
};

export default CourseCardList;
