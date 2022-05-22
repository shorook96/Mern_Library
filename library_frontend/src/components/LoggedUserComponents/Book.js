import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card';
import Select from './SelectComponent';
import StarRating from './RatingComponent';
// import Rating from 'react-simple-star-rating'
// import Rating from './rating';
import './Book.css';
import {Link} from "react-router-dom";
// import Rating from '@mui/material/Rating';
import {UseAuth} from  '../Helpers/Auth';
var Rating = require('react-star-rating-lite');

  
// const LOCALHOST = 'http://localhost:3000/';
function AddReview(data) {
  console.log(data);
  return fetch("http://localhost:5000/" + 'review/', {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      // "Authorization": new Cookies().get('token'),
    },
  }).then(response => response.json()
  ).catch(error => {
    console.log('data will be send later');
  });
}

const GetReview = (data) => {
  return fetch("http://localhost:5000/" + 'review/'+data)
      .then(response =>
      response.json())
}

const  GetBooks = (data) => {
  return fetch("http://localhost:5000/" + 'books/fulldata/'+data)
      .then(response =>
      response.json())
}



export default function Book() {

  const {id} = useParams();

  console.log(id);
  const {user} =UseAuth();
  // console.log("users"+ user.userInfo.id )


   const [BooksInfo,  setBooksInfo] = useState({
    BookID: id,
    BookName: '',
    authorName:" ",
    authorId: ' ',
    categoryName:" ",
    categoryId:' ',

    brief: '',

    photo: '',
    totalrating:' ' ,
    numberrating: ' '
    
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






  // console.log("bbbbb  ", BookInfo);

  // var list = ReviewInfo.review.map((data)=>{

  //   return (
  //     <div  class="booksofauthor"><img class=" bookimg" src="https://www.clipartmax.com/png/middle/72-722180_these-are-some-cats-avatar-i-drew-during-my-free-time-black.png" width="70px" height="70px"></img> 
      
  //     <div class="selectandrating">
  //         <div><Select/></div>
  //     <div><StarRating stars={data.rating}/></div>
  //     </div>
  //     <div class="rating">
  //         <h6>{data.user.fName} { data.user.lName}</h6>
          
  //         <strong>{data.review}</strong>
  //         <br></br>
  //         <strong>{data.created_at}</strong>
          
  //     </div>
      
  //      <hr></hr>
  //      </div>)


  // })

  return (
    

    <div class="parentContainer">
      <div>
        <div class="cardAndrateAndselect">
          <Card name={BooksInfo.bookName} im={BooksInfo.photo} />
          <div class="selectt">
            <Select />
          </div>
          <div class="ratingg">
            <StarRating />
          </div>
        </div>
        <div class="beside">
          <h3 class="bookname"> {BooksInfo.bookName}</h3>
          <h6 class="authorname"> <Link style={{ color: '#FD5' }} to={'/Author/'+BooksInfo.authorId}> {BooksInfo.authorName} </Link>  </h6>
          <h6 class="category">  {BooksInfo.categoryName}</h6>
          <div class="rating">
          {/* <Rating bookId={BooksInfo.BookID} currentlyRating={BooksInfo.totalrating } /> */}
            
          <StarRating stars={BooksInfo.totalrating} />
          {/* <Rating
        
        ratingValue={BooksInfo.totalrating}
        size={20}
        label
        transition
        fillColor='orange'
        emptyColor='gray'
        className='foo' 
      /> */}

      {/* <Rating value="2" readonly/> */}
      <span class="userRatingnum"> {BooksInfo.totalrating } - {BooksInfo.numberrating} ratings</span>
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
        {/* <>{list}</> */}
      </div>
    </div>


  );

};





