import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SuccessMessage from './SuccessMessage';
import defaultHotels from './defaultHotels';
import './EditHotelForm.css'; // Importando o arquivo CSS

function EditHotelForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [name, setName] = useState('');
  const [stars, setStars] = useState(0);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [additionalImages, setAdditionalImages] = useState([]);
  const [description, setDescription] = useState('');
  const [services, setServices] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Estado para a mensagem de erro

  useEffect(() => {
    const storedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
    const hotelIndex = parseInt(id, 10);

    if (hotelIndex < defaultHotels.length) {
      setHotel(defaultHotels[hotelIndex]);
    } else {
      const storedHotelIndex = hotelIndex - defaultHotels.length;
      if (storedHotelIndex >= 0 && storedHotelIndex < storedHotels.length) {
        setHotel(storedHotels[storedHotelIndex]);
      }
    }
  }, [id]);

  useEffect(() => {
    if (hotel) {
      setName(hotel.name);
      setStars(hotel.stars);
      setCity(hotel.city);
      setState(hotel.state);
      setPrice(hotel.price);
      setImage(hotel.image);
      setAdditionalImages(hotel.additionalImages || []);
      setDescription(hotel.description || '');
      setServices(hotel.services || '');
    }
  }, [hotel]);

  const handleUpdate = () => {
    const updatedHotel = {
      name,
      stars,
      city,
      state,
      price,
      image,
      additionalImages,
      description,
      services,
    };

    try {
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
      setTimeout(() => {
        setMessage('');
        navigate('/');
      }, 2000);
    } catch {
      setErrorMessage('Falha ao atualizar o hotel. Por favor, tente novamente.');
      setTimeout(() => setErrorMessage(''), 3000); // Limpar a mensagem de erro após 3 segundos
    }
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
      {message && <SuccessMessage message={message} />}
      {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Exibir mensagem de erro */}
      <h2>Editar Hotel</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
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
          <label htmlFor="stars">Classificação</label>
          <input
            type="number"
            id="stars"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
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
          <label htmlFor="price">Preço Diária</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            min="1"
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
        <button type="submit" className="update-button">Atualizar Hotel</button>
      </form>
    </div>
  );
}

export default EditHotelForm;