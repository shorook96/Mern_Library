import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ItemsContainer from './ItemsContainer';
import UseGetBooks from './UseGetBooks';
import { usePaginationRange } from './UsePaginationCustomHook';

const PaginationComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [PageContent, totalBooksCount] = UseGetBooks(currentPage);
  const totalPageCount = Math.ceil(totalBooksCount / 6);
  const buttonConst = 3;
  const siblingCount = 1;
  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }
  function gotToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }
  useEffect(() => {
    window.scrollTo({
      behavior: 'smooth',
      top: '0px',
    });
  }, [currentPage]);

  const pageRange = usePaginationRange({
    totalPageCount,
    buttonConst,
    siblingCount,
    currentPage,
  });
  return (
    <>
      <ItemsContainer currentPageContent={PageContent} />
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              href="#"
              aria-label="Previous"
              disabled={currentPage === 1}
              onClick={gotToPreviousPage}
            >
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </button>
          </li>
          {pageRange.map((val) => {
            <li className="page-item">
              <button
                className="page-link"
                href="#"
                classNameName={currentPage === val ? 'active' : ''}
                onClick={(e) => (e === '...' ? null : setCurrentPage(val))}
              >
                {val}
              </button>
            </li>;
          })}

          <li className="page-item">
            <button
              className="page-link"
              href="#"
              aria-label="Next"
              disabled={currentPage === 1}
              onClick={goToNextPage}
            >
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default PaginationComponent;
