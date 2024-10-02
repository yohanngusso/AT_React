import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HotelList.css';
import defaultHotels from './defaultHotels';
import SearchBar from './SearchBar';
import SortOptions from './SortOptions';

function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('price');

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

  const hotelsWithIndex = hotels.map((hotel, index) => ({ ...hotel, originalIndex: index }));

  const filteredHotels = hotelsWithIndex.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedHotels = filteredHotels.sort((a, b) => {
    if (sortOption === 'price') {
      return a.price - b.price;
    } else if (sortOption === 'rating') {
      return b.stars - a.stars;
    }
    return 0;
  });

  return (
    <div className="hotel-list-container">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <SortOptions sortOption={sortOption} setSortOption={setSortOption} />
      <div className="hotel-list">
        {sortedHotels.map((hotel) => (
          <div key={hotel.originalIndex} className="hotel-card">
            <img src={hotel.image} alt={hotel.name} className="hotel-image" />
            <h3>{hotel.name}</h3>
            <p>{'⭐'.repeat(hotel.stars)}</p>
            <p>{hotel.city}, {hotel.state}</p>
            <p>Preço Diária: R${hotel.price}</p>
            <Link to={`/hotel/${hotel.originalIndex}`}>Ver Detalhes</Link>
            <Link to={`/edit-hotel/${hotel.originalIndex}`} className="edit-button">Editar</Link>
            <button onClick={() => handleDelete(hotel.originalIndex)} className="delete-button">Excluir</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HotelList;