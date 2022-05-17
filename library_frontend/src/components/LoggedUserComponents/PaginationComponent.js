import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { usePaginationRange } from './UsePaginationCustomHook';

const PaginationComponent = ({
  itemsCount,
  totalPageCount,
  RenderComponent,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageContent, setCurrentPageContent] = useState([]);

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
    axios
      .get(`http://localhost:5000/user/books/:${currentPage}`)
      .then((response) => {
        setCurrentPageContent(response.data);
      })
      .catch((response) => {});
  }, [currentPage]);

  const pageRange = usePaginationRange({
    totalPageCount,
    buttonConst,
    siblingCount,
    currentPage,
  });
  return (
    <>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <button
              class="page-link"
              href="#"
              aria-label="Previous"
              disabled={currentPage === 1}
              onClick={gotToPreviousPage}
            >
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </button>
          </li>
          {pageRange.map((val) => {
            <li class="page-item">
              <button
                class="page-link"
                href="#"
                className={currentPage === val ? 'active' : ''}
                onClick={(e) => (e === '...' ? null : setCurrentPage(val))}
              >
                {val}
              </button>
            </li>;
          })}

          <li class="page-item">
            <button
              class="page-link"
              href="#"
              aria-label="Next"
              disabled={currentPage === 1}
              onClick={goToNextPage}
            >
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default PaginationComponent;
