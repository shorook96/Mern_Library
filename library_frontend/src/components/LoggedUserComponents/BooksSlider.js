import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PaginationComponent from './PaginationComponent';
import ItemComponent from './ItemComponent';

const BooksSlider = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/photos')
      .then((response) => {
        setBooks(response.data);
      })
      .catch((response) => {});
  }, []);

  return (
    <>
      <PaginationComponent
        data={books}
        RenderComponent={ItemComponent}
        title="books"
        buttonConst={3}
        contentPerPage={6}
        siblingCount={3}
      />
    </>
  );
};

export default BooksSlider;
