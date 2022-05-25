import React from 'react';
import ItemsContainer from './ItemsContainer';
import { usePaginationRange } from './UsePaginationCustomHook';

const PaginationComponent = ({
  Data,
  itemsCount,
  totalPageCount,
  RenderComponent,
  changeCurrent,
  currentPageNumber,
  title,
}) => {
  const buttonConst = 3;
  const siblingCount = 1;
  function goToNextPage() {
    changeCurrent(currentPageNumber + 1);
  }
  function gotToPreviousPage() {
    changeCurrent(currentPageNumber - 1);
  }

  const pageRange = usePaginationRange({
    totalPageCount, //2
    buttonConst,
    siblingCount,
    currentPageNumber,
  });

  return (
    <>
      <div className="d-flex flex-column w-100 m-auto mt-4">
        <h1
          className="custom-title"
          style={{ fontFamily: 'Brush Script MT, Brush Script Std, cursive' }}
        >
          {title}
        </h1>

        <ItemsContainer
          currentPageContent={Data}
          RenderComponent={RenderComponent}
        />
        {totalPageCount > 1 ? (
          <div className="m-auto mt-5  text-center">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <button
                    className="page-link"
                    href="#"
                    aria-label="Previous"
                    disabled={currentPageNumber === 1}
                    onClick={gotToPreviousPage}
                  >
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </button>
                </li>
                {pageRange.map((val) => {
                  return (
                    <li className="page-item" key={val}>
                      <button
                        className={
                          currentPageNumber === val
                            ? 'active btn-primary page-link'
                            : 'page-link'
                        }
                        onClick={() => changeCurrent(val)}
                      >
                        {val}
                      </button>
                    </li>
                  );
                })}

                <li className="page-item">
                  <button
                    className="page-link"
                    href="#"
                    aria-label="Next"
                    disabled={currentPageNumber === totalPageCount}
                    onClick={goToNextPage}
                  >
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default PaginationComponent;
