import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PaginationComponent from '../PaginationComponents/PaginationComponent';
import AuthorItemComponent from './AuthorItemComponent';
import { UseAuth } from '../../Helpers/Auth';

const AuthorsSlider = () => {
  const [res, setRes] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const { user } = UseAuth();

  const changeCurrent = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/user/${user.userInfo.id}/authors/${currentPage}`,
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
      {res.authorsCount ? (
        <PaginationComponent
          Data={res.authors}
          itemsCount={Number(res.authorsCount)}
          totalPageCount={Math.ceil(Number(res.authorsCount) / 6)}
          RenderComponent={AuthorItemComponent}
          changeCurrent={changeCurrent}
          currentPageNumber={currentPage}
          title="Authors"
        />
      ) : (
        <h1
          className="noBooks"
          style={{ fontFamily: 'Brush Script MT, Brush Script Std, cursive' }}
        >
          No Authors...
        </h1>
      )}
    </>
  );
};

export default AuthorsSlider;
