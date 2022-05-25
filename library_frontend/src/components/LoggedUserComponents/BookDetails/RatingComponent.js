import StarRatings from 'react-star-ratings';
import React from 'react';

export default function StarRating(props) {
  return (
    <>
      <StarRatings
        rating={props.stars}
        starRatedColor="yellow"
        // changeRating={this.changeRating}
        numberOfStars={5}
        starDimension="20px"
        starSpacing="3px"
        name="Average"
      />
    </>
  );
}
