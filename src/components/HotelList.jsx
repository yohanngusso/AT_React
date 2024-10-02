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
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const storedSearchTerm = localStorage.getItem('searchTerm') || '';
    const storedSortOption = localStorage.getItem('sortOption') || 'price';
    setHotels([...defaultHotels, ...storedHotels]);
    setFavorites(storedFavorites);
    setSearchTerm(storedSearchTerm);
    setSortOption(storedSortOption);
  }, []);

  const toggleFavorite = (hotelIndex) => {
    const newFavorites = favorites.includes(hotelIndex)
      ? favorites.filter(favIndex => favIndex !== hotelIndex)
      : [...favorites, hotelIndex];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

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

  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
    localStorage.setItem('searchTerm', term);
  };

  const handleSortOptionChange = (option) => {
    setSortOption(option);
    localStorage.setItem('sortOption', option);
  };

  const filteredHotels = hotels.filter(hotel => hotel.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const sortedHotels = filteredHotels.sort((a, b) => {
    if (sortOption === 'price') {
      return a.price - b.price;
    } else if (sortOption === 'stars') {
      return b.stars - a.stars;
    }
    return 0;
  });

  return (
    <div className="hotel-list-container">
      <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearchTermChange} />
      <SortOptions sortOption={sortOption} setSortOption={handleSortOptionChange} />
      <div className="hotel-list">
        {sortedHotels.map((hotel) => {
          const originalIndex = hotels.findIndex(h => h === hotel);
          return (
            <div key={originalIndex} className="hotel-card">
              <img src={hotel.image} alt={hotel.name} className="hotel-image" />
              <h3>{hotel.name}</h3>
              <p>{'⭐'.repeat(hotel.stars)}</p>
              <p>{hotel.city}, {hotel.state}</p>
              <p>Preço Diária: R${hotel.price}</p>
              <Link to={`/hotel/${originalIndex}`}>Ver Detalhes</Link>
              <Link to={`/edit-hotel/${originalIndex}`} className="edit-button">Editar</Link>
              <button
                onClick={() => toggleFavorite(originalIndex)}
                className={`favorite-button ${favorites.includes(originalIndex) ? 'favorited' : ''}`}
              >
                {favorites.includes(originalIndex) ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
              </button>
              <button onClick={() => handleDelete(originalIndex)} className="delete-button">Excluir</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HotelList;