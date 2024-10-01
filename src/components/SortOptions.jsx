import './SortOptions.css';
import PropTypes from 'prop-types';

function SortOptions({ sortOption, setSortOption }) {
  return (
    <div className="sort-options">
      <label htmlFor="sort">Ordenar por:</label>
      <select
        id="sort"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="price">Preço da Diária</option>
        <option value="rating">Classificação</option>
      </select>
    </div>
  );
}

SortOptions.propTypes = {
  sortOption: PropTypes.string.isRequired,
  setSortOption: PropTypes.func.isRequired,
};

export default SortOptions;