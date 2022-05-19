import React from 'react';
import Card from './Card';
import Select from './SelectComponent';
import StarRating from './RatingComponent';
import './Author.css';

export default function Author(props) {
    // state = { im : "https://prod-images.tcm.com/Master-Profile-Images/WaltDisney.jpg" }
        // const author =props.match.params.id
        var list=[{
            url:"https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1582759969i/40097951.jpg",
            alt:"-"
            , bookname:"Silent Patient" 
            , rating: 2.5 ,
             numberOfratings:120      }
    , { url:"https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1470082995i/29056083.jpg",
             alt:"-",
              bookname:"Harry Potter"
             , rating: 3.5 ,
              numberOfratings:320  }
            , 
            { url:"https://m.media-amazon.com/images/G/01/prime/primeinsider2/prnewesttitles/nov18/watching_you._CB480611966_.jpg"
               , bookname:"I am watching You" 
               , alt:"-"
               , rating: 4.6 , 
               numberOfratings:1200   }
            ]
        var listt=list.map((li)=>{
          
        return (
        <div  class="booksofauthor"><img class=" bookimg" src={li.url} alt={li.alt} width="70px" height="70px"></img> 
        
        <div class="selectandrating">
            <div><Select/></div>
        <div><StarRating/></div>
        </div>
        <div class="rating">
            <h6>{li.bookname}</h6>
            {li.rating} - {li.numberOfratings} ratings
            
        </div>
        
         <hr></hr>
         </div>);
      
        })
    return (
    
    
    <div class="parentContainer">
        
        <div><Card im="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1470082995i/29056083.jpg" />
            <div class="beside">
                <h3 class="i">Walt Disney</h3>
                <small>19-9-1977</small>
                <div class="description"><p>In the 1950s, Disney expanded into the amusement park industry, and in July 1955 he opened Disneyland in Anaheim
                In the 1950s, Disney expanded into the amusement park industry, and in July 1955 he opened Disneyland in Anaheim.
                In the 1950s, Disney expanded into the amusement park industry, and in July 1955 he opened Disneyland in Anaheim.</p></div>
            
            </div>
        </div>
        <div class="authorbooks" >
            <h5 class="s">Author Books</h5>
            <>{listt}</>
        </div>
    </div>
     
    );
};
