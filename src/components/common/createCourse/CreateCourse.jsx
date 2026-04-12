import CourseSelect from './CourseSelect';

const CreateCourse = ({ value, selectOptions, onChange }) => {
  const handleChange = (key, newValue) => {
    onChange({
      ...value,
      [key]: newValue,
    });
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <label className="text-xl w-22 whitespace-nowrap">강의 제목:</label>
        <input
          type="text"
          value={value.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          className="p-2 w-full border border-base-300 rounded-md focus:outline-none focus:ring-0"
        />
        <div className="flex items-center gap-2">
          <label className="text-xl w-22 whitespace-nowrap">강의 선택:</label>

          <CourseSelect
            options={selectOptions}
            value={value.category}
            onChange={(val) => handleChange('category', val)}
            placeholder="강의를 선택하세요"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <label className="text-xl w-22 py-1 whitespace-nowrap focus:outline-none focus:ring-0">
          강의 설명:
        </label>
        <textarea
          rows={5}
          value={value.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full p-3 border border-base-300 rounded-md resize-none"
        />
      </div>
    </>
  );
};

export default CreateCourse;
