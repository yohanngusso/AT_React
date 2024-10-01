import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Forms.css'; // Importe o arquivo CSS

function Forms() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [stars, setStars] = useState(1);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [services, setServices] = useState('');
  const [additionalImages, setAdditionalImages] = useState(['', '', '', '', '']); // Adiciona um estado para as imagens adicionais
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Nome é obrigatório';
    if (!image) newErrors.image = 'URL da imagem é obrigatória';
    if (stars < 1 || stars > 5) newErrors.stars = 'Estrelas devem estar entre 1 e 5';
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
    if (validateForm()) {
      const newHotel = {
        name,
        image,
        stars,
        city,
        state,
        price,
        description,
        services,
        additionalImages: additionalImages.filter(img => img !== ''), // Filtra imagens vazias
      };

      // Salvar o novo hotel no localStorage
      const storedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
      storedHotels.push(newHotel);
      localStorage.setItem('hotels', JSON.stringify(storedHotels));

      setMessage('Hotel adicionado com sucesso!');
      setTimeout(() => navigate('/'), 2000);
    }
  };

  const handleImageChange = (index, value) => {
    const newImages = [...additionalImages];
    newImages[index] = value;
    setAdditionalImages(newImages);
  };

  return (
    <div className="form-container">
      <h2>Adicionar Novo Hotel</h2>
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
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="image">URL da Imagem Principal</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          {errors.image && <p className="error-message">{errors.image}</p>}
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
          {errors.stars && <p className="error-message">{errors.stars}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="city">Cidade</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          {errors.city && <p className="error-message">{errors.city}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="state">Estado</label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          {errors.state && <p className="error-message">{errors.state}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="price">Preço</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            min="0"
            step="0.01" // Permite valores decimais
          />
          {errors.price && <p className="error-message">{errors.price}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <p className="error-message">{errors.description}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="services">Serviços</label>
          <textarea
            id="services"
            value={services}
            onChange={(e) => setServices(e.target.value)}
          />
          {errors.services && <p className="error-message">{errors.services}</p>}
        </div>
        {additionalImages.map((img, index) => (
          <div key={index} className="form-group">
            <label htmlFor={`additionalImage${index + 1}`}>URL da Imagem Adicional {index + 2}</label>
            <input
              type="text"
              id={`additionalImage${index + 1}`}
              value={img}
              onChange={(e) => handleImageChange(index, e.target.value)}
            />
          </div>
        ))}
        <button type="submit" className="submit-button">Adicionar Hotel</button>
      </form>
    </div>
  );
}

export default Forms;