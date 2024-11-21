import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import './compte.css';

const Compte = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    return (
        <div className="compte-container">
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          
            
            
            <p>Welcome To Your Account</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
           
            
            <div className="profile-section">
                <img
                    src={`${process.env.PUBLIC_URL}/compte.png`}
                    alt="User"
                    className="profile-image"
                />
                <div className="user-info">
                    <h2>User: {user ? user.email : 'No user logged in'}</h2>
                </div>
            </div>
            <div className="rating-section">
                <h3>Rate Our Site:</h3>
                <div className="stars">
                    {[...Array(5)].map((star, index) => {
                        const ratingValue = index + 1;
                        return (
                            <label key={index}>
                                <input
                                    type="radio"
                                    name="rating"
                                    value={ratingValue}
                                    onClick={() => setRating(ratingValue)}
                                    style={{ display: 'none' }}
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill={ratingValue <= (hover || rating) ? 'gold' : 'gray'}
                                    className="star"
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(0)}
                                    style={{
                                        cursor: 'pointer',
                                        width: '30px',
                                        height: '30px',
                                        marginRight: '5px',
                                    }}
                                >
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                            </label>
                        );
                    })}
                </div>
                {rating > 0 && <p>You rated: {rating} star{rating > 1 ? 's' : ''}</p>}
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
    );
};

export default Compte;
