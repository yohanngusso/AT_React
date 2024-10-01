import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HotelList.css';
import defaultHotels from './defaultHotels';

function HotelList() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const storedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
    setHotels([...defaultHotels, ...storedHotels]);
  }, []);

  const handleDelete = (index) => {
    const storedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
    if (index < defaultHotels.length) {
      // Remover hotel dos defaultHotels
      defaultHotels.splice(index, 1);
    } else {
      // Remover hotel do storedHotels
      const storedHotelIndex = index - defaultHotels.length;
      storedHotels.splice(storedHotelIndex, 1);
      localStorage.setItem('hotels', JSON.stringify(storedHotels));
    }
    setHotels([...defaultHotels, ...storedHotels]);
  };

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
          <Link to={`/edit-hotel/${index}`} className="edit-button">Editar</Link>
          <button onClick={() => handleDelete(index)} className="delete-button">Excluir</button>
        </div>
      ))}
    </div>
  );
}

export default HotelList;