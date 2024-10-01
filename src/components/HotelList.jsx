import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HotelList.css';
import defaultHotels from './defaultHotels';

function HotelList() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const storedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
    setHotels([...defaultHotels, ...storedHotels]);
  }, []);

  return (
    <div className="hotel-list">
      {hotels.map((hotel, index) => (
        <div key={index} className="hotel-card">
          <img src={hotel.image} alt={hotel.name} className="hotel-image" />
          <h3>{hotel.name}</h3>
          <p>{'⭐'.repeat(hotel.stars)}</p>
          <p>{hotel.city}, {hotel.state}</p>
          <p>Preço Diária: R${hotel.price}</p>
          <Link to={`/hotel/${index}`}>Ver Detalhes</Link>
        </div>
      ))}
    </div>
  );
}

export default HotelList;