import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PaginationComponent from './PaginationComponent';
import BookItemComponent from './BookItemComponent';
import { UseAuth } from '../Helpers/Auth';
import MyBookItemComponent from './MyBookItemComponent';

const MyBookSlider = () => {
  const [res, setRes] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const { user } = UseAuth();

  const changeCurrent = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/user/${user.userInfo.id}/myBooks/${currentPage}`,
        {
          headers: {
            authorization: user.userInfo.authorization,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        
        setRes(response.data);
      })
      .catch((error) => {
        console.log('errrrrrrrrrrrrrrrrrrrrrrr ' + error);
      });
  }, [currentPage]);
  return (
    <>
      {res.booksCount ? (
        <PaginationComponent
          Data={res.booksPerPage}
          itemsCount={Number(res.booksCount)}
          totalPageCount={Math.ceil(Number(res.booksCount) / 2)}
          RenderComponent={MyBookItemComponent}
          changeCurrent={changeCurrent}
          currentPageNumber={currentPage}
        />
        // <h1>zahra</h1>
      ) : (
        // <h1>Data</h1>
        <h1>loading...</h1>
      )}
    </>
  );
};

export default MyBookSlider;
