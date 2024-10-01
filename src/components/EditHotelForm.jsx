import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditHotelForm.css';
import defaultHotels from './defaultHotels'; 

function EditHotelForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [stars, setStars] = useState(1);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [services, setServices] = useState('');
  const [additionalImages, setAdditionalImages] = useState(['', '', '', '', '']);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const storedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
    const allHotels = [...defaultHotels, ...storedHotels]; // Combine os defaultHotels com os storedHotels
    const selectedHotel = allHotels[id];
    if (selectedHotel) {
      setHotel(selectedHotel);
      setName(selectedHotel.name);
      setImage(selectedHotel.image);
      setStars(selectedHotel.stars);
      setCity(selectedHotel.city);
      setState(selectedHotel.state);
      setPrice(selectedHotel.price);
      setDescription(selectedHotel.description);
      setServices(selectedHotel.services);
      setAdditionalImages(selectedHotel.additionalImages || ['', '', '', '', '']);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedHotel = {
      name,
      image,
      stars,
      city,
      state,
      price,
      description,
      services,
      additionalImages: additionalImages.filter(img => img !== ''),
    };

    const storedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
    const hotelIndex = parseInt(id, 10);

    if (hotelIndex < defaultHotels.length) {
      // Atualizar defaultHotels
      defaultHotels[hotelIndex] = updatedHotel;
    } else {
      // Atualizar storedHotels
      const storedHotelIndex = hotelIndex - defaultHotels.length;
      if (storedHotelIndex >= 0 && storedHotelIndex < storedHotels.length) {
        storedHotels[storedHotelIndex] = updatedHotel;
        localStorage.setItem('hotels', JSON.stringify(storedHotels));
      }
    }

    setMessage('Hotel atualizado com sucesso!');
    setTimeout(() => navigate('/'), 2000);
  };

  const handleImageChange = (index, value) => {
    const newImages = [...additionalImages];
    newImages[index] = value;
    setAdditionalImages(newImages);
  };

  if (!hotel) {
    return <div>Hotel não encontrado</div>;
  }

  return (
    <div className="edit-hotel-form">
      <h2>Editar Hotel</h2>
      {message && <p className="success-message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">URL da Imagem Principal</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="stars">Estrelas</label>
          <input
            type="number"
            id="stars"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            min="1"
            max="5"
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">Cidade</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">Estado</label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Preço</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            min="0"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="services">Serviços</label>
          <textarea
            id="services"
            value={services}
            onChange={(e) => setServices(e.target.value)}
          />
        </div>
        {additionalImages.map((img, index) => (
          <div key={index} className="form-group">
            <label htmlFor={`additionalImage${index + 1}`}>URL da Imagem Adicional {index + 1}</label>
            <input
              type="text"
              id={`additionalImage${index + 1}`}
              value={img}
              onChange={(e) => handleImageChange(index, e.target.value)}
            />
          </div>
        ))}
        <button type="submit" className="submit-button">Atualizar Hotel</button>
      </form>
    </div>
  );
}

export default EditHotelForm;