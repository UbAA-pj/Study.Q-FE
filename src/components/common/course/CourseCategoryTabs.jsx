const CategoryTab = ({ category, isActive, onClick }) => {
  return (
    <li>
      <button
        onClick={onClick}
        className={`
          relative px-5 py-2 flex items-center justify-center
          border-b-3 ${isActive ? 'border-primary' : 'border-transparent'}
        `}
      >
        <span
          className={`
            px-3 py-1 rounded-full text-sm font-medium transition-colors
            ${isActive ? 'bg-primary/10 text-primary' : 'text-base-content/70 hover:bg-primary/5'}
          `}
        >
          {category}
        </span>
      </button>
    </li>
  );
};

const CourseCategoryTabs = ({ categories, activeTab, setActiveTab }) => {
  return (
    <div className="w-full flex border-b border-base-300">
      <ul className="flex">
        {categories.map((cat) => (
          <CategoryTab
            key={cat.id}
            category={cat.name}
            isActive={activeTab === cat.name}
            onClick={() => setActiveTab(cat.name)}
          />
        ))}
      </ul>
    </div>
  );
};

export default CourseCategoryTabs;
