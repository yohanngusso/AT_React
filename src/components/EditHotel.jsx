import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditHotel.css'; // Importar o arquivo CSS específico

function EditHotel() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [stars, setStars] = useState(1);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [services, setServices] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const hotels = JSON.parse(localStorage.getItem('hotels')) || [];
    const hotel = hotels.find((hotel, index) => index === parseInt(id));
    if (hotel) {
      setName(hotel.name);
      setImage(hotel.image);
      setStars(hotel.stars);
      setCity(hotel.city);
      setState(hotel.state);
      setPrice(hotel.price);
      setDescription(hotel.description);
      setServices(hotel.services);
    }
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Nome é obrigatório';
    if (!image) newErrors.image = 'URL da imagem é obrigatória';
    if (stars <= 0) newErrors.stars = 'Estrelas devem ser maior que 0';
    if (!city) newErrors.city = 'Cidade é obrigatória';
    if (!state) newErrors.state = 'Estado é obrigatório';
    if (price <= 0) newErrors.price = 'Preço deve ser maior que 0';
    if (!description) newErrors.description = 'Descrição é obrigatória';
    if (!services) newErrors.services = 'Serviços são obrigatórios';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const updatedHotel = {
      name,
      image,
      stars,
      city,
      state,
      price,
      description,
      services,
      additionalImages: []
    };
    try {
      const hotels = JSON.parse(localStorage.getItem('hotels')) || [];
      hotels[parseInt(id)] = updatedHotel;
      localStorage.setItem('hotels', JSON.stringify(hotels));
      window.dispatchEvent(new Event('storage')); // Disparar evento de storage para atualizar a lista de hotéis
      setMessage('Hotel atualizado com sucesso!');
      setTimeout(() => navigate('/hoteis'), 2000);
    } catch {
      setMessage('Falha ao atualizar hotel. Por favor, tente novamente.');
    }
  };

  return (
    <div className="edit-hotel">
      <h2>Editar Hotel</h2>
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>
        <label>
          URL da Imagem:
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
          {errors.image && <span className="error">{errors.image}</span>}
        </label>
        <label>
          Estrelas:
          <input type="number" value={stars} onChange={(e) => setStars(e.target.value)} />
          {errors.stars && <span className="error">{errors.stars}</span>}
        </label>
        <label>
          Cidade:
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
          {errors.city && <span className="error">{errors.city}</span>}
        </label>
        <label>
          Estado:
          <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
          {errors.state && <span className="error">{errors.state}</span>}
        </label>
        <label>
          Preço por Noite:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          {errors.price && <span className="error">{errors.price}</span>}
        </label>
        <label>
          Descrição:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          {errors.description && <span className="error">{errors.description}</span>}
        </label>
        <label>
          Serviços:
          <textarea value={services} onChange={(e) => setServices(e.target.value)} />
          {errors.services && <span className="error">{errors.services}</span>}
        </label>
        <button type="submit">Atualizar Hotel</button>
      </form>
    </div>
  );
}

export default EditHotel;