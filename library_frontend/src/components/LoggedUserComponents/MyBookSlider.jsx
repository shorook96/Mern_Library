import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PaginationComponent from './PaginationComponent';
import BookItemComponent from './BookItemComponent';
import { UseAuth } from '../Helpers/Auth';
import MyBookItemComponent from './MyBookItemComponent';

const MyBookSlider = () => {
  const [res, setRes] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const { user } = UseAuth();

  const changeCurrent = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {}, [currentPage]);
  return (
    <>
      {res.lenght ? (
        <PaginationComponent
          Data={res}
          itemsCount={Number(user.userInfo.books.lenght)}
          totalPageCount={Math.ceil(Number(user.userInfo.books.lenght) / 2)}
          RenderComponent={MyBookItemComponent}
          changeCurrent={changeCurrent}
          currentPageNumber={currentPage}
        />
      ) : (
        // <h1>Data</h1>
        <h1>loading...</h1>
      )}
    </>
  );
};

export default MyBookSlider;
