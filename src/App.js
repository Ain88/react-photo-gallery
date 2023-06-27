import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('sea animal');
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=${query}&count=30&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`
      );
      const data = await response.json();
      const photoURLs = data.map((photo) => photo.urls.regular);
      setPhotos(photoURLs);
    } catch (error) {
      console.log('Error fetching photos:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPhotos();
  };

  return (
    <div className="App">
      <h1 className="title">Sea Animal Gallery 🐠</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a sea animal"
        />
        <button type="submit">Search</button>
      </form>
      <div className="gallery-container">
        {photos.map((photoURL, index) => (
          <div key={index} className="gallery-item">
            <img className="gallery-image" src={photoURL} alt={`Sea Animal ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
