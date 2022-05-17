import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PaginationComponent from './PaginationComponent';
import ItemComponent from './ItemComponent';

const BooksSlider = () => {
  const totalPageCount = 0;
  const BooksCount = 0;
  useEffect(() => {
    axios
      .get('http://localhost:5000/user/books/count')
      .then((response) => {
        BooksCount = response.data;
        totalPageCount = Math.ceil(BooksCount / 6);
      })
      .catch((response) => {});
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
      <PaginationComponent
        itemsCount={BooksCount}
        totalPageCount={totalPageCount}
        RenderComponent={ItemComponent}
      />
    </>
  );
};

export default BooksSlider;
