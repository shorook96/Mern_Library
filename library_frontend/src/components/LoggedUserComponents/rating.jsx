import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { UseAuth } from '../Helpers/Auth';

function Rating({ bookId, currentlyRating }) {
  const changeValue = (newRate) => {
    user.userBooks.allMybooks.forEach((b) => {
      if (b.book._id === bookId) {
        b.userRating = newRate;
      }
    });
  };

  console.log('from rating ' + currentlyRating);
  const [rate, setRating] = useState(currentlyRating);
  const [hover, setHover] = useState(null);
  const { user } = UseAuth();

  useEffect(() => {
    if (rate !== 0 && rate !== currentlyRating) {
      console.log(bookId);
      axios
        .patch(
          `http://localhost:5000/user/${user.userInfo.id}/mybook/rate/${bookId}`,
          { rate },
          {
            headers: {
              authorization: user.userInfo.authorization,
            },
          }
        )
        .then((response) => {
          console.log(response);
          changeValue(rate);
        })
        .catch((error) => {
          console.log('error ' + error);
        });
    }
  }, [rate]);

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <FaStar
              size={22}
              color={ratingValue <= (hover || rate) ? '#ffc107' : '#ccccb3'}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
}

export default Rating;
