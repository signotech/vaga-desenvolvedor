import PropTypes from 'prop-types';

export default function Pagination({
  pageNumber,
  itemsPerPage,
  currentPageLength,
  onPageNumberChange,
}) {
  return (
    <div>
      <button
        type="button"
        onClick={() => onPageNumberChange(pageNumber - 1)}
        disabled={pageNumber === 1}
      >
        Anterior
      </button>
      <span>{pageNumber}</span>
      <button
        type="button"
        onClick={() => onPageNumberChange(pageNumber + 1)}
        disabled={currentPageLength < itemsPerPage}
      >
        Próximo
      </button>
    </div>
  );
}

Pagination.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPageLength: PropTypes.number.isRequired,
  onPageNumberChange: PropTypes.func.isRequired,
};
