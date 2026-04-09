import CourseCard from './CourseCard';

const CourseCardList = ({ courses }) => {
  return (
    <div className="flex flex-wrap p-9 justify-between">
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
