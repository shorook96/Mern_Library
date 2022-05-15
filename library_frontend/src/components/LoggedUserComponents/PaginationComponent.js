import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { usePaginationRange } from './UsePaginationCustomHook';
export const DOTS = '...';

const PaginationComponent = ({
  data,
  RenderComponent,
  title,
  buttonConst,
  contentPerPage,
  siblingCount,
}) => {
  const [totalPageCount] = useState(Math.ceil(data.length / contentPerPage));
  const [currentPage, setCurrentPage] = useState(1);

  const paginationRange = usePaginationRange({
    totalPageCount,
    contentPerPage,
    buttonConst,
    siblingCount,
    currentPage,
  });

  useEffect(() => {
    // window.scrollTo({
    //   behavior: 'smooth',
    //   top: '0px',
    // });
  }, [currentPage]);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }
  function gotToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }
  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }
  const getPaginatedData = () => {
    const startIndex = currentPage * contentPerPage - contentPerPage;
    const endIndex = startIndex + contentPerPage;
    return data.slice(startIndex, endIndex);
  };

  return (
    <div>
      <h1>{title}</h1>
      <div className="container">
        <Row>
          {getPaginatedData().map((dataItem, index) => (
            <Col md={4}>
              <RenderComponent key={index} data={dataItem} />
            </Col>
          ))}
        </Row>
      </div>

      <div className="pagination">
        <button
          onClick={gotToPreviousPage}
          className={` page-item page-link" ${
            currentPage === 1 ? 'disabled' : ''
          }`}
        >
          prev
        </button>
        {paginationRange.map((item, index) => {
          if (item === DOTS) {
            return (
              <button key={index} className={`page-item page-link`}>
                &#8230;
              </button>
            );
          }
          return (
            <button
              key={index}
              onClick={changePage}
              className={`page-item page-link ${
                currentPage === item ? 'active' : null
              }`}
            >
              <span>{item}</span>
            </button>
          );
        })}
        <button
          onClick={goToNextPage}
          className={`page-item page-link ${
            currentPage === totalPageCount ? 'disabled' : ''
          }`}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default PaginationComponent;
