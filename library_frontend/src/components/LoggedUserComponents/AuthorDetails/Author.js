import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import Card from '../BookDetails/Card';

import ReactStars from 'react-stars';

import './Author.css';

const AddReview = (data) => {
  return fetch('http://localhost:5000/' + 'review/', {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((error) => {});
};

const GetReview = (data) => {
  return fetch('http://localhost:5000/' + 'review/' + data).then((response) =>
    response.json()
  );
};

const GetAuthor = (data) => {
  return fetch('http://localhost:5000/' + 'Authors/' + data).then((response) =>
    response.json()
  );
};
const GetBooks = (data) => {
  return fetch('http://localhost:5000/' + 'Authors/books/' + data).then(
    (response) => response.json()
  );
};

export default function Author() {
  const { id } = useParams();

  const [AuthorsInfo, setAuthorsInfo] = useState({
    AuthorID: id,
    FirstName: '',
    LastName: '',
    authorName: '',

    DateofBirth: '',
    Bio: '',

    photo: '',
  });
  var books = [];
  const [BooksInfo, setBooksInfo] = useState({
    books,
  });

  useEffect(() => {
    GetAuthor(AuthorsInfo.AuthorID).then((data) => {
      setAuthorsInfo({
        AuthorID: data._id,
        FirstName: data.firstname,
        LastName: data.lastname,
        authorName: data.firstname + ' ' + data.lastname,

        DateofBirth: data.DOB,
        Bio: data.bio,

        photo: data.photo,
      });
    });
  }, []);

  useEffect(() => {
    GetBooks(AuthorsInfo.AuthorID).then((booksdata) => {
      setBooksInfo({
        books: booksdata,
      });
    });
  }, []);

  var listt = BooksInfo.books.map((li) => {
    return (
      <div class="booksofauthor">
        <img class=" bookimg" src={li.photo} width="70px" height="70px"></img>

        <div class="rating">
          <h6>{li.bookName}</h6>
          <ReactStars
            count={5}
            value={li.rating.totalRate}
            edit={false}
            size={24}
            color2={'#ffd700'}
          />
          <span>
            {li.rating.totalRate} stars - {li.rating.numberOfRates} ratings
          </span>
        </div>

        <hr></hr>
      </div>
    );
  });

  return (
    <div class="parentContainer">
      <div class="all">
        <Card
          class="card"
          im={AuthorsInfo.photo}
          name={AuthorsInfo.authorName}
        />
        <div class="beside">
          <h3 class="i">
            {AuthorsInfo.FirstName} {AuthorsInfo.LastName}
          </h3>
          <small>{AuthorsInfo.DateofBirth}</small>
          <div class="description">
            <p>{AuthorsInfo.Bio}</p>
          </div>
        </div>
      </div>
      <div class="authorbooks">
        <h5 class="s">Author Books</h5>
        <>{listt}</>
      </div>
    </div>
  );
}
