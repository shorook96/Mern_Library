import React from 'react';
import Card from './Card';
import Select from './SelectComponent';
import StarRating from './RatingComponent';
import { UserLocation } from 'react-router-dom';

import './Book.css';

export default function Book(props) {
  // state = { im : "https://prod-images.tcm.com/Master-Profile-Images/WaltDisney.jpg" }
  // const author =props.match.params.id
  const location = UserLocation();
  const book = location.state.book;
  var list = [
    {
      username: 'Mohamed',
      rating: 5,
    },
    {
      username: 'Khaled',
      rating: 4.5,
    },
    {
      username: 'Leena',
      rating: 3.5,
    },
  ];
  var listt = list.map((li) => {
    return (
      <div class="booksofauthor">
        <img
          class=" userimg"
          src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
          width="70px"
          height="70px"
        ></img>

        {li.username}
        <div class="userRating">
          <StarRating /> <span class="userRatingnum">{li.rating}</span>{' '}
        </div>

        <hr></hr>
      </div>
    );
  });
  return (
    <div class="parentContainer">
      <div>
        <div class="cardAndrateAndselect">
          <Card im="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1470082995i/29056083.jpg" />
          <div class="selectt">
            <Select />
          </div>
          <div class="ratingg">
            <StarRating />
          </div>
        </div>
        <div class="beside">
          <h3 class="bookname">Harry Potter</h3>
          <h6 class="authorname">J.K. Rowling</h6>
          <h6 class="category">Fantasy</h6>
          <div class="rating">
            <StarRating /> <span class="userRatingnum"> 3.2 - 230 ratings</span>
          </div>
          <div class="description">
            <p>
              In the 1950s, Disney expanded into the amusement park industry,
              and in July 1955 he opened Disneyland in Anaheim In the 1950s,
              Disney expanded into the amusement park industry, and in July 1955
              he opened Disneyland in Anaheim. In the 1950s, Disney expanded
              into the amusement park industry, and in July 1955 he opened
              Disneyland in Anaheim.
            </p>
          </div>
        </div>
      </div>
      <div class="authorbooks">
        <h5 class="s">Reviews</h5>
        <>{listt}</>
      </div>
    </div>
  );
}
