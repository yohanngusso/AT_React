import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './HotelDetails.css';
import defaultHotels from '../defaultHotels'; 

function HotelDetails() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [mainImage, setMainImage] = useState(''); 

  useEffect(() => {
    const storedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
    const allHotels = [...defaultHotels, ...storedHotels];
    const selectedHotel = allHotels[id];
    setHotel(selectedHotel);
    setMainImage(selectedHotel?.image); // Define a imagem principal inicial
  }, [id]);

  if (!hotel) {
    return <div>Hotel não encontrado</div>;
  }

  const handleImageClick = (image) => {
    setMainImage(image); // Troca a imagem principal com a imagem clicada
  };

  return (
    <div className="hotel-details">
      <img src={mainImage} alt={hotel.name} className="hotel-main-image" />
      <div className="additional-images">
        {hotel.additionalImages && hotel.additionalImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${hotel.name} additional ${index}`}
            className="hotel-thumbnail"
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>
      <h2>{hotel.name}</h2>
      <p>{'⭐'.repeat(hotel.stars)}</p>
      <p><strong>Cidade:</strong> {hotel.city}</p>
      <p><strong>Estado:</strong> {hotel.state}</p>
      <p><strong>Preço por Noite:</strong> R${hotel.price.toFixed(2)}</p>
      <p><strong>Descrição:</strong> {hotel.description}</p>
      <p><strong>Serviços:</strong> {hotel.services}</p>
      <div className="hotel-images">
        {hotel.images && hotel.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${hotel.name} ${index}`}
            className="hotel-thumbnail"
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>
    </div>
  );
}

export default HotelDetails;