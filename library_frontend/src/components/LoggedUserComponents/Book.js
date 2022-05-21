import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card';
import Select from './SelectComponent';
import StarRating from './RatingComponent'
import './Book.css'

// const LOCALHOST = 'http://localhost:3000/';
const AddReview = (data) => {
  console.log(data);
  return fetch("http://localhost:5000/" + 'review/', {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      // "Authorization": new Cookies().get('token'),
    },
  }).then(response =>
      response.json()
  ).catch(error => {
      console.log('data will be send later');
  })
}

const GetReview = (data) => {
  return fetch("http://localhost:5000/" + 'review/'+data)
      .then(response =>
      response.json())
}

const  GetBooks = (data) => {
  return fetch("http://localhost:5000/" + 'books/'+data)
      .then(response =>
      response.json())
}



export default function Book() {

  const {id} = useParams();

  console.log(id);


   const [BooksInfo,  setBooksInfo] = useState({
    BookID: id,
    BookName: '',
    
   brief: '',

    photo: ''
    
  });

 useEffect(()=>{

    GetBooks(BooksInfo.BookID).then((data) => {
    console.log(",.,.", );
  console.log("zzzzzzzzz  ", data);
   

  

     setBooksInfo({
        bookID: data._id,
        bookName: data.bookName,
        
        brief: data.brief,
    
        photo: data.photo
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
          <h6 class="authorname"> {BooksInfo.author_fname}  {BooksInfo.author_lname}</h6>
          <h6 class="category"> {BooksInfo.category}</h6>
          <div class="rating">
            <StarRating stars={BooksInfo.stars} /> <span class="userRatingnum">  {BooksInfo.rate} ratings</span>
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





