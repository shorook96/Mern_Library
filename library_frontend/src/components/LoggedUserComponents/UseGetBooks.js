import axios from 'axios';
import { useEffect, useState } from 'react';
import { UseAuth } from '../Helpers/Auth';

const UseGetBooks = ({ currentPage }) => {
  const [PageContent, setPageContent] = useState([]);
  const [totalBooksCount, setTotalBooksCount] = useState([]);
  const { user } = UseAuth();

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/user/${user.userInfo.id}/books/:${currentPage}`,
        {
          headers: {
            authorization: user.userInfo.authorization,
          },
        }
      )
      .then((response) => {
        setPageContent(response.data.books);
        setTotalBooksCount(Number(response.data.booksCount));
      })
      .catch((error) => {
        console.log('myerrrrrrrrrrrrrrrrrrrrrrrr ' + error);
      });
  }, [PageContent, totalBooksCount]);
  return [];
};

export default UseGetBooks;
