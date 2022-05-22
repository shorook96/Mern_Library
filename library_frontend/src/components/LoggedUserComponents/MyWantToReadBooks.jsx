import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PaginationComponent from './PaginationComponent';
import BookItemComponent from './BookItemComponent';
import { UseAuth } from '../Helpers/Auth';
import MyBookItemComponent from './MyBookItemComponent';

const MyWantToReadBooks = () => {
  const [res, setRes] = useState({});

  const { user } = UseAuth();

  const changeCurrent = (pageNumber) => {
    const skipNumber =
      Number(pageNumber) === 1 ? 0 : Number(pageNumber) * 2 - 2;
    const wantToReadBooks = user.userBooks.allMybooks.filter(
      (book) => book.state === 'Want To Read'
    );
    console.log(wantToReadBooks);

    const booksPerPage = wantToReadBooks.slice(skipNumber, skipNumber + 2);
    setRes({
      currentPage: pageNumber,
      booksPerPage: booksPerPage,
      booksCount: wantToReadBooks.length,
    });
  };

  useEffect(() => {
    changeCurrent(1);
  }, []);
  return (
    <>
      {res.booksCount ? (
        <PaginationComponent
          Data={res.booksPerPage}
          itemsCount={Number(res.booksCount)}
          totalPageCount={Math.ceil(Number(res.booksCount) / 2)}
          RenderComponent={MyBookItemComponent}
          changeCurrent={changeCurrent}
          currentPageNumber={res.currentPage}
        />
      ) : (
        // <h1>hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii</h1>
        // <h1>zahra</h1>
        // <h1>Data</h1>
        <h1>loading...</h1>
      )}
    </>
  );
};

export default MyWantToReadBooks;