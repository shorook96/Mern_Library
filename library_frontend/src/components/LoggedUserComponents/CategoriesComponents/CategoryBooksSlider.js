import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PaginationComponent from '../PaginationComponents/PaginationComponent';
import BookItemComponent from '../Books/BookItemComponent';
import { UseAuth } from '../../Helpers/Auth';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const CategoryBooksSlider = () => {
  const { id, categoryName } = useParams();
  const [res, setRes] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const { user } = UseAuth();

  const changeCurrent = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/user/${user.userInfo.id}/booksofCategory/${id}/${currentPage}`,
        {
          headers: {
            authorization: user.userInfo.authorization,
          },
        }
      )
      .then((response) => {
        setRes(response.data);
      })
      .catch((error) => {});
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
            title={`Books of ${categoryName}`}
          />
        </Container>
      ) : (
        <h1
          className="noBooks"
          style={{ fontFamily: 'Brush Script MT, Brush Script Std, cursive' }}
        >
          No Books...
        </h1>
      )}
    </>
  );
};

export default CategoryBooksSlider;
