import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function CourseSelect({
  options = [],
  value,
  onChange,
  placeholder = '선택하세요',
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative p-2 w-full min-w-40 max-w-70 flex justify-between border border-base-300 rounded-md">
      <p className="whitespace-nowrap">{value || placeholder}</p>
      <div className="w-5">
        <button
          type="button"
          className="absolute px-1 py-1 cursor-pointer hover:bg-base-300/40 rounded-full right-1 top-1"
          onClick={() => setOpen(!open)}
        >
          {open ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-base-300 rounded-md shadow-lg z-50">
          {options.map((option, index) => (
            <div
              key={index}
              className={`p-3 cursor-pointer hover:bg-primary/10 ${
                value === option ? 'bg-base-300/20' : ''
              }`}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
