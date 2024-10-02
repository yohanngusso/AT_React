import { useState, useEffect } from 'react';
import defaultHotels from './defaultHotels';

function FavoriteHotels() {
  const [hotels, setHotels] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setHotels([...defaultHotels, ...storedHotels]);
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (hotelIndex) => {
    const newFavorites = favorites.includes(hotelIndex)
      ? favorites.filter(favIndex => favIndex !== hotelIndex)
      : [...favorites, hotelIndex];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const favoriteHotels = hotels.filter((hotel, index) => favorites.includes(index));

  return (
    <div className="favorite-hotels-container">
      <h2>Hotéis Favoritos</h2>
      <div className="hotel-list">
        {favoriteHotels.map((hotel) => {
          const originalIndex = hotels.findIndex(h => h === hotel);
          return (
            <div key={originalIndex} className="hotel-card">
              <img src={hotel.image} alt={hotel.name} className="hotel-image" />
              <h3>{hotel.name}</h3>
              <p>{'⭐'.repeat(hotel.stars)}</p>
              <p>{hotel.city}, {hotel.state}</p>
              <p>Preço Diária: R${hotel.price}</p>
              <button
                className={`favorite-button favorited`}
                onClick={() => toggleFavorite(originalIndex)}
              >
                Remover dos Favoritos
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FavoriteHotels;