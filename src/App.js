import React, { useState, useEffect } from 'react';
import './App.css';


import image1 from './image1.jpg';
import image2 from './image2.jpg';
import image3 from './image3.jpg';

const defaultImages = [
  {
    link: image1,
    rating: 3.5,
    author: 'Vader vs Ahsoka',
    date: '2024-01-16',
    details: 'Duel in wolrld between worlds',
  },
  {
    link: image2,
    rating: 3.8,
    author: 'Heir to the Empire',
    date: '2024-01-17',
    details: 'Thrawns fleet comeback',
  },
  {
    link: image3,
    rating: 2.4,
    author: 'Long live the Empire',
    date: '2026-12-10',
    details: 'Moff Gideon on Mandalore',
  },

];

function App() {
  const [images, setImages] = useState(defaultImages);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const totalRating = images.reduce((acc, image) => acc + image.rating, 0);
    const avgRating = totalRating / images.length || 0;
    setAverageRating(avgRating.toFixed(1));
  }, [images, currentImageIndex]);

  const handleVote = (value) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[currentImageIndex].rating = Math.max(0, parseFloat((newImages[currentImageIndex].rating + value).toFixed(1)));
      return newImages;
    });
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => Math.min(prevIndex + 1, images.length - 1));
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
      <div className="App">
        <h1>Photo Gallery</h1>
        {images.length > 0 && currentImageIndex < images.length && (
            <div className="image-container">
              <img src={images[currentImageIndex].link} alt={`Image ${currentImageIndex + 1}`} />
              <div className="details">
                <p>Author: {images[currentImageIndex].author}</p>
                <p>Date: {images[currentImageIndex].date}</p>
                <p>Details: {images[currentImageIndex].details}</p>
                <p>Rating: {images[currentImageIndex].rating}</p>
                <div className="rating-buttons">
                  <button onClick={() => handleVote(0.1)}>Upvote</button>
                  <button onClick={() => handleVote(-0.1)}>Downvote</button>
                </div>
                <p>Average Rating: {averageRating}</p>
                <a href={images[currentImageIndex].link} target="_blank" rel="noopener noreferrer">
                  Link to Details
                </a>
              </div>
              <div className="navigation-buttons">
                <button onClick={handlePrevImage} disabled={currentImageIndex === 0}>
                  &lt; Prev
                </button>
                <button onClick={handleNextImage} disabled={currentImageIndex === images.length - 1}>
                  Next &gt;
                </button>
              </div>
            </div>
        )}
      </div>
  );
}

export default App;
