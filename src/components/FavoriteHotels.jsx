import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HotelsList.css'; 

function FavoriteHotels() {
  const [hotels, setHotels] = useState([]);
  // const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const updateHotels = () => {
      const savedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
      const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setHotels(savedHotels.filter((_, index) => savedFavorites.includes(index)));
      // setFavorites(savedFavorites);
    };

    // Atualizar a lista de hotéis quando o componente for montado
    updateHotels();

    // Adicionar um evento de escuta para mudanças no localStorage
    window.addEventListener('storage', updateHotels);

    // Remover o evento de escuta quando o componente for desmontado
    return () => {
      window.removeEventListener('storage', updateHotels);
    };
  }, []);

  return (
    <div className="hotels-list">
      <h2>Favorite Hotels</h2>
      <div>
        {hotels.map((hotel, index) => (
          <div key={index} className="hotel-card">
            <img src={hotel.image} alt={hotel.name} />
            <h3>{hotel.name}</h3>
            <p>{'⭐'.repeat(hotel.stars)}</p>
            <p>{hotel.city}, {hotel.state}</p>
            <p>${hotel.price}/night</p>
            <Link to={`/hotels/${index}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteHotels;