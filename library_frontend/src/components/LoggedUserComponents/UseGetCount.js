import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UseAuth } from '../Helpers/Auth';

const UseGetCount = () => {
  let totalPageCount = 0;
  const [BooksCount,setBooksCount] = useState(0);
  const { user } = UseAuth();
  
  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/${user.userInfo.id}/books/count`, {
        headers: {
          authorization: user.userInfo.authorization,
        },
      })
      .then((response) => {
        setBooksCount (response.data.booksCount) ;
        totalPageCount = Math.ceil(BooksCount / 6);
        console.log('hhhhhhhhhhhhh ' + BooksCount + ' ' + totalPageCount);
        
      })
      .catch((error) => {
        console.log('errrrrrrrrrrrrrrrrrrrrrrr ' + error);
      });
  }, []);

  return {BooksCount, totalPageCount};
};

export default UseGetCount;
