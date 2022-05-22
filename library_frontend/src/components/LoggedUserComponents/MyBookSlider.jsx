import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PaginationComponent from './PaginationComponent';
import BookItemComponent from './BookItemComponent';
import { UseAuth } from '../Helpers/Auth';
import MyBookItemComponent from './MyBookItemComponent';
import { Container } from 'react-bootstrap';

const MyBookSlider = () => {
  const [res, setRes] = useState({});

  const { user } = UseAuth();

  const changeCurrent = (pageNumber) => {
    const skipNumber =
      Number(pageNumber) === 1 ? 0 : Number(pageNumber) * 6 - 6;
    const booksPerPage = user.userBooks.allMybooks.slice(
      skipNumber,
      skipNumber + 6
    );
    setRes({
      currentPage: pageNumber,
      booksPerPage: booksPerPage,
      booksCount: user.userBooks.booksCount,
    });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/${user.userInfo.id}/myBooks`, {
        headers: {
          authorization: user.userInfo.authorization,
        },
      })
      .then((response) => {
        user.userBooks = response.data;
        // setRes(response.data);
        changeCurrent(1);
      })
      .catch((error) => {});
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
            title="My Books"
          />
        ) : (
          // <h1>hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii</h1>
          // <h1>zahra</h1>
          // <h1>Data</h1>
          <h1>loading...</h1>
        )}
      </Container>
    </>
  );
};

export default MyBookSlider;
