import React, { useEffect, useState } from 'react';
import PaginationComponent from './PaginationComponent';
import { UseAuth } from '../Helpers/Auth';
import MyBookItemComponent from './MyBookItemComponent';

const MyCurrentlyReadingBooks = () => {
  const [res, setRes] = useState({});

  const { user } = UseAuth();

  const changeCurrent = (pageNumber) => {
    const skipNumber =
      Number(pageNumber) === 1 ? 0 : Number(pageNumber) * 2 - 2;
    const currentlyReadBooks = user.userBooks.allMybooks.filter(
      (book) => book.state === 'Currently Reading'
    );
    console.log(currentlyReadBooks);

    const booksPerPage = currentlyReadBooks.slice(skipNumber, skipNumber + 2);
    setRes({
      currentPage: pageNumber,
      booksPerPage: booksPerPage,
      booksCount: currentlyReadBooks.length,
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

export default MyCurrentlyReadingBooks;