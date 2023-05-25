import React from 'react';
import '../components/scss/pagination.scss'

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  limitOptions: number[];
  limit: number;
  onChangeLimit: (value: number) => void;
  onChangePage: (value: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  limitOptions,
  limit,
  onChangeLimit,
  onChangePage,
}) => {
  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(event.target.value);
    onChangeLimit(newLimit);
  };

  const handlePageChange = (page: number) => {
    onChangePage(page);
  };

  return (
    <div className="pagination">
      <span>{currentPage} de {totalPages}</span>
      <select value={limit} onChange={handleLimitChange}>
        {limitOptions.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        Anterior
      </button>
      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Próxima
      </button>
    </div>
  );
};

export default Pagination;
