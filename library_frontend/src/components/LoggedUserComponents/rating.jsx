import React ,{useState} from 'react';
import {FaStar} from 'react-icons/fa'


function Rating(){
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)
    console.log(rating)
    return(
        
        <div >
            {[...Array(5)].map((star, i) => {
                const ratingValue = i+1;
                return(
                    <label key={i}>
                        <input type='radio' name='rating' value={ratingValue}
                        onClick={() => setRating(ratingValue)}
                        
                        />
                        <FaStar size={30} color={ratingValue <=(hover || rating)  ? "#ffc107" : "#e4e5e9"}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave ={() => setHover(null)}
                        />
                    </label>
                    
                )})}
        </div>
            )   
}

export default Rating


