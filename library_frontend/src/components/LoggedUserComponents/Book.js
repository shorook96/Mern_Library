import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card';
import Select from './SelectComponent';
import StarRating from './RatingComponent';

import './Book.css';
import {Link} from "react-router-dom";




  



const  GetBooks = (data) => {
  return fetch("http://localhost:5000/" + 'books/fulldata/'+data)
      .then(response =>
      response.json())
}



export default function Book() {

  const {id} = useParams();

  console.log(id);
  


   const [BooksInfo,  setBooksInfo] = useState({
    BookID: id,
    BookName: '',
    authorName:" ",
    authorId: ' ',
    categoryName:" ",
    categoryId:' ',

    brief: '',

    photo: '',
    totalrating:2 ,
    numberrating: 2
    
  });
  


 useEffect(()=>{

    GetBooks(BooksInfo.BookID).then((data) => {
    console.log(",.,.", );
  console.log("zzzzzzzzz  ", data);
   

  

     setBooksInfo({
        bookID: data._id,
        bookName: data.bookName,
        authorName:data.author.firstname+" "+ data.author.lastname,
        authorId:data.author.id,
      
        categoryName:data.category.categoryName,
        categoryId:data.category.id,
        
        brief: data.brief,
    
        photo: data.photo,
        totalrating:data.rating.totalRate,
         numberrating:data.rating.numberOfRates
    });
  })



 },[]);

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
        <StarRating stars={li.rating} /> <span class="userRatingnum">{li.rating}</span>{' '}
      </div>

      <hr></hr>
    </div>
  );
});

  return (
    

    <div class="parentContainer">
      <div>
        <div class="cardAndrateAndselect">
          <Card name={BooksInfo.bookName} im={BooksInfo.photo} />
          {/* <div class="selectt">
            <Select />
          </div>
          <div class="ratingg">
            <StarRating />
          </div> */}
        </div>
        <div class="beside">
          <h3 class="bookname"> {BooksInfo.bookName}</h3>
          <h6 class="authorname"> <Link style={{ color: '#FD5' }} to={'/Author/'+BooksInfo.authorId}> {BooksInfo.authorName} </Link>  </h6>
          <h6 class="category"> {BooksInfo.categoryName}</h6>
          <div class="rating">
          
            
          <StarRating stars={BooksInfo.totalrating} />
         
      <span class="userRatingnum"> {BooksInfo.totalrating } stars - {BooksInfo.numberrating} ratings</span>
          </div>
          <div class="description">
            <p>
              {BooksInfo.brief}
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

};





