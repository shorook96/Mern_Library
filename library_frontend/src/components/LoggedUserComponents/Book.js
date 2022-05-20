
import React, {Component, useEffect, useState,useParams} from 'react';
import Card from './Card';
import Select from './SelectComponent';
import StarRating from './RatingComponent';
// // import { useLocation } from 'react-router-dom';

import './Book.css';

// export default function Book(props) {
//   // state = { im : "https://prod-images.tcm.com/Master-Profile-Images/WaltDisney.jpg" }
//   // const author =props.match.params.id
//   // const location = useLocation();
//   // const book = location.state.book;
//   // console.log(book)
//   var list = [
//     {
//       username: 'Mohamed',
//       rating: 5,
//     },
//     {
//       username: 'Khaled',
//       rating: 4.5,
//     },
//     {
//       username: 'Leena',
//       rating: 3.5,
//     },
//   ];
//   var listt = list.map((li) => {
//     return (
//       <div class="booksofauthor">
//         <img
//           class=" userimg"
//           src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
//           width="70px"
//           height="70px"
//         ></img>

//         {li.username}
//         <div class="userRating">
//           <StarRating /> <span class="userRatingnum">{li.rating}</span>{' '}
//         </div>

//         <hr></hr>
//       </div>
//     );
//   });
//   return (
//     <div class="parentContainer">
//       <div>
//         <div class="cardAndrateAndselect">
//           <Card im="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1470082995i/29056083.jpg" />
//           <div class="selectt">
//             <Select />
//           </div>
//           <div class="ratingg">
//             <StarRating />
//           </div>
//         </div>
//         <div class="beside">
//           <h3 class="bookname">Harry Potter</h3>
//           <h6 class="authorname">J.K. Rowling</h6>
//           <h6 class="category">Fantasy</h6>
//           <div class="rating">
//             <StarRating /> <span class="userRatingnum"> 3.2 - 230 ratings</span>
//           </div>
//           <div class="description">
//             <p>
//               In the 1950s, Disney expanded into the amusement park industry,
//               and in July 1955 he opened Disneyland in Anaheim In the 1950s,
//               Disney expanded into the amusement park industry, and in July 1955
//               he opened Disneyland in Anaheim. In the 1950s, Disney expanded
//               into the amusement park industry, and in July 1955 he opened
//               Disneyland in Anaheim.
//             </p>
//           </div>
//         </div>
//       </div>
//       <div class="authorbooks">
//         <h5 class="s">Reviews</h5>
//         <>{listt}</>
//       </div>
//     </div>
//   );
// }
const AddReview = (data) => {
  console.log(data);
  return fetch("http://localhost:5000/"+ 'review/', {
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

const  GetBook = (data) => {
  return fetch("http://localhost:5000/"+ 'books/'+data)
      .then(response =>
      response.json())
}

const  SetStatusReading = (data) => {
  console.log(data);
  return fetch("http://localhost:5000/" + 'users/current/books/', {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      // "Authorization": new Cookies().get('token'),
    },
  }).then(response =>
      response.json()
  ).catch(error => {
      console.log('Error');
  })
}
const Fn =  ()=>{
  const {id} = useParams();
  console.log("ID........" + id);
  return id;
}

export default function Book () {
 
  const {id} = useParams();

  console.log(id);


   const [BookInfo, setBookInfo] = useState({
    bookID: '',
    bookName: '',
    bookId: id,
    author: '',
    category: '',
    reviews: [],
    rate: '',
    newReview: '',
    photo: ''
    
  });

 useEffect(()=>{

  GetBook(BookInfo.bookId).then((data) => {
    console.log(",.,.", data.bookName);
  console.log("zzzzzzzzz  ", data._id);
   

    // GetReview(BookInfo.bookId).then((reviews)=>{
    //   console.log(reviews);
    //   console.log(BookInfo.bookId);

    //   // setBookInfo({
        
    //   //   reviews: data.brief,
        
    //   // });
      
    // })

    setBookInfo({
      bookID: data._id,
      bookName: data.bookName,
      author: data.author,
      category: data.category,
      reviews: [data.brief],
      rate: data.rating,
      image: data.photo
    });
  })



 },[]);
 const listt = BookInfo.reviews.map((li) => {
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
 
 const  handle_update_review = (event) => {
      setBookInfo({
       newReview: event.target.value,
     });
   }
 
   const handle_status_reading = (event) => {
     console.log(event.target.value);
     SetStatusReading({
       'readingStatus': event.target.value,
       'bookId': BookInfo.bookId,
      //  'userId': new Cookies().get("currentUser")._id,
     }).then((data)=>{
       console.log(data);
     })
   }
 
   const handle_add_review = () => {
     // check if review just space or blank
     if((/^ *$/.test(BookInfo.newReview)) || (/^$/.test(BookInfo.newReview))) {
         alert("please enter valid review");
     }
     else {
        //  let currentUser = new Cookies().get('currentUser');
         AddReview({
         'body': BookInfo.newReview,
        //  'userId': currentUser._id,
         'bookId': BookInfo.bookId,
         }).then(data => {
             console.log(data);
             GetReview(BookInfo.bookId).then((reviews)=> {
                setBookInfo({
                 newReview : "",
                 reviews: reviews,
             });
             alert("Review added successfully");
             })
           });
     }
   }
 
   console.log("bbbbb  ", BookInfo);
  
     return (
       
      <div class="parentContainer">
      <div>
        <div class="cardAndrateAndselect">
          <Card bookname= {BookInfo.bookName} photo={BookInfo.photo} />
          <div class="selectt">
            <Select />
          </div>
          <div class="ratingg">
            <StarRating />
          </div>
        </div>
        <div class="beside">
          <h3 class="bookname"> {BookInfo.bookName}</h3>
          <h6 class="authorname"> {BookInfo.author}</h6>
          <h6 class="category"> {BookInfo.category}</h6>
          <div class="rating">
            <StarRating /> <span class="userRatingnum">  {BookInfo.rate} ratings</span>
          </div>
          <div class="description">
            <p>
              {BookInfo.reviews}
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
