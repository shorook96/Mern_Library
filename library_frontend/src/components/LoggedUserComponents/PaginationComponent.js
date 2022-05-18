import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { UseAuth } from '../Helpers/Auth';
import ItemsContainer from './ItemsContainer';
import { usePaginationRange } from './UsePaginationCustomHook';

const PaginationComponent = ({
  Data,
  itemsCount,
  totalPageCount,
  RenderComponent,
  changeCurrent,
  currentPageNumber
}) => {
  // const [currentPage, setCurrentPage] = useState(currentPageNumber);
  // const [currentPageContent, setCurrentPageContent] = useState(Data);
  
  console.log(`zzzz${currentPageNumber}`)
  // console.log(`zzzz${Data[0]._id}`)
  // console.log(`aaaaaa${currentPage}`)
  

  const buttonConst = 3;
  const siblingCount = 1;
  function goToNextPage() {
    
    // changeCurrent(currentPage +1)
    // setCurrentPage(currentPageNumber)
    changeCurrent(currentPageNumber +1)
   
    
  }
  function gotToPreviousPage() {
    
    // changeCurrent(currentPage -1)
    // setCurrentPage(currentPageNumber)
    changeCurrent(currentPageNumber -1)
    
  }
  
  // function setCurrent(e){
  //   if (e.target.value === '...') {}
  //   else{
  //     changeCurrent(Number(e.target.value))
  //     // setCurrentPage(currentPageNumber)
  //   };
    
    
  // useEffect(() => {
  //   setCurrentPage(currentPageNumber)
  // }) 

  const pageRange = usePaginationRange({
    totalPageCount,  //2
    buttonConst,
    siblingCount,
    currentPageNumber,
  });
  
  return (
    <>
      <ItemsContainer currentPageContent={Data} />
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
            
            return(<li className="page-item" key={val}>
              <button 
                className={currentPageNumber === val  ? 'active btn-primary page-link': 'page-link' }
                onClick={()=>changeCurrent(val)}
                
              >
                {val}
              </button>
            </li>)
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
    </>
  );}


export default PaginationComponent;
