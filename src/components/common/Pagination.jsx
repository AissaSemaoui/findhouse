const Pagination = ({
  totalPages = 5,
  currentPage = 2,
  onPageChange = () => {},
}) => {
  const handlePageChange = (page) => {
    if (page > totalPages) page = totalPages;
    if (page < 1) page = 1;

    return onPageChange(page);
  };

  return (
    <ul className="page_navigation">
      <li className={`page-item ${currentPage - 1 === 0 ? "disabled" : ""}`}>
        <a
          className="page-link"
          href="#"
          onClick={() => handlePageChange(currentPage - 1)}
          tabIndex="-1"
        >
          <span className="flaticon-left-arrow"></span>
        </a>
      </li>
      {currentPage !== 1 && (
        <li className="page-item">
          <a className="page-link" href="#" onClick={() => handlePageChange(1)}>
            1
          </a>
        </li>
      )}
      {currentPage - 1 > 1 && (
        <li className="page-item">
          <a
            className="page-link"
            href="#"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            {currentPage - 1}
          </a>
        </li>
      )}
      <li className="page-item disabled active">
        <a className="page-link" href="#" aria-disabled="true">
          {currentPage}
        </a>
      </li>

      {currentPage + 1 !== totalPages && currentPage !== totalPages && (
        <li className="page-item disabled">
          <a className="page-link" aria-disabled="true">
            ...
          </a>
        </li>
      )}
      {currentPage !== totalPages && (
        <li className={"page-item"}>
          <a
            className="page-link"
            href="#"
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </a>
        </li>
      )}
      <li
        className={`page-item ${currentPage >= totalPages ? "disabled" : ""}`}
      >
        <a
          className="page-link"
          aria-disabled={currentPage >= totalPages ? true : false}
          href="#"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <span className="flaticon-right-arrow"></span>
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
