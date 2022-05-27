import React, { useEffect, useState } from 'react';
import PaginationComponent from '../PaginationComponents/PaginationComponent';
import { UseAuth } from '../../Helpers/Auth';
import MyBookItemComponent from './MyBookItemComponent';
import { Container } from 'react-bootstrap';

const MyCurrentlyReadingBooks = () => {
  const [res, setRes] = useState({});

  const { user } = UseAuth();

  const changeCurrent = (pageNumber) => {
    const skipNumber =
      Number(pageNumber) === 1 ? 0 : Number(pageNumber) * 6 - 6;
    const currentlyReadBooks = user.userBooks.allMybooks.filter(
      (book) => book.state === 'Currently Reading'
    );

    const booksPerPage = currentlyReadBooks.slice(skipNumber, skipNumber + 6);
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
      <Container>
        {res.booksCount ? (
          <PaginationComponent
            Data={res.booksPerPage}
            itemsCount={Number(res.booksCount)}
            totalPageCount={Math.ceil(Number(res.booksCount) / 6)}
            RenderComponent={MyBookItemComponent}
            changeCurrent={changeCurrent}
            currentPageNumber={res.currentPage}
            title="Currently Reading books"
          />
        ) : (
          <h1
            className="noBooks"
            style={{ fontFamily: 'Brush Script MT, Brush Script Std, cursive' }}
          >
            No Books...
          </h1>
        )}
      </Container>
    </>
  );
};

export default MyCurrentlyReadingBooks;
