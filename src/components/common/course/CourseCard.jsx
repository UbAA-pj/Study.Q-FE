const CourseCard = ({ image, title, author }) => {
  return (
    <div className="w-65 h-65 flex flex-col gap-2 cursor-pointer">
      <img
        src={image}
        alt={title}
        className="w-65 h-42.5 aspect-square object-cover rounded-md"
      />
      <div>
        <h3>{title}</h3>
        <small>{author}</small>
      </div>
    </div>
  );
};

export default CourseCard;
