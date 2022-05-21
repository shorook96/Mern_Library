import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PaginationComponent from './PaginationComponent';
import AuthorItemComponent from './AuthorItemComponent';
import { UseAuth } from '../Helpers/Auth';

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
        console.log(response.data);
        setRes(response.data);
      })
      .catch((error) => {
        console.log('errrrrrrrrrrrrrrrrrrrrrrr ' + error);
      });
  }, [currentPage]);

  return (
    <>
      {res.authorsCount ? (
        <PaginationComponent
          Data={res.authors}
          itemsCount={Number(res.authorsCount)}
          totalPageCount={Math.ceil(Number(res.authorsCount) / 2)}
          RenderComponent={AuthorItemComponent}
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

export default AuthorsSlider;
