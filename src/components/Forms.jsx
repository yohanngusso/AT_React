import { useState } from 'react';
import SuccessMessage from './SuccessMessage';
import './Forms.css';

function Forms() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [stars, setStars] = useState(0);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [services, setServices] = useState('');
  const [additionalImages, setAdditionalImages] = useState(['']);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Estado para a mensagem de erro



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

      try {
        const storedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
        storedHotels.push(newHotel);
        localStorage.setItem('hotels', JSON.stringify(storedHotels));

        setMessage('Hotel adicionado com sucesso!');
        setTimeout(() => setMessage(''), 3000); // Limpar a mensagem após 3 segundos

        // Limpar o formulário
        setName('');
        setImage('');
        setStars(0);
        setCity('');
        setState('');
        setPrice(0);
        setDescription('');
        setServices('');
        setAdditionalImages(['']);
        setErrors({});
      } catch {
        setErrorMessage('Falha ao salvar o hotel. Por favor, tente novamente.');
        setTimeout(() => setErrorMessage(''), 3000); // Limpar a mensagem de erro após 3 segundos
      }
    }
  };

  const handleImageChange = (index, value) => {
    const newImages = [...additionalImages];
    newImages[index] = value;
    setAdditionalImages(newImages);
  };

  return (
    <div className="form-container">
      {message && <SuccessMessage message={message} />}
      {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Exibir mensagem de erro */}
      <h2>Adicionar Novo Hotel</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="image">URL da Imagem</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          {errors.image && <span className="error">{errors.image}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="stars">Classificação</label>
          <input
            type="number"
            id="stars"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            min="1"
            max="5"
          />
          {errors.stars && <span className="error">{errors.stars}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="city">Cidade</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          {errors.city && <span className="error">{errors.city}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="state">Estado</label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          {errors.state && <span className="error">{errors.state}</span>}
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
          {errors.price && <span className="error">{errors.price}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="services">Serviços</label>
          <textarea
            id="services"
            value={services}
            onChange={(e) => setServices(e.target.value)}
          />
          {errors.services && <span className="error">{errors.services}</span>}
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
        <button type="submit" className='add-button'>Adicionar Hotel</button>
      </form>
    </div>
  );
}

export default Forms;