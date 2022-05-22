import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PaginationComponent from './PaginationComponent';
import BookItemComponent from './BookItemComponent';
import { UseAuth } from '../Helpers/Auth';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const AuthorsBooksComponent = () => {
  const { id, authorName } = useParams();

  const [res, setRes] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const { user } = UseAuth();

  const changeCurrent = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    console.log(id);
    axios
      .get(
        `http://localhost:5000/user/${user.userInfo.id}/booksofAuthor/${id}/${currentPage}`,
        {
          headers: {
            authorization: user.userInfo.authorization,
          },
        }
      )
      .then((response) => {
        setRes(response.data);
      })
      .catch((error) => {
        console.log('errrrrrrrrrrrrrrrrrrrrrrr ' + error);
      });
  }, [currentPage]);

  return (
    <>
      {res.books && res.booksCount ? (
        <Container>
          <PaginationComponent
            Data={res.books}
            itemsCount={Number(res.booksCount)}
            totalPageCount={Math.ceil(Number(res.booksCount) / 6)}
            RenderComponent={BookItemComponent}
            changeCurrent={changeCurrent}
            currentPageNumber={currentPage}
            title={authorName}
          />
        </Container>
      ) : (
        // <h1>Data</h1>
        <h1>loading...</h1>
      )}
    </>
  );
};

export default AuthorsBooksComponent;
