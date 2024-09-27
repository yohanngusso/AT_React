import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function HotelDetails() {
  const { id } = useParams(); // ID vindo do URL
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const updateHotel = () => {
      const hotels = JSON.parse(localStorage.getItem('hotels')) || [];
      console.log('Hotels:', hotels); // Log para verificar os hotéis armazenados

      // Conversão de ID para número e verificação se o hotel existe
      const selectedHotel = hotels.find((hotel) => hotel.id === parseInt(id));
      if (!selectedHotel) {
        console.warn(`Hotel with id ${id} not found!`); // Log se o hotel não for encontrado
      }
      console.log('Selected Hotel:', selectedHotel); // Verifique o hotel encontrado
      setHotel(selectedHotel);
      console.log('Hotel ID:', id);

    };

    updateHotel();

    window.addEventListener('storage', updateHotel);

    return () => {
      window.removeEventListener('storage', updateHotel);
    };
  }, [id]);

  const handleDelete = () => {
    const hotels = JSON.parse(localStorage.getItem('hotels')) || [];
    const updatedHotels = hotels.filter((hotel) => hotel.id !== parseInt(id));
    localStorage.setItem('hotels', JSON.stringify(updatedHotels));
    window.dispatchEvent(new Event('storage')); // Disparar evento de storage para atualizar a lista de hotéis
    navigate('/hotels');
  };

  if (!hotel) {
    return <div>Hotel not found</div>; // Mensagem se o hotel não for encontrado
  }

  return (
    <div className="hotel-details">
      <h2>{hotel.name}</h2>
      <img src={hotel.image} alt={hotel.name} />
      <p>{'⭐'.repeat(hotel.stars)}</p>
      <p>
        {hotel.city}, {hotel.state}
      </p>
      <p>${hotel.price}/night</p>
      <p>{hotel.description}</p>
      <div className="additional-images">
        {hotel.additionalImages.map((image, index) => (
          <img key={index} src={image} alt={`${hotel.name} ${index}`} />
        ))}
      </div>
      <p>{hotel.services}</p>
      <Link to={`/edit-hotel/${id}`}>Edit Hotel</Link>
      <button onClick={handleDelete}>Delete Hotel</button>
    </div>
  );
}

export default HotelDetails;
