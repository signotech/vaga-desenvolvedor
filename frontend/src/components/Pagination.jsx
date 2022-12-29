import PropTypes from 'prop-types';
import BsPagination from 'react-bootstrap/Pagination';

export default function Pagination({
  pageNumber,
  itemsPerPage,
  currentPageLength,
  onPageNumberChange,
}) {
  return (
    <BsPagination className="mb-0 mt-2">
      <BsPagination.Prev
        onClick={() => onPageNumberChange(pageNumber - 1)}
        disabled={pageNumber === 1}
      />
      <BsPagination.Item disabled>{pageNumber}</BsPagination.Item>
      <BsPagination.Next
        onClick={() => onPageNumberChange(pageNumber + 1)}
        disabled={currentPageLength < itemsPerPage}
      />
    </BsPagination>
  );
}

Pagination.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPageLength: PropTypes.number.isRequired,
  onPageNumberChange: PropTypes.func.isRequired,
};
