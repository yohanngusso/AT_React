import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HotelsList.css';

function HotelsList() {
  const [hotels, setHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('price');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const updateHotels = () => {
      const savedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
      setHotels(savedHotels);
      const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(savedFavorites);
    };

    updateHotels();

    window.addEventListener('storage', updateHotels);

    return () => {
      window.removeEventListener('storage', updateHotels);
    };
  }, []);

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedHotels = filteredHotels.sort((a, b) => {
    if (sortCriteria === 'price') {
      return a.price - b.price;
    } else if (sortCriteria === 'stars') {
      return b.stars - a.stars;
    }
    return 0;
  });

  const toggleFavorite = (id) => {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="hotels-list">
      <input
        type="text"
        placeholder="Pesquise aqui"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select value={sortCriteria} onChange={(e) => setSortCriteria(e.target.value)}>
        <option value="price">Filtro por Preço</option>
        <option value="stars">Filtro por Estrela</option>
      </select>
      <div className="hotels">
        {sortedHotels.map((hotel) => (
          <div key={hotel.id} className="hotel-item">
            <h2>{hotel.name}</h2>
            <img src={hotel.image} alt={hotel.name} />
            <p>{'⭐'.repeat(hotel.stars)}</p>
            <p>
              {hotel.city}, {hotel.state}
            </p>
            <p>R${hotel.price}/Noite</p>
            <button onClick={() => toggleFavorite(hotel.id)}>
              {favorites.includes(hotel.id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
            <Link to={`/hotel-details/${hotel.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HotelsList;
