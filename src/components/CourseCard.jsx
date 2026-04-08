const CourseCard = ({ image, title, author }) => {
  return (
    <div className="flex flex-col gap-2 cursor-pointer">
      <img src={image} alt={title} className="w-full aspect-square object-cover rounded-md" />
      <div>
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-xs text-gray-400">{author}</p>
      </div>
    </div>
  );
};

export default CourseCard;
