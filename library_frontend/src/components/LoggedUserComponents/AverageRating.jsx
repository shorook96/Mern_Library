import { FaStar } from 'react-icons/fa';

function AverageRating({ currentlyRating }) {
  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              value={currentlyRating}
              disabled
            />
            <FaStar
              size={22}
              color={ratingValue <= currentlyRating ? '#ffc107' : '#e4e5e9'}
            />
          </label>
        );
      })}
    </div>
  );
}

export default AverageRating;
