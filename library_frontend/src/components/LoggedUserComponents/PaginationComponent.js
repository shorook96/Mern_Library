import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { UseAuth } from '../Helpers/Auth';
import ItemsContainer from './ItemsContainer';
import { usePaginationRange } from './UsePaginationCustomHook';

const PaginationComponent = ({
  itemsCount,
  totalPageCount,
  RenderComponent,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageContent, setCurrentPageContent] = useState([]);
  const { user } = UseAuth();

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
      .get(
        `http://localhost:5000/user/${user.userInfo.id}/books/:${currentPage}`,
        {
          headers: {
            authorization: user.userInfo.authorization,
          },
        }
      )
      .then((response) => {
        setCurrentPageContent(response.data);
      })
      .catch((error) => {
        console.log('myerrrrrrrrrrrrrrrrrrrrrrrr ' + error);
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
      <ItemsContainer currentPageContent={currentPageContent} />
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
