import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PaginationComponent from './PaginationComponent';
import ItemComponent from './ItemComponent';
import { UseAuth } from '../Helpers/Auth';

const BooksSlider = () => {
  let totalPageCount = 0;
  let BooksCount = 0;
  const { user } = UseAuth();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/${user.userInfo.id}/books/count`, {
        headers: {
          authorization: user.userInfo.authorization,
        },
      })
      .then((response) => {
        BooksCount = response.data.booksCount;
        totalPageCount = Math.ceil(BooksCount / 6);
        console.log('hhhhhhhhhhhhh ' + BooksCount + ' ' + totalPageCount);
      })
      .catch((error) => {
        console.log('errrrrrrrrrrrrrrrrrrrrrrr ' + error);
      });
  }, []);

  return (
    <>
      {/* <PaginationComponent
        itemsCount={books.length}
        RenderComponent={ItemComponent}
        contentPerPage={6}
        title="books"
        buttonConst={3}
        siblingCount={6}
      /> */}
      {BooksCount ? (
        <PaginationComponent
          itemsCount={BooksCount}
          totalPageCount={totalPageCount}
          RenderComponent={ItemComponent}
        />
      ) : null}
    </>
  );
};

export default BooksSlider;
