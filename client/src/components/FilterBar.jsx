// FilterBar.jsx - Horizontal scrollable category buttons with an active state.
export const categories = ['All', 'Web Development', 'JavaScript', 'Data Structures', 'Music', 'Gaming', 'News', 'Live', 'Sports', 'Cooking']

function FilterBar({ activeCategory, onCategoryChange }) {
  return (
    <div className="filter-bar" aria-label="Video category filters">
      {categories.map((category) => (
        <button
          className={`filter-bar__button ${activeCategory === category ? 'filter-bar__button--active' : ''}`}
          key={category}
          type="button"
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default FilterBar
